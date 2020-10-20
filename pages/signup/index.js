import {useContext, useRef} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

import MainContext from '../../contexts/main-context'
import Btn from '../../components/btn'

export default function SignUp () {
	const mainContext = useContext(MainContext)

	const router = useRouter()

	let signUpEmailRef = useRef(null)
	let signUpPasswordRef = useRef(null)

	const submitSignUp = (e) => {
		if (e !== undefined) e.preventDefault()
		const {signUp} = mainContext
		signUp(signUpEmailRef.current.value, signUpPasswordRef.current.value)
			.then(response => {
				router.push({pathname: '/'})
			})
			.catch(error => {
				console.log(`SignUp Error: ${error}`)
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
			<form className="login__form__wrapper" style={loginFormWrapperStyle} onSubmit={submitSignUp}>
				<div className="login__fields__top-wrapper">
					<h1 className="login__title" style={titleFontStyle}>عضويت در بست بوك</h1>
					<label for="email" className="login__label" style={titleFontStyle}>
						 نشانى رايانامه
						<input 
						type="text" 
						id="email" 
						className="login__text-input" 
						placeholder="مثال:moj.moheb@example.com" 
						style={{...titleFontStyle, ...textInputStyle}} 
						ref={signUpEmailRef} />
					</label>
					<label for="password" className="login__label" style={titleFontStyle}>
						كلمه ى عبور
						<input 
						type="password" 
						id="password" 
						className="login__text-input" 
						style={{...titleFontStyle, ...textInputStyle}} 
						ref={signUpPasswordRef}/>
					</label>
				</div>
				<div className="submit__wrapper">
					<span className="no-account">در بست بوك داراى حساب كاربرى هستيد؟
						<Link href='/login'>
							<span className="no-account__link">وارد شويد</span>
						</Link>
					</span>
					<Btn text="ثبت و عضويت" fullWidth onClick={submitSignUp}/>
				</div>
			</form>
		</div>
	)
}