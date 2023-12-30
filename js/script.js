// Toggle class active untuk hamburger menu
const isiNavbar = document.querySelector('.isinavbar');
// Ketika hamburger menu diklik
document.querySelector('#hamburger-menu').onclick = (e) => {
    isiNavbar.classList.toggle('active');
    e.preventDefault(); // Prevent page scroll when clicking the hamburger menu
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
// Fungsi untuk menutup navigasi
function closeNavigation() {
    isiNavbar.classList.remove('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
}

// Event listener untuk menutup navigasi saat klik di luar
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if (!e.target.closest('.isinavbar') &&
            !e.target.closest('#hamburger-menu') &&
            !e.target.closest('.search-form') &&
            !e.target.closest('#search-button') &&
            !e.target.closest('.login-form') &&
            !e.target.closest('#profil-menu')) {
            closeNavigation();
        }
    });
});

// Modal Box
const itemDetailButtons = document.querySelectorAll('.detail-produk');

itemDetailButtons.forEach((btn, index) => {
    btn.onclick = (e) => {
        const itemDetailBoxes = document.querySelectorAll('.detail-box');
        if (itemDetailBoxes.length > index) {
            itemDetailBoxes[index].style.display = 'flex';
        }
        e.preventDefault();
    };
});

// Ketika diklik tombol close
document.querySelectorAll('.close-icon').forEach((closeIcon) => {
    closeIcon.onclick = (e) => {
        const itemDetailBoxes = document.querySelectorAll('.detail-box');
        itemDetailBoxes.forEach((box) => {
            box.style.display = 'none';
        });
        e.preventDefault();
    };
});

// Ketika klik di luar modal
window.onclick = (e) => {
    const itemDetailBoxes = document.querySelectorAll('.detail-box');
    itemDetailBoxes.forEach((box) => {
        if (e.target === box) {
            box.style.display = 'none';
        }
    });
};

// detail image
document.addEventListener("DOMContentLoaded", function () {
    var slideIndex = 1; 

    var modals = document.querySelectorAll('.detail-box-container');
    
    modals.forEach(function (modal) {
        showSlides(slideIndex, modal);

        var prevBtn = modal.querySelector("#prevBtn");
        var nextBtn = modal.querySelector("#nextBtn");

        prevBtn.addEventListener("click", function () {
            plusSlides(-1, modal);
        });

        nextBtn.addEventListener("click", function () {
            plusSlides(1, modal);
        });
    });

    function plusSlides(n, modal) {
        showSlides((slideIndex += n), modal);
    }

    function showSlides(n, modal) {
        var i;
        var slides = modal.querySelectorAll('.slide-img');

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }

        slides[slideIndex - 1].style.display = 'flex';
    }
});

// Ketika menambahkan produk ke keranjang
let iconCart = document.querySelector('#shopping-cart-button'); 
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');

iconCart.addEventListener('click', (e) => { 
    body.classList.toggle('showCart')
    e.preventDefault();
}) 
 
closeCart.addEventListener('click', (e) => { 
    body.classList.toggle('showCart')
    e.preventDefault();
}) 

// Inisialisasi shopping cart sebagai array kosong
let shoppingCart = [];

// Fungsi untuk menambahkan produk ke keranjang
function tambahkanProdukKeKeranjang(nama, harga) {
    const gambar = `image/${nama.replace(/\s+/g, '-').toLowerCase()}.jpg`;

    const produkIndex = shoppingCart.findIndex((produk) => produk.nama === nama);

    if (produkIndex !== -1) {
        shoppingCart[produkIndex].jumlah += 1;
    } else {
        const newProduk = {
            nama: nama,
            harga: harga,
            jumlah: 1,
            gambar: gambar
        };

        shoppingCart.push(newProduk);
    }

    tampilkanShoppingCart();
}

// Fungsi untuk menyimpan keranjang belanja ke localStorage
function simpanKeranjangKeLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

// Fungsi untuk memuat keranjang belanja dari localStorage
function muatKeranjangDariLocalStorage() {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart);
        tampilkanShoppingCart();
    }
}

document.addEventListener('DOMContentLoaded', muatKeranjangDariLocalStorage);

// Fungsi untuk mengonversi harga ke dalam format Rupiah
function formatRupiah(angka) {
    let reverse = angka.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return `Rp ${ribuan}`;
}

// Fungsi untuk menampilkan shopping cart di UI
function tampilkanShoppingCart() {
    const shoppingCartContainer = document.querySelector('.all-cart-list');
    shoppingCartContainer.innerHTML = '';

    shoppingCart.forEach((produk) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-list');

        cartItem.innerHTML = `
            <div class="items">
                <div class="image-produk">
                    <img src="${produk.gambar}" alt="${produk.nama}">
                </div>
                <div class="nama-produk">
                    ${produk.nama}
                </div>
                <div class="totalHarga">
                    ${formatRupiah(produk.harga * produk.jumlah)}
                </div>
                <div class="jumlah-produk">
                    <span class="minus">-</span>
                    <span>${produk.jumlah}</span>
                    <span class="plus">+</span>
                </div>
            </div>
        `;

        shoppingCartContainer.appendChild(cartItem);

        const minusButton = cartItem.querySelector('.minus');
        const plusButton = cartItem.querySelector('.plus');

        minusButton.addEventListener('click', () => kurangiJumlahProduk(produk));
        plusButton.addEventListener('click', () => tambahJumlahProduk(produk));
    });

    const iconCartSpan = document.querySelector('#icon-cart-span');
    iconCartSpan.innerText = shoppingCart.reduce((total, produk) => total + produk.jumlah, 0);

    const totalHarga = shoppingCart.reduce((total, produk) => total + (produk.harga * produk.jumlah), 0);
    console.log(`Total Harga: ${formatRupiah(totalHarga)}`);
    simpanKeranjangKeLocalStorage();
}

// Fungsi untuk mengurangi jumlah produk di keranjang
function kurangiJumlahProduk(produk) {
    if (produk.jumlah > 1) {
        produk.jumlah -= 1;
    } else {
        const index = shoppingCart.findIndex((p) => p === produk);
        shoppingCart.splice(index, 1);
    }
    tampilkanShoppingCart();
    updateCheckoutQuantities(produk.nama, produk.jumlah);
}

// Fungsi untuk menambah jumlah produk di keranjang
function tambahJumlahProduk(produk) {
    produk.jumlah += 1;
    tampilkanShoppingCart();
    updateCheckoutQuantities(produk.nama, produk.jumlah);
}

// Fungsi untuk memperbarui jumlah produk di localStorage
function updateCheckoutQuantities(namaProduk, jumlahProduk) {
    const checkoutQuantities = JSON.parse(localStorage.getItem('checkoutQuantities')) || [];
    const index = checkoutQuantities.findIndex((produk) => produk.nama === namaProduk);

    if (index !== -1) {
        checkoutQuantities[index].jumlah = jumlahProduk;
    } else {
        checkoutQuantities.push({ nama: namaProduk, jumlah: jumlahProduk });
    }

    localStorage.setItem('checkoutQuantities', JSON.stringify(checkoutQuantities));
}

// Mengaktifkan event listener untuk tombol "Masukkan ke keranjang"
const masukkanKeranjangButtons = document.querySelectorAll('.masukkan-keranjang');

masukkanKeranjangButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const produkContainer = button.closest('.list-produk');
        const produkTittle = produkContainer.querySelector('.produk-tittle').innerText;
        const produkHargaElement = produkContainer.querySelector('.produk-price');
        const produkHarga = parseInt(produkHargaElement.innerText.replace('Rp ', '').replace('.', '').replace('k', ''));

        tambahkanProdukKeKeranjang(produkTittle, produkHarga);

        e.preventDefault();
    });
});

// Mengaktifkan event listener untuk tombol "Masukkan ke keranjang" pada modal
const masukkanKeranjangButtons2 = document.querySelectorAll('.produk-button .masukkan-keranjang');

masukkanKeranjangButtons2.forEach((button) => {
    button.addEventListener('click', (e) => {
        const modal = button.closest('.konten-produk');
        const produkTittle = modal.querySelector('.produk-tittle').innerText;
        const produkHargaElement = modal.querySelector('.produk-price');
        const produkHarga = parseInt(produkHargaElement.innerText.replace('Rp ', '').replace('.', '').replace('k', ''));

        tambahkanProdukKeKeranjang(produkTittle, produkHarga);

        e.preventDefault();
    });
});

// Mengaktifkan event listener untuk tombol "Checkout"
const checkoutButton = document.querySelector('.check-out a');

checkoutButton.addEventListener('click', (e) => {
    const storedCart = localStorage.getItem('shoppingCart');
    const cartData = JSON.parse(storedCart);

    sessionStorage.setItem('checkoutCart', JSON.stringify(cartData));
});

