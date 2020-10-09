import MainContext from '../contexts/main-context'

export default function ThemeSwitch () {
	return (
		<MainContext.Consumer>
		{context =>
			<div className={`theme-switch ${context.themeMode && 'toggled'}`}>
				<label htmlFor="themeSwitchBtn">
					<button id="themeSwitchBtn" className="theme-switch__btn" style={{backgroundColor: context.theme.primaryBackgroundColor, borderColor: context.theme.primaryFontColor}} onClick={(e) => {e.preventDefault(); context.setThemeMode(!context.themeMode)}}></button>
				</label>
				<span className="theme-switch__big-circle" style={{backgroundColor: context.theme.primaryFontColor}} onClick={(e) => {e.preventDefault(); context.setThemeMode(!context.themeMode)}}></span>
				<span className="theme-switch__small-circle" style={{backgroundColor: context.theme.primaryBackgroundColor}} onClick={(e) => {e.preventDefault(); context.setThemeMode(!context.themeMode)}}></span>
			</div>
		}
		</MainContext.Consumer>
	)
}