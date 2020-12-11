import {useContext, useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'

import {ThemeContext} from '../../contexts/theme-context'
import { AuthContext } from '../../contexts/auth-context'

import Btn from '../../components/button/'
import TextInput from '../../components/text-input'
import MessageBox from '../../components/message-box'
import SignupCarousel from '../../components/signup-carousel'

export default function SignUp () {
	const {theme} = useContext(ThemeContext)
	const { signUp } = useContext(AuthContext)

	const router = useRouter()

	let signUpEmailRef = useRef(null)
	let signUpPasswordRef = useRef(null)

	const [emailValidity, setEmailValidity] = useState({
		requiredError: false,
		showCaption: {text: '', type: null}
	})

	const [passwordValidity, setPasswordValidity] = useState({
		requiredError: false,
		showCaption: {text: '', type: null}
	})

	const [loading, setLoading] = useState(false)
	
	const [errorCaption, setErrorCaption] = useState(null)

	const validateForm = (validity=null) => {
		if(validity === 'email' || validity === null) {
			 if (signUpEmailRef.current.value === '') {
				setEmailValidity({...emailValidity, requiredError: true})
				return false
			} else if (!signUpEmailRef.current.value.includes('@')) {
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
			if(signUpPasswordRef.current.value === '') {
				setPasswordValidity({...passwordValidity, requiredError: true})
				return false
			} else if (signUpPasswordRef.current.value.length < 6) {
				setPasswordValidity({...passwordValidity, showCaption: {
					text: 'رمز عبور باید حداقل 6 کاراکتر باشد',
					type: 'ALERT'
				}})
				return false
			} else {
				setPasswordValidity({requiredError: false, showCaption: {text: '', type: null}})
			}
		}

		return true
	}

	const submitSignUp = (e) => {
		if (e !== undefined) e.preventDefault()
		setLoading(true)
		if(validateForm()) {
			signUp(signUpEmailRef.current.value, signUpPasswordRef.current.value)
				.then(response => {
					setLoading(false)
					router.push({pathname: '/'})
				})
				.catch(error => {
					setLoading(false)
					console.log(error.status)
					if(error.toString().includes('A user with this email address has already been registered')) {
						setErrorCaption('حساب دیگری با این ایمیل در بست بوک ایجاد شده.')
					} else if(error.status === undefined) {
						setErrorCaption('امکان برقراری ارتباط نیست. لطفا اتصال خود به اینترنت را چک کنید.')
					}
				})
		} else {
			setLoading(false)
		}
	}

	let signupFormRef = useRef(null)
	const [carouselHeight, setCarouselHeight] = useState(0)

	useEffect(() => {
		const setHeight = () => {
			const formHeight = window.getComputedStyle(signupFormRef.current).height.split('px')[0]
			setCarouselHeight(formHeight)
		}
		setHeight()
		window.addEventListener('resize', setHeight)
	})
	
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
			<form className="login__form__wrapper signup" style={loginFormWrapperStyle} onSubmit={submitSignUp} ref={signupFormRef}>
				<div
				className='signup__form'>
					<div className="login__fields__top-wrapper">
						<h1 className="login__title bb-typography__header" style={titleFontStyle}>عضويت در بست بوك</h1>
						<TextInput
						title={(
							<React.Fragment>
								<FontAwesomeIcon icon={faEnvelope} /> نشانی رایانامه	
							</React.Fragment>
						)}
						name='email'
						type='text'
						placeholder='mojtaba@example.com'
						ref={signUpEmailRef}
						requiredError={emailValidity.requiredError}
						showCaption={emailValidity.showCaption}
						onBlur={(e) => validateForm('email')}
						required/>
						<TextInput
						title={(
							<React.Fragment>
								<FontAwesomeIcon icon={faLock} /> رمز عبور
							</React.Fragment>
						)}
						placeholder={'password'}
						name='password'
						type='password'
						ref={signUpPasswordRef}
						requiredError={passwordValidity.requiredError}
						showCaption={passwordValidity.showCaption}
						onBlur={(e) => validateForm('password')}
						required/>
						{errorCaption !== null &&
							<MessageBox
							message={errorCaption}
							type='warning'/>
						}
					</div>
					<div className="submit__wrapper">
						<span 
						className="no-account bb-typography__body"
						style={{color: theme.primaryFontColor}}>در بست بوك داراى حساب كاربرى هستيد؟
							<Link href='/login'>
								<span className="no-account__link bb-typography__body"> وارد شويد</span>
							</Link>
						</span>
						<Btn spinner={loading} text="ثبت و عضويت" fullWidth={!loading} onClick={submitSignUp}/>
					</div>
				</div>
				<div
				className='signup__carousel__wrapper'>
					<SignupCarousel 
					height={carouselHeight}/>
				</div>
			</form>
			<style jsx>{`
				.login__form__wrapper.signup {
					flex-direction: row;
					justify-content: space-between;
					align-items: center !important;
					padding: 0;
				}
				.signup__form {
					min-width: 48% !important;
					max-width: 48% !important;
					min-height: 100%;
					display: flex;
					flex-direction: column;
					flex-wrap: nowrap;
					justify-content: space-evenly;
					align-items: center;
					padding: 1vh 2vw;
				}

				.signup__carousel__wrapper {
					min-width: 48% !important;
					max-width: 48% !important;
					min-height: 100% !important;
					max-height: 100% !important;
					border-top-left-radius: 25px;
					border-bottom-left-radius: 25px;
					display: flex;
					flex-flow: column nowrap;
					justify-content: center;
					padding: 0;
				}
			`}</style>
		</div>
	)
}