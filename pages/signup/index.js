import {useContext} from 'react'

import MainContext from '../../contexts/main-context'
import Btn from '../../components/btn'

export default function SignUp () {
	const mainContext = useContext(MainContext)
	
	const loginWrapperStyle = {
		backgroundColor: mainContext.theme.primaryaryBackgroundColor
	}
	
	const loginFormWrapperStyle = {
		backgroundColor: mainContext.theme.secondaryBackgroundColor
	}
	
	const titleFontStyle = {
		color: mainContext.theme.primaryFontColor
	}
	
	const explanationFontStyle = {
		color: mainContext.theme.secondaryFontColor
	}
	
	const textInputStyle = {
		backgroundColor: mainContext.theme.primaryBackgroundColor
	}
	return (
		<div dir="rtl" className="login__wrapper" style={loginWrapperStyle}>
			<form className="login__form__wrapper" style={loginFormWrapperStyle}>
				<div className="login__fields__top-wrapper">
					<h1 className="login__title" style={titleFontStyle}>عضويت در بست بوك</h1>
					<label for="firstName" className="login__label" style={titleFontStyle}>
					نام
						<input type="text" id="firstName" className="login__text-input" placeholder="مثال: مجتبى" style={{...titleFontStyle, ...textInputStyle}} />
					</label>
					<label for="lastName" className="login__label" style={titleFontStyle}>
					نام خانوادگى
						<input type="text" id="lastName" className="login__text-input" placeholder="مثال: محبى فر" style={{...titleFontStyle, ...textInputStyle}} />
					</label>
					<label for="email" className="login__label" style={titleFontStyle}>
						 نشانى رايانامه
						<input type="text" id="email" className="login__text-input" placeholder="مثال:moj.moheb@example.com" style={{...titleFontStyle, ...textInputStyle}} />
					</label>
					<label for="userName" className="login__label" style={titleFontStyle}>
						نام كاربرى مورد نظر
						<input type="text" id="userName" className="login__text-input" placeholder="مثال:mojtaba_mohebifar2020" style={{...titleFontStyle, ...textInputStyle}} />
					</label>
					<label for="password" className="login__label" style={titleFontStyle}>
						كلمه ى عبور
						<input type="password" id="password" className="login__text-input" style={{...titleFontStyle, ...textInputStyle}} />
					</label>
				</div>
				<div className="submit__wrapper">
					<span className="no-account">در بست بوك داراى حساب كاربرى هستيد؟<span className="no-account__link">وارد شويد</span></span>
					<Btn text="ثبت و عضويت" fullWidth />
				</div>
			</form>
		</div>
	)
}