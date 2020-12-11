import {useContext, useState, useRef} from 'react'

import {useRouter} from 'next/router'
import Link from 'next/link'

import styles from './book-card.module.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTag} from '@fortawesome/free-solid-svg-icons'

import {ThemeContext} from '../../contexts/theme-context'

import Btn from '../button/'
import CloseBtn from '../close-btn'
import TabBtn from '../tab-btn'
import RatingStars from '../rating-stars'
import {toFarsiDigits} from '../utils'

export default function BookCard ({view, book, information, onClickFn, closeCallback}) {
	const {id, name, writer, translator, price, src, rating, rates} = book
	const desc = book.desc || null

	const router = useRouter()

	const {theme} = useContext(ThemeContext)
	
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
			bookCardWrapperRef.current.classList.add(styles['exit-bounce'], 'exit-bounce')
			setTimeout(() => 
				router.push({pathname: router.query.prevPath, query:{prevPath: router.pathname, redirect: 'BACKWARD'}}),
			200)
		} else {
			router.push({pathname: router.query.prevPath, query:{prevPath: router.pathname, redirect: 'BACKWARD'}})
		}
	}
	
	const transitionToBook = (e) => {
		e.preventDefault()
		if(!information) {
			bookCardWrapperRef.current.classList.add(styles['exit-bounce'], 'exit-bounce')
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
			className={`${styles['book-card']} book-card ${styles[view]} ${view} ${information && `${styles['full-width']} full-width`}`}
			ref={bookCardWrapperRef}>
				<div 
				className={`${styles['book-card__cover']} book-card__cover ${!information ? styles['fade'] : ''}`}  
				onClick={transitionToBook}>
					<span 
					className={`${styles['book-card__cover__img']} book-card__cover__img`}></span>
				</div>
				<div 
				className={`${styles["book-card__text"]} book-card__text vh-fix`}>
					<div>
						<Link 
						href={{pathname: `/book/${id}`, query: {prevPath: router.pathname, redirect: 'FORWARD'}}} 
						style={{textDecoration:'none', color: theme.primaryFontColor}}>
							<div 
							className={`${styles['book-card__name']} book-card__name bb-typography__${!information ? 'title2' : 'title'}`}
							onClick={transitionToBook}>
								{
									`${information ? 'عنوان کتاب : ' : ''}${name}`
								}
							</div>
						</Link>
						{information &&
							<div 
							className={`${styles['book-card__writer']} book-card__writer bb-typography__${!information ? 'title2' : 'title'}`}>
								{`${information ? 'نام نویسنده : ' : ''}${writer}`}
								{translator && translator != 'false' && 
									<div 
									className={`${styles['book-card__translator']} book-card__translator${!information && '--inline'} bb-typography__${!information ? 'title2' : 'title'}`}> 
									{!information ? ` \\ ${translator}` : `نام مترجم : ${translator}`}
									</div>
								}
							</div>
						}
						<RatingStars rating={parseFloat(rating)} rates={parseInt(rates)} />
					</div>
					<div>
						<Btn text={
							<React.Fragment>
								<span 
								className='price__tag-icon'>
									<FontAwesomeIcon icon={faTag} />
								</span> | 
								<span className='price__text'>{toFarsiDigits(price)} تومان</span>
							</React.Fragment>
						} 
						outline
						priceButton 
						fullWidth />
					</div>
				</div>
				{information && 
					<React.Fragment>
						<div className={`${styles['desc-comments']} desc-comments vh-fix`}>
							<div className="tab-btns__wrapper">
								<TabBtn titles={['توضيحات', 'نظرات']} onClickFn={handleTabClick} activeIdx={openTab}/>
							</div>
							{desc !== null && desc.split("\n\n").map((para, idx) => 
								<p key={idx} className={`${styles["desc-comments__desc-text"]} desc-comments__desc-text vh-fix`}>
									{para}
								</p>
							)}
						</div>
					</React.Fragment>
				}
				<style jsx>
					{`
						.book-card__cover__img {
							background-image: ${`url("/assets/${src}")`}; 
							border-color: ${theme.bookCoverBorderColor}
						}

						.book-card__name {
							color: ${theme.primaryFontColor}
						}

						.book-card__writer, .book-card__translator {
							color: ${theme.secondaryFontColor}
						}
						
						@media only screen and (min-width: 1200px) and (min-height: 300px) {
							.book-card.full-width > .book-card__cover {
								background-color: ${theme.secondaryBackgroundColor};
							}

							.book-card.column.full-width > .book-card__text {
								background-color: ${theme.secondaryBackgroundColor};
							}

							.book-card.column.full-width > .desc-comments {
								background-color: ${theme.secondaryBackgroundColor};
							}

							.desc-comments__desc-text {
								color: ${theme.primaryFontColor}
							}
						}
					`}
				</style>
			</div>
		</React.Fragment>
	)
}