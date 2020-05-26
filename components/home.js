const {useState, useEffect} = React

const Home = (props) => {
	return (
		<MainContext.Consumer>
		{context => {
			const {books, homeLists, searchText, selectedBook} = context
			
			const homeListsEls =
				homeLists["HOME_LISTS"] && homeLists["HOME_LISTS"].map((name, i) =>
					<List key={i} view={'row'} title={homeLists[name].title} books={[...books].filter(book => homeLists[name].books_ids.includes(book.id))} />
				)
			
			const homePage = 
				selectedBook != '' ?
					<List view={'column'} title={''} books={[...books].filter(book => book.id == selectedBook)} information /> :
					homeListsEls
			
			const resultsList = searchText == '' ? 
				[] : 
				<List view={'column'} className="results-list" books={[...books].filter(book => book.name.includes(searchText) || book.writer.includes(searchText) || book.translator.includes(searchText))} />
			return(
				<div dir="rtl" className='home__wrapper'>
					<SearchBar />
					{searchText == '' ? 
						homePage : 
						resultsList
					}
				</div>
			)
		}
		}
		</MainContext.Consumer>
	)
}