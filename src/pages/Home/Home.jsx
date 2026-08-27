import { Link } from 'react-router-dom'
import BottomNav from '../../components/BottomNav/BottomNav'
import { useEntries } from '../../hooks/useEntries'
import { qualityByKey, formatDuration } from '../../utils/sleepQuality'
import { formatWeekdayShort, formatDateShort } from '../../utils/formatDate'
import styles from './Home.module.scss'

const Home = () => {
  const { entries, loading } = useEntries()

  const latest = entries[0]
  const average = entries.length
    ? Math.round(entries.reduce((sum, e) => sum + e.duration, 0) / entries.length)
    : 0

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <div>
          <div className={styles.greeting}>Hyvää iltaa</div>
          <div className={styles.appName}>Unipäiväkirja</div>
        </div>
        <div className={styles.avatar}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#d2d7e5" strokeWidth="1.8">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statTile}>
          <div className={styles.statValue}>{entries.length}</div>
          <div className={styles.statLabel}>yötä seurattu</div>
        </div>
        <div className={styles.statTile}>
          <div className={styles.statValue}>{entries.length ? formatDuration(average) : '–'}</div>
          <div className={styles.statLabel}>keskiarvo</div>
        </div>
        <div className={styles.statTile}>
          <div className={`${styles.statValue} ${styles.accent}`}>
            {latest ? formatDuration(latest.duration) : '–'}
          </div>
          <div className={styles.statLabel}>
            {latest ? `viime yö · ${qualityByKey(latest.quality).label}` : 'viime yö'}
          </div>
        </div>
      </div>

      <div className={styles.sectionTitle}>Viimeisimmät yöt</div>

      <div className={styles.list}>
        {loading && <div className={styles.empty}>Ladataan…</div>}

        {!loading && entries.length === 0 && (
          <div className={styles.empty}>Ei vielä kirjattuja öitä — lisää ensimmäinen yö alla olevasta painikkeesta.</div>
        )}

        {entries.map((entry) => {
          const quality = qualityByKey(entry.quality)
          return (
            <div key={entry.id} className={styles.entry}>
              <div className={styles.dot} style={{ background: quality.color }}></div>
              <div className={styles.entryInfo}>
                <div className={styles.entryDate}>
                  {formatWeekdayShort(entry.date)} {formatDateShort(entry.date)}
                </div>
                <div className={styles.entryMeta}>{entry.start}–{entry.end} · {quality.label}</div>
              </div>
              <div className={styles.entryDuration}>{formatDuration(entry.duration)}</div>
            </div>
          )
        })}
      </div>

      <Link to="/uusi" className={styles.fab} aria-label="Lisää uusi yö">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#080c1c" strokeWidth="2.2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </Link>

      <BottomNav active="koti" />
    </div>
  )
}

export default Home