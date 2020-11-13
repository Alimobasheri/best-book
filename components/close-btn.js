import {useContext} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'

import MainContext from '../contexts/main-context'

export default function CloseBtn ({toggled, onClickFn}) {
	const mainContext = useContext(MainContext)
	const {primaryFontColor, secondaryFontColor} = mainContext.theme
	const lineStyle = {backgroundColor: primaryFontColor}
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