import {useContext} from 'react'

import HEAD from 'next/head'

import styles from './home.module.css'

import MainContext from '../contexts/main-context'
import {ThemeContext} from '../contexts/theme-context'

import List from '../components/list'
import Carousel from '../components/carousel/carousel'
import AdvertisementCarouselItems from '../components/advertisement-carousel/'

export default function Home() {
	const mainContext = useContext(MainContext)
	const {theme} = useContext(ThemeContext)
	const {books, homeLists, selectedBook} = mainContext

	const carouselNewItems = [
		{
			title: 'کتاب بخوانید',
			subtitle: 'جدیدترین کتابهای روز را در پایگاه بست بوک خواهید یافت.',
			backgroundColor: '#706fd3',
			src: './assets/carousel-photos/mock1.jpg'
		},
		{
			title: 'آنچه روحت می پسندد بیاب',
			subtitle: 'با جسنجو در دسته بندیها، کتابهایی را با هر موضوع و پسندی بیابید.',
			backgroundColor: '#b33939',
			src: './assets/carousel-photos/mock2.jpg'
		},
		{
			title: 'کتاب های خردورزانه',
			subtitle: 'از برادران کارامازوف تا زنان زیرک و هزاران کتاب خردمندانه ی دیگر که در پایگاه عظیم بست بوک یافت می شوند.',
			backgroundColor: '#cd6133',
			src: './assets/carousel-photos/mock3.jpg'
		}
	]

	const advertiseItems = AdvertisementCarouselItems({items: carouselNewItems})

	const homeListsEls =
		homeLists.lists["HOME_LISTS"] && homeLists.lists["HOME_LISTS"].map((name, i) =>
			<List 
			key={i} 
			view={'row'} 
			title={homeLists.lists[name].title}
			iconType={homeLists.lists[name].icon}
			books={[...books].filter(book => homeLists.lists[name].books_ids.includes(book.id))} />
		)
	
	const homePage = 
		selectedBook != '' ?
			<List view={'column'} title={''} books={[...books].filter(book => book.id == selectedBook)} information /> :
			<React.Fragment>
				<div className={styles['home__carousel__wrapper']}>
					<Carousel
					items={advertiseItems}
					maxWidth={'80vw'} />
				</div>
				<div
				className={styles["home__lists"]}>
					{homeListsEls}
				</div>
			</React.Fragment>
	return(
		<div dir="rtl" className={styles['home__wrapper']}>
        	<HEAD>
        		<title>بست بوک | خانه</title>
        	</HEAD>
			{
				homePage
			}
		</div>
	)
}
