# Best Book Web Application
This is a comprehensive work sample designed and in progress by me, showing my main skills and abilities in one place.

## What is it about?
At it's core, this project is simply an online book store. Of course an examplary one.
Nothing is really sold there, but it's an application working on the cloud. So let's see how it's built...

## What technologies does it use?
I haven't used a hundreds of JS libraries but instead have used fundamental technologies and built everything upon them:
### Virtual DOM: Powered by React.js
- More than 20 components have currently been designed and more to come.
- Costume TextInputs, MultiSelects, Navbar, Hamburger Button, A very responsive nav, A costume Theme Switching Button created by CSS and React and many more...
### Design is not how it looks, but how it works: CSS 3 & SCSS & Styled JSX & CSS Modules import
- By SCSS powerful variables and hirarchical scopes which make it easier to maintain component designation.
- Using CSS 3 Flexbox, Shadows, Transitions and many other properties brought the application to life.
- Theme injection has been done using Next.js' support of styled JSX tags.
- CSS modules make it no pain to create styles with no confilctions.
### State Management: React.js Contexts
- 4 Contexts have currently been created which make the entire application work in a smooth flow.
- As the APIs are currently under developmentr after their completion other contexts will be added for fetching datas.
### Serverless in nature: Next.js Routing & Next.js API Routes & Netlify Authentication
- No need to wire an entire server. By the routes the application works as an SPA and the APIs will make it able to fetch datas asynchronously. 
- Netlify authentication is used for Email registration and verification.

## How to run?
- Install Node.js.
- Clone the repository.
- In the root directory type command: ```$ npm i```
- To start the server type commands: ```$ npm run build``` and then ```$ npm run start```
- Or you could simply run it in development mode by typing: ```$ npm run dev```
- Open your browser and head to http://localhost:3000 !
