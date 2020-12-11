import {useContext} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'

import MainContext from '../contexts/main-context'
import {ThemeContext} from '../contexts/theme-context'

export default function CloseBtn ({toggled, onClickFn}) {
	const {theme} = useContext(ThemeContext)
	const {primaryFontColor, secondaryFontColor} = theme
	return (
		<button 
		className={`close-btn ${toggled ? 'toggled' : ''}`}
		onClick={onClickFn}>
			<FontAwesomeIcon icon={faTimes} />
			<style jsx>{`
				.close-btn {
					color: ${secondaryFontColor};
				}

				.close-btn:hover {
					cursor: pointer;
					color: ${primaryFontColor}
				}
			`}</style>
		</button>
	)
}