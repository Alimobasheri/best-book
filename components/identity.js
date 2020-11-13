import GoTrue from 'gotrue-js'

let auth = new GoTrue({
    APIUrl: 'https://best-book-mobasheri.netlify.app/.netlify/identity',
    audience: '',
    setCookie: true
})

export default auth