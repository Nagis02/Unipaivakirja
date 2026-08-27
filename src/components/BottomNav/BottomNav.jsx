import { Link } from 'react-router-dom'
import styles from './BottomNav.module.scss'

const items = [
  {
    key: 'koti', label: 'Koti', to: '/koti',
    icon: (color) => (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9h12v-9" />
      </svg>
    ),
  },
  {
    key: 'tilastot', label: 'Tilastot', to: '/tilastot',
    icon: (color) => (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round">
        <path d="M5 19V10M12 19V5M19 19v-7" />
      </svg>
    ),
  },
  {
    key: 'asetukset', label: 'Asetukset', to: '/asetukset',
    icon: (color) => (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" strokeLinecap="round" />
      </svg>
    ),
  },
]

const BottomNav = ({ active }) => {
  return (
    <div className={styles.nav}>
      {items.map((item) => {
        const color = item.key === active ? '#ab93ed' : '#838592'
        return (
          <Link key={item.key} to={item.to} className={styles.item}>
            {item.icon(color)}
            <span style={{ color }}>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default BottomNav