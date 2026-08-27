import { useState } from 'react'
import BottomNav from '../../components/BottomNav/BottomNav'
import { useEntries } from '../../hooks/useEntries'
import { QUALITY_LEVELS, formatDuration } from '../../utils/sleepQuality'
import { formatWeekdayShort, formatDateShort } from '../../utils/formatDate'
import styles from './Stats.module.scss'

const CHART_LEFT = 8
const CHART_RIGHT = 292
const CHART_TOP = 12
const CHART_BOTTOM = 110

const buildChartPoints = (durations) => {
  if (durations.length === 0) return []
  const max = Math.max(...durations)
  const min = Math.min(...durations)
  const range = max - min || 1
  return durations.map((d, i) => ({
    x: durations.length === 1
      ? (CHART_LEFT + CHART_RIGHT) / 2
      : CHART_LEFT + (i * (CHART_RIGHT - CHART_LEFT)) / (durations.length - 1),
    y: CHART_BOTTOM - ((d - min) / range) * (CHART_BOTTOM - CHART_TOP),
  }))
}

const daysAgo = (n) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  const pad = (x) => String(x).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const Stats = () => {
  const { entries, loading } = useEntries()
  const [range, setRange] = useState('7vrk')

  const filtered = range === '7vrk' ? entries.filter((e) => e.date >= daysAgo(6)) : entries
  const chronological = [...filtered].reverse()
  const durations = chronological.map((e) => e.duration)
  const hasData = durations.length > 0

  const average = hasData ? Math.round(durations.reduce((sum, d) => sum + d, 0) / durations.length) : 0
  const longest = hasData ? Math.max(...durations) : 0
  const shortest = hasData ? Math.min(...durations) : 0

  const points = buildChartPoints(durations)
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

  const distribution = QUALITY_LEVELS
    .map((level) => ({ ...level, count: chronological.filter((e) => e.quality === level.key).length }))
    .filter((level) => level.count > 0)

  return (
    <div className={styles.stats}>
      <div className={styles.header}>
        <div className={styles.title}>Tilastot</div>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterChip} ${range === '7vrk' ? styles.active : ''}`}
          onClick={() => setRange('7vrk')}
        >
          7 vrk
        </button>
        <button
          className={`${styles.filterChip} ${range === 'kaikki' ? styles.active : ''}`}
          onClick={() => setRange('kaikki')}
        >
          Kaikki
        </button>
      </div>

      <div className={styles.body}>
        {loading && <div className={styles.empty}>Ladataan…</div>}

        {!loading && !hasData && (
          <div className={styles.empty}>Ei vielä tarpeeksi dataa tilastoihin — lisää ensin muutama yö.</div>
        )}

        {!loading && hasData && (
          <>
            <div className={styles.statsRow}>
              <div className={styles.statTile}>
                <div className={styles.statValue}>{formatDuration(average)}</div>
                <div className={styles.statLabel}>keskiarvo</div>
              </div>
              <div className={styles.statTile}>
                <div className={`${styles.statValue} ${styles.max}`}>{formatDuration(longest)}</div>
                <div className={styles.statLabel}>pisin yö</div>
              </div>
              <div className={styles.statTile}>
                <div className={`${styles.statValue} ${styles.min}`}>{formatDuration(shortest)}</div>
                <div className={styles.statLabel}>lyhyin yö</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Unen kesto</div>
              <svg width="100%" height="380" viewBox="0 0 300 130" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <line x1="0" y1="32.5" x2="300" y2="32.5" stroke="#1c2340" strokeWidth="1" />
                <line x1="0" y1="65" x2="300" y2="65" stroke="#1c2340" strokeWidth="1" />
                <line x1="0" y1="97.5" x2="300" y2="97.5" stroke="#1c2340" strokeWidth="1" />
                <path d={pathD} fill="none" stroke="#ab93ed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {points.map((p, i) => {
                  const isLast = i === points.length - 1
                  return (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r={isLast ? 5.5 : 4}
                      fill={isLast ? '#ab93ed' : '#080c1c'}
                      stroke="#ab93ed"
                      strokeWidth="2"
                    />
                  )
                })}
              </svg>
              <div className={styles.chartLabels}>
                {chronological.map((e, i) => (
                  <span key={e.id}>
                    {(i === 0 || i === chronological.length - 1)
                      ? `${formatWeekdayShort(e.date)} ${formatDateShort(e.date)}`
                      : formatWeekdayShort(e.date)}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.distributionCard}>
              <div className={styles.cardTitle}>Unenlaadun jakauma</div>
              <div className={styles.bar}>
                {distribution.map((level) => (
                  <div
                    key={level.key}
                    style={{ width: `${(level.count / chronological.length) * 100}%`, background: level.color }}
                  ></div>
                ))}
              </div>
              <div className={styles.legend}>
                {distribution.map((level) => (
                  <span key={level.key} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: level.color }}></span>
                    {level.label} ({level.count})
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <BottomNav active="tilastot" />
    </div>
  )
}

export default Stats