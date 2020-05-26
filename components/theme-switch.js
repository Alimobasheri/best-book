const ThemeSwitch = () => {
	return (
		<MainContext.Consumer>
		{context =>
			<div className={`theme-switch ${context.themeMode && 'toggled'}`}>
				<label for="themeSwitchBtn">
					<button id="themeSwitchBtn" className="theme-switch__btn" style={{backgroundColor: context.theme.primaryBackgroundColor, borderColor: context.theme.primaryFontColor}} onClick={(e) => {e.preventDefault(); context.setThemeMode(!context.themeMode)}}></button>
				</label>
				<span className="theme-switch__big-circle" style={{backgroundColor: context.theme.primaryFontColor}}></span>
				<span className="theme-switch__small-circle" style={{backgroundColor: context.theme.primaryBackgroundColor}}></span>
			</div>
		}
		</MainContext.Consumer>
	)
}