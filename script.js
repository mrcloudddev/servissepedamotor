// 1. PASTIKAN URL INI ADALAH URL "PUBLISH TO WEB" DENGAN FORMAT .CSV
const csvUrl = 'https://script.google.com/macros/s/AKfycbwl1MWCsUdHLGYUCWRxRGU5sMEzp6LvJGN07Nijrzygk00FVmgrRzDukKqvvevYptgl/exec';

async function loadData() {
    try {
        const response = await fetch(csvUrl);
        
        // Cek jika respon gagal
        if (!response.ok) throw new Error('Gagal mengambil data');
        
        const csvData = await response.text();
        const rows = csvData.split('\n');
        
        const tbody = document.getElementById('dataBody');
        tbody.innerHTML = '';

        // Mulai dari baris 1 (lewati header)
        for (let i = 1; i < rows.length; i++) {
            // Menggunakan regex agar pembacaan koma di dalam teks (jika ada) tidak error
            const cols = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            
            if (cols.length >= 4 && cols[1].trim() !== "") {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cols[0] || '-'}</td>
                    <td>${cols[1] || '-'}</td>
                    <td>${cols[2] || '-'}</td>
                    <td>${cols[3] || '-'}</td>
                    <td>${cols[4] || 'Proses'}</td>
                    <td><strong>Rp ${Number(cols[5] || 0).toLocaleString('id-ID')}</strong></td>
                `;
                tbody.appendChild(tr);
            }
        }

        // Sembunyikan loading dan tampilkan tabel
        document.getElementById('loading').style.display = 'none';
        document.getElementById('tableServis').style.display = 'table';
        
    } catch (e) {
        document.getElementById('loading').innerHTML = '❌ Gagal memuat data. Pastikan URL CSV benar dan sudah di-Publish to Web.';
        console.error("Detail Error:", e);
    }
}

// Jalankan fungsi saat halaman dibuka
loadData();
