const AboutUs = () => {
	return (
		<MainContext.Consumer>
		{context =>
			<div dir="rtl" className="about-us__wrapper">
				<article className="about-us__article" style={{backgroundColor: context.theme.secondaryBackgroundColor}}>
					<header className="about-us__article__header">
						<h1 className="about-us__article__h1" style={{color: context.theme.primaryFontColor}}>
							هر كتاب سفرى تازه است.
						</h1>
						<h1 className="about-us__article__h1" style={{color: context.theme.primaryFontColor}}>
						بگذاريد بست بوك همسفرتان باشد.
						</h1>
					</header>
					<p className="about-us__article__text" style={{color: context.theme.secondaryFontColor}}>
						قصد ما در بست بوك، ايجاد سهولت در خريدن و خواندن كتابهاست. كتابى كه دوست داريد را يافته و به آسانى سفارش دهيد. يا اگر به دنبالى كتابى تازه براى خواندن هستيد، در ميان مجموعه هاى گردآورى شده توسط بست بوك، به گردش پرداخته و كتابى را كه بيش از همه توجهتان را جلب مى كند بيابيد. 
					</p>
					<p className="about-us__article__text" style={{color: context.theme.secondaryFontColor}}>
						بست بوك قابليت هايى همچون حاشيه نويسى، پيشنهادات، امتيازبندى، جستجو، توضيحات و خلاصه را در اختيارتان مى گذارد. 
					</p>
				</article>
			</div>
		}
		</MainContext.Consumer>
	)
}