import {useContext} from 'react'

import MainContext from '../contexts/main-context'

export default function AdvertisementCarouselItems({items}) {
    const mainContext = useContext(MainContext)
    
    const carouselBody = items.map(item => {
        return (
            <div
            dir='rtl' 
            className='carousel-image__wrapper'>
                <div 
                className="carousel-image__text">
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
                className='carousel-image__photo'
                style={{
                    backgroundImage: `url('${item.src}')`
                }}></div>

                <style jsx>{`
                    .carousel-image__wrapper {
                        min-width: 100%;
	                    max-width: 100%;
	                    max-height: 50vh;
	                    min-height: 50vh;
                        display: flex;
                        flex-flow: column-reverse nowrap;
                        justify-content: space-between;
                        align-items: center;
                        padding: 3vh 2vw;
                        background-color: ${mainContext.theme.secondaryBackgroundColor};
                        border-radius: 20px;
                        border: 1px solid rgba(0, 0, 0, 0.1);
                    }

                    .carousel-image__text > h1 {
                        color: ${mainContext.theme.primaryFontColor};
                    }

                    .carousel-image__text > h2 {
                        margin-top: 2vh;
                        color: ${mainContext.theme.secondaryFontColor};
                    }

                    .carousel-image__photo {
                        min-width: ${22*1.3}vh;
                        max-width: ${22*1.3}vh;
                        min-height: 22vh;
                        max-height: 22vh;
                        background-position: bottom left;
	                    background-repeat: no-repeat;
	                    background-size: 100% 100%;
                        border-radius: 15px;
                    }

                    @media only screen and (min-width: 768px) {
                        .carousel-image__wrapper {
                            flex-flow: row nowrap;
                            min-width: 100%;
                            max-width: 100%;
                            min-height: 30vw;
                            max-height: 100%;
                        }

                        .carousel-image__photo {
                            min-width: ${25*1.3}vw;
                            max-width: ${25*1.3}vw;
                            min-height: 25vw;
                            max-height: 25vw;
                        }
                    }
                `}</style>
            </div>
        )
    })

    return carouselBody
}