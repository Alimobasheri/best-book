import ThemeProvider from './theme-provider'

export default function withTheme(Component) {
    return function(props) {
        return (
            <ThemeProvider>
                <Component {...props}/>
            </ThemeProvider>
        )
    }
}