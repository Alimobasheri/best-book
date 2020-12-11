import { useState, useContext, useRef } from 'react'

import Link from 'next/link'
import {useRouter} from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

import {ThemeContext} from '../../contexts/theme-context'
import { AuthContext } from '../../contexts/auth-context'

import Btn from '../../components/button/'
import TextInput from '../../components/text-input'
import MessageBox from '../../components/message-box'

export default function Login() {
	const {theme} = useContext(ThemeContext)
	const authContext = useContext(AuthContext)
	
	const {signIn, setSignInField, signInField} = authContext
	
	const router = useRouter()

	const handleChange = (event) => {
		setSignInField({...signInField, [event.target.name]: event.target.value})
	}

	let logInEmailRef = useRef(null)
	let logInPasswordRef = useRef(null)

	const [emailValidity, setEmailValidity] = useState({
		requiredError: false,
		showCaption: {text: '', type: null}
	})

	const [passwordValidity, setPasswordValidity] = useState({
		requiredError: false,
		showCaption: {text: '', type: null}
	})

	const [errorCaption, setErrorCaption] = useState(null)

	const validateForm = (validity=null) => {
		if(validity === 'email' || validity === null) {
			 if (logInEmailRef.current.value === '') {
				setEmailValidity({...emailValidity, requiredError: true})
				return false
			} else if (!logInEmailRef.current.value.includes('@')) {
				setEmailValidity({...emailValidity, showCaption: {
					text:'لطفا آدرس ایمیل معتبری را وارد نمایید!',
					type: 'ALERT'
				}})
				return false
			} else {
				setEmailValidity({requiredError: false, showCaption:{text: '', type: null}})
			}
		}

		if (validity === 'password' || validity === null) {
			if(logInPasswordRef.current.value === '') {
				setPasswordValidity({...passwordValidity, requiredError: true})
				return false
			} else {
				setPasswordValidity({requiredError: false, showCaption: {text: '', type: null}})
			}
		}

		return true
	}

	const [loading, setLoading] = useState(false)
	
	const submitLogIn = (e) => {
		if (e !== undefined) e.preventDefault()
		setLoading(true)
		if(validateForm()) {
			signIn()
				.then(response => {
					setLoading(false)
					router.push({pathname: '/'})
				})
				.catch(error => {
					setLoading(false)
					console.log(error.status)
					if(error.toString().includes('No user found with that email, or password invalid.')) {
						setErrorCaption('هیج حساب کاربری با این نشانی رایانامه و یا رمز عبور یافت نشد.')
					} else if(error.toString().includes('Email not confirmed')) {
						setErrorCaption('نشانی رایانامه تایید نشده. برای تایید آن به ایمیلی که برای این نشانی ارسال شده مراجعه نموده و روی لینک تایید رایانامه کلیک کنید.')
					} else if(error.status === undefined) {
						setErrorCaption('امکان برقراری ارتباط نیست. لطفا اتصال خود به اینترنت را چک کنید.')
					}
				})
		} else {
			setLoading(false)
		}
	}
	
	const loginWrapperStyle = {
		backgroundColor: theme.primaryaryBackgroundColor
	}
	
	const loginFormWrapperStyle = {
		backgroundColor: theme.secondaryBackgroundColor
	}
	
	const titleFontStyle = {
		color: theme.primaryFontColor
	}
	
	const explanationFontStyle = {
		color: theme.secondaryFontColor
	}
	
	const textInputStyle = {
		backgroundColor: theme.primaryBackgroundColor
	}
	
	return (
		<div dir="rtl" className="login__wrapper" style={loginWrapperStyle}>
			<form className="login__form__wrapper login" style={loginFormWrapperStyle} onSubmit={submitLogIn}>
				<div
				className="login__form__fields__Wrapper vh-fix">
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
					ref={logInEmailRef}
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
					ref={logInPasswordRef}
					/>
					{errorCaption !== null &&
						<MessageBox
						message={errorCaption}
						type='warning'/>
					}
				</div>
				<div className="submit__wrapper">
					<span style={explanationFontStyle}>همچنان حساب باز نكرده ايد؟
						<Link href={'/signup'} style={{textDecoration: 'none'}}>
							<span 
							className="no-account__link" 
							style={{
								color: theme.primaryFontColor,
								cursor: 'pointer'
							}}>
								 ثبت نام كنيد
							</span>
						</Link>
					</span>
					<Btn spinner={loading} text="ورود به حساب" fullWidth={!loading} onClick={submitLogIn} />
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