export default function CarouselButtons({carouselState, setCarouselState, count, currentIndex}) {
    const handleButtonClick = (event, index) => {
        event.preventDefault()
        setCarouselState({...carouselState, goToIndex: index, changingSlide: true})
    }

    let buttons = []
    for (let index = 0; index < count; index++) {
        let button = (
            <>
                <div key={index} className='carousel-button__item' data-carousel-button-index={index}>
                    <span className={`carousel-button__item__circle ${index+1 == currentIndex ? 'active' : ''}`}
                        onClick={(e) => handleButtonClick(e, index+1)}></span>
                </div>
                <style jsx>{`
                    .carousel-button__item {
                        width: 10px;
                        max-width: 10px;
                        height: 10px;
                        max-height: 10px;
                        padding: 1px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .carousel-button__item__circle {
                        display: block;
                        width: 5px;
                        min-width: 5px;
                        height: 5px;
                        min-height: 5px;
                        border-radius: 50%;
                        background-color: #F9F8FB;
                        opacity: 0.9;
                        transition: all 0.1s ease;
                    }
                    .carousel-button__item__circle.active {
                        background-color: #CCFBFF;
                    }
                    .carousel-button__item__circle:hover {
                        width: 7px;
                        height: 7px;
                        cursor: pointer;
                    }

                    @media only screen and (min-width: 768px) {
                        .carousel-button__item {
                            width: 16px;
                            max-width: 16px;
                            height: 16px;
                            max-height: 16px;
                            padding: 2px;
                        }

                        .carousel-button__item__circle {
                            width: 9px;
                            min-width: 9px;
                            height: 9px;
                            min-height: 9px;
                        }

                        .carousel-button__item__circle:hover {
                            width: 12px;
                            height: 12px;
                        }
                    }

                    @media only screen and (min-width: 1200px) {
                        .carousel-button__item {
                            width: 24px;
                            max-width: 24px;
                            height: 24px;
                            max-height: 24px;
                            padding: 3px;
                        }

                        .carousel-button__item__circle {
                            width: 10px;
                            min-width: 10px;
                            height: 10px;
                            min-height: 10px;
                        }

                        .carousel-button__item__circle:hover {
                            width: 12px;
                            height: 12px;
                        }
                    }
                `}</style>
            </>
        )
        buttons.push(button)
    }
    
    return (
        <div className='carousel-button__wrapper'>
            <style jsx>{`
                .carousel-button__wrapper {
                    position: relative;
                    top: -20px;
                    width: 100%;
                    height: 20px;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
            {
                buttons.map((button, idx) => 
                    <React.Fragment key={idx}>
                        {button}
                    </React.Fragment>
                )
            }
        </div>
    )
}