import MainContext from '../contexts/main-context'

export default function Btn ({text, outline, id, navButton, fullWidth, onClick}) {
	return (
		<MainContext.Consumer>
		{context => {
			const primaryStyle = {
				backgroundColor: context.theme.primaryFontColor,
				color: context.theme.primaryBackgroundColor,
				border: 'none',
				width: fullWidth ? '100%' : ''
			}
			const outlinedStyle = {
				backgroundColor: 'transparent',
				color: context.theme.primaryFontColor,
				borderColor: `${context.theme.primaryFontColor}`,
				width: fullWidth ? '100%' : ''
			}
			return(
			<div className={`btn btn--${outline ? 'outline' : 'primary'} ${navButton ? 'btn--nav' : ''}`}>
				<button className='btn__button bb-typography__title' style={outline ? outlinedStyle : primaryStyle} onClick={onClick}>
					{text}
				</button>
			</div>
			)
		}}
		</MainContext.Consumer>
	)
}