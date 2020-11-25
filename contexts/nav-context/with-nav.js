import NavProvider from './nav-provider'

const withNav = Component => props => (
    <NavProvider>
        <Component {...props} />
    </NavProvider>
)

const withNavs = () => {
    let components = []

    const addComponent = Component => components.push(Component)
}

export default withNav