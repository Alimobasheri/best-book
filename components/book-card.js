import {useContext, useState, useRef} from 'react'
//const {useHistory, useLocation, Link} = ReactRouterDOM
import Link from 'next/link'

import MainContext from '../contexts/main-context'
import Btn from './btn'
import CloseBtn from './close-btn'
import TabBtn from './tab-btn'
import RatingStars from './rating-stars'
import {toFarsiDigits} from './utils'

export default function BookCard ({view, book, information, onClickFn, closeCallback}) {
	const {id, name, writer, translator, price, src, rating, rates} = book
	const desc = book.desc || null
	
	//var history = useHistory()
	//const location = useLocation()

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
			<div className={`book-card__cover ${!information ? 'fade' : ''}`} style={{backgroundImage: `url("./assets/${src}")`, borderColor: context.theme.bookCoverBorderColor}} onClick={transitionToBook}>
			</div>
			<div className="book-card__text">
				<div>
					<Link href={{pathname: `/book/${id}`, state: {prevPath: location.pathname, redirect: 'FORWARD'}}} style={{textDecoration:'none', color: context.theme.primaryFontColor}}><div className="book-card__name bb-typography__title2" style={{color: context.theme.primaryFontColor}} onClick={transitionToBook}>{name}</div></Link>
					<div className="book-card__writer bb-typography__title2" style={{color: context.theme.secondaryFontColor}}>{writer}{translator && translator != 'false' && <span className="book-card__translator bb-typography__title2" style={{color: context.theme.secondaryFontColor}}> \ {translator}</span>}</div>
					<RatingStars rating={parseFloat(rating)} rates={parseInt(rates)} />
				</div>
				<div>
					<Btn text={`${toFarsiDigits(price)} تومان`} outline fullWidth={view === 'row'} />
				</div>
			</div>
			{information && 
				<React.Fragment>
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
		</React.Fragment>
	)
}