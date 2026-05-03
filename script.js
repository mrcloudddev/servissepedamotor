// GANTI URL CSV GOOGLE SHEETS ANDA DI BAWAH INI
const csvUrl = 'URL_PUBLISH_CSV_ANDA_DISINI';

async function loadData() {
    try {
        const response = await fetch(csvUrl);
        const csvData = await response.text();
        const rows = csvData.split('\n').slice(1);
        
        const tbody = document.getElementById('dataBody');
        tbody.innerHTML = '';

        rows.forEach(row => {
            const cols = row.split(',');
            if (cols.length >= 5) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cols[0] || '-'}</td>
                    <td>${cols[1] || '-'}</td>
                    <td>${cols[2] || '-'}</td>
                    <td>${cols[3] || '-'}</td>
                    <td>${cols[4] || '-'}</td>
                    <td><strong>Rp ${Number(cols[5] || 0).toLocaleString('id-ID')}</strong></td>
                `;
                tbody.appendChild(tr);
            }
        });

        document.getElementById('loading').style.display = 'none';
        document.getElementById('tableServis').style.display = 'table';
    } catch (e) {
        document.getElementById('loading').innerHTML = 'Gagal memuat data. Periksa URL CSV Anda.';
        console.error(e);
    }
}

document.getElementById('btnSimpan').addEventListener('click', () => {
    alert('Fitur simpan memerlukan integrasi Web App URL dari Google Apps Script.');
});

if(csvUrl !== 'URL_PUBLISH_CSV_ANDA_DISINI') {
    loadData();
} else {
    document.getElementById('loading').innerHTML = 'Silakan isi URL CSV di script.js';
}
