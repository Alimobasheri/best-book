import {useContext} from 'react'

import { ThemeContext} from '../../contexts/theme-context'

import styles from './theme-switch.module.css'

export default function ThemeSwitch () {
	const themeContext = useContext(ThemeContext)
	const {theme} = themeContext
	
	const handleClick = (e) => {
		e.preventDefault()
		themeContext.setDarkMode(!themeContext.darkMode)
	}

	return (
		<div 
		className={`${styles.wrapper} ${themeContext.darkMode && styles.toggled}`}>
			<label htmlFor="themeSwitchBtn">
				<button 
				id="themeSwitchBtn" 
				className={`${styles.btn} btn`} 
				onClick={handleClick}>
					
				</button>
			</label>
			<span 
			className={`${styles.bigCircle} big-circle`}
			onClick={handleClick}>
			</span>
			<span 
			className={`${styles.smallCircle} small-circle`} 
			onClick={handleClick}>
			</span>
			<style jsx>{`
				.btn {
					background-color: ${theme.primaryBackgroundColor};
					border-color: ${theme.primaryFontColor};
				}
				.big-circle {
					background-color: ${theme.primaryFontColor};
				}
				.small-circle {
					background-color: ${theme.primaryBackgroundColor};
				}
			`}</style>
		</div>
	)
}