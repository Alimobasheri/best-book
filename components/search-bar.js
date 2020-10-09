import {useState, useEffect} from 'react'

import MainContext from '../contexts/main-context'
import CloseBtn from '../components/close-btn'

export default function SearchBar (props) {
	var _searchInput
	let {responsive} = props
	return(
		<MainContext.Consumer>
		{context => {
			const {theme, setSearchMode, searchText, setSearchText} = context
			const inputWrapperStyle = {
				backgroundColor: theme.secondaryBackgroundColor
			}
			const inputStyle = {
				backgroundColor: theme.secondaryBackgroundColor,
				color: theme.secondaryFontColor
			}
			
			const IconSVGTag = (<svg className="search-bar__icon__svg" version="1.1" x="0" y="0" viewBox="0, 0, 60, 62">
				<g id="search-icon">
    				<path d="M22.276,42.265 C11.354,42.265 2.5,33.364 2.5,22.383 C2.5,11.402 11.354,2.5 22.276,2.5 C33.199,2.5 42.053,11.402 42.053,22.383 C42.053,33.364 33.199,42.265 22.276,42.265 z" fillOpacity="0" stroke={theme.secondaryFontColor} strokeWidth="4" id="circle"/>
    				<path d="M34.005,35.876 L34.005,35.876 C35.673,34.2 38.423,34.247 40.148,35.982 L56.675,52.597 C58.4,54.332 58.447,57.097 56.78,58.773 L56.78,58.773 C55.112,60.449 52.362,60.402 50.637,58.668 L34.11,42.052 C32.385,40.318 32.338,37.553 34.005,35.876 z" fill={theme.secondaryFontColor} id="handle"/>
				</g>
			</svg>)
			
			const setFocus = (e) => {
				e.preventDefault()
				setSearchMode(true);
			}
			
			const setBlur = (e) => {
				e.preventDefault()
				setSearchMode(false);
			}
			
			const setText = (e) => {
				e.preventDefault()
				setSearchText(_searchInput.value)
			}
			
			const clearText = (e) => {
				e.preventDefault()
				setSearchText('')
			}
			return(
				<div className={`search-bar__wrapper ${responsive ? 'responsive':''}`}>
					<div className="search-bar__input-wrapper" style={inputWrapperStyle}>
						<div className="search-bar__icon">{IconSVGTag}</div>
						<input className="search-bar__input"  ref={input => _searchInput = input} onFocus={setFocus} onBlur={setBlur} style={inputStyle} onChange={setText} type="text" value={searchText} placeholder="اينجا جستجو كنيد..."/>
						<CloseBtn onClickFn={clearText} toggled={searchText != '' ? true : false} />
					</div>
				</div>
			)
		}
		}
		</MainContext.Consumer>
	)
}