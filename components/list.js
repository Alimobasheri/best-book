const {useState, useEffect} = React

const List = ({view, title, books, information}) => {
	const [scroll, setScroll] = useState(false)
	useEffect(() => {
		if(books.length > 0) setTimeout(() => setScroll(true), 700)
	})
	return (
		<MainContext.Consumer>
		{context =>
		<div className="list" style={{backgroundColor: context.theme.secondaryBackgroundColor}}>
			<h1 className="list__title" style={{color: context.theme.primaryFontColor}}>{title}</h1>
			{books && books.length > 0 ?
				<div className={`list__wrapper list__wrapper__${view == 'column' ? 'column' : 'row'} ${scroll ? 'webkit-scroll' : ''}`} >
					{
						books.map((book, i) =>
							<div className={`list__card__${view}`} key={i}>
								<BookCard view={view} book={book} information={information} onClickFn={context.setSelectedBook} />
							</div>
						)
					}
				</div> :
				<h1 className="empty-list__text" style={{color: context.theme.secondaryFontColor}}>كتابى موجود نمى باشد.</h1>
			}
		</div>
		}
		</MainContext.Consumer>
	)
}