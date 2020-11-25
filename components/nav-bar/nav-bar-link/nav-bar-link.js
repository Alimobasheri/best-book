import {useContext} from 'react'
import {useRouter} from 'next/router'
import Link from "next/link"

import {ThemeContext} from '../../../contexts/theme-context'

import styles from './nav-bar-link.module.css'

export default function NavBarLink({children, href, icon=null}) {
    const {theme} = useContext(ThemeContext)
    const {pathname} = useRouter()
    return (
        <React.Fragment>
            <Link
            href={href}>
                <a
                className={`${styles.link} link ${pathname === href && styles.active}`}>
                    {icon !== null &&
                        <span
                        className={styles.icon}>
                            {icon}
                        </span>
                    }
                    <span
                    className={styles.content}>
                        {children}
                    </span>
                </a>
            </Link>
            <style jsx>{`
                .link {
                    color: ${theme.primaryFontColor};
                }
                .link::before {
                    background-color: ${theme.primaryFontColor};
                }
            `}</style>
        </React.Fragment>
    )
}