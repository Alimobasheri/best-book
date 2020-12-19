import {useState, useEffect, useContext} from 'react'

import MainContext from '../contexts/main-context'
import {ThemeContext} from '../contexts/theme-context'

import BookCard from './book-card/'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLayerGroup, faPlus, faLandmark} from '@fortawesome/free-solid-svg-icons'

export default function List ({view, title, iconType, books, information, searchResult, closeCallback}) {
	const [scroll, setScroll] = useState(false)

	const mainContext = useContext(MainContext)
	const {theme} = useContext(ThemeContext)

	const SetListIcon = (iconType) => {
		switch(iconType) {
			case 'top-sale':
				return <FontAwesomeIcon icon={faLayerGroup} />
			case 'newest':
				return <FontAwesomeIcon icon={faPlus} />
			case 'history':
				return <FontAwesomeIcon icon={faLandmark} />
			default:
				return null
		}
	}
	useEffect(() => {
		if(books.length > 0) setTimeout(() => setScroll(true), 700)
	})
	return (
		<div 
		className={`list ${information && 'full-width'} ${searchResult ? 'search-result' : ''}`}>
			{title && 
				<h1 
				className="list__title bb-typography__title">
					{SetListIcon(iconType)}  {title}
				</h1>
			}
			{books && books.length > 0 ?
				<div 
				className={`list__wrapper list__wrapper__${view == 'column' ? 'column' : 'row'} ${information && 'full-width'} ${scroll ? 'webkit-scroll' : ''}`} >
					{
						books.map((book, i) =>
							<div 
							className={`list__card__${view}`} key={i}>
								<BookCard 
								view={view} 
								book={book} 
								information={information} 
								onClickFn={mainContext.setSelectedBook} 
								closeCallback={closeCallback} />
							</div>
						)
					}
				</div> :
				<h1 
				className="empty-list__text" 
				style={{color: theme.secondaryFontColor}}>
					كتابى موجود نمى باشد.
				</h1>
			}
			<style jsx>
				{`
					.list {
						background-color: transparent;
					}

					.list__title {
						color: ${theme.primaryFontColor}
					}
					@media only screen and (max-width: 767px) {
						.list__wrapper__row > .list__card__row {
							background-color: ${theme.secondaryBackgroundColor};
							border-radius: 20px;
						}
					}
					@media only screen and (min-width: 768px) {
						.list {
							background-color: ${theme.secondaryBackgroundColor}
						}
					}
					@media only screen and (min-width: 1200px) and (min-height: 300px) {
						.list.full-width {
							background-color: transparent;
						}
						.list {
							padding: 0;
						}
						.list__title {
							color: ${theme.primaryBackgroundColor};
							background-color: ${theme.primaryFontColor};
							border-top-left-radius: 20px;
							border-top-right-radius: 20px;
						}
						.list.full-width > .list__title {
							background-color: transparent;
							border-radius: 0;
						}
					}
				`}
			</style>
		</div>
	)
}