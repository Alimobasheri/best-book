import { useState } from 'react'
import ThemeContext from './theme-context'

export default function ThemeProvider({children}) {
    const [darkMode, setDarkMode] = useState(false)

    const lightTheme = {
        primaryBackgroundColor: "#F8F9FB",
		secondaryBackgroundColor: "#FFFFFF",
		primaryFontColor: "#2E414E",
		secondaryFontColor: "#B5B5B5",
		bookCoverBorderColor: "#F7F9FA"
    }

    const darkTheme = {
        primaryBackgroundColor: "#1F1F1F",
		secondaryBackgroundColor: "#4A4A4A",
		primaryFontColor: "#F7F9FA",
		secondaryFontColor: "#B4B4B4",
		bookCoverBorderColor: "#6A6A6A"
    }

    const theme = {
        darkMode,
        setDarkMode,
        themeMode: darkMode ? 'dark' : 'light',
        theme: darkMode ? darkTheme : lightTheme
    }
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}