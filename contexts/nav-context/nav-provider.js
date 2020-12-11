import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import NavContext from './nav-context'

export default function NavProvider({children}) {
    const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false)

    const toggleMobileNavbarOpen = () => {
        setMobileNavbarOpen(!mobileNavbarOpen)
    }

    const router = useRouter()

    useEffect(() => {
        if (mobileNavbarOpen) setMobileNavbarOpen(false)
    }, [router.pathname])

    return (
        <NavContext.Provider
        value= {{
            mobileNavbarOpen,
            toggleMobileNavbarOpen
        }}>
            {children}
        </NavContext.Provider>
    )
}