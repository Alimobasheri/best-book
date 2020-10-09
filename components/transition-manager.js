import {useContext, useEffect, useRef} from 'react'
//const {useLocation} = ReactRouterDOM

import MainContext from '../contexts/main-context'

export default function TransitionManager ({getAppBodyWrapperRef, children}) {
	const mainContext = useContext(MainContext)
	
	//const location = useLocation()
	
	const loaded = mainContext.allIsLoaded()
	
	const message = ""
	
	const mockupStyle = {
		position: 'absolute', 
		top: mainContext.navHeight+'px', 
		left: 0, 
		width: '100vw', 
		height: '100vh', 
		backgroundColor: mainContext.theme.secondaryBackgroundColor, 
		transform: 'translateX(-100%)', 
		zIndex: 2,
	}
	
	const createBookPreviewMockUp = () => {
		return (
			`<div dir="rtl" class="list" style="background-color: rgb(255, 255, 255);"><h1 class="list__title" style="color: rgb(46, 65, 78);"></h1><div class="list__wrapper list__wrapper__column webkit-scroll"><div class="list__card__column"><div dir="ltr" class="book-close-btn__wrapper"><button class="close-btn toggled"><span class="close-btn__top-line" style="background-color: rgb(46, 65, 78);"></span><span class="close-btn__bottom-line" style="background-color: rgb(46, 65, 78);"></span></button></div><div class="book-card__wrapper column"><div class="book-card__cover" style="background-color: ${mainContext.primaryBackgroundColor}; border-color: rgb(247, 249, 250);"></div><div class="book-card__text"><div><a href="#" style="text-decoration: none; color: rgb(46, 65, 78);"><div class="book-card__name" style="background-color: rgb(46, 65, 78); width: 30vw; height: 5vw; margin: 3vw; flex-grow: 2"></div></a><div class="book-card__writer" style="background-color: rgb(181, 181, 181); width: 30vw; height: 5vw; margin-bottom: 3vw"></div></div><div><div class="btn btn--outline "><button class="btn__button" style="background-color: transparent; color: rgb(46, 65, 78); border: 0.3vw solid rgb(46, 65, 78); border-top-left-radius: 1vw; border-top-right-radius: 1vw; border-bottom-right-radius: 1vw; border-bottom-left-radius: 1vw;">تومان</button></div></div></div><div class="desc-comments__wrapper"><div class="tab-btns__wrapper"><div><button class="tab-btn__button" style="background-color: rgb(46, 65, 78); color: rgb(248, 249, 251);">توضيحات</button><button class="tab-btn__button" style="background-color: rgb(248, 249, 251); color: rgb(46, 65, 78);">نظرات</button></div></div></div></div></div></div></div>`)
	}
	
	const _mockupRef = useRef(null)
	useEffect(() => {
		mainContext.setEndCompMockUp({
			callback: () => { 
				return new Promise((resolve, reject) => {
					_mockupRef.current.innerHTML = createBookPreviewMockUp()
					_mockupRef.current.setAttribute('class', `${_mockupRef.current.getAttribute('class')} enter`)
					setTimeout(() => {
						_mockupRef.current.style.transform = 'translateX(-100%)'
						_mockupRef.current.setAttribute('class', _mockupRef.current.className.replace(' enter', ''))
						resolve(null)
					}, 700)
				})
			}
		})
	}, [/*location.pathname*/])
	
	const brandStyle = { 
		color: mainContext.theme.primaryFontColor
	}
	
	return (
		<React.Fragment>
			{!loaded ?
				(<div dir="rtl" className="initial-transition">
					<div className="initial-transition__msg">
						<p>{message}</p>
					</div>
					<div className="initial-transition__brand">
						<h1 className="bb-typography__title initial-transition__h1" style={brandStyle}>بست بوك</h1>
						<Loader />
					</div>
					<div className="initial-transition__quote">
						<blockquote className="initial-transition__quote__text"></blockquote>
					</div>
				</div>) :
				(<React.Fragment>
					{children}
					<div ref={_mockupRef} style={mockupStyle} className="book-preview__wrapper">
					</div>
				</React.Fragment>)
			}
		</React.Fragment>
	)
}