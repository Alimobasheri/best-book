const {useEffect, useState} = React

const MainProvider = (props) => {
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
	
	
	const [homeLists, setHomeLists] = useState({})
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
		fetchLists().then(res => JSON.parse(res)).then(lst => setHomeLists(lst))
	}, [])
	
	const [searchMode, setSearchMode] = useState(false)
	const [searchText, setSearchText] = useState('')
	
	const [selectedBook, setSelectedBook] = useState('')
	
	const contextValue = {
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
	}
	
	return (
		<MainContext.Provider value={contextValue}>
			{props.children}
		</MainContext.Provider>
	)
}