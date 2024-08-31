import { collection, getDocs, query, where } from "firebase/firestore"
import { useCallback, useContext, useState } from 'react'

import { FirebaseContext } from '../context/FirebaseContext'

const useFetchDocParam = (colname, slug) => {

  const { db } = useContext(FirebaseContext)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)


  const getData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {

      const colRef = collection(db, colname)
      const q = query(colRef, where('slug', '==', slug))
      const res = await getDocs(q)

      const resData = res.docs.map(doc => {
        const docData = doc.data()
        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt.toDate()
        }
      })

      if (resData && resData.length) {
        setData(resData[0])
      }

    } catch (error) {
      setError(error.message)
    }

    setLoading(false)

  }, [])


  return { getData, loading, error, data }
}

export default useFetchDocParam