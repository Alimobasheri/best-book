import {useContext} from 'react'
import Link from 'next/link'
//const {Link} = ReactRouterDOM

import MainContext from '../../contexts/main-context'

import Btn from '../../components/btn'

export default function Login() {
	const mainContext = useContext(MainContext)
	
	const {authentication, setAuthentication, signIn, setSignInField, signInField} = mainContext
	
	const handleChange = (event) => {
		setSignInField({...signInField, [event.target.name]: event.target.value})
	}
	
	const handleSubmit = (event) => {
		event.preventDefault()
		//setAuthentication({authenticated: authentication.authenticated, loading: true})
		signIn()
	}
	
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
			<form className="login__form__wrapper" style={loginFormWrapperStyle} onSubmit={handleSubmit}>
				<div className="login__fields__top-wrapper">
					<h1 className="login__title bb-typography__header" style={titleFontStyle}>ورود به حساب كاربرى</h1>
					<label htmlFor="email" className="login__label bb-typography__title" style={titleFontStyle}>
					 نام كاربرى يا نشانى رايانامه
						<input type="text" id="email" name="email" className="login__text-input bb-typography__body" placeholder="مثال: mojtaba@example.com" style={{...titleFontStyle, ...textInputStyle}} onChange={handleChange} />
					</label>
					<label htmlFor="password" className="login__label bb-typography__title" style={titleFontStyle}>
						كلمه ى عبور
						<input type="password" id="password" className="login__text-input bb-typography__body" name="password" style={{...titleFontStyle, ...textInputStyle}} onChange={handleChange} />
						<span className="forgot-password bb-typography__body" style={explanationFontStyle}>كلمه ى عبور خود را فراموش كرده ايد؟</span>
					</label>
				</div>
				<div className="submit__wrapper">
					<span style={explanationFontStyle}>همچنان حساب باز نكرده ايد؟<Link href={'/sign-up'} style={{textDecoration: 'none'}}><span className="no-account__link" style={{color: mainContext.theme.primaryFontColor}}>ثبت نام كنيد</span></Link></span>
					<Btn text="ورود به حساب" fullWidth onClick={handleSubmit} />
				</div>
			</form>
		</div>
	)
}