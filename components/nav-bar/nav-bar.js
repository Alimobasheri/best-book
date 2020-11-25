import {useContext, useEffect, useState} from 'react'
import {useRouter} from 'next/router'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAddressBook, faHome, faLayerGroup, faSignInAlt, faUserPlus} from '@fortawesome/free-solid-svg-icons'

import { ThemeContext } from '../../contexts/theme-context'
import { NavContext, withNav } from '../../contexts/nav-context'

import styles from './nav-bar.module.css'

import NavBarLink from './nav-bar-link'
import LinkButton from '../link-button'
import ThemeSwitch from '../theme-switch/index'
import AnimatedBG from './animated-bg'

export default function NavBar() {
    const {theme} = useContext(ThemeContext)
    const {mobileNavbarOpen} = useContext(NavContext)
    const [showNavbarItems, setShowNavbarItems] = useState(false)
    let animationDelay = 1000
    const {pathname} = useRouter()
    useEffect(() => {
        let showAfterDelay;
        if(mobileNavbarOpen) {
            setTimeout(() => setShowNavbarItems(true), animationDelay)
        } else {
            setShowNavbarItems(false)
        }
        return () => clearTimeout(showAfterDelay)
    }, [mobileNavbarOpen])
    return (
        <React.Fragment>
            <AnimatedBG toggled={mobileNavbarOpen} animationDuration={animationDelay} />
        <nav
        className={`${styles.navBar} ${showNavbarItems && styles.toggled} nav-bar ${showNavbarItems && 'toggled'}`}>
            <div
            className={styles.wrapper}>
                <div
                className={styles.linkWrapper}>
                    <NavBarLink
                    href='/'
                    icon={<FontAwesomeIcon icon={faHome} />}>
                        کتابگردی
                    </NavBarLink>
                </div>
                <div
                className={styles.linkWrapper}>
                    <NavBarLink
                    href='/categories'
                    icon={<FontAwesomeIcon icon={faLayerGroup} />}>
                        دسته بندی ها
                    </NavBarLink>
                </div>
                <div
                className={styles.linkWrapper}>
                    <NavBarLink
                    href={'/about-us'}
                    icon={<FontAwesomeIcon icon={faAddressBook} />}>
                        درباره ما
                    </NavBarLink>
                </div>
            </div>
            <div
            className={styles.buttonsWrapper}>
                <LinkButton
                href='/login'
                icon={<FontAwesomeIcon icon={faSignInAlt} />}>
                    ورود
                </LinkButton>
                <LinkButton
                href='/signup'
                icon={<FontAwesomeIcon icon={faUserPlus}/>}
                type='outline'>
                    عضویت
                </LinkButton>
                <ThemeSwitch/>
            </div>
            <style jsx>{`
                .nav-bar.toggled {
                    background-color: transparent;
                }
            `}</style>
        </nav>
        </React.Fragment>
    )
}