import { createContext, useEffect, useState } from "react"
import { getMyDetails } from "../service/auth"

export const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: any) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {

        const token = localStorage.getItem("ACCESS_TOKEN")

        if (token) {

            setLoading(true)

            getMyDetails()
                .then((res) => {
                    if (res) {
                        setUser(res)
                    } else {
                        setUser(null)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setUser(null)
                })
                .finally(() => {
                    setLoading(false)
                })

        } else {
            setUser(null)
            setLoading(false)
        }

    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}