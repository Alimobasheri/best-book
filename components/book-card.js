const {useContext, useState} = React
const {useHistory, useLocation} = ReactRouterDOM

const BookCard = ({view, book, information, onClickFn}) => {
	const {id, name, writer, translator, price, src} = book
	const desc = book.desc || null
	
	var history = useHistory()
	const location = useLocation()
	
	const context = useContext(MainContext)
	
	const [openTab, setOpenTab] = useState(0)
	
	const bookInformation =
		<React.Fragment>
			<p>{desc}</p>
		</React.Fragment>
		
	const handleClick = (e) => {
		e.preventDefault()
		onClickFn(id)
	}
	
	const unClick = (e) => {
		e.preventDefault()
		onClickFn('')
	}
	
	const redirectToBookPage = (e) => {
		e.preventDefault()
		history.push({pathname: `/book/${id}`, state:{prevPath: location.pathname}})
	}
	
	const goToPrevPath = (e) => {
		e.preventDefault()
		history.push({pathname: location.state.prevPath, state:{prevPath: location.pathname}})
	}
	
	const handleTabClick = (idx) => setOpenTab(idx)
	
	return (
		<div className={`book-card__wrapper ${view}`}>
			<div className="book-card__cover" style={{backgroundImage: `url("assets/${src}")`, borderColor: context.theme.bookCoverBorderColor}} onClick={redirectToBookPage}>
			</div>
			<div className="book-card__text">
				<div>
					<div className="book-card__name" style={{color: context.theme.primaryFontColor}}>{name}</div>
					<div className="book-card__writer" style={{color: context.theme.secondaryFontColor}}>{writer}{translator && translator != 'false' && <span className="book-card__translator" style={{color: context.theme.secondaryFontColor}}> \ {translator}</span>}</div>
				</div>
				<div>
					<Btn text={`${toFarsiDigits(price)} تومان`} outline />
				</div>
			</div>
			{information && 
				<React.Fragment>
					<div className="book-close-btn__wrapper">
						<CloseBtn toggled onClickFn={goToPrevPath} />
					</div>
					<div className="desc-comments__wrapper">
						<div className="tab-btns__wrapper">
							<TabBtn titles={['توضيحات', 'نظرات']} onClickFn={handleTabClick} activeIdx={openTab}/>
						</div>
						{desc !== null && desc.split("\n\n").map((para, idx) => 
							<p key={idx} className="desc-comments__wrapper__desc__text" style={{color: context.theme.primaryFontColor}}>
								{para}
							</p>
						)}
					</div>
				</React.Fragment>
			}
		</div>
	)
}