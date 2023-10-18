// Toggle class active utk hamburger menu
const isiNavbar = document.querySelector('.isinavbar');
// ketika hamburger menu diklik
document.querySelector('#hamburger-menu').onclick = () => {
    isiNavbar.classList.toggle('active');
};

// Toggle class active utk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
// ketika
document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focis();
    e.preventDefault();
};

// Toggle class active utk login form
const loginForm = document.querySelector('.login-form');
// ketika login diklik
document.querySelector('#profil-menu').onclick = (e) => {
    loginForm.classList.toggle('active');
    loginBox.focis();
    e.preventDefault();
};