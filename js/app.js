document.getElementById('inputForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Ambil nilai input
    const noSurat = document.getElementById('noSurat').value;
    const tanggalMasuk = document.getElementById('tanggalMasuk').value;
    const pengirim = document.getElementById('pengirim').value;
    const perihal = document.getElementById('perihal').value;

    // Buat object data
    const dataSurat = {
        noSurat,
        tanggalMasuk,
        pengirim,
        perihal
    };

    // Simpan data ke localStorage
    let dataList = JSON.parse(localStorage.getItem('dataSurat')) || [];
    dataList.push(dataSurat);
    localStorage.setItem('dataSurat', JSON.stringify(dataList));

    // Tampilkan hasil di div output
    displayData();

    // Reset form
    document.getElementById('inputForm').reset();
});

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
