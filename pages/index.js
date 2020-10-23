import {useContext} from 'react'

import HEAD from 'next/head'

import MainContext from '../contexts/main-context'

import List from '../components/list'
import SearchBar from '../components/search-bar'
import Carousel from '../components/carousel/carousel'
import AdvertisementCarouselItems from '../components/advertisement-carousel'

export default function Home() {
	const mainContext = useContext(MainContext)
	const {books, homeLists, searchText, selectedBook} = mainContext

	const carouselNewItems = [
		{
			title: 'کتاب بخوانید',
			subtitle: 'جدیدترین کتابهای روز را در پایگاه بست بوک خواهید یافت.',
			src: './assets/carousel-photos/mock1.jpg'
		},
		{
			title: 'آنچه روحت می پسندد بیاب',
			subtitle: 'با جسنجو در دسته بندیها، کتابهایی را با هر موضوع و پسندی بیابید.',
			src: './assets/carousel-photos/mock2.jpg'
		},
		{
			title: 'کتاب های خردورزانه',
			subtitle: 'از برادران کارامازوف تا زنان زیرک و هزاران کتاب خردمندانه ی دیگر که در پایگاه عظیم بست بوک یافت می شوند.',
			src: './assets/carousel-photos/mock3.jpg'
		}
	]

	const advertiseItems = AdvertisementCarouselItems({items: carouselNewItems})

	const homeListsEls =
		homeLists.lists["HOME_LISTS"] && homeLists.lists["HOME_LISTS"].map((name, i) =>
			<List key={i} view={'row'} title={homeLists.lists[name].title} books={[...books].filter(book => homeLists.lists[name].books_ids.includes(book.id))} />
		)
	
	const homePage = 
		selectedBook != '' ?
			<List view={'column'} title={''} books={[...books].filter(book => book.id == selectedBook)} information /> :
			<React.Fragment>
				<h1 
				className="page-header">
					کتابگردی
				</h1>
				<div className='home__carousel__wrapper'>
					<Carousel
					items={advertiseItems}
					maxWidth={'80vw'} />
				</div>
				{homeListsEls}
				<style jsx>{`
					.page-header {
						color: ${mainContext.theme.primaryFontColor}
					}
				`}</style>
			</React.Fragment>
	
	const resultsList = searchText == '' ? 
		[] : 
		<List view={'column'} className="results-list" books={[...books].filter(book => book.name.includes(searchText) || book.writer.includes(searchText) || book.translator.includes(searchText))} />
	
	return(
		<div dir="rtl" className='home__wrapper'>
        	<HEAD>
        		<title>بست بوک | خانه</title>
        	</HEAD>
			<div className='home__search-bar'>
				<SearchBar responsive={true}/>
			</div>
			{searchText == '' ? 
				homePage : 
				resultsList
			}
		</div>
	)
}
