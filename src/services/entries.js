import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const entriesRef = (uid) => collection(db, 'users', uid, 'entries')
const entryDoc = (uid, entryId) => doc(db, 'users', uid, 'entries', entryId)

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

export const updateEntry = (uid, entryId, entry) => {
  return updateDoc(entryDoc(uid, entryId), {
    ...entry,
    updatedAt: serverTimestamp(),
  })
}

export const deleteEntry = (uid, entryId) => {
  return deleteDoc(entryDoc(uid, entryId))
}