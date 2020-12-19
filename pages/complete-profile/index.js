import {useContext} from 'react'

import styles from './complete-profile.module.css'

import {ThemeContext} from '../../contexts/theme-context'

import TextInput from '../../components/text-input'
import MultiSelect from '../../components/multi-select'

export default function CompleteProfile() {
    const {theme} = useContext(ThemeContext)

    return (
        <section
        className={styles["wrapper"]+' wrapper'}>
            <article
            className={styles["intro"]}>
                <header>
                    <img
                    className={styles["icon"]}
                    src="/assets/icons/profile-edit-icon-2.png"
                    alt="profile page icon" />
                    <h1
                    className={styles["intro__title"]+" intro__title bb-typography__title"}>
                        تکمیل اطلاعات کاربری
                    </h1>
                </header>
                <p
                className={styles["intro__subtitle"]+" intro__subtitle bb-typography__title2"}>
                    از بابت ثبت نام شما در بست بوک متشکریم. لطفا با تکمیل اطلاعات زیر ما را در فراهم آوری تجربه ای بهتر یاری فرمایید.
                </p>
            </article>
            <div
            className={styles["divider"]+" divider"}></div>
            <article
            className={styles["form"]}>
                <header>
                    <h2
                    className={styles["form__title"]+" form__title bb-typography__title"}>
                        اطلاعات شخصی
                    </h2>
                </header>
                <div
                className={styles["form__item"]}>
                    <TextInput 
                    title="نام"/>
                </div>
                <div
                className={styles["form__item"]}>
                    <TextInput
                    title="نام خانوادگی"/>
                </div>
                <div
                className={styles["form__item"]}>
                    <TextInput
                    title="جنسیت"/>
                </div>
                <header>
                    <h2
                    className={styles["form__title"]+" form__title bb-typography__title"}>
                        علایق
                    </h2>
                </header>
                <div
                className={styles["form__item"]}>
                    <MultiSelect 
                    label="انتخاب ژانرهای مورد علاقه"
                    placeholder="نام ژانری را وارد کنید"
                    name="favoriteGenreMultiSelect"
                    options={[
                        {
                            value: "psychology",
                            title: "روانشناسی"
                        },
                        {
                            value: "historical",
                            title: "تاریخی"
                        },
                        {
                            value: "crime",
                            title: "جنایی"
                        },
                        {
                            value: "fantasy",
                            title: "حماسی"
                        }
                    ]}/>
                </div>
                <div
                className={styles["form__item"]}>
                    <MultiSelect 
                    label="کتابهای مورد علاقه"
                    placeholder="نام کتابی را وارد کنید"
                    name="favoriteBooksMultiSelect"
                    options={[]}/>
                </div>
            </article>
            <style jsx>{`
                .wrapper {
                    background-color: ${theme.secondaryBackgroundColor}
                }

                .divider {
                    background-color: ${theme.secondaryFontColor}
                }
            `}</style>
        </section>
    )
}