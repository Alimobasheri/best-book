import {useState, useEffect, useContext, useRef} from 'react'

import Link from 'next/link'
import {useRouter} from 'next/router'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookReader, faAddressCard, faSignInAlt, faUserPlus, faThLarge} from '@fortawesome/free-solid-svg-icons'

import styles from './nav.module.css'

import MainContext from '../../contexts/main-context'
import { NavContext } from '../../contexts/nav-context'
import { ThemeContext } from '../../contexts/theme-context'
import { AuthContext } from '../../contexts/auth-context'

import HamburgerButton from '../hamburger-button'
import Btn from '../button/'
import ThemeSwitch from '../theme-switch/'
import SearchBar from '../search-bar'

export default function Nav(){
	const [toggled, setToggled] = useState(false)
	
	const mainContext = useContext(MainContext)
	const {mobileNavbarOpen, toggleMobileNavbarOpen} = useContext(NavContext)
	const authContext = useContext(AuthContext)

	const {theme} = useContext(ThemeContext)

	const router = useRouter()

	const toggleMobileNavbar = () => {
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
		className={`${styles.nav} ${toggled ? styles.toggled : ''} nav vh-fix`}  
		ref={_navWrapper}>
			<div 
			className={styles['brand-logo']+' vh-fix'}>
				<Link 
				href="/" 
				style={{textDecoration: 'none'}}>
					<div 
					className={styles["nav-brand"]}>
						<h1 
						className={`${styles["nav-brand__h1"]} nav-brand__h1 bb-typography__header`}>
							بست بوك
						</h1>
					</div>
				</Link>
				<div 
				className={styles['nav-hamburger']}>
					<HamburgerButton 
					lineColor={theme.primaryFontColor} 
					toggled={mobileNavbarOpen} 
					toggle={toggleMobileNavbar}/>
				</div>
			</div>
			<div 
			className={`${styles['nav-items']} ${toggled ? styles['toggled'] : ''} vh-fix`}>
				<div 
				className={styles['search-bar']+' vh-fix'}>
					<SearchBar/>
				</div>
				<div>
					<Link 
					href="/" 
					style={{textDecoration: 'none', minWidth:'100%'}}>
						<span 
						className={`${styles['link-item']} link-item ${router.pathname === '/' && `${styles['active']} active`} bb-typography__nav-link vh-fix`}>
							<FontAwesomeIcon icon={faBookReader} /> کتابگردی
						</span>
					</Link>
				</div>
				<div>
					<Link 
					href="/categories" 
					style={{textDecoration: 'none', minWidth:'100%'}}>
						<span 
						className={`${styles['link-item']} link-item ${router.pathname === '/categories' && `${styles['active']} active`} bb-typography__nav-link vh-fix`}>
							<FontAwesomeIcon icon={faThLarge} /> دسته بندیها
						</span>
					</Link>
				</div>
				<div>
					<Link 
					href="/about-us" 
					style={{textDecoration: 'none'}}>
						<span 
						className={`${styles['link-item']} link-item ${router.pathname === '/about-us' && `${styles['active']} active`} bb-typography__nav-link vh-fix`} >
							<FontAwesomeIcon icon={faAddressCard} /> درباره
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
				className={styles['theme-switch']}>
					<ThemeSwitch />
				</div>
			</div>
			<style jsx>{`
				.nav {
					background-color: ${theme.primaryBackgroundColor}
				}

				.nav-brand__h1 {
					color: ${theme.primaryFontColor};
				}

				.link-item {
					color: ${theme.primaryFontColor}; 
					border-bottom-color: ${theme.primaryFontColor};
				}

				@media only screen and (min-width: 1200px) {
					.nav {
						background-color: ${theme.secondaryBackgroundColor};
					}
					.nav .link-item.active {
						background: ${theme.primaryFontColor};
						color: ${theme.primaryBackgroundColor}
					}
				}
			`}</style>
		</div>
	)
}