import {useState, useEffect, useRef} from 'react'

export default function CarouselSlider({items, itemsCount, carouselState, setCarouselState, currentIndex, setCurrentIndex}) {
    let {goToIndex, changingSlide, carouselWidth} = carouselState

    const setSliderWidth = (carouselWidth) => {
        let sliderWidth, sliderWidthUnit
        if(carouselWidth.indexOf('%') !== -1) {
            sliderWidth = 100
            sliderWidthUnit = '%'
        } else if(carouselWidth.indexOf('px') !== -1) {
            sliderWidth = parseInt(carouselWidth.slice('px'))
            sliderWidthUnit = 'px'
        } else {
            [sliderWidth, sliderWidthUnit] = setSliderWidth('100%')
        }

        return [sliderWidth, sliderWidthUnit]
    }

    let [sliderWidth, sliderWidthUnit] = setSliderWidth(carouselWidth)

    const calculateDistance = (newIndex=null) => {
        let distance
        if(newIndex === null) {
            if(currentIndex < itemsCount) {
                distance = -(currentIndex*sliderWidth)
                setCurrentIndex(currentIndex+1)
            } else {
                distance = 0
                setCurrentIndex(1)
            }
        } else {
            distance = -((newIndex-1)*sliderWidth)
            setCurrentIndex(newIndex)
        }
        return distance
    }
    
    const slide = (element, distance) => {
        if(sliderWidthUnit == '%') {
            element.style.transform = `translateX(${distance}${sliderWidthUnit})`
        } else {
            element.style.transform = `translateX(${distance}${sliderWidthUnit})`
        }
    }

    const autoSlide = () => {
        slide(carouselSliderWrapper.current, calculateDistance())
    }

    let carouselSliderWrapper = useRef(null)

    useEffect(() => {
        let autoSlideInterval = setInterval(() => autoSlide(), 4000)
        return () => clearInterval(autoSlideInterval)
    })

    useEffect(() =>{
        if(changingSlide) {
            slide(carouselSliderWrapper.current, calculateDistance(goToIndex))
            setCarouselState({...carouselState, goToIndex:null, changingSlide: false})
        }
    }, [changingSlide])

    return (
        <div className='carousel-slider__wrapper' ref={carouselSliderWrapper}>
            <style jsx>{`
                .carousel-slider__wrapper {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: flex-start;
                    align-items: center;
                    transition: transform 0.3s ease;
                    border-radius: 20px;
                }
                .carousel-slider__item {
                    width: 100%;
                    min-width: 100%;
                    display: inline;
                }
            `}</style>
            {
                items.map((item, idx) => 
                    <div id={`carouselItem${idx}`} className='carousel-slider__item' key={idx}>{item}</div>    
                )
            }
        </div>
    )
}