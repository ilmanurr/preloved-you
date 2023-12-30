document.addEventListener('DOMContentLoaded', () => {
    // Mengambil data keranjang dari sessionStorage
    const storedCheckoutCart = sessionStorage.getItem('checkoutCart');
    const checkoutCartData = JSON.parse(storedCheckoutCart);

    // Menyimpan data keranjang ke sessionStorage pada halaman checkout.html
    const alamatForm = document.querySelector('.alamat form');
    const produkDipilihContainer = document.querySelector('.produk-dipilih .row-produk-dipilih');
    const totalHargaProduk = document.querySelector('.row-belanja .harga');
    const totalOngkosKirim = document.querySelectorAll('.row-belanja .harga')[1];
    const totalBelanja = document.querySelector('.total-belanja .harga');

    if (checkoutCartData && checkoutCartData.length > 0) {
        // Tampilkan data keranjang di halaman checkout.html

        // Menggunakan map untuk membuat array HTML untuk setiap produk di keranjang
        const produkHTML = checkoutCartData.map((produk) => `
            <div class="produk-checkout">
                <div class="gambar-produk">
                    <img src="${produk.gambar}" alt="${produk.nama}">
                </div>
                <div class="nama-produk">
                    <p class="produk-tittle">${produk.nama}</p>
                </div>
                <div class="harga-produk">
                    <p>${formatRupiah(produk.harga)}</p>
                </div>
                <div class="jumlah-produk">
                    <p>x${produk.jumlah}</p>
                </div>
            </div>
        `).join('');

        // Tampilkan detail produk yang dipilih
        produkDipilihContainer.innerHTML = produkHTML;

        // Display the total quantity dynamically
        const totalQuantityElement = document.getElementById('totalQuantity');
        const totalQuantity = checkoutCartData.reduce((total, prod) => total + prod.jumlah, 0);
        totalQuantityElement.textContent = totalQuantity;

        // Hitung dan tampilkan total harga produk, ongkos kirim, dan total belanja
        const totalHarga = checkoutCartData.reduce((total, prod) => total + prod.harga * prod.jumlah, 0);
        const ongkosKirim = 10000; // Misalnya, ongkos kirim tetap Rp 10.000
        const totalBelanjaHarga = totalHarga + ongkosKirim;

        totalHargaProduk.textContent = `${formatRupiah(totalHarga)}`;
        totalOngkosKirim.textContent = `${formatRupiah(ongkosKirim)}`;
        totalBelanja.textContent = `${formatRupiah(totalBelanjaHarga)}`;
    }

    // Tambahkan event listener untuk form alamat pengiriman jika diperlukan
    if (alamatForm) {
        alamatForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Lakukan sesuatu dengan data alamat pengiriman jika diperlukan
            const namaPenerima = alamatForm.querySelector('input').value;
            const alamatPengiriman = alamatForm.querySelector('textarea').value;

            console.log(`Nama Penerima: ${namaPenerima}`);
            console.log(`Alamat Pengiriman: ${alamatPengiriman}`);
        });
    }

    // Tambahkan event listener untuk tombol bayar jika diperlukan
    const buttonBayar = document.querySelector('.button-bayar button');
    if (buttonBayar) {
        buttonBayar.addEventListener('click', () => {
            // Lakukan sesuatu saat tombol bayar ditekan
            console.log('Proses pembayaran...');
        });
    }

    // Fungsi untuk mengonversi harga ke dalam format Rupiah
    function formatRupiah(angka) {
        let reverse = angka.toString().split('').reverse().join('');
        let ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return `Rp ${ribuan}`;
    }

    // Ambil semua elemen dengan class "harga-produk" pada halaman checkout
    const hargaProdukElements = document.querySelectorAll('.harga-produk p');

    // Iterasi melalui setiap elemen dan mengonversi harganya ke dalam format Rupiah
    hargaProdukElements.forEach((element) => {
        const harga = parseInt(element.innerText.replace('Rp ', '').replace('.', '').replace(',00', ''));
        element.innerText = formatRupiah(harga);
    });

    // Ambil elemen dengan class "totalHarga" pada halaman checkout
    const totalHargaElement = document.querySelector('.row-belanja .harga');

    // Mengonversi total harga ke dalam format Rupiah
    const totalHarga = parseInt(totalHargaElement.innerText.replace('Rp ', '').replace('.', '').replace(',00', ''));
    totalHargaElement.innerText = formatRupiah(totalHarga);

    // Ambil elemen select kurir dan kota
    const selectKurir = document.getElementById('kurir');
    const selectKota = document.getElementById('id');

    // Tambahkan event listener untuk mengubah harga ongkir saat kurir atau kota berubah
    selectKurir.addEventListener('change', updateHargaOngkir);
    selectKota.addEventListener('change', updateHargaOngkir);

    function updateHargaOngkir() {
        // Ambil nilai terpilih dari dropdown kurir dan kota
        const jenisKurir = selectKurir.value;
        const kotaTujuan = selectKota.value;

        // Tentukan harga ongkir berdasarkan jenis kurir dan kota tujuan
        let hargaOngkir = 0;

        switch (jenisKurir) {
            case 'Reguler':
                hargaOngkir = getHargaOngkirReguler(kotaTujuan);
                break;
            case 'Ekonomi':
                hargaOngkir = getHargaOngkirEkonomi(kotaTujuan);
                break;
            case 'Kargo':
                hargaOngkir = getHargaOngkirKargo(kotaTujuan);
                break;
            // Tambahkan case untuk jenis kurir lainnya sesuai kebutuhan

            default:
                hargaOngkir = 0;
                break;
        }

        // Update dan tampilkan total ongkos kirim
        const totalBelanjaHarga = totalHarga + hargaOngkir;
        totalOngkosKirim.textContent = `${formatRupiah(hargaOngkir)}`;
        totalBelanja.textContent = `${formatRupiah(totalBelanjaHarga)}`;
    }

    function getHargaOngkirReguler(kota) {
        // Logika penentuan harga ongkir untuk kurir Reguler berdasarkan kota
        switch (kota) {
            case 'Surabaya':
                return 5000;
            case 'Sidoarjo':
                return 6000;
            case 'Gresik':
                return 7000;
            // Tambahkan case untuk kota lain sesuai kebutuhan
            default:
                return 0;
        }
    }
    
    function getHargaOngkirEkonomi(kota) {
        // Logika penentuan harga ongkir untuk kurir Ekonomi berdasarkan kota
        switch (kota) {
            case 'Surabaya':
                return 4000;
            case 'Sidoarjo':
                return 5000;
            case 'Gresik':
                return 6000;
            // Tambahkan case untuk kota lain sesuai kebutuhan
            default:
                return 0;
        }
    }
    
    function getHargaOngkirKargo(kota) {
        // Logika penentuan harga ongkir untuk kurir Kargo berdasarkan kota
        switch (kota) {
            case 'Surabaya':
                return 10000;
            case 'Sidoarjo':
                return 12000;
            case 'Gresik':
                return 15000;
            // Tambahkan case untuk kota lain sesuai kebutuhan
            default:
                return 0;
        }
    }
    
});
