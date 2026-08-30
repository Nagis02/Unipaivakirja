import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useEntries } from '../../hooks/useEntries'
import { addEntry, updateEntry, deleteEntry } from '../../services/entries'
import { QUALITY_LEVELS, formatDuration } from '../../utils/sleepQuality'
import styles from './EntryForm.module.scss'

const DISTURBANCES = ['Kofeiini', 'Stressi', 'Melu', 'Valo', 'Särky']

const parseTimeToMinutes = (time) => {
  if (!time) return null
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const calculateDuration = (start, end) => {
  const startMin = parseTimeToMinutes(start)
  const endMin = parseTimeToMinutes(end)
  if (startMin === null || endMin === null) return null
  let diff = endMin - startMin
  if (diff <= 0) diff += 24 * 60
  return diff
}

const todayIso = () => {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const EntryForm = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { id } = useParams()
  const isEditing = Boolean(id)

  const { entries, loading: entriesLoading } = useEntries()
  const existingEntry = isEditing ? entries.find((e) => e.id === id) : null

  const [date, setDate] = useState(todayIso())
  const [start, setStart] = useState('23:00')
  const [end, setEnd] = useState('07:00')
  const [quality, setQuality] = useState(null)
  const [location, setLocation] = useState('')
  const [disturbances, setDisturbances] = useState([])
  const [notes, setNotes] = useState('')
  const [initialized, setInitialized] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isEditing && existingEntry && !initialized) {
      setDate(existingEntry.date)
      setStart(existingEntry.start)
      setEnd(existingEntry.end)
      setQuality(existingEntry.quality)
      setLocation(existingEntry.location || '')
      setDisturbances(existingEntry.disturbances || [])
      setNotes(existingEntry.notes || '')
      setInitialized(true)
    }
  }, [isEditing, existingEntry, initialized])

  const duration = calculateDuration(start, end)

  const toggleDisturbance = (item) => {
    setDisturbances((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    )
  }

  const canSave = Boolean(date && start && end && quality) && !saving && !deleting

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!canSave || !user) return

    setSaving(true)
    setError(null)
    const entry = { date, start, end, duration, quality, location, disturbances, notes }

    try {
      if (isEditing) {
        await updateEntry(user.uid, id, entry)
      } else {
        await addEntry(user.uid, entry)
      }
      navigate('/koti')
    } catch (err) {
      console.error('Tallennus epäonnistui:', err)
      setError('Tallennus epäonnistui. Yritä uudelleen.')
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!isEditing || !user) return
    const confirmed = window.confirm('Poistetaanko tämä yö pysyvästi?')
    if (!confirmed) return

    setDeleting(true)
    setError(null)
    try {
      await deleteEntry(user.uid, id)
      navigate('/koti')
    } catch (err) {
      console.error('Poisto epäonnistui:', err)
      setError('Poisto epäonnistui. Yritä uudelleen.')
      setDeleting(false)
    }
  }

  if (isEditing && !entriesLoading && !existingEntry) {
    return (
      <div className={styles.form}>
        <div className={styles.header}>
          <button type="button" className={styles.closeButton} onClick={() => navigate('/koti')} aria-label="Sulje">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <div className={styles.title}>Yötä ei löytynyt</div>
          <div className={styles.spacer}></div>
        </div>
        <div className={styles.body}>
          <div className={styles.error}>Merkintää ei löytynyt — se on ehkä jo poistettu.</div>
        </div>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <button type="button" className={styles.closeButton} onClick={() => navigate(-1)} aria-label="Sulje">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className={styles.title}>{isEditing ? 'Muokkaa yötä' : 'Uusi yö'}</div>
        <div className={styles.spacer}></div>
      </div>

      <div className={styles.body}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="date">Päivämäärä</label>
          <input
            id="date"
            className={styles.input}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.timeRow}>
            <div className={styles.timeField}>
              <label className={styles.label} htmlFor="start">Nukkumaanmeno</label>
              <input
                id="start"
                className={styles.input}
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className={styles.timeField}>
              <label className={styles.label} htmlFor="end">Herääminen</label>
              <input
                id="end"
                className={styles.input}
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>
          {duration !== null && (
            <div className={styles.duration}>→ {formatDuration(duration)} unta</div>
          )}
        </div>

        <div className={styles.field}>
          <div className={styles.label}>Unenlaatu</div>
          <div className={styles.chips}>
            {QUALITY_LEVELS.map((level) => {
              const selected = quality === level.key
              return (
                <button
                  type="button"
                  key={level.key}
                  className={`${styles.qualityChip} ${selected ? styles.selected : ''}`}
                  style={{
                    border: `1px solid ${level.color}`,
                    color: selected ? undefined : level.color,
                    background: selected ? level.color : 'transparent',
                  }}
                  onClick={() => setQuality(level.key)}
                >
                  {level.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="location">
            Paikka <span className={styles.optional}>(valinnainen)</span>
          </label>
          <input
            id="location"
            className={styles.input}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Koti"
          />
        </div>

        <div className={styles.field}>
          <div className={styles.label}>
            Häiriöt yöllä <span className={styles.optional}>(valinnainen)</span>
          </div>
          <div className={styles.chips}>
            {DISTURBANCES.map((item) => {
              const selected = disturbances.includes(item)
              return (
                <button
                  type="button"
                  key={item}
                  className={`${styles.disturbanceChip} ${selected ? styles.selected : ''}`}
                  onClick={() => toggleDisturbance(item)}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="notes">
            Muistiinpanot <span className={styles.optional}>(valinnainen)</span>
          </label>
          <textarea
            id="notes"
            className={styles.textarea}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Vapaa sana yöstä..."
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}
      </div>

      <div className={styles.footer}>
        {isEditing && (
          <button type="button" className={styles.deleteButton} onClick={handleDelete} disabled={saving || deleting}>
            {deleting ? 'Poistetaan…' : 'Poista yö'}
          </button>
        )}
        <button type="submit" className={styles.saveButton} disabled={!canSave}>
          {saving ? 'Tallennetaan…' : 'Tallenna'}
        </button>
      </div>
    </form>
  )
}

export default EntryForm