import {useState} from 'react'
import {Swipeable} from 'react-swipeable'

import CarouselSlider from './carousel-slider'
import CarouselButtons from './carousel-buttons'

export default function Carousel({items, maxWidth}) {
    let itemsCount = items.length

    const [carouselState, setCarouselState] = useState({
        goToIndex: null, 
        changingSlide: false, 
        carouselWidth: maxWidth || '100%'
    })

    const [currentIndex, setCurrentIndex] = useState(1)

    const changeCarouselSlide = (newSlideIndex) => {
        setCarouselState({...carouselState, goToIndex: newSlideIndex, changingSlide: true})
    }
    
    return (
        <React.Fragment>
            <Swipeable 
            onSwipedRight={(eventData) => {changeCarouselSlide(currentIndex-1)}}
            onSwipedLeft={(eventData) => {changeCarouselSlide(currentIndex+1)}}>
                <div className='carousel__wrapper' dir='ltr'>
                    <style jsx>{`
                        .carousel__wrapper {
                            min-width: ${maxWidth || '100%'};
                            max-width: ${maxWidth || '100%'};
                            overflow: hidden;
                            border-radius: 20px;
                        }
                    `}</style>
                    <CarouselSlider 
                    items={items} 
                    itemsCount={itemsCount} 
                    carouselState={carouselState} 
                    setCarouselState={setCarouselState}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex} />
                    <CarouselButtons 
                    count={itemsCount} 
                    carouselState={carouselState} 
                    setCarouselState={setCarouselState} 
                    currentIndex={currentIndex}/>
                </div>
            </Swipeable>
        </React.Fragment>
    )
}