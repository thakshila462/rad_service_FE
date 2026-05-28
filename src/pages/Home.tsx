import React, { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"

const Home = () => {
  const [item, setItem] = useState([])
  // const { user ,setUser, loading } = useAuth()

  const fetchAllItem = async () => {
    const res: any = await fetch("")
    // axios
    setItem(res.data)
  }

  useEffect(() => {
    fetchAllItem()
  }, [])

  return <div>Home page components</div>
}

export default Home
