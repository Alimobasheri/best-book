const {useContext} = React

const CloseBtn = ({toggled, onClickFn}) => {
	const mainContext = useContext(MainContext)
	const {primaryFontColor} = mainContext.theme
	const lineStyle = {backgroundColor: primaryFontColor}
	return (
		<button className={`close-btn ${toggled ? 'toggled' : ''}`} onClick={onClickFn}>
			<span className="close-btn__top-line" style={lineStyle}></span>
			<span className="close-btn__bottom-line" style={lineStyle}></span>
		</button>
	)
}