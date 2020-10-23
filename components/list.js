import {useState, useEffect} from 'react'

import MainContext from '../contexts/main-context'
import BookCard from './book-card'

export default function List ({view, title, books, information, closeCallback}) {
	const [scroll, setScroll] = useState(false)
	useEffect(() => {
		if(books.length > 0) setTimeout(() => setScroll(true), 700)
	})
	return (
		<MainContext.Consumer>
		{context =>
		<div className={`list ${information && 'full-width'}`}>
			<h1 className="list__title bb-typography__title" style={{color: context.theme.primaryFontColor}}>{title}</h1>
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
					@media only screen and (min-width: 768px) {
						.list {
							background-color: ${context.theme.secondaryBackgroundColor}
						}
					}
					@media only screen and (min-width: 1200px) and (min-height: 300px) {
						.list.full-width {
							background-color: transparent;
						}
					}
				`}
			</style>
		</div>
		}
		</MainContext.Consumer>
	)
}