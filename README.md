# React boilerplate with basic functionalities, based on CRA:

- Login field
- Store login data at localStorage (can be easily changed with cookies)
- Material UI Template + Mobile view
- Handling of authentications and authorizations: Public, LoggedIn, Admin, permissions, roles
- Basic routes that use the Authorizations
- Helpers to support connection and other functionalities
- SEO Optimized meta tags (With react helmet)
- Basic translation using i18n with two translation files - english and german

## Installation

```
yarn install
```

## Start

In the project directory, you can run:

```
yarn start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Make a build

```
yarn build
```

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More about CRA

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


## Short Documentation and Structure

- [Handling User Login](###Handling-User-Login)

### Handling User Login and Authorization

The whole user registration is handled in the UserContext file (/contexts/UserContext.js) using the  local storage of the browser to store the userData and the language variables. After login the user data is stored in the localstorage. When the app starts the context loads automatically the user data from the local storage. You can store also the login token in local storage or in cookies, depending on the way you want to handle your system. 

#### userData:

| userData field  | Type |
| ------------- | ------------- |
| loggedIn  | Boolean  |
| isAdmin  | Boolean  |
| roles  | Array  |
| permissions  | Array  |

The system checks after login if the user has role 'admin' in roles, but can be easily changed according any demand.

The language field is of type string uses the ISO 639 language codes.

userData can be checked via hooks:

´import { UserContext } from '../../contexts/UserContext';
const { userData } = useContext(UserContext);

...
<Authorized>
 <SomeOtherComponents />
</Authorized>

´

but I recommend to use the <Authorized /> Component. 


| Authorized props  | Type | Description |
| ------------- | ------------- | ------------- |
| authenticated  | Boolean  | Children will be rendered only if user is logged in  |
| adminOnly  | Boolean  | Children will be rendered only if user is admin  |
| publicOnly  | Boolean  | Children will be rendered only if user is not logged in  |
| allowedRoles  | Array  | Children will be rendered only if user has some of the roles in the array |
| allowedPermissions  | Array  | Children will be rendered only if user has permission that is included in the array |

