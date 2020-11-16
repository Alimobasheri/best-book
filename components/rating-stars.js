import {useContext} from 'react'

import MainContext from '../contexts/main-context'

export default function RatingStars ({rating, rates}) {
	const mainContext = useContext(MainContext)

	const StarSVG = ({filled, gradient}) => { 
		return (
			<svg x="0" y="0" width="10" height="10" viewBox="0, 0, 40, 40">
				<g id="Layer_1">
					<g className="rating__star-shape">
						{gradient !== undefined && gradient !== false &&
							<defs>
								<linearGradient id="grad" x1={`0.${gradient.toString()}`} y1="50%" x2={`0.${gradient.toString()+'7'}`} y2="50%">
									<stop offset="1" style={{stopColor: "#FFF", stopOpacity: "1"}} />
									<stop offset={`0.${gradient.toString()}`} style={{stopColor: "#FFF", stopOpacity: "1"}} />
									<stop offset={`0.${gradient.toString()}`} style={{stopColor: "#F9DF00", stopOpacity: "1"}} />
									<stop offset="0" style={{stopColor: "#F9DF00", stopOpacity: "1"}} />
								</linearGradient>
							</defs>
						}
						<path d="M7.639,40 L12,24.845 L0,15.279 L15.056,14.956 L20,0 L24.944,14.956 L40,15.279 L28,24.845 L32.361,40 L20,30.956 z" fill={!filled ? "#FFF" : gradient !== undefined ? "url(#grad)" : "#F9DF00"}/>
						<path d="M20,0 L24.944,14.956 L40,15.279 L28,24.844 L32.361,40 L20,30.956 L7.639,40 L12,24.844 L0,15.279 L15.056,14.956 L20,0 z M20,2.549 L15.815,15.207 C15.709,15.529 15.412,15.749 15.073,15.756 L2.227,16.031 L12.499,24.219 C12.752,24.421 12.858,24.755 12.769,25.066 L9.055,37.973 L19.528,30.31 C19.809,30.105 20.191,30.105 20.472,30.31 L30.945,37.973 L27.231,25.066 C27.142,24.755 27.248,24.421 27.501,24.219 L37.772,16.031 L24.927,15.756 C24.588,15.749 24.291,15.529 24.185,15.207 L20,2.549 z" fill="#515F6B"/>
					</g>
				</g>
			</svg>
		)
	}
		
	const result = (rating === 0 || rates === 0) ? false : parseInt((rating/rates)*10)
		
	const stars = (res) => {
		if (res === false) {
			return <p className="no-rating__text bb-typography__body">امتيازى داده نشده</p>
		}
		const digits = res.toString().split('', 2)
		var output = []
		for (var i = 0; i < parseInt(digits[0]); i++) {
			output.push('FILL')
		}
		if (parseInt(digits[1]) !== 0) {
			output.push('GRADIENT_'+parseInt(digits[1]).toString())
		} else {
			output.push('EMPTY')
		}
		for (var j = 1; j < 5-parseInt(digits[0]); j++) {
			output.push('EMPTY')
		}
		return output.map((v, idx) => {
			if(v !== 'FILL' && v !== 'EMPTY') {
				return <StarSVG key={idx} filled gradient= {parseInt(v.replace('GRADIENT_', ''))} />
			} else if (v === 'FILL') {
				return <StarSVG key={idx} filled />
			} else {
				return <StarSVG key={idx} filled={false} />
			}
		})
	}
	
	return (
		<div className="rating-star__wrapper">
			{stars(result)}
			<style jsx>{`
				.rating-star__wrapper {
					color: ${mainContext.theme.secondaryFontColor};
					padding: 0.5vh 0.5vw;
					background-color: ${mainContext.theme.primaryBackgroundColor};
					border-radius: 30px;
					min-width: 70px;
					max-width: 100%;
				}
			`}</style>
		</div>
	)
}