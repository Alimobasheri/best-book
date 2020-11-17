import {useContext} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
//const {Link} = ReactRouterDOM

import MainContext from '../../contexts/main-context'

import Btn from '../../components/btn'
import { route } from 'next/dist/next-server/server/router'
import { Router } from 'next/router'
import TextInput from '../../components/text-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

export default function Login() {
	const mainContext = useContext(MainContext)
	
	const {signIn, setSignInField, signInField} = mainContext
	
	const router = useRouter()

	const handleChange = (event) => {
		setSignInField({...signInField, [event.target.name]: event.target.value})
	}
	
	const handleSubmit = (event) => {
		event.preventDefault()
		//setAuthentication({authenticated: authentication.authenticated, loading: true})
		signIn()
			.then(response => {
				console.log(response)
				router.push('/')
			})
			.catch(error => {
				console.log(`Login Error: ${error}`)
			})
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
			<form className="login__form__wrapper login" style={loginFormWrapperStyle} onSubmit={handleSubmit}>
				<div
				className="login__form__fields__Wrapper">
				<div className="login__fields__top-wrapper">
					<h1 className="login__title bb-typography__header" style={titleFontStyle}>ورود به حساب كاربرى</h1>
					<TextInput
					title={(
						<React.Fragment>
							<FontAwesomeIcon  icon={faEnvelope} /> نشانی رایانامه
						</React.Fragment>
					)}
					placeholder='moj@moheb.com'
					type='email'
					name='email'
					required
					onChange={handleChange}
					/>
					<TextInput
					title={(
						<React.Fragment>
							<FontAwesomeIcon icon={faLock} /> رمز عبور
						</React.Fragment>
					)}
					placeholder='******'
					type='password'
					name='password'
					required
					onChange={handleChange}
					/>
				</div>
				<div className="submit__wrapper">
					<span style={explanationFontStyle}>همچنان حساب باز نكرده ايد؟
						<Link href={'/signup'} style={{textDecoration: 'none'}}>
							<span 
							className="no-account__link" 
							style={{
								color: mainContext.theme.primaryFontColor,
								cursor: 'pointer'
							}}>
								 ثبت نام كنيد
							</span>
						</Link>
					</span>
					<Btn text="ورود به حساب" fullWidth onClick={handleSubmit} />
				</div>
				</div>
				<div className="book-shelf-cover">
					<div
					className="book-shelf-cover__image">

					</div>
				</div>
			</form>
			<style jsx>{`
				.login__form__wrapper.login {
					display: flex;
					flex-direction: row-reverse;
					padding: 0;
				}
				.login__form__fields__Wrapper {
					min-height: 100%;
					display: flex;
					flex-direction: column;
					flex-wrap: nowrap;
					justify-content: space-evenly;
					align-items: center;
					min-width:48%;
					padding: 1vh 2vw;
				}
				.book-shelf-cover {
					width: 48%;
					min-height: 100%;
					border-top-right-radius: 25px;
					border-bottom-right-radius: 25px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: stretch;
					background-image: url('/assets/wallpapers/girl-book-steps.jpg');
					background-repeat: no-repeat;
					background-size: cover;
					background-position: center;
				}
			`}</style>
		</div>
	)
}