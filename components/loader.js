import {useContext} from 'react'

import {ThemeContext} from '../contexts/theme-context'

export default function Loader () {
	const {theme} = useContext(ThemeContext)

	return (
		<React.Fragment>
			<span 
			className="loader ping"></span>
			<style jsx>{`
				.loader {
					background-color: ${theme.primaryFontColor};
				}
			`}</style>
		</React.Fragment>
	)
}