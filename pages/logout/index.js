import {useEffect, useContext} from 'react'
import {useRouter} from 'next/router'

import { ThemeContext } from '../../contexts/theme-context'
import { AuthContext } from '../../contexts/auth-context'

import MessageBox from '../../components/message-box'

export default function Logout () {
	const { theme } = useContext(ThemeContext)
	const { user, signOut } = useContext(AuthContext)
	const router = useRouter()
	
	useEffect(() => {
			if(user) {
				signOut().then(() => router.push({pathname: '/'}))
			} else {
				router.push('/')
			}
	}, [])
	
	return (
		<div
		className="logout__wrapper">
			<MessageBox
			message={
				<React.Fragment>
					در حال خروج از حساب کاربری
				</React.Fragment>
			}
			type="loading" />
			<style jsx>{`
				.logout__wrapper {
					width: 80%;
					height: 60%;
					border-radius: 25px;
					padding: 2% 4%;
					margin: auto;
					margin-top: 10%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
					background-color: ${theme.secondaryBackgroundColor};
				}
			`}</style>
		</div>
	)
}