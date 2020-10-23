import {useContext, useState, useRef} from 'react'
//const {useHistory, useLocation, Link} = ReactRouterDOM
import {useRouter} from 'next/router'
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

	const router = useRouter()

	const context = useContext(MainContext)
	
	const [openTab, setOpenTab] = useState(0)

	const bookCardWrapperRef = useRef(null)
	
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
		router.push({pathname: `/book/${id}`, query:{prevPath: location.pathname, redirect: 'FORWARD'}})
	}
	
	const goToPrevPath = (e) => {
		e.preventDefault()
		if (information) {
			//closeCallback().then(res => {
			bookCardWrapperRef.current.classList.add('exit-bounce')
			setTimeout(() => 
				router.push({pathname: router.query.prevPath, query:{prevPath: router.pathname, redirect: 'BACKWARD'}}),
			200)
			//})
		} else {
			router.push({pathname: router.query.prevPath, query:{prevPath: router.pathname, redirect: 'BACKWARD'}})
		}
	}
	
	const transitionToBook = (e) => {
		e.preventDefault()
		if(!information) {
			bookCardWrapperRef.current.classList.add('exit-bounce')
			setTimeout(redirectToBookPage, 100)
		}
	}
	
	const handleTabClick = (idx) => setOpenTab(idx)
	
	return (
		<React.Fragment>
			{information && router.query !== undefined && router.query.prevPath !== undefined && router.query.redirect !== undefined &&
				<div 
				dir='ltr' 
				className="book-close-btn__wrapper">
					<CloseBtn 
					toggled 
					onClickFn={goToPrevPath} />
				</div>
			}
		<div 
		className={`book-card__wrapper ${view} ${information && 'full-width'}`}
		ref={bookCardWrapperRef}>
			<div 
			className={`book-card__cover ${!information ? 'fade' : ''}`}  
			onClick={transitionToBook}>
				<span className='book-card__cover__img' style={{
				backgroundImage: `url("/assets/${src}")`, 
				borderColor: context.theme.bookCoverBorderColor}}></span>
			</div>
			<div 
			className="book-card__text">
				<div>
					<Link 
					href={{pathname: `/book/${id}`, query: {prevPath: router.pathname, redirect: 'FORWARD'}}} style={{textDecoration:'none', color: context.theme.primaryFontColor}}><div className="book-card__name bb-typography__title2" style={{color: context.theme.primaryFontColor}} onClick={transitionToBook}>{name}</div></Link>
					{information &&
						<div className="book-card__writer bb-typography__title2" style={{color: context.theme.secondaryFontColor}}>{writer}{translator && translator != 'false' && <span className="book-card__translator bb-typography__title2" style={{color: context.theme.secondaryFontColor}}> \ {translator}</span>}</div>
					}
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
			<style jsx>
				{`
					@media only screen and (min-width: 1200px) and (min-height: 300px) {
						.book-card__wrapper.full-width > .book-card__cover {
							background-color: ${context.theme.secondaryBackgroundColor};
						}

						.book-card__wrapper.column.full-width > .book-card__text {
							background-color: ${context.theme.secondaryBackgroundColor};
						}

						.book-card__wrapper.column.full-width > .desc-comments__wrapper {
							background-color: ${context.theme.secondaryBackgroundColor};
						}
					}
				`}
			</style>
		</div>
		</React.Fragment>
	)
}