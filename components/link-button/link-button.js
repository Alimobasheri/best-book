import {useContext} from 'react'
import Link from 'next/link'

import styles from './link-button.module.css'

import {ThemeContext} from '../../contexts/theme-context'

export default function LinkButton({children, icon=null, href, type='primary'}) {
    const themeContext = useContext(ThemeContext)
    let theme = themeContext.theme
    return (
        <React.Fragment>
            <Link
            href={href}>
                <a
                className={`${styles.wrapper} wrapper--${type}`}>
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
                .wrapper--primary {
                    background-color: ${theme.primaryFontColor};
                    color: ${theme.primaryBackgroundColor};
                    border-color: ${theme.primaryFontColor};
                    box-shadow: 0px 1px 10px 5px rgba(46, 65, 78, 0.3);
                }
                .wrapper--primary:hover {
                    background-color: ${theme.primaryBackgroundColor};
                    color: ${theme.primaryFontColor};
                }
                .wrapper--outline {
                    background-color: ${theme.primaryBackgroundColor};
                    color: ${theme.primaryFontColor};
                    border-color: ${theme.primaryBackgroundColor};
                    box-shadow: 0px 1px 10px 5px rgba(46, 65, 78, 0.3);
                }
                /*.wrapper--outline:hover {
                    background-color: ${theme.primaryFontColor};
                    color: ${theme.primaryBackgroundColor};
                }*/
            `}</style>
        </React.Fragment>
    )
}