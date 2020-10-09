import HEAD from 'next/head'

import MainContext from '../contexts/main-context'

import List from '../components/list'
import SearchBar from '../components/search-bar'

export default function Home() {
	return (
		<MainContext.Consumer>
		{context => {
			const {books, homeLists, searchText, selectedBook} = context
			
			const homeListsEls =
				homeLists.lists["HOME_LISTS"] && homeLists.lists["HOME_LISTS"].map((name, i) =>
					<List key={i} view={'row'} title={homeLists.lists[name].title} books={[...books].filter(book => homeLists.lists[name].books_ids.includes(book.id))} />
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
          <HEAD>
            <title>بست بوک | خانه</title>
          </HEAD>
					<div className='home__search-bar'><SearchBar responsive={true}/></div>
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
