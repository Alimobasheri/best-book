import {useContext} from 'react'

import { faBell, faCheckCircle, faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MainContext from "../contexts/main-context"

export default function MessageBox({message, type}) {
const mainContext = useContext(MainContext)

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
            default:
                console.warn('Messag Box Component ERROR: No correct type was given.')
                return <FontAwesomeIcon icon={faBell} />
        }
    }
    return (
        <div
        className={`message-box__wrapper ${type} bb-typography__title`}>
            {setBoxIcon()}
            <p
            className='message-box__text'>
                {message}
            </p>
            <style jsx>{`
                .message-box__wrapper {
                    padding: 2vh 2vw;
                    margin: 1vh 0;
                    border: 1px solid;
                    width: 100%;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                }

                .message-box__text {
                    max-width: 80%;
                    text-align: right;
                }

                .message-box__wrapper.primary {
                    border-color: ${mainContext.primaryFontColor};
                    backgound-color: #F7CBCA;
                    color: ${mainContext.primaryFontColor};
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
            `}</style>
        </div>
    )
}