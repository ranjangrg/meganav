/**
Example file for using navigation controller as a module using imports
*/

import NavigationController from "./navigation.js";
// the "NavigationController" class needs to be exported in the source file.

document.addEventListener("DOMContentLoaded", function () {
    // creating the new controller class
    let navController = new NavigationController("custom-header");
});
