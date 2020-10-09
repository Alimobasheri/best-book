import {useContext} from 'react'

import MainContext from '../contexts/main-context'

export default function TabBtn ({titles, onClickFn, activeIdx}) {
	const mainContext = useContext(MainContext)
	const theme = mainContext.theme
	
	const btnStyle = {
		backgroundColor: theme.primaryBackgroundColor,
		color: theme.primaryFontColor
	}
	
	const activeBtnStyle = {
		backgroundColor: theme.primaryFontColor,
		color: theme.primaryBackgroundColor
	}
	
	const handleClick = (e, idx) => onClickFn(idx)
	
	const buttons = titles.map((title, idx) =>
		<button key={idx} className="tab-btn__button" style={idx === activeIdx ? activeBtnStyle : btnStyle} onClick={(e) => handleClick(e, idx)}>{title}</button>
	)
	return (
		<div>
			{buttons}
		</div>
	)
}