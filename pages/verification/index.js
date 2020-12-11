import {useEffect, useContext, useState} from 'react'

import MainContext from '../../contexts/main-context'
import {ThemeContext} from '../../contexts/theme-context'

import MessageBox from '../../components/message-box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Btn from '../../components/button/'

export default function Verification() {
    const mainContext = useContext(MainContext)
    const {theme} = useContext(ThemeContext)

    let STATUS = {
        LOADING: "LOADING",
        CONNECTING: "CONNECTING",
        FAILED: "FAILED",
        NO_TOKEN: "NO_TOKEN",
        SUCCESS: "SUCCESS"
    }

    const [status, setStatus] = useState(STATUS.LOADING)
    useEffect(() => {
        if(window.location.hash !== '' && window.location.hash.includes('confirmation_token')) {
            setStatus(STATUS.LOADING)
            const confirm_token = window.location.hash.split('#confirmation_token=')[1]
            if(!confirm_token || confirm_token === "") {
                setStatus(STATUS.NO_TOKEN)
            } else {
                setStatus(STATUS.CONNECTING)
                mainContext.confirmEmail(confirm_token)
                    .then(response => {
                        setStatus(STATUS.SUCCESS)
                        console.log('successfully confirmed your eamil!')
                    })
                    .catch(error => {
                        setStatus(STATUS.FAILED)
                        console.error(error)
                    })
            }
        } else {
            setStatus(STATUS.NO_TOKEN)
        }
    }, [])

    const VerificationBody = ({status}) => {
        switch (status) {
            case STATUS.LOADING:
                return (
                    <React.Fragment>
                        <FontAwesomeIcon icon={faSync} spin/>
                    </React.Fragment>
                )
            case STATUS.NO_TOKEN:
                return (
                    <React.Fragment>
                        <MessageBox message={"این اقدام معتبر نمی باشد."} type="warning" />
                    </React.Fragment>
                )
            case STATUS.CONNECTING:
                return (
                    <React.Fragment>
                        <MessageBox 
                        message={(
                            <React.Fragment>
                                در حال اعتبارسنجی... <FontAwesomeIcon icon={faSync} spin/>
                            </React.Fragment>
                        )} 
                        type="primary" />
                    </React.Fragment>
                )
            case STATUS.FAILED:
                return (
                    <React.Fragment>
                        <MessageBox
                        message="خطا در اعتبارسنجی. لطفا انقضای لینک اعتبارسنجی را بررسی نمایید..."
                        type="error" />
                    </React.Fragment>
                )
            case STATUS.SUCCESS:
                return (
                    <React.Fragment>
                        <MessageBox
                        message="نشانی رایانامه ی شما با موفقیت تایید شد. با کلیک بر روی دکمه ی زیر به صفحه ی ورود به حساب منتقل می شوید."
                        type="success" />
                        <Link
                        href="/login">
                            <Btn
                            text="مراجعه به صفحه ی ورود به حساب"
                            />
                        </Link>
                    </React.Fragment>
                )
            default:
                return null;
        }
    }

    return (
        <div className="verification">
            <div className="verification__message-box__wrapper">
                <VerificationBody status={status} />
            </div>
            <style jsx>{`
                .verification {
                    padding: 5%;
                    min-height: 100%;
                }

                .verification__message-box__wrapper {
                    width: 75%;
                    margin: auto;
                    background-color: ${theme.secondaryBackgroundColor};
                    padding: 5vh 4vw;
                    border-radius: 25px;
                    box-shadow: 0px 1px 20px rgba(30, 30, 30, 0.1);
                }
            `}</style>
        </div>
    )
}