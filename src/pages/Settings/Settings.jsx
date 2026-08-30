import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import BottomNav from '../../components/BottomNav/BottomNav'
import styles from './Settings.module.scss'

const Settings = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const initial = user?.displayName?.charAt(0)?.toUpperCase()
    || user?.email?.charAt(0)?.toUpperCase()
    || '?'

  return (
    <div className={styles.settings}>
      <div className={styles.header}>
        <div className={styles.title}>Asetukset</div>
      </div>

      <div className={styles.body}>
        <div className={styles.profileCard}>
          {user?.photoURL ? (
            <img src={user.photoURL} alt="" className={styles.avatarImage} />
          ) : (
            <div className={styles.avatar}>{initial}</div>
          )}
          <div className={styles.profileText}>
            <div className={styles.name}>{user?.displayName || 'Käyttäjä'}</div>
            <div className={styles.email}>{user?.email}</div>
          </div>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Kirjaudu ulos
          </button>
        </div>

        <div className={styles.settingsCard}>
          <div className={`${styles.settingRow} ${styles.disabled}`}>
            <div className={styles.settingText}>
              <div className={styles.settingLabel}>
                Iltamuistutus <span className={styles.settingBadge}>(tulossa)</span>
              </div>
              <div className={styles.settingDescription}>Muistutus kirjata yö ennen nukkumaanmenoa</div>
            </div>
            <div className={styles.toggle}>
              <div className={styles.toggleKnob}></div>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.sectionLabel}>Sovellus</div>
          <div className={styles.appInfo}>Unipäiväkirja · versio 1.0</div>
        </div>
      </div>

      <BottomNav active="asetukset" />
    </div>
  )
}

export default Settings