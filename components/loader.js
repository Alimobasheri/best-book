import {useContext} from 'react'

import MainContext from '../contexts/main-context'

export default function Loader () {
	const mainContext = useContext(MainContext)
	const loaderStyle = {
		backgroundColor: mainContext.theme.primaryFontColor
	}
	return (
		<React.Fragment>
			<span className="loader ping" style={loaderStyle}></span>
		</React.Fragment>
	)
}