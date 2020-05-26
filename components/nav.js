const {useState, useEffect} = React
const {useLocation, Link} = ReactRouterDOM

const Nav = () => {
	const [toggled, setToggled] = useState(false)
	return(
	<MainContext.Consumer>
	{context =>
	<div dir="rtl" className={`nav ${toggled ? 'toggled' : ''}`} style={{backgroundColor: context.theme.primaryBackgroundColor}}>
		<div className="nav__wrapper">
			<div className="nav-brand__wrapper"><h1 className="nav-brand__h1" style={{color: context.theme.primaryFontColor}}>بست بوك</h1></div>
			<div className="nav-hamburger">
				<HamburgerButton lineColor={context.theme.primaryFontColor} toggled={toggled} toggle={setToggled}/>
			</div>
		</div>
		<div className={`nav-items__wrapper ${toggled ? 'toggled' : ''}`}>
			<div><Link to="/" style={{textDecoration: 'none'}}><span className='link-item' style={{color: context.theme.primaryFontColor}}>خانه</span></Link></div>
			<div><Link to="about-us" style={{textDecoration: 'none'}}><span className='link-item' style={{color: context.theme.primaryFontColor}}>درباره</span></Link></div>
			<div><Link to="contact" style={{textDecoration: 'none'}}><span className='link-item' style={{color: context.theme.primaryFontColor}}>تماس با ما</span></Link></div>
			<Btn text='ورود' navButton outline/>
			<Btn text='عضويت' navButton />
			<ThemeSwitch />
		</div>
	</div>
	}
	</MainContext.Consumer>
	)
}