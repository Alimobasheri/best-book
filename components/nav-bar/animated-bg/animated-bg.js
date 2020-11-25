import { useContext } from 'react'

import styles from './animated-bg.module.css'

import { ThemeContext } from '../../../contexts/theme-context'

export default function AnimatedBG({toggled, animationDuration}) {
    const {theme} = useContext(ThemeContext)
    return (
        <div
        className={`${styles.wrapper} ${toggled && `${styles.toggled} toggled`} wrapper`}>
            <span></span>
            <span></span>
            <span></span>
            <style jsx>{`
                .wrapper > span{
                    background-color: ${theme.primaryBackgroundColor};
                }
                .wrapper.toggled span {
                    animation-duration: ${animationDuration/1000}s;
                }
            `}</style>
        </div>
    )
}