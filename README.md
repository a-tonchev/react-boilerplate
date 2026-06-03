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

---

# Project Structure & Conventions (UIM/VOLVO)

> Team conventions shared with the backend boilerplate (`../rest-api-boilerplate`). The Clean Code rules apply to both projects; everything else here is frontend-specific.

## Clean Code & Consistency (CCC)

### Best practices
- Keep code as simple as possible; favour proven design patterns.
- Use consistent names — we use **camelCase**.
- Use as few comments as possible (best case: none — the code should explain itself).
- A file should have **max ~500 lines** of code (rare exceptions allowed).
- **Reuse before building**: most needs are already covered by existing components, hooks and helpers. Before building a complex feature, discuss it briefly with the team. Always reuse the shared helpers for currency, prices, numbers, rounding, etc.
- In React, **use hooks only — never class components**.

### React namespacing
1. Always camelCase.
2. **lower case** start: directories, hooks, stores, function exports.
3. **Upper case** start: Objects, Enums, Components (class & functional), Helper Objects.
4. A filename starts lower- or upper-case depending on the name of its exported element.
5. The filename matches the name of its default export.

### ESLint & packages
- ESLint enforces code consistency and helps catch issues — keep it green.
- When adding a package: good reputation (many downloads), actively maintained, **small footprint** (check [bundlephobia](https://bundlephobia.com/)), few transitive dependencies. Prefer a small custom solution over a heavy dependency. Periodically run `yarn outdated` / `yarn upgrade` (mind version compatibility).

### Why not TypeScript?
We use plain JavaScript on purpose. For our focus (functionality, performance, fast delivery) TypeScript adds friction: slower development, false errors, slower builds, 3rd-party compatibility issues, larger payloads, harder live debugging and much more config. The few real benefits are covered by **ESLint + a good IDE + PropTypes**.

> **Clean code is not everything.** We follow the Pareto principle — ship a fast, bug-light, nice-looking UX first; the user pays for, and judges, only what they can see. Give your best on the first implementation and avoid endless refactoring once the functionality is 100 % there.

## Project Structure

```
/src/screens     – main components, usually corresponding to a route
/src/components  – all reusable components, organised modularly in sub-directories
```

Both are reachable through path aliases:

```js
import ComponentName from '@/components/someDirectory/ComponentName';
import ScreenName    from '@/screens/someDirectory/ScreenName';
```

## Common Components (prefer reuse)

Before writing new UI or logic, reuse the shared building blocks:

| Component / Hook | Import | Use for |
| ---------------- | ------ | ------- |
| `useError` hook | `@/components/validations/hooks/useError` | Validating form fields (see *Validation and errors* above) |
| Custom inputs | `@/components/inputs/…` | Any kind of form or data input (`CustomTextField`, `CustomSelect`, …) |
| `useValues` hook | `@/components/dataHandling/hooks/useValues` | An intelligent reducer for form / values state |
| Dialogs | `@/components/dialogs/…` | Alerts and confirm messages (`AlertDialog`, `ConfirmDialog`, …) |

## Connections & API

All calls to the backend go through the `Connections` helper layer (`@/components/connections/Connections`) instead of calling `fetch` from components directly — see the login example above (`Connections.getFakeLogin`). This keeps endpoints, the auth-token header (`Bearer {{token}}`) and error handling in one place. The token itself is persisted in the browser's IndexedDB via `localForage`.

## UI library

The boilerplate originally shipped with **Material UI**; the styling has since migrated to **[shadcn/ui](https://ui.shadcn.com/)** (Radix primitives + Tailwind), with the shared primitives living under `@/components/ui`. The custom inputs above wrap these primitives, so feature code stays the same regardless of the underlying library.
