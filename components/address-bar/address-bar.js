import {useState, useEffect, useContext} from 'react'

import {useRouter} from 'next/router'

import styles from './address-bar.module.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'

import MainContext from '../../contexts/main-context'
import {ThemeContext} from '../../contexts/theme-context'

export default function AddressBar() {
    const router = useRouter()
    const {pathname} = router

    const mainContext = useContext(MainContext)
    const {theme} = useContext(ThemeContext)

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
                case 'categories':
                    return 'دسته بندیها'
                case 'complete-profile':
                    return 'اتمام ثبت نام'
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
        className={`${styles['address-bar']} address-bar`}>
            {pathNames.map((name, idx) =>
                <React.Fragment>
                    <span
                    className={styles['path-name']}>
                        {name}
                    </span>
                    {idx >= 0 && idx < pathNames.length-1 && 
                        <FontAwesomeIcon icon={faAngleLeft} />
                    }
                </React.Fragment>
            )}
            <style jsx>{`
                .address-bar {
                    background-color: ${theme.primaryBackgroundColor};
                    color: ${theme.primaryFontColor};
                }
            `}</style>
        </div>
    )
}