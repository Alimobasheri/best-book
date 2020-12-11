import {useContext} from 'react'

import { faBell, faCheckCircle, faExclamationTriangle, faSync, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ThemeContext } from "../contexts/theme-context"

export default function MessageBox({message, type}) {
    const {theme} = useContext(ThemeContext)

    const setBoxIcon = () => {
        switch(type) {
            case 'primary':
                return <FontAwesomeIcon icon={faBell} />
            case 'warning':
                return <FontAwesomeIcon icon={faExclamationTriangle} />
            case 'error':
                return <FontAwesomeIcon icon={faTimes} />
            case 'success':
                return <FontAwesomeIcon icon={faCheckCircle} />
            case 'loading':
                return <FontAwesomeIcon icon={faSync} spin/>
            default:
                console.warn('Messag Box Component ERROR: No correct type was given.')
                return <FontAwesomeIcon icon={faBell} />
        }
    }
    return (
        <div
        className={`message-box__wrapper ${type} bb-typography__title vh-fix`}>
            <span
            className="message-box__icon">
                {setBoxIcon()}
            </span>
            <div
            className='message-box__text'>
                <p>
                {message}
                </p>
            </div>
            <style jsx>{`
                .message-box__wrapper {
                    padding: 2vh 2vw;
                    margin: 1vh 0;
                    border: 1px solid;
                    border-radius: 15px;
                    width: 100%;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                }

                .message-box__text {
                    width: 90%;
                    max-width: 90%;
                    text-align: right;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                }

                .message-box__wrapper.primary {
                    border-color: ${theme.primaryFontColor};
                    backgound-color: #F7CBCA;
                    color: ${theme.primaryFontColor};
                    font-weight: bold;
                }

                .message-box__wrapper.warning {
                    border-color: #CC0000;
                    backgound-color: #F7CBCA;
                    color: #CC0000;
                    font-weight: bold;
                }

                .message-box__wrapper.error {
                    border-color: #EE0000;
                    backgound-color: #F7CBCA;
                    color: #EE0000;
                    font-weight: bold;
                }

                .message-box__wrapper.success {
                    border-color: #00CC00;
                    backgound-color: #F7CBCA;
                    color: #00CC00;
                    font-weight: bold;
                }
                .message-box__wrapper.loading {
                    border-color: ${theme.primaryBackgroundColor};
                    background-color: ${theme.primaryFontColor};
                    color: ${theme.primaryBackgroundColor};
                    font-weight: bold;
                }
            `}</style>
        </div>
    )
}