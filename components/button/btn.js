import {useRef, useContext} from 'react'

import styles from './btn.module.css'

import { faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {ThemeContext} from '../../contexts/theme-context'

export default function Btn ({
	spinner,
	text, 
	outline, 
	id,
	navButton,
	priceButton,
	fullWidth, 
	onClick
}) {
	const {theme} = useContext(ThemeContext)

	const btnRef = useRef(null)

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
		<div className={`
		${styles['btn']} 
		bb-typography__title
		${styles[`btn--${outline ? 'outline' : 'primary'}`]}
		${priceButton ? `${styles['btn--price-tag']}` : ''}
		btn--${outline ? 'outline' : 'primary'} 
		${navButton ? `${styles['btn--nav']} bb-typography__nav-link` : ''} 
		${fullWidth && styles['full-width']}`}>
			<button 
			className={`${styles['btn__button']} btn__button ${priceButton && 'bb-typography__body2'}`}  
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			ref={btnRef}>
				{spinner === true ?
					<FontAwesomeIcon icon={faSync} spin/> :
					text
				}
			</button>
			<style jsx>{`
				.btn--primary > .btn__button {
					background-color: ${theme.primaryFontColor};
					color: ${theme.primaryBackgroundColor};
				}
				.btn--outline > .btn__button {
					color: ${theme.primaryFontColor};
					border-color: ${theme.primaryFontColor};
				}
			`}</style>
		</div>
	)
}