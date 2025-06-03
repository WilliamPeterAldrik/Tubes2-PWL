const dataKegiatan =  [
    {
        id: 1,
        nama: "Kegiatan A",
        deskripsi: "Deskripsi Kegiatan A",
        tanggal: "2023-10-01",
        lokasi: "Lokasi A"
    },
]

class Kegiatan {
    constructor() {
        // Inisialisasi jika diperlukan
    }

    all() {
        return dataKegiatan;
    }

    save(dataKegiatanBaru) {
        dataKegiatan.push(dataKegiatanBaru);
    }
}