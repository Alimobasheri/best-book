import MainContext from './main-context'
import auth from '../components/identity'

import {useEffect, useState} from 'react'

const MainProvider = (props) => {
	const [signInField, setSignInField] = useState({email: '', password: ''})

	const currentUser = auth.currentUser()

	const signUp = (email, password) => {
		return auth.signup(email, password)
	}

	const signIn = () => {
		return auth.login(signInField.email, signInField.password)
	}

    const theme = {
		light: {
			primaryBackgroundColor: "#F8F9FB",
			secondaryBackgroundColor: "#FFFFFF",
			primaryFontColor: "#2E414E",
			secondaryFontColor: "#B5B5B5",
			bookCoverBorderColor: "#F7F9FA"
		},
		dark: {
			primaryBackgroundColor: "#1F1F1F",
			secondaryBackgroundColor: "#4A4A4A",
			primaryFontColor: "#F7F9FA",
			secondaryFontColor: "#B4B4B4",
			bookCoverBorderColor: "#6A6A6A"
		}
	}

	const [data, setData] = useState({books: [], isFetching: true})
	useEffect(() => {
		const fetchBooks = () => { return new Promise((resolve, reject) => {
			const xhttp = new XMLHttpRequest()
			xhttp.open('GET', './data/books.json')
			xhttp.onload = () => {
				resolve(xhttp.responseText)
			}
			xhttp.send()
		})
		}
		fetchBooks().then(res => JSON.parse(res)).then(lst => setData({books: lst, isFetching: false}))
	}, [])
	
	const [themeMode, setThemeMode] = useState(false)
	
	
	const [homeLists, setHomeLists] = useState({lists: {}, isFetching: true})
	useEffect(() => {
		const fetchLists = () => { return new Promise((resolve, reject) => {
			const xhttp = new XMLHttpRequest()
			xhttp.open('GET', './data/home-lists.json')
			xhttp.onload = () => {
				resolve(xhttp.responseText)
			}
			xhttp.send()
		})
		}
		fetchLists().then(res => JSON.parse(res)).then(lst => setHomeLists({lists: lst, isFetching: false}))
	}, [])
	
	const [searchMode, setSearchMode] = useState(false)
	const [searchText, setSearchText] = useState('')
	
	const [selectedBook, setSelectedBook] = useState('')
	
	const [navHeight, setNavHeight] = useState(0)
	
	const [currentScroll, setCurrentScroll] = useState(0)
	const [prevScroll, setPrevScroll] = useState([0])
	
	const [endCompMockUp, setEndCompMockUp] = useState('')
	
	const contextValue = {
		signInField,
		setSignInField,
		currentUser,
		signUp,
		signIn,
		allIsLoaded: () => {return !data.isFetching},
		books: data.books,
		homeLists,
		themeMode, 
		setThemeMode, 
		theme: theme[themeMode ? "dark" : "light"],
		searchMode,
		setSearchMode,
		searchText,
		setSearchText,
		selectedBook,
		setSelectedBook,
		navHeight,
		setNavHeight,
		getCurrentScroll: () => {return currentScroll},
		setCurrentScroll,
		prevScroll,
		setPrevScroll,
		endCompMockUp,
		setEndCompMockUp
	}
	
	return (
		<MainContext.Provider value={contextValue}>
			{props.children}
		</MainContext.Provider>
	)
}

export default MainProvider