import {useState, useEffect, useContext, useRef} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
//import {useLocation, Link}  ReactRouterDOM

import MainContext from '../contexts/main-context'
import HamburgerButton from '../components/hamburger-button'
import Btn from '../components/btn'
import ThemeSwitch from '../components/theme-switch'
import SearchBar from './search-bar'

export default function Nav(){
	const [toggled, setToggled] = useState(false)
	
	const mainContext = useContext(MainContext)
	const router = useRouter()

	const navSearchBarRef = useRef(null)
	//const location = useLocation()
	
	let _navWrapper = useRef(null)
	const changeNavHeight = () => {
		console.log(`navWrapper: ${_navWrapper.current}`)
		mainContext
			.setNavHeight(
				window
					.getComputedStyle(_navWrapper.current, null)
					.getPropertyValue('height')
					.split('px')[0]
			)
	}
	
	useEffect(() => changeNavHeight(), [])
	useEffect(() => window.addEventListener('resize', changeNavHeight, false), [])
	useEffect(() => {
		if(toggled) {
			setToggled(false)
		}
	}, [router.pathname])

	return(
		<div 
		dir="rtl" 
		className={`nav ${toggled ? 'toggled' : ''}`} 
		style={{backgroundColor: mainContext.theme.primaryBackgroundColor}} 
		ref={_navWrapper}>
			<div 
			className="nav__wrapper">
				<Link 
				href="/" 
				style={{textDecoration: 'none'}}>
					<div 
					className="nav-brand__wrapper">
						<h1 
						className="nav-brand__h1 bb-typography__header" 
						style={{color: mainContext.theme.primaryFontColor}}>
							بست بوك
						</h1>
					</div>
				</Link>
				<div 
				className="nav-hamburger">
					<HamburgerButton 
					lineColor={mainContext.theme.primaryFontColor} 
					toggled={toggled} 
					toggle={setToggled}/>
				</div>
			</div>
			<div 
			className={`nav-items__wrapper ${toggled ? 'toggled' : ''}`}>
				<div 
				className='nav__searchBar'>
					<SearchBar/>
				</div>
				{mainContext.currentUser}
				<div>
					<Link 
					href="/" 
					style={{textDecoration: 'none'}}>
						<span 
						className={`link-item ${router.pathname === '/' && 'active'} bb-typography__nav-link`} 
						style={{
							color: mainContext.theme.primaryFontColor, 
							borderBottomColor: mainContext.theme.primaryFontColor
						}}>
							کتابگردی
						</span>
					</Link>
				</div>
				<div>
					<Link 
					href="/about-us" 
					style={{textDecoration: 'none'}}>
						<span 
						className={`link-item ${router.pathname === '/about-us' && 'active'} bb-typography__nav-link`} 
						style={{
							color: mainContext.theme.primaryFontColor, 
							borderBottomColor: mainContext.theme.primaryFontColor
						}}>
							درباره
						</span>
					</Link>
				</div>
				{/*{!mainContext.authentication().authenticated ? */}
					{/*(*/}<React.Fragment>
						<Link href="/login" style={{textDecoration: 'none'}}><Btn text='ورود' navButton outline/></Link>
						<Link href="/signup" style={{textDecoration: 'none'}}><Btn text='عضويت' navButton /></Link>
					</React.Fragment>{/*) :*/}
					{/*<React.Fragment>
						<Link href="/logout" style={{textDecoration: 'none'}}><Btn text='خروج' navButton outline/></Link>
					</React.Fragment>
				{/*}*/}
				<ThemeSwitch />
			</div>
			<style jsx>{`
				@media only screen and (min-width: 1200px) {
					.link-item.active {
						background-color: ${mainContext.theme.secondaryBackgroundColor};
						border-bottom: 0px;
						transition: background-color 0.3s ease;
						box-shadow: 0px 0px 1px rgba(8, 9, 10, 0.2),
									1px 1px 2px rgba(8, 9, 10, 0.1);
					}
				}
			`}</style>
		</div>
	)
}