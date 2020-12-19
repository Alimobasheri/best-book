import {useContext} from 'react'

import {ThemeContext} from '../../contexts/theme-context'

import Btn from '../../components/button'
import styles from './categories.module.css'

const CategoryCard = ({title, subtitle, backgroundColor, color, iconFileName}) => {
    return (
        <div
        className={styles["category-card"]+' category-card'}>
            <span
            className={styles["category-card__icon"]}>
                <img
                alt={title}
                src={`/assets/categories-icons/${iconFileName}`} />
            </span>
            <span
            className={styles["category-card__title"]+' category-card__title bb-typography__title'}>
                {title}
            </span>
            <span
            className={styles["category-card__subtitle"]+' category-card__subtitle bb-typography__body'}>
                {subtitle}
            </span>
            <span
            className={styles["category-card__actions"]}>
                <Btn
                fullWidth
                text="مشاهده ی کتابها" />
            </span>
            <style jsx>{`
                .category-card {
                    background-color: ${backgroundColor};
                }

                .category-card__Text {
                    color: ${color};
                }
            `}</style>
        </div>
    )
}

export default function Categories() {
    const {theme} = useContext(ThemeContext)

    const categories = [
        {
            title: "روانشناختی",
            backgroundColor: "#F0F0DD",
            color: "#F0F0F0",
            subtitle: "به عمق ذهن انسان نفوذ کنید.",
            iconFileName: "psychology-icon.png"
        },
        {
            title: "تاریخی",
            backgroundColor: "#F0F0DD",
            color: "#F0F0F0",
            subtitle: "از دنیاهای باستان تا تاریخ معاصر فقط در قوه ی خیالتان.",
            iconFileName: "history-icon.png"
        }
    ]
    return (
        <section
        className={styles.categories}>
            <header>
                <h1
                className="categories-page-header">
                    دسته بندی موضوعی
                </h1>
            </header>
            <article>
                {categories.map((category, idx) => 
                    <CategoryCard 
                    key={idx}
                    title={category.title}
                    backgroundColor={category.backgroundColor}
                    color={category.color}
                    subtitle={category.subtitle}
                    iconFileName={category.iconFileName} />
                )}
            </article>
            <style jsx>{`
                .categories-page-header {
                    color: ${theme.primaryFontColor}
                }
            `}</style>
        </section>
    )
}