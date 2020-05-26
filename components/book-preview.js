const {useContext} = React
const {useParams, useLocation} = ReactRouterDOM

const BookPreview = () => {
	const mainContext = useContext(MainContext)
	const {id} = useParams()
	const location = useLocation()
	
	const {books} = mainContext
	
	const bookPreview = 
		<List view={'column'} title={''} books={[...books].filter(book => book.id == id)} information />
	return (
		<div dir="rtl" className="book-preview__wrapper">
			{bookPreview}
		</div>
	)
}