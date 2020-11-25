import {useState, useEffect, useContext, useRef} from 'react'

import Link from 'next/link'
import {useRouter} from 'next/router'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookReader, faAddressCard, faSignInAlt, faUserPlus} from '@fortawesome/free-solid-svg-icons'

import MainContext from '../contexts/main-context'
import { NavContext } from '../contexts/nav-context'
import { AuthContext } from '../contexts/auth-context'

import HamburgerButton from '../components/hamburger-button'
import Btn from '../components/btn'
import ThemeSwitch from './theme-switch/index'
import SearchBar from './search-bar'

export default function Nav(){
	const [toggled, setToggled] = useState(false)
	
	const mainContext = useContext(MainContext)
	const {mobileNavbarOpen, toggleMobileNavbarOpen} = useContext(NavContext)
	const authContext = useContext(AuthContext)

	const router = useRouter()

	const toggleMobileNavbar = () => {
		console.log(typeof toggleMobileNavbarOpen)
		toggleMobileNavbarOpen()
	}

	const navSearchBarRef = useRef(null)
	
	let _navWrapper = useRef(null)
	const changeNavHeight = () => {
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
					toggled={mobileNavbarOpen} 
					toggle={toggleMobileNavbar}/>
				</div>
			</div>
			<div 
			className={`nav-items__wrapper ${toggled ? 'toggled' : ''}`}>
				<div 
				className='nav__searchBar'>
					<SearchBar/>
				</div>
				<div>
					<Link 
					href="/" 
					style={{textDecoration: 'none', minWidth:'100%'}}>
						<span 
						className={`link-item ${router.pathname === '/' && 'active'} bb-typography__nav-link`} 
						style={{
							color: mainContext.theme.primaryFontColor, 
							borderBottomColor: mainContext.theme.primaryFontColor
						}}>
							کتابگردی <FontAwesomeIcon icon={faBookReader} />
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
							درباره <FontAwesomeIcon icon={faAddressCard} />
						</span>
					</Link>
				</div>
				{authContext.user === null ?
					(<React.Fragment>
						<Link href="/login" passHref>
							<Btn 
							text={
								<React.Fragment>
									ورود <FontAwesomeIcon icon={faSignInAlt} />
								</React.Fragment>
							}
							navButton
							fullWidth 
							outline/>
						</Link>
						<Link href="/signup" passHref>
							<Btn 
							text={
								<React.Fragment>
									عضویت <FontAwesomeIcon icon={faUserPlus} />
								</React.Fragment>
							} 
							navButton
							fullWidth />
						</Link>
					</React.Fragment>) :
					(<React.Fragment>
						<Link href="/logout" passHref>
							<Btn text='خروج' navButton outline fullWidth/>
						</Link>
					</React.Fragment>)
			}
				<div
				className="theme-switch__Wrapper">
					<ThemeSwitch />
				</div>
			</div>
			<style jsx>{`
				.nav {
					background-color: ${mainContext.theme.primaryBackgroundColor}
				}

				@media only screen and (min-width: 1200px) {
					.nav {
						background-color: ${mainContext.theme.secondaryBackgroundColor};
						box-shadow: -5px 0px 10px rgba(30, 30, 30, 0.1);
						z-index: 6;
					}
					.link-item.active {
						background-color: ${mainContext.theme.primaryBackgroundColor};
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