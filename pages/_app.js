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
import '../styles/theme-switch.css'
import '../styles/search-bar.css'
import '../styles/book-card.css'
import '../styles/book-preview.css'
import '../styles/list.css'
import '../styles/nav.css'

import '../contexts/main-provider'
import MainContext from '../contexts/main-context'
import MainProvider from '../contexts/main-provider'

import TransitionManager from '../components/transition-manager'
import ScrollManager from '../components/scroll-manager'

import {useState, useEffect, useRef, useContext} from 'react'
import Nav from '../components/nav'

const MainApp = ({ Component, pageProps }) => {
  const mainContext = useContext(MainContext)

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
				  <TransitionManager getAppBodyWrapperRef={getAppBodyWrapper}>
				  <Nav />
				  <div className='app-body__wrapper' ref={_appBodyWrapper}>
					  <ScrollManager getAppBodyWrapperRef={getAppBodyWrapper} />
              <Component {...pageProps} />
          </div>
			  	</TransitionManager>
			  </div>
      </React.Fragment>
  )
}

export default function Render({Component, pageProps}) {
  return (
    <MainProvider>
      <MainApp Component={Component} pageProps={pageProps} />
    </MainProvider>
  )
}
