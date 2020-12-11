import {useEffect, useContext} from 'react'

import {useRouter} from 'next/router'

import MainContext from '../contexts/main-context'

export default function ScrollManager ({getAppBodyWrapperRef}) {
	const mainContext = useContext(MainContext)
	
	const router = useRouter()
	
	useEffect( () => {
		getAppBodyWrapperRef().current.addEventListener('scroll', () => {
			mainContext.setCurrentScroll(getAppBodyWrapperRef().current.scrollTop)
		}, false)
	}, [])
	
	useEffect(() => {
		if (router.query !== undefined && router.query.redirect !== undefined && router.query.redirect === 'BACKWARD') {
			if(getAppBodyWrapperRef().current !== undefined) {
				getAppBodyWrapperRef().current.scrollTop = mainContext.prevScroll[mainContext.prevScroll.length-1]
				const newPrevScroll = mainContext.prevScroll
				newPrevScroll.pop()
				mainContext.setPrevScroll(newPrevScroll)
			}
		} else if(router.query !== undefined && router.query.redirect !== undefined && router.query.redirect === 'FORWARD') {
			if(getAppBodyWrapperRef().current !== undefined) {
				const newPrevScroll = mainContext.prevScroll
				newPrevScroll.push(mainContext.getCurrentScroll())
				mainContext.setPrevScroll(newPrevScroll)
				getAppBodyWrapperRef().current.scrollTop = 0
			}
		} else {
			if(getAppBodyWrapperRef().current !== undefined) {
				mainContext.setPrevScroll([0])
				getAppBodyWrapperRef().current.scrollTop = 0
			}
		}
	}, [router.pathname])
	return null
}