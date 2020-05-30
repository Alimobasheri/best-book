const {render} = ReactDOM
const {HashRouter, Route, Switch} = ReactRouterDOM
const App = () => {
	const rootPath ="/Best Book/index.html"
	return (
		<MainProvider>
			<MainContext.Consumer>
			{context =>
				<React.Fragment>
					<div className='app-wrapper' style={{backgroundColor: context.theme.primaryBackgroundColor}}>
						<Nav />
						<Switch>
							<Route path={`/about-us`} component={AboutUs}/>
							<Route path={`/book/:id`} component={BookPreview} />
							<Route path={`/`} component={Home} exact/>
						</Switch>
					</div>
				</React.Fragment>
			}
			</MainContext.Consumer>
		</MainProvider>
	)
}

const root = document.querySelector('#root')
render(
	<HashRouter> 
		<App />
	</HashRouter>, 
	root
)
