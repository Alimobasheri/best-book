const Btn = ({text, outline, id, navButton, onClick}) => {
	return (
		<MainContext.Consumer>
		{context => {
			const primaryStyle = {
				backgroundColor: context.theme.primaryFontColor,
				color: context.theme.primaryBackgroundColor,
				border: 'none',
				borderRadius: '1vw',
			}
			const outlinedStyle = {
				backgroundColor: 'transparent',
				color: context.theme.primaryFontColor,
				border: `0.3vw solid ${context.theme.primaryFontColor}`,
				borderRadius: '1vw',
			}
			return(
			<div className={`btn btn--${outline ? 'outline' : 'primary'} ${navButton ? 'btn--nav' : ''}`}>
				<button className='btn__button' style={outline ? outlinedStyle : primaryStyle} onClick={onClick}>
					{text}
				</button>
			</div>
			)
		}}
		</MainContext.Consumer>
	)
}