import { useEffect, useState } from 'react'
import Carousel from './carousel/carousel'

export default function SignupCarousel({height}) {
    const items= [
        {
            src:'/assets/wallpapers/bg-many-books.jpg',
            caption: 'دسترسی به بیش از هزاران کتاب'
        },
        {
            src: '/assets/wallpapers/man-book-library.jpg',
            caption: 'از نظرات دیگران درباره ی کتابها آگاه شوید'
        }
    ]

    const [minHeight, setMinHeight] = useState(0)
    useEffect(() => {
       setMinHeight(height) 
    }, [height])
    const carouselParts = items.map((item, idx) =>
        <React.Fragment>
            <div
            className='signup-carousel__part'>
                <span
                className='signup-carousel__part__caption bb-typography__title'>
                    {item.caption}
                </span>
            </div>
            <style jsx>{`
                .signup-carousel__part {
                    position: relative;
                    min-width: 100%;
                    max-width: 100%;
                    min-height: ${minHeight}px;
                    background-image: url('${item.src}');
                    background-size: cover;
                    background-position: bottom top;
                    border-top-left-radius: 25px;
                    border-bottom-left-radius: 25px;
                }

                .signup-carousel__part__caption {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 100%;
                    padding: 1vh 0.8vw;
                    text-align: center;
                    background-color: rgba(60, 60, 60, 0.5);
                    color: white;
                    border-top-left-radius: 25px;
                }
            `}</style>
        </React.Fragment>
    )

    return (
        <div
        className='signup-carousel__body'>
        <Carousel
        items={carouselParts}
        maxWidth='100%'
        minHeight='100%'/>
        <style jsx>{`
            .signup-carousel__body {
                min-height: 100%;
                min-width: 100%;
                border-top-left-radius: 25px;
            }
        `}</style>
        </div>
    )
}