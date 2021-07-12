import {createContext, useState, useEffect} from "react";
import {NEXT_URL} from "@/config/index";
import {useRouter} from "next/router";

type User = {
  username: string;
  email: string;
  password: string;
}

type LoginInfo = {
  email: string;
  password: string;
}

type AuthContextType = {
  user: User;
  register: (user: User) => void;
  login: ({email:identified, password}: LoginInfo) => void;
  logout: () => void;
  error: string;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState<User>(null)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    checkUserLoggedIn()
  }, [])

  // Register user
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })

    const data = await res.json()

    console.log(data)

    if (res.ok) {
      setUser(data.user)
      router.push('/account/dashboard')
    } else {
      setError(data.message)
      setError('')
    }
  }

  // Login user
  const login = async ({email: identifier, password}) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password
      })
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/account/dashboard')
    } else {
      setError(data.message)
      setError('')
    }
  }

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    })

    if (res.ok) {
      setUser(null)
      router.push('/')
    }
  }

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`)
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
    } else {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
