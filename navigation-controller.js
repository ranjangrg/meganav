"use strict";

/**
 * Represents a book.
 * @constructor
 * @param {string} headerElemId - Element id of the header mega-nav-header root element
 */
class NavigationController {
    constructor(headerElemId) {
        if ((headerElemId === undefined) || (headerElemId === null)) {
            throw new Error("[ ERR ] Header element id not valid!");
        }
        this.rootHeaderEl = document.getElementById(headerElemId);
        if ((this.rootHeaderEl === undefined) || (this.rootHeaderEl === null)) {
            throw new Error(`[ ERR ] Header element with id '${headerElemId}' not found!`);
        }
        this.mainNavWrapperEl = this.rootHeaderEl.querySelector("#main-nav__nav");
        this.mainMenuToggleBtnEl = this.rootHeaderEl.querySelector(".mega-menu__menu-btn-wrapper .mega-menu__menu-btn");
        this.subNavTitleBtnElList = this.mainNavWrapperEl.querySelectorAll(".sub-nav__wrapper .sub-nav__nav-back-btn");
        this.subNavCloseBtnElList = this.mainNavWrapperEl.querySelectorAll(".sub-nav__wrapper .sub-nav-close-btn");

        if (this.rootHeaderEl) {
            this.attachEventListeners();
        }
    }

    /** Attach necessary event listeners to the interactive elements related to navigation. */
    attachEventListeners() {
        let rootControllerObj = this;

        // attaching onclick events to menu control buttons/links
        this.mainMenuToggleBtnEl.addEventListener("click", function (e) {
            this.menuBtnHandler(this.mainMenuToggleBtnEl);
        }.bind(rootControllerObj));

        // attaching onclick events to all nav-title buttons/links
        this.subNavTitleBtnElList.forEach(function (subNavTitleBtnEl, key) {
            subNavTitleBtnEl.addEventListener("click", function (e) {
                this.closeSubMenu(subNavTitleBtnEl);
            }.bind(rootControllerObj));
        });
        this.subNavCloseBtnElList.forEach(function (subNavCloseBtnEl, key) {
            subNavCloseBtnEl.addEventListener("click", function (e) {
                this.closeSubMenu(subNavCloseBtnEl);
            }.bind(rootControllerObj));
        });

        // ataching main-links event listeners
        this.mainNavWrapperEl.querySelectorAll(".li-item.has-sub-nav > .nav-link").forEach(function (mainLinkItem, key) {
            mainLinkItem.addEventListener("click", function (e) {
                e.preventDefault();
                let isOpen = mainLinkItem.getAttribute("aria-expanded") === "true";
                if (isOpen) {
                    this.closeSubMenu(mainLinkItem);
                } else {
                    this.showSubMenu(mainLinkItem);
                }
            }.bind(rootControllerObj));
        });
    }

    /** Closes all opened submenus by running "closeSubMenu()" method on opened navs. */
    closeAllOpenedSubmenus() {
        let rootControllerObj = this;
        this.mainNavWrapperEl.querySelectorAll(".main-nav__nav-ul .li-item.has-sub-nav [aria-expanded='true']").forEach(this.closeSubMenu.bind(rootControllerObj));
    }

    menuBtnHandler(btnElem) {
        let isOpen = btnElem.getAttribute("aria-expanded") === "true";
        if (isOpen) {
            // if main-menu is open, close the menu
            this.closeMainMenu(btnElem);
        } else {
            // if main-menu is not open, open the menu
            this.showMainMenu(btnElem);
        }
    }

    showMainMenu(btnElem) {
        document.documentElement.style.overflow = "hidden"; // block scrolling on body
        this.mainNavWrapperEl.classList.add("nav__open");
        btnElem.setAttribute("aria-expanded", "true");
        btnElem.querySelector("i").classList.remove("fa-bars");
        btnElem.querySelector("i").classList.add("fa-xmark");
    }

    closeMainMenu(btnElem) {
        document.documentElement.style.overflow = "revert"; // unblock scrolling on body
        this.closeAllOpenedSubmenus();  // close the opened submenu(s) first
        this.mainNavWrapperEl.classList.remove("nav__open");
        btnElem.setAttribute("aria-expanded", "false");
        btnElem.querySelector("i").classList.add("fa-bars");
        btnElem.querySelector("i").classList.remove("fa-xmark");
    }

    showSubMenu(mainLinkItem) {
        /**
         * WARNING: uses "closest()"
        **/
        let isOpen = mainLinkItem.getAttribute("aria-expanded") === "true";
        if (isOpen) { return; }

        this.closeAllOpenedSubmenus();  // close the opened submenu(s) first
        document.documentElement.style.overflow = "hidden"; // block scrolling on body

        let subMenuWrapperElId = mainLinkItem.getAttribute("aria-controls");
        let mainNavListItemEl = mainLinkItem.closest(".main-nav__nav-ul .li-item.has-sub-nav");
        let mainNavLinkItemEl = mainNavListItemEl.querySelector(`[aria-controls="${subMenuWrapperElId}"]`);
        let subMenuWrapperEl = document.getElementById(subMenuWrapperElId);
        let closeSubNavBtnNodeList = subMenuWrapperEl.querySelectorAll(".sub-nav__nav-back-btn, .sub-nav-close-btn");

        this.mainNavWrapperEl.classList.add("subnav__open");  // bring submenu out-of-view
        subMenuWrapperEl.classList.add("nav__open");
        mainNavListItemEl.classList.add("active");
        mainLinkItem.setAttribute("aria-expanded", "true");
        mainNavLinkItemEl.setAttribute("aria-expanded", "true");
        closeSubNavBtnNodeList.forEach(function (closeSubNavBtnEl, key) {
            closeSubNavBtnEl.setAttribute("aria-expanded", "true");
        });
    }

    closeSubMenu(mainLinkItem) {
        /**
         * WARNING: uses "closest()"
        **/
        let isClosed = mainLinkItem.getAttribute("aria-expanded") === "false";
        if (isClosed) { return; }

        document.documentElement.style.overflow = "revert"; // unblock scrolling on body

        let subMenuWrapperElId = mainLinkItem.getAttribute("aria-controls");
        let mainNavListItemEl = mainLinkItem.closest(".main-nav__nav-ul .li-item.has-sub-nav");
        let mainNavLinkItemEl = mainNavListItemEl.querySelector(`[aria-controls="${subMenuWrapperElId}"]`);
        let subMenuWrapperEl = document.getElementById(subMenuWrapperElId);
        let closeSubNavBtnNodeList = subMenuWrapperEl.querySelectorAll(".sub-nav__nav-back-btn, .sub-nav-close-btn");

        this.mainNavWrapperEl.classList.remove("subnav__open");  // bring submenu out-of-view
        subMenuWrapperEl.classList.remove("nav__open");
        mainNavListItemEl.classList.remove("active");
        mainLinkItem.setAttribute("aria-expanded", "false");
        mainNavLinkItemEl.setAttribute("aria-expanded", "false");
        closeSubNavBtnNodeList.forEach(function (closeSubNavBtnEl, key) {
            closeSubNavBtnEl.setAttribute("aria-expanded", "false");
        });
    }
}

//export default NavigationController;
