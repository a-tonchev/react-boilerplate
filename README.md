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
- [Routing](###Handling-Routing)

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

```import { UserContext } from '../../contexts/UserContext';
const { userData } = useContext(UserContext);

...
<Authorized>
 <SomeOtherComponents />
</Authorized>
```

but I recommend to use the <Authorized /> Component. 

| Authorized props  | Type | Description |
| ------------- | ------------- | ------------- |
| authenticated  | Boolean  | Children will be rendered only if user is logged in  |
| adminOnly  | Boolean  | Children will be rendered only if user is admin  |
| publicOnly  | Boolean  | Children will be rendered only if user is not logged in  |
| allowedRoles  | Array  | Children will be rendered only if user has some of the roles in the array |
| allowedPermissions  | Array  | Children will be rendered only if user has permission that is included in the array |

For Authorization of Routes check Routing

### Routing

I use react-router-dom for the basic routing, in the boilerplate you can find all routing components in the /routes directory.

Following routing components are available:


| Route Component  | Description |
| ------------- | ------------- | 
| Public  | Only for guests available e.g. login fields  |
| Authenticated  | Only for logged-in users available  |

### Custom input fields and validation

All custom inputs are in components/common/customInputs

#### Custom fields

Custom fields have been prepared for usage with the material ui components. The main differences are:

1. On change delivers directli name and value (no need to destruct always the event.target), each component delivers standard output, even checkbox
2. It contains error FormHelperText - if error available, the error just appears in the input field.

For error handling I use 


#### Validation and errors

For the textfield validations there is the errorHook, to validate error the methods are used in helpers/Validators

Inputs:

| Attributes  | Type | Description |
| ------------- | ------------- | ------------- | 
| values  | Object |  The object with fields that need to be validates e.g. { email, password }  |
| validations  | Object | Validation object that has fields like bellow and help to check the values  |
| active  | Boolean | Per default fields are not validated immediately, because we want to validate after clicking on send button  |

Outputs:

| Attributes  | Type | Description |
| ------------- | ------------- | ------------- | 
| error  | Object |  Object with all errors { email: 'error text for email' }, null or { general: false } if there is no error  |
| setCustomError  | Function | Parameter custom error, to replace error with custom error, when e.g. server respond with some error regarding field, e.g. user does not exist |
| isError  | Function | Check if errors available or if field has error - isError() show if errors at all, else isError('email') checks if field email contains any errors |

How to use:

```
import useErrorCheck from '../common/customHooks/errorHook';

/* 
 Add validations existing in the helpers/Validators, or you can add custom validator with field 'customValidation'
 Important THIS VALIDATOR SHOULD BE OUTSIDE THE COMPONENT, else eternal re-rendering will happen. If you want to use it inside component, then you should exclude it from the errorHook useEffect depts array!
 */
const validations = {
  email: {
    type: 'isEmail',
    text: 'email.notValid',
  },
  password: [{
    type: 'isEmpty',
    text: 'field.required',
  }],
  terms: {
    type: 'isTrue',
    text: 'field.required',
  },
};

export default function Login() {
   const {
    setCustomError,
    isError,
    getActivateError,
  } = useErrorCheck({
    values,
    validations,
  });

    const login = async () => {
     // Here we activate the error handling - for first time directly after klick on the login button, then all errors will pop-up
     const err = getActivateError();
     if (!err) {
       const user = await Connections.getFakeLogin(values.email);
       if (!user) {
         setCustomError({ email: 'user.notFound' });
       } else {
         loginUser(user);
         // setError(null);
       }
     }
   };

  .....
      // To display directly the error, just pass the isError(fieldName) to the custom component, this will return the error message.
      <CustomTextField
         name="password"
         label="password"
         autoComplete="current-password"
         value={values.password}
         onChange={handleChange}
         onKeyDown={onKeyDown}
         type="password"
         fullWidth
         required
         margin="normal"
         error={isError('password')}
       />
 ......
}
```
