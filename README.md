# React boilerplate with basic functionalities, based on Vite:

- Login field
- Store login data at localForage (can be easily changed with cookies)
- Material UI Template + Mobile view
- Handling of authentications and authorizations: Public, LoggedIn, Admin, permissions, roles
- Basic routes that use the Authorizations
- Helpers to support connection and other functionalities
- SEO Optimized meta tags (react helmet)
- Translation using i18n with two translation files - english and german
- Error handling and more
- Using aliases for the main component directories `@/components` and `@/screens`

## Requirements
- NodeJS > 12
- Yarn > 1.22

## Installation

```
yarn install
```

## Start

You can adjust the `.env` in the Root-Directory for your needs (e.g. the Port where the Server will run).
In the project directory, you can run:

```
yarn start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
> If you change the Port in .env, use the port you entered there.

The page will reload if you make edits. You will also see any lint errors in the console.

### Make a build

```
yarn build
```

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

**Your app is ready to be deployed!**

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Short Documentation and Structure

- [Handling User Login](#handling-user-login-and-authorization)
- [Routing](#routing)
- [Custom input fields and validation](#custom-input-fields-and-validation)

### Handling User Login and Authorization

The whole user registration is handled in the user recoil store file `/users/stores/userStore.js`.
After login the user data is stored in `localForage` which is an build-in asynchronous data storage.
When the app starts, recoil (state management) automatically loads the user data from the localForage.
You can decide between storing the login token into this data storage, or in a cookie.

#### userData:

| userData field  | Type |
| ------------- | ------------- |
| loggedIn  | Boolean  |
| isAdmin  | Boolean  |
| roles  | Array  |
| permissions  | Array  |


After login, the system checks if the user is member of an `admin`-role.
It also can be easily changed according any demand, but I recommend to use the `<Authorized />` Component.

| Authorized props  | Type | Description |
| ------------- | ------------- | ------------- |
| authenticated  | Boolean  | Children will be rendered only if user is logged in  |
| adminOnly  | Boolean  | Children will be rendered only if user is admin  |
| publicOnly  | Boolean  | Children will be rendered only if user is not logged in  |
| allowedRoles  | Array  | Children will be rendered only if user has some of the roles in the array |
| allowedPermissions  | Array  | Children will be rendered only if user has permission that is included in the array |

For authorization of routes check following section `Routing`

The language field is of type string uses the ISO 639 language codes.

### Routing

`react-router-dom` is used to handle the basic routing. You'll find all routing components in the `/routes` directory.

Following routing components are available:


| Route Component  | Description |
| ------------- | ------------- |
| Public  | Only for guests available e.g. login fields  |
| Authenticated  | Only for logged-in users available  |

### Custom input fields and validation

All custom inputs are in `components/common/customInputs`

#### Custom fields

Custom fields have been prepared for usage with the material ui components.
The main differences are:

1. On change returns name and value (no need to destruct the `event.target`),
   each component return standard output, even checkboxes.
2. It contains error FormHelperText - if error available, the error just appears in the input field.

For error handling I use  (need to be added) ???


#### Validation and errors

For the validation of textfields you can use the `errorHook`. Methods are used in helpers/Validators

Inputs:

| Attributes  | Type | Description |
| ------------- | ------------- | ------------- |
| values  | Object |  The object with fields that need to be validates e.g. `{ email, password }`  |
| validations  | Object | Validation object that has fields like bellow and help to check the values  |
| active  | Boolean | Per default fields are not validated immediately (to be able to validate after submit the form)  |

Outputs:

| Attributes  | Type | Description |
| ------------- | ------------- | ------------- |
| error  | Object |  Object with all errors `{ email: 'error text for email' }`, `null` or `{ general: false }` if there is no error  |
| setCustomError  | Function | Parameter custom error, to replace error with custom error, when e.g. server respond with some error regarding field, e.g. `user does not exist` |
| isError  | Function | Check if errors appears or if field has an error - `isError()` show if errors at all, else `isError('email')` checks if field email contains any errors |

##### How to use:

```JS
import useError from '../../components/validations/hooks/useError';

/*
 Add validations existing in the helpers/Validators, or you can add custom validator with field 'customValidation'
 Important:
   THIS VALIDATOR SHOULD BE OUTSIDE THE COMPONENT,
   otherwise eternal re-rendering will happen.
   If you want to use it inside component, then you should exclude it from the errorHook useEffect depts array!
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
   const [values, setValues] = useState({
    email: '',
    password: '',
   });


   const {
    setCustomError,
    isError,
    getActivateError,
  } = useError({
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

  // .....
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
 // ......
}
```
