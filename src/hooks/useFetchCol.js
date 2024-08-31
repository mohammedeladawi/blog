import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore"
import React, { useCallback, useContext, useState } from 'react'
import { FirebaseContext } from "../context/FirebaseContext"

const useFetchCol = (colName) => {

  const { db } = useContext(FirebaseContext)

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const [lastDoc, setLastDoc] = useState(null)

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const colRef = collection(db, colName)
      const q = query(colRef, orderBy('createdAt', 'desc'), limit(12))
      const res = await getDocs(q)

      const resData = res.docs.map(doc => {
        const docData = doc.data()
        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt.toDate()
        }
      })

      setData(resData)
      setLastDoc(res.docs[res.docs.length - 1])

    } catch (error) {
      setError(error.message)
    }
    setLoading(false)


  }, [])


  const getNextData = useCallback(async (lastVisible) => {
    setFetching(true)
    try {
      const colRef = collection(db, colName)
      const q = query(colRef, orderBy('createdAt', 'desc'), limit(8), startAfter(lastVisible))
      const res = await getDocs(q)

      const resData = res.docs.map(doc => {
        const docData = doc.data()
        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt.toDate()
        }
      })

      setData(data => [...data, ...resData])
      setLastDoc(res.docs[res.docs.length - 1])

    } catch (error) {
      setError(error.message)
    }
    setFetching(false)


  }, [])



  return { loading, error, data, lastDoc, fetching, getData, getNextData }
}

export default useFetchCol