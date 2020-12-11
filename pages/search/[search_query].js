import {useContext} from 'react'
import {useRouter} from 'next/router'

import MainContext from '../../contexts/main-context'

import List from '../../components/list'

export default function Search() {
    const mainContext = useContext(MainContext)
    const {searchText, books} = mainContext

    const router = useRouter()
    const {search_query} = router.query
    return (
        <div className='search-page__wrapper'>
            {search_query && search_query !== '' ?
                <List 
                view={'column'}
                title={`نتایج جستجو برای '${searchText}'`}
                className="results-list"
                books={[...books].filter(book => 
                    book.name.includes(search_query) || book.writer.includes(search_query) || book.translator.includes(search_query)
                )} /> :

                <List
                view='column'
                title='نتایج جستجو'
                className='results-list'
                books={[]}/>
            }
            <style jsx>{`
                .search-page__wrapper {
                    padding: 2.5vw 2vw;
                }
            `}</style>
        </div>
    )
}