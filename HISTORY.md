Please fill out this file with your decisions, opinions or improvements.

### Archtecture
- Created the src/ folder and moved pages/, components/, and resources/ into it
- Created server/ folder and inside it made the server.js where my endpoints are, and moved the data/ folder from the resources/ folder to the server/ folder
- Moved the available-cards.json file from the src/resources/cards/ to the server/data/ folder
- Created the _document.js file into the src/pages/ folder to add in it the stylesheets links to resolve a rendering bug, also used the Script tag from next/script at the bottom of the page to resolve the rendering bug as well
- Made the src/resources/constants/urls.js to store the base url path
  
### Back-End  
- Installed the Express framework to implement the API
- Created the GET plans endpoint using the url: localhost:3000/plans
- Created the POST New plan sign endpoint using the url: localhost:3000/signplan
- Created the requests.rest file to manually test the endpoints
- Changed the npm run dev and npm run start scripts in the package.json, in order that my app starts from the server not from the client
- Installed the uuid library to generate unique Ids
- Installed the body-parser library to cast the JSON info from the body to a common object to use it in the POST endpoint

### Front-End
- Created the src/components/individualCard/index.jsx -> component to render the Individual plans info
- Created the src/components/bundleCard/index.jsx -> component to render the Bundle plans info
- Installed the react-hook-form library in order to validate the inputs before send this info to the API
- installed the axios library to make easier do the API calls

### Tests  
- Changed the react version from React@17.0.2 to React@18.0.0 in order to install the testing library JEST
- Installed Jest and React testing library
- Made the tests/ folder and the index.test.jsx file to do the tests of the home page
- Added the test script in package.json
- Created and setted up the jest.config.js and the jest.setup.js files