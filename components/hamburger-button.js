export default function HamburgerButton({lineColor, toggled, toggle}) {
	return (
		<button className="nav-hamburger__btn" onClick={(e) => toggle(!toggled)}>
			<div className={`nav-hamburger__wrapper ${toggled ? 'toggled' : ''}`}>
				<span className="nav-hamburger__line__1" style={{backgroundColor: lineColor}}></span>
				<span className="nav-hamburger__line__2" style={{backgroundColor: lineColor}}></span>
				<span className="nav-hamburger__line__3" style={{backgroundColor: lineColor}}></span>
			</div>
		</button>
	)
}