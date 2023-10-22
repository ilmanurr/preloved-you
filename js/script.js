// Toggle class active untuk hamburger menu
const isiNavbar = document.querySelector('.isinavbar');
// Ketika hamburger menu diklik
document.querySelector('#hamburger-menu').onclick = () => {
    isiNavbar.classList.toggle('active');
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
// Ketika search button diklik
document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

// Toggle class active untuk login form
const loginForm = document.querySelector('.login-form');
// Ketika profil menu diklik
document.querySelector('#profil-menu').onclick = (e) => {
    loginForm.classList.toggle('active');
    loginForm.focus();
    e.preventDefault();
};

// Menutup navigasi jika diklik di luar navigasi
document.body.addEventListener('click', (e) => {
    // Cek apakah yang diklik bukan bagian dari navigasi atau elemen-elemen yang dikecualikan
    if (!e.target.closest('.isinavbar') && 
        !e.target.closest('#hamburger-menu') && 
        !e.target.closest('.search-form') && 
        !e.target.closest('#search-button') && 
        !e.target.closest('.login-form') && 
        !e.target.closest('#profil-menu')) {
        // Tutup navigasi (hilangkan class active)
        isiNavbar.classList.remove('active');
        searchForm.classList.remove('active');
        loginForm.classList.remove('active');
    }
});
