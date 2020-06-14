const {useContext, useState, useRef} = React
const {useHistory, useLocation, Link} = ReactRouterDOM

const BookCard = ({view, book, information, onClickFn, closeCallback}) => {
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
	
	const redirectToBookPage = () => {
		history.push({pathname: `/book/${id}`, state:{prevPath: location.pathname, redirect: 'FORWARD'}})
	}
	
	const goToPrevPath = (e) => {
		e.preventDefault()
		if (closeCallback !== undefined) {
			closeCallback().then(res => {
				history.push({pathname: location.state.prevPath, state:{prevPath: location.pathname, redirect: 'BACKWARD'}})
			})
		} else {
			history.push({pathname: location.state.prevPath, state:{prevPath: location.pathname, redirect: 'BACKWARD'}})
		}
	}
	
	const transitionToBook = (e) => {
		e.preventDefault()
		if(!information) {
			context.endCompMockUp.callback().then(res => {
				redirectToBookPage()
			})
		}
	}
	
	const handleTabClick = (idx) => setOpenTab(idx)
	
	return (
		<React.Fragment>
			{information && location.state !== undefined && location.state.prevPath !== undefined && location.state.redirect !== undefined &&
				<div dir='ltr' className="book-close-btn__wrapper">
					<CloseBtn toggled onClickFn={goToPrevPath} />
				</div>
			}
		<div className={`book-card__wrapper ${view}`}>
			<div className={`book-card__cover ${!information ? 'fade' : ''}`} style={{backgroundImage: `url("assets/${src}")`, borderColor: context.theme.bookCoverBorderColor}} onClick={transitionToBook}>
			</div>
			<div className="book-card__text">
				<div>
					<Link to={{pathname: `/book/${id}`, state: {prevPath: location.pathname, redirect: 'FORWARD'}}} style={{textDecoration:'none', color: context.theme.primaryFontColor}}><div className="book-card__name" style={{color: context.theme.primaryFontColor}} onClick={transitionToBook}>{name}</div></Link>
					<div className="book-card__writer" style={{color: context.theme.secondaryFontColor}}>{writer}{translator && translator != 'false' && <span className="book-card__translator" style={{color: context.theme.secondaryFontColor}}> \ {translator}</span>}</div>
				</div>
				<div>
					<Btn text={`${toFarsiDigits(price)} ØªÙˆÙ…Ø§Ù†`} outline />
				</div>
			</div>
			{information && 
				<React.Fragment>
					<div className="desc-comments__wrapper">
						<div className="tab-btns__wrapper">
							<TabBtn titles={['ØªÙˆØ¶ÙŠØ­Ø§Øª', 'Ù†Ø¸Ø±Ø§Øª']} onClickFn={handleTabClick} activeIdx={openTab}/>
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
		</React.Fragment>
	)
}
