const {useState, useEffect, useContext} = React
const {useLocation, Link} = ReactRouterDOM

const Nav = () => {
	const [toggled, setToggled] = useState(false)
	
	const mainContext = useContext(MainContext)
	const location = useLocation()
	
	const changeNavHeight = () => {
		mainContext
			.setNavHeight(
				window
					.getComputedStyle(_navWrapper, null)
					.getPropertyValue('height')
					.split('px')[0]
			)
	}
	
	var _navWrapper
	useEffect(() => changeNavHeight())
	window.addEventListener('resize', changeNavHeight, false)
	return(
	<div dir="rtl" className={`nav ${toggled ? 'toggled' : ''}`} style={{backgroundColor: mainContext.theme.primaryBackgroundColor}} ref={_nav => _navWrapper = _nav}>
		<div className="nav__wrapper">
			<Link to="/" style={{textDecoration: 'none'}}><div className="nav-brand__wrapper"><h1 className="nav-brand__h1" style={{color: mainContext.theme.primaryFontColor}}>بست بوک</h1></div>
			</Link>
			<div className="nav-hamburger">
				<HamburgerButton lineColor={mainContext.theme.primaryFontColor} toggled={toggled} toggle={setToggled}/>
			</div>
		</div>
		<div className={`nav-items__wrapper ${toggled ? 'toggled' : ''}`}>
			<div><Link exact to="/" style={{textDecoration: 'none'}}><span className={`link-item ${location.pathname == '/' ? 'active' : ''}`} style={{color: mainContext.theme.primaryFontColor, borderBottomColor: mainContext.theme.primaryFontColor}}>خانه</span></Link></div>
			<div><Link to="/about-us" style={{textDecoration: 'none'}}><span className={`link-item ${location.pathname == '/about-us' ? 'active' : ''}`} style={{color: mainContext.theme.primaryFontColor, borderBottomColor: mainContext.theme.primaryFontColor}}>درباره</span></Link></div>
			<div><Link to="/contact" style={{textDecoration: 'none'}}><span className={`link-item ${location.pathname == '/contact' ? 'active' : ''}`} style={{color: mainContext.theme.primaryFontColor, borderBottomColor: mainContext.theme.primaryFontColor}}>تماس با ما</span></Link></div>
			<Btn text='ورود' navButton outline/>
			<Btn text='عضویت' navButton />
			<ThemeSwitch />
		</div>
	</div>
	)
}
