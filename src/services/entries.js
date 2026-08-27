import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const entriesRef = (uid) => collection(db, 'users', uid, 'entries')

export const subscribeToEntries = (uid, callback) => {
  const q = query(entriesRef(uid), orderBy('date', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const entries = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    callback(entries)
  })
}

export const addEntry = (uid, entry) => {
  return addDoc(entriesRef(uid), {
    ...entry,
    createdAt: serverTimestamp(),
  })
}