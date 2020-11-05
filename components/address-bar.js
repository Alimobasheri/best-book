import {useState, useEffect, useContext} from 'react'
import {useRouter} from 'next/router'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'

import MainContext from '../contexts/main-context'

export default function AddressBar() {
    const router = useRouter()
    const {pathname} = router

    const mainContext = useContext(MainContext)

    const convertPathToNames = (path) => {
        const pathParts = pathname.split('/')
        const pathsConvertedToName = pathParts.map((part, idx) => {
            switch(part) {
                case '':
                    if(idx > 0) 
                        return 'کتابگردی'
                    else
                        return 'بست بوک'
                case 'about-us':
                    return 'درباره ی ما'
                case 'book':
                    return 'کتابها'
                case '[book_id]':
                    const {book_id} = router.query
                    return mainContext.books.filter(book => book.id == book_id)[0].name
                case 'search':
                    return 'جستجو'
                case '[search_query]':
                    const {search_query} = router.query
                    return `${search_query}`
                case 'login':
                    return 'ورود'
                case 'signup':
                    return 'عضویت'
                case 'verification':
                    return 'تایید رایانامه'
                default:
                    return null
            }
        })

        return pathsConvertedToName
    }

    const [pathNames, setPathNames] = useState(convertPathToNames(pathname))

    useEffect(() => {
        setPathNames(convertPathToNames(pathname))
    }, [pathname, router.query])

    return (
        <div
        className='address-bar'>
            {pathNames.map((name, idx) =>
                <React.Fragment>
                    <span
                    className='address-bar__path-name'>
                        {name}
                    </span>
                    {idx >= 0 && idx < pathNames.length-1 && 
                        <FontAwesomeIcon icon={faAngleLeft} />
                    }
                </React.Fragment>
            )}
            <style jsx>{`
                .address-bar {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: flex-start;
                    align-items: center;
                    width: 100%;
                    max-width: 100%;
                    background-color: ${mainContext.theme.primaryBackgroundColor};
                    color: ${mainContext.theme.primaryFontColor};
                    padding: 3vh 2vw;
                    margin: 0 auto;
                }
                .address-bar__path-name {
                    display: block;
                    padding: 1vh 2vw;
                }
            `}</style>
        </div>
    )
}