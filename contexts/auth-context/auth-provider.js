import { useState, useEffect } from 'react'

import AuthContext from './auth-context'

import auth from '../../netlify-authentiction/identity'

export default function AuthProvider({children}) {
    const [signInField, setSignInField] = useState({email: '', password: ''})

	const [user, setUser] = useState(null)

	const signUp = (email, password) => {
		return auth.signup(email, password)
	}

	const signIn = () => {
		return auth.login(signInField.email, signInField.password)
	}

	const signOut = () => {
		const user = auth.currentUser()
		return user.logout()
	}

	const confirmEmail = token => {
		return auth.confirm(token, false)
    }

    const findUserProfile = email => {
        return new Promise(async (resolve, reject) => {
            await fetch(`/api/users?email=${email}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    }
    
    useEffect(() => {
		setUser(typeof window !== 'undefined' && auth.currentUser()) 
    })
    
    return (
        <AuthContext.Provider
        value={{
            signInField,
            setSignInField,
            user,
            signUp,
            signIn,
            signOut,
            confirmEmail,
            findUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}