import api from "./api"

// REGISTER
export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await api.post("/auth/register", {
    name,
    email,
    password
  })

  return res.data
}

// LOGIN (FIXED)
export const login = async (
  email: string,
  password: string
) => {
  const res = await api.post("/auth/login", {
    email,
    password
  })

  // ✅ backend structure: res.data.data.accessToken
  const token = res?.data?.data?.accessToken

  if (!token) {
    throw new Error("Access token not found in response")
  }

  localStorage.setItem("token", token)

  return res.data
}

// GET CURRENT USER
export const getMyDetails = async () => {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("No token found. Please login first.")
  }

  const res = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.data
}