// Event listener untuk pencarian surat
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Ambil nilai input pencarian
    const searchNoSurat = document.getElementById('searchNoSurat').value.trim().toLowerCase();
    const searchPengirim = document.getElementById('searchPengirim').value.trim().toLowerCase();

    // Ambil data dari localStorage
    const dataList = JSON.parse(localStorage.getItem('dataSurat')) || [];

    // Filter data berdasarkan input pencarian
    const filteredData = dataList.filter((data) => {
        const noSuratMatch = data.noSurat.toLowerCase().includes(searchNoSurat);
        const pengirimMatch = data.pengirim.toLowerCase().includes(searchPengirim);
        
        return noSuratMatch || pengirimMatch;
    });

    // Tampilkan hasil pencarian
    displaySearchResult(filteredData);
});

// Fungsi untuk menampilkan hasil pencarian
function displaySearchResult(dataList) {
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = '<h2>Hasil Pencarian</h2>';
    
    if (dataList.length > 0) {
        dataList.forEach((data, index) => {
            searchResult.innerHTML += `
                <p><strong>Surat ${index + 1}</strong></p>
                <p>No Surat: ${data.noSurat}</p>
                <p>Tanggal Masuk: ${data.tanggalMasuk}</p>
                <p>Pengirim: ${data.pengirim}</p>
                <p>Perihal: ${data.perihal}</p>
                <hr>
            `;
        });
    } else {
        searchResult.innerHTML += '<p>Tidak ada data yang sesuai dengan pencarian Anda.</p>';
    }
}

// Fungsi untuk menampilkan data yang disimpan
function displayData() {
    const output = document.getElementById('output');
    const dataList = JSON.parse(localStorage.getItem('dataSurat')) || [];

    output.innerHTML = '<h2>Data Surat Masuk</h2>';
    dataList.forEach((data, index) => {
        output.innerHTML += `
            <p><strong>Surat ${index + 1}</strong></p>
            <p>No Surat: ${data.noSurat}</p>
            <p>Tanggal Masuk: ${data.tanggalMasuk}</p>
            <p>Pengirim: ${data.pengirim}</p>
            <p>Perihal: ${data.perihal}</p>
            <hr>
        `;
    });
}

// Tampilkan data saat halaman dimuat
document.addEventListener('DOMContentLoaded', displayData);

// Daftarkan Service Worker untuk PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
