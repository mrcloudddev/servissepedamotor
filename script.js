// Ganti dengan URL Web App dari langkah di atas
const webAppUrl = 'https://script.google.com/macros/s/AKfycbwl1MWCsUdHLGYUCWRxRGU5sMEzp6LvJGN07Nijrzygk00FVmgrRzDukKqvvevYptgl/exec';

document.getElementById('btnSimpan').addEventListener('click', async () => {
    const data = {
        nama: document.getElementById('nama').value,
        motor: document.getElementById('motor').value,
        keluhan: document.getElementById('keluhan').value,
        biaya: document.getElementById('biaya').value
    };

    // Validasi sederhana
    if(!data.nama || !data.motor) return alert("Mohon isi minimal Nama dan Motor");

    try {
        const response = await fetch(webAppUrl + "?" + new URLSearchParams(data), {
            method: 'POST'
        });
        alert('Data berhasil disimpan ke Spreadsheet!');
        location.reload(); // Refresh untuk melihat data baru
    } catch (error) {
        console.error(error);
        alert('Gagal menyimpan data.');
    }
});
