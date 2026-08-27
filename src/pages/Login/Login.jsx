import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import styles from './Login.module.scss'

const Login = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user) navigate('/koti')
  }, [user, navigate])

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/koti')
    } catch (error) {
      console.error('Kirjautuminen epäonnistui:', error)
    }
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