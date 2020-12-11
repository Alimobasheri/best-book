import HEAD from 'next/head'
import { useContext } from 'react'

import { ThemeContext } from '../../contexts/theme-context'

export default function AboutUs () {
	const {theme} = useContext(ThemeContext)
	return (
			<div dir="rtl" className="about-us__wrapper">
                <HEAD>
                    <title>بست بوک | درباره ما</title>
                </HEAD>
				<article className="about-us__article" style={{backgroundColor: theme.secondaryBackgroundColor}}>
					<header className="about-us__article__header">
						<h1 className="about-us__article__h1 bb-typography__header" style={{color: theme.primaryFontColor}}>
							هر كتاب سفرى تازه است.
						</h1>
						<h1 className="about-us__article__h1 bb-typography__header" style={{color: theme.primaryFontColor}}>
						بگذاريد بست بوك همسفرتان باشد.
						</h1>
					</header>
					<p className="about-us__article__text bb-typography__body" style={{color: theme.secondaryFontColor}}>
						قصد ما در بست بوك، ايجاد سهولت در خريدن و خواندن كتابهاست. كتابى كه دوست داريد را يافته و به آسانى سفارش دهيد. يا اگر به دنبالى كتابى تازه براى خواندن هستيد، در ميان مجموعه هاى گردآورى شده توسط بست بوك، به گردش پرداخته و كتابى را كه بيش از همه توجهتان را جلب مى كند بيابيد. 
					</p>
					<p className="about-us__article__text bb-typography__body" style={{color: theme.secondaryFontColor}}>
						بست بوك قابليت هايى همچون حاشيه نويسى، پيشنهادات، امتيازبندى، جستجو، توضيحات و خلاصه را در اختيارتان مى گذارد. 
					</p>
				</article>
			</div>
	)
}