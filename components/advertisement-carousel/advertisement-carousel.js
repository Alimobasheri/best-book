import {useContext} from 'react'

import styles from './advertisement-carousel.module.css'

import {ThemeContext} from '../../contexts/theme-context'

export default function AdvertisementCarouselItems({items}) {
    const {theme} = useContext(ThemeContext)
    
    return items.map(item => {
        return (
            <div
            dir='rtl' 
            className={`${styles['carousel-image']} carousel-image vh-fix`}>
                <div 
                className={`${styles['carousel-image__text']} carousel-image__text`}>
                    <h1 
                    className='bb-typography__header'>
                        {item.title}
                    </h1>
                    <h2
                    className="bb-typography__title">
                        {item.subtitle}
                    </h2>
                </div>
                <div 
                className={styles['carousel-image__photo']+' vh-fix'}
                style={{
                    backgroundImage: `url('${item.src}')`
                }}></div>

                <style jsx>{`
                    .carousel-image {
                        background-color: ${item.backgroundColor};
                    }

                    .carousel-image__text > h1 {
                        color: ${theme.primaryBackgroundColor};
                    }

                    .carousel-image__text > h2 {
                        color: ${theme.secondaryFontColor};
                    }
                `}</style>
            </div>
        )
    })
}