import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'

const Login = () => {
  const navigate = useNavigate()

  // Huom: tässä vaiheessa kirjautuminen on simuloitu — oikea
  // Firebase Authin kautta tapahtuva Google-kirjautuminen lisätään myöhemmässä vaiheessa.
  const handleLogin = () => {
    navigate('/koti')
  }

  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <div className={styles.stars}></div>
        <div className={styles.badge}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
            <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" fill="#ab93ed" />
          </svg>
        </div>
        <div>
          <div className={styles.title}>Unipäiväkirja</div>
          <div className={styles.subtitle}>Seuraa untasi, ymmärrä lepoasi</div>
        </div>
        <button className={styles.googleButton} onClick={handleLogin}>
          <span className={styles.googleIcon}>G</span>
          <span>Jatka Googlella</span>
        </button>
      </div>
    </div>
  )
}

export default Login