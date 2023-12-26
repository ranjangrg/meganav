# Meganav header
Responsive meganav header for webpages (includes JS and CSS)

## Main files
Files that are absolutely necessary for the meganav header to work are:
1. navigation.js (TODO: rename the confusing filename for `navigation-module.js`)
2. navigation.css
And via CDN (or locally hosted), font-awesome library as well, for symbols used for menu and UI buttons.
Then import these 2 files within your page.
```html
<head>
    ...
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    ...
    <link href="/navigation.css" rel="stylesheet" />
    <script src="./navigation.js"></script>
</head>
```
Instantiate the navigation class using the header element id; for example:
```js
document.addEventListener("DOMContentLoaded", function () {
    // create new nav-controller class
    let navController = new NavigationController("custom-header");
});
```

## Using meganav as a module
### Export the `navigation-controller.js`.
```js
...
export default NavigationController;
```
### Import the meganav controller class
```js
import NavigationController from "./navigation-controller.js";

document.addEventListener("DOMContentLoaded", function () {
    // testing new controller class
    let navController = new NavigationController("custom-header");
});
```
### Import the code within html
```html
<html>
    ...
    <body>
        ...
        <script src="./navigation-module.js" type="module"></script>
    </body>
</html>
```
