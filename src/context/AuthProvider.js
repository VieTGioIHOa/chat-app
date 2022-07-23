import React from "react";

import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import Loading from '../components/Loading'

export const auth = getAuth();
export const AuthContext = React.createContext()

function AuthProvider({ children }) {
    const [user, setUser] = React.useState({})
    const [isLoading, setLoading] = React.useState(true)
    const navigate = useNavigate()

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, email, uid, photoURL } = user
                setUser({
                    displayName, email, uid, photoURL
                })
                setLoading(false)
                navigate('/')
            } else {
                setLoading(false)
                navigate('/login')
            }
        })

        //clean func
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={user}>
            {isLoading ? <Loading /> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider