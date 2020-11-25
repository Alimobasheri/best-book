import HEAD from 'next/head'

import '../styles/globals.css'
import '../styles/index.css'
import '../styles/home.css'
import '../styles/about-us.css'
import '../styles/login.css'
import '../styles/transition-manager.css'
import '../styles/loader.css'
import '../styles/btn.css'
import '../styles/hamburger-button.css'
import '../styles/tab-btn.css'
import '../styles/close-btn.css'
import '../styles/search-bar.css'
import '../styles/book-card.css'
import '../styles/book-preview.css'
import '../styles/list.css'
import '../styles/nav.css'

import MainContext from '../contexts/main-context'
import MainProvider from '../contexts/main-provider'
import { ThemeProvider } from '../contexts/theme-context'
import { NavProvider } from '../contexts/nav-context'
import { AuthProvider } from '../contexts/auth-context'

import TransitionManager from '../components/transition-manager'
import ScrollManager from '../components/scroll-manager'

import {useState, useEffect, useRef, useContext} from 'react'
import {useRouter} from 'next/router'
import Nav from '../components/nav'
import NavBar from '../components/nav-bar'
import AddressBar from '../components/address-bar'
import SearchBar from '../components/search-bar'

const MainApp = ({ Component, pageProps }) => {
  const mainContext = useContext(MainContext)
  const {searchMode, searchText} = mainContext

  const [mobileNavbarToggled, setMobileNavbarToggled] = useState(false) 

  const router = useRouter()

  useEffect(() => {
    if(searchMode && searchText) {
      const prevPath = router.pathname === '/search/[search_query]' ?
        router.query.prevPath :
        router.pathname
      let prevQuery = null
      if(router.pathname.includes('[')) {
        prevQuery = router.query
      }
      if(router.pathname === '/search/[search_query]'){
        router.replace({pathname: `/search/${searchText}`})
      } else {
        router.push({pathname: `/search/${searchText}`})
      }
    }
  }, [searchMode, searchText])

  var _appBodyWrapper = useRef(null)
	
	const getAppBodyWrapper = () => {
		return _appBodyWrapper
  }

  return (
      <React.Fragment>
        <HEAD>
          <title>بست بوک</title>
        </HEAD>
			  <div dir='rtl' className='app-wrapper' style={{backgroundColor: mainContext.theme.primaryBackgroundColor}}>
        <NavBar />
          <TransitionManager>
				    <Nav />
				    <div className='app-body__wrapper' ref={_appBodyWrapper}>
					    <ScrollManager getAppBodyWrapperRef={getAppBodyWrapper} />
                <div className='top-bar'>
                  <AddressBar />
                </div>
                <Component {...pageProps} />
            </div>
            </TransitionManager>
			  </div>
        <style jsx>{`
          .top-bar {
            width: 100%;
            position: relative;
            z-index: 5;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            background-color: ${mainContext.theme.primaryBackgroundColor}
          }
        `}</style>
      </React.Fragment>
  )
}

export default function Render({Component, pageProps}) {
  return (
    <MainProvider>
      <ThemeProvider>
        <NavProvider>
          <AuthProvider>
            <MainApp Component={Component} pageProps={pageProps} />
          </AuthProvider>
        </NavProvider>
      </ThemeProvider>
    </MainProvider>
  )
}
