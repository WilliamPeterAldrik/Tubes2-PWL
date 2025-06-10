const dataKeuangan = [
    {
        id: 1,
        nama: 'Pemasukan',
        jumlah: 5000000,
        tanggal: '2023-10-01',
        keterangan: 'Gaji Bulanan'
    },
]
class Keuangan {
    constructor(){

    }

    all() {
        return dataKeuangan;
    }
    
    save(dataKeuanganBaru) {
        dataKeuangan.push(dataKeuanganBaru);
    }
}

module.exports = Keuangan;