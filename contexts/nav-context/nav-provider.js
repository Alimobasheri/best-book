import { useState } from 'react'
import NavContext from './nav-context'

export default function NavProvider({children}) {
    const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false)

    const toggleMobileNavbarOpen = () => {
        setMobileNavbarOpen(!mobileNavbarOpen)
    }

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