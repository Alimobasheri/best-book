import {useRef, useContext} from 'react'

import { faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MainContext from '../contexts/main-context'

export default function Btn ({
	spinner,
	text, 
	outline, 
	id,
	navButton, 
	fullWidth, 
	onClick
}) {
	const mainContext = useContext(MainContext)

	const btnRef = useRef(null)

	const primaryStyle = {
		backgroundColor: mainContext.theme.primaryFontColor,
		color: mainContext.theme.primaryBackgroundColor,
		border: 'none',
		width: fullWidth ? '100%' : ''
	}
	const outlinedStyle = {
		backgroundColor: 'transparent',
		color: mainContext.theme.primaryFontColor,
		borderColor: `${mainContext.theme.primaryFontColor}`,
		width: fullWidth ? '100%' : ''
	}

	/*const handleClick = event => {
		/*let ripple = document.createElement('div')
		let x = event.pageX
		let y = event.pageY
		ripple.classList.add('btn-ripple')
		ripple.style.left = `${x}px`
		ripple.style.top = `${y}px`
		ripple.style.transfrom = 'translate(-100%, -100%)'
		btnRef.current.appendChild(ripple)*
		btnRef.current.classList.add('clicked')
		setTimeout(() => {
			btnRef.current.classList.remove('clicked')
		}, 300)
		if(typeof onClick === 'function') {
			onClick(event)
		}
	}*/

	const handleMouseDown = (e) => {
		btnRef.current.classList.add('clicked')
	}

	const handleMouseUp = event => {
		btnRef.current.classList.remove('clicked')
		if(typeof onClick === 'function') {
			onClick(event)
		}
	}

	return(
		<div className={`btn btn--${outline ? 'outline' : 'primary'} ${navButton ? 'btn--nav bb-typography__nav-link' : ''} ${fullWidth && 'full-width'}`}>
			<button 
			className='btn__button bb-typography__title' 
			style={outline ? 
				outlinedStyle : 
				primaryStyle
			} 
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			ref={btnRef}>
				{spinner === true ?
					<FontAwesomeIcon icon={faSync} spin/> :
					text
				}
			</button>
		</div>
	)
}