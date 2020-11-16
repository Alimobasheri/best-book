import {useState, useEffect} from 'react'

import MainContext from '../contexts/main-context'
import BookCard from './book-card'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLayerGroup, faPlus, faLandmark} from '@fortawesome/free-solid-svg-icons'

export default function List ({view, title, iconType, books, information, closeCallback}) {
	const [scroll, setScroll] = useState(false)

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
		<MainContext.Consumer>
		{context =>
		<div className={`list ${information && 'full-width'}`}>
			<h1 className="list__title bb-typography__title">
				{SetListIcon(iconType)}  {title}
			</h1>
			{books && books.length > 0 ?
				<div className={`list__wrapper list__wrapper__${view == 'column' ? 'column' : 'row'} ${information && 'full-width'} ${scroll ? 'webkit-scroll' : ''}`} >
					{
						books.map((book, i) =>
							<div className={`list__card__${view}`} key={i}>
								<BookCard view={view} book={book} information={information} onClickFn={context.setSelectedBook} closeCallback={closeCallback} />
							</div>
						)
					}
				</div> :
				<h1 className="empty-list__text" style={{color: context.theme.secondaryFontColor}}>كتابى موجود نمى باشد.</h1>
			}
			<style jsx>
				{`
					.list {
						background-color: transparent;
					}

					.list__title {
						color: ${context.theme.primaryFontColor}
					}
					@media only screen and (min-width: 768px) {
						.list {
							background-color: ${context.theme.secondaryBackgroundColor}
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
							color: ${context.theme.primaryBackgroundColor};
							background-color: ${context.theme.primaryFontColor};
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
		}
		</MainContext.Consumer>
	)
}