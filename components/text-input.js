import {useContext, forwardRef} from 'react'

import {ThemeContext} from '../contexts/theme-context'

const TextInput = forwardRef(({
    title,
    placeholder,
    type,
    name,
    id,
    className,
    onFocus,
    onBlur,
    onSubmit,
    onChange,
    required,
    requiredError, 
    showCaption
}, inputRef) => {
    const {theme} = useContext(ThemeContext)

    let requiredErrorBorderColor = '#FEAAAA'
    return (
        <React.Fragment>
            <label
            for={name}
            className='text-input__label bb-typography__body'>
                <span
                className='text-input__label__text'>
                    {title}
                </span>
                <input
                dir='ltr'
                name={name}
                className={`text-input__input ${requiredError && 'required'} bb-typography__body2 vh-fix`}
                required={required}
                type={type}
                ref={inputRef}
                onFocus={onFocus || undefined}
                onBlur={onBlur || undefined}
                onChange={onChange || undefined}
                onSubmit={onSubmit || undefined}
                placeholder={placeholder}/>
                {showCaption &&
                    <span
                    dir='ltr'
                    className={`text-input__error-caption ${showCaption.type} bb-typography__body vh-fix`}>
                        {showCaption.text}
                    </span>
                }
            </label>

            <style jsx>{`
                .text-input__label {
                    padding-bottom: 1vw;
	                width: 100%;
                    color: ${theme.primaryFontColor};
                }

                .text-input__input {
                    margin-top: 1.5vw;
                    border: none;
	                display: block;
	                width: 100%;
	                padding: 1vw 2vw;
                    color: ${theme.primaryFontColor};
                    background-color: ${theme.primaryBackgroundColor};
                    border-radius: 10px;
                    box-shadow: inset 0px 1px 3px rgba(60, 60, 60, 0.1);
                    text-align: 'left';
                }

                .text-input__input:focus {
                    outline: none;
                    border: 1px solid ${theme.primaryFontColor};
                }

                .text-input__error-caption {
                    padding: 1vh 2vw;
                }
                .text-input__error-caption.ALERT {
                    color: red;
                }

                .text-input__input.required {
                    border: 1px solid ${requiredErrorBorderColor};
                }

                @media only screen and (min-width: 768px) {
                    .text-input__label {
                        padding-bottom: 1vw;
		                width: 100%;
		                display: flex;
		                flex-direction: row;
		                flex-wrap: wrap;
		                justify-content: space-between;
		                align-items: flex-end;
                    }

                    .text-input__error-caption {
                        padding: 0.7vh 1.5vw;
		                width: 100%;
                    }

                    .text-input__input {
                        padding: 1.5vh 1.5vw;
		                width: 66.666%;
                    }
                }
            `}</style>
        </React.Fragment>
    )
})

export default TextInput