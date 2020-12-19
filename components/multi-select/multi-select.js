import {useContext, useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons'

import {ThemeContext} from '../../contexts/theme-context'

import styles from './multi-select.module.css'

export default function MultiSelect({label, options, placeholder, name}) {
    const {theme} = useContext(ThemeContext)

    const [openOptions, setOpenOptions] = useState(false)
    const [optionItems, setOptionItems] = useState(
        options.map(option => ({
            ...option, selected: false
        })
    ))
    
    const [searchResult, setSearchResult] = useState(null)

    const toggleOptions = event => {
        setOpenOptions(!openOptions)
    }

    const handleOptionClick = event => {
        const clickedOptionIndex = parseInt(event.target.dataset["optionIndex"])
        setOptionItems(
            optionItems.map((item, idx) => {
                return idx === clickedOptionIndex ?
                    {...item, selected: !optionItems[clickedOptionIndex].selected} :
                    item
            })
        )
    }

    const handleInputChange = event => {
        const query = event.target.value
        const results = optionItems.filter(option => option.title.includes(query))
        setSearchResult(results)
        setOpenOptions(true)
    }

    const OptionsList = ({items}) => {
        return (
            items.map((option, idx) => 
                <div 
                key={idx}
                className={styles["option"]+` option option--${option.selected ? "selected" : "noSelect"}`}
                data-option-index={idx}
                onClick={handleOptionClick}>
                    {option.title}
                </div>
            )
        )
    }

    return (
        <div
        className={styles.wrapper+" wrapper"}>
            <label
            className="bb-typography__body"
            htmlFor={`bbMultiSelect__${name}`}>{label}</label>
            <div
            className={styles["labels"]}>
                {optionItems.filter(item => 
                        item.selected === true
                    )
                    .map((selectedItem, idx) => 
                        <span
                        key={idx}
                        className={styles["labels__item"]+" labels__item bb-typography__body2"}>
                            {selectedItem.title}
                        </span>
                    )
                }
            </div>
            <button
            className={styles.input+" input"}
            onClick={toggleOptions}>
                <span
                className={styles["input__arrow-icon"]}>
                    {openOptions ?
                        <FontAwesomeIcon icon={faAngleUp} /> :
                        <FontAwesomeIcon icon={faAngleDown} />
                    }
                </span>
                <input
                type="text"
                className={styles["input__input"]}
                id={`bbMultiSelect__${name}`}
                name={name}
                placeholder={placeholder}
                onChange={handleInputChange}
                onFocus={event => setOpenOptions(true)}
                onBlur={event => setOpenOptions(false)} />
            </button>
            <div
            className={styles.options+" "+(!openOptions ? styles["options--hidden"] : styles["options--visible"])+" options"}>
                {searchResult === null ?
                    options && 
                        <OptionsList
                        items={optionItems} /> :
                    <OptionsList
                    items={searchResult} />
                }
            </div>
            <style jsx>{`
                .input {
                    background-color: ${theme.primaryBackgroundColor};
                }
                .input:hover {
                    background-color: ${theme.primaryBackgroundColor}
                }
                .options {
                    background-color: ${theme.primaryBackgroundColor};
                }
                .option {
                    color: ${theme.primaryFontColor}
                }
                .option--selected {
                    background-color: ${theme.primaryFontColor};
                    color: ${theme.primaryBackgroundColor}
                }
                .labels__item {
                    background-color: ${theme.primaryFontColor};
                    color: ${theme.primaryBackgroundColor};
                }
            `}</style>
        </div>
    )
}