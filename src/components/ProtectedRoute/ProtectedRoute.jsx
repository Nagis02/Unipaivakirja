import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './ProtectedRoute.module.scss'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className={styles.loading}>Ladataan…</div>
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute