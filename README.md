# Astronomy Photo App

An Instagram / Pinterest clone that uses NASA's APOD API to browse astronomy photos. This is a single page app running on the MERN stack.
It is an improvement to my second project for General Assembly's Software Engineering Immersive Flex program.

Original frontend project on Github:
https://github.com/berwyntan/astronomy-photo-app

## Libraries / API Used - Frontend

- [NASA APOD API](https://github.com/nasa/apod-api)

- [React built using ViteJS](https://vitejs.dev/)
- [React router](https://reactrouter.com/en/main)
- [React datepicker](https://www.npmjs.com/package/react-datepicker)
- [React loader spinner](https://www.npmjs.com/package/react-loader-spinner)
- [Axios](https://github.com/axios/axios)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [DayJS](https://day.js.org/)
- [Lodash](https://lodash.com/)
- [Lozad](https://apoorv.pro/lozad.js/)

---

## Features

### - Latest or random photos
- View the latest photos (Latest mode)
- View random photos (Shuffle mode)

### - Feed or grid view
While in latest or shuffle mode, you can view the photos either in:
- Feed mode, like Instagram
- Grid mode, like Pinterest

### - Mode switch retains last moused over post
When the user is scrolling through a lot of photos and wishes to switch between feed and grid, the last viewed photo will be lost as the height of the HTML body differs with feed and grid mode.

This is worked around with Javascript and HTML. When there is a mode switch, the last interacted post will appear in the window. ([Code](#last-interacted-post))

<img src="https://imgur.com/yvd7Ekm" alt="handle-last-interaction" width="400">

### - Infinite scroll
Like all social media apps, this app has infinite scroll and you can keep scrolling down to see more photos. ([Code](#infinite-scroll))

<img src="https://imgur.com/lGpANdO" alt="infinite-scroll" width="400">

### - Search by date
APOD releases a new photo everyday, since 1996. You can search a photo by date. Besides searching for that photo, the app will also show the ten previous photos before the search date. Infinite scroll is also enabled in search mode.

<img src="https://imgur.com/dvXY6JT" alt="search" width="400">

### - Authentication
Users can sign up and login to save likes and albums, and set a custom profile photo.
The app is still accessible without login, except for the functionality of saving likes and albums. 

<img src="https://imgur.com/oTc1Fgr" alt="cypress" width="400">

### - Custom likes and albums
You can like a photo or save it to an album. Albums have customized names and can be renamed or deleted. If a photo has already been liked or saved on an album, it cannot be saved again. Likes and albums are stored on MongoDB and will be retrieved when signed in.

### - Persistent login using HTTP only cookies
Upon authentication, the server issues a HTTP only cookie that expires in 2 days. Whenever the user refreshes the app, the server checks the JWT before allowing access to the protected routes.

If the server successfully verifies the JWT, it will send the user information to the client side (excluding the password). Client side protects routes by checking whether the state `authDetails` contains any user info.

### - Individual routes
Routes for every page, that are accessible when page is refreshed or url is typed in.

### - Automated testing
Some automated testing using Cypress, like checking infinite scroll and search.

<img src="https://imgur.com/7Io1YQx" alt="cypress" width="400">

### - Responsive design (desktop only) + Light and dark mode compatible

<img src="https://imgur.com/4ztmQBn" alt="responsive" width="400">

The app will display light or dark mode depending on your system preferences. However you cannot toggle between light and dark mode on the app. That means having to set dark mode CSS for every element.

<img src="https://imgur.com/nK87sLw" alt="light-dark-mode" width="400">

---

## Deployment

http://astronomy-app-2.vercel.app/

---

## Wireframe

<img src="https://imgur.com/70nBKfQ" alt="wireframe" width="600">

*Figure 1: Wireframe*

## Component Design

<img src="https://imgur.com/vNpiqDP" alt="component-design">

*Figure 2: Component Hierarchy*

---

## Code

### Infinite scroll

When the browser window is detected to reach the bottom of the document element, an event listener for scrolling will trigger, call the API and push new posts to the document element.

However, there are rounding errors sometimes when calculating `scrollTop`. Then the listener would not trigger the API call. So I added `Math.floor` and `Math.ceil` to round the `scrollTop` calculation.

The next issue is that the API will call multiple times upon reaching the bottom. The `debounce` function from Lodash is used to fix this issue. The app may receive multiple triggers to call the API, but it will wait for 800ms before calling the API once. Once the API is triggered, the state `mode.isLoading` will be true and the API cannot be called again too. 

The API called will depend on the mode state. `mode.random` will `callApiRandom()`. The other modes will `callApiByDate()`.

The event listener is placed in a `useEffect` hook with a cleanup function to `removeEventListener`.

    useEffect(() => {
        const handleScroll = event => {
                
        if (mode.saves === false) {
            if (Math.floor(document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight) {

                mode.random && mode.isLoading === false ? callApiRandom() : callApiByDate()
                return

            } else if (Math.ceil(document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight) {

            mode.random && mode.isLoading === false ? callApiRandom() : callApiByDate()
            return

            } else if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {

            mode.random && mode.isLoading === false ? callApiRandom() : callApiByDate()
            return

            }}  
        };

    const debounceHandleScroll = debounce(handleScroll, 800)

    window.addEventListener('scroll', debounceHandleScroll);

    return () => {
        window.removeEventListener('scroll', debounceHandleScroll);
        };
    })


### Last interacted post

Early versions of this app was not able to keep track of the last interacted posts. I could be viewing a post near the bottom of the body but when I switched from feed to grid view, my window will be at the top of the body. This is disorienting for the user.

To work around this, every post element has its own id, which is the date of the post. Since APOD publishes 1 photo a day, the date is unique (unless the same post appears twice in random mode, which is an edge case). When the mouse goes over a post element, the id of that element is updated to the state `lastInteraction`. 

On switching mode, the app will use `getElementById` to search for the last moused over post element and scroll to it using `scrollIntoView()`.

This code is placed in a `useEffect` hook with the state `feedView` as the dependency array. `feedView` is a boolean which controls whether the app is displaying feed view or grid view.


    // Id is set in the element with a mouseOver listener
    <div 
        id={`${item?.date}`} 
        onMouseOver={() => handleInteraction(item?.date)} 
    >...</div>


    // the date which is the id is lifted from the element to App.jsx
    const handleInteraction = id => {    
        setLastInteraction(id);
    }  


    // useEffect hook will trigger when feedView changes
    useEffect(() => {    
        document.getElementById(lastInteraction)?.scrollIntoView();
    }, [feedView])


---

### References
Infinite scroll using debounce:
https://www.digitalocean.com/community/tutorials/react-react-infinite-scroll

Debounce function:
https://timmousk.com/blog/lodash-debounce/

Fixing the rounding error for infinite scroll:
https://stackoverflow.com/questions/45585542/detecting-when-user-scrolls-to-bottom-of-div-with-react-js

Airtable API error: TypeError: Cannot read property 'offset' of undefined
https://github.com/Airtable/airtable.js/issues/246

Passing functions with useContext:
https://stackoverflow.com/questions/62366824/how-can-%C4%B1-pass-function-with-state-for-react-usecontext

Individual routes when deploying on Vercel:
https://stackoverflow.com/questions/64815012/why-does-react-router-not-works-at-vercel

Setting up the server using Express, authentication using JWTs for both client and server:
https://www.youtube.com/c/DaveGrayTeachesCode

Testing infinite scroll with Cypress:
https://stackoverflow.com/questions/56601826/cypress-testing-how-to-compare-count-of-elements-before-after-ajax-call