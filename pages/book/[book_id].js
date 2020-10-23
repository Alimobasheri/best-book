import {useContext, useRef} from 'react'
import {useRouter} from 'next/router'

import Head from 'next/head'

import MainContext from '../../contexts/main-context'

import List from '../../components/list'

export default function BookPreview () {
    const mainContext = useContext(MainContext)

    const router = useRouter()
	const {book_id} = router.query
	
	const {books} = mainContext
	
	const _wrapperRef = useRef(null)
	const slideOut = () => { 
		return new Promise((resolve, reject) => {
			_wrapperRef.current.setAttribute('class', `book-preview__wrapper exit`)
			setTimeout(() => {resolve(null)}, 700)
		})
	}
	
	const bookPreview = 
		<List view={'column'} title={''} books={[...books].filter(book => book.id == book_id)} information closeCallback={slideOut} />
	return (
		<React.Fragment>
			<Head>
				<title>بست بوک | {books.filter(book => book.id == book_id)[0].name}</title>
			</Head>
			<div ref={_wrapperRef} dir="rtl" className="book-preview__wrapper" >
				{bookPreview}
			</div>
		</React.Fragment>
	)
}