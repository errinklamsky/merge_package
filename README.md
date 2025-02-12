# 🚀 Merge Package JSON dengan Drag & Drop + Progress Bar  

**Script ini memungkinkan penggabungan dua file `package.json` dengan mudah menggunakan drag & drop.**  
✅ **Otomatis merge dependencies & devDependencies**  
✅ **Auto-hapus `devDependencies` jika kosong**  
✅ **Progress bar animasi biar keren**  
✅ **Output tersimpan di folder `output/`**  

---

## 🔧 Cara Menggunakan  

1. **Clone repo ini**  
   ```bash
   git clone https://github.com/errinklamsky/merge_package.git
   cd merge_package
   ```

2. **Install Node.js jika belum ada**  
   [Download Node.js](https://nodejs.org/)

3. **Jalankan script**  
   ```bash
   node merge.js
   ```

4. **Ikuti instruksi di terminal:**  
   - **Drag & drop** file `package.json` pertama → tekan **Enter**  
   - **Drag & drop** file `package.json` kedua → tekan **Enter**  
   - **Tunggu progress bar selesai (0-100%)**  
   - **File hasil merge tersimpan di folder `output/package.json`** 🎉  

---

## 🛠 Contoh Penggunaan  
💡 **Misalnya ada dua file:**  

- **`package-old.json`**  
  ```json
  {
    "dependencies": {
      "express": "^4.18.2"
    }
  }
  ```

- **`package-new.json`**  
  ```json
  {
    "dependencies": {
      "lodash": "^4.17.21"
    },
    "devDependencies": {}
  }
  ```

📌 **Setelah merge, hasilnya di `output/package.json`:**  
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "lodash": "^4.17.21"
  }
}
```
✅ `devDependencies` kosong otomatis dihapus!  

---

## ✨ Fitur  
🔹 **Drag & Drop File** → Gak perlu ketik manual!  
🔹 **Validasi Otomatis** → Cek file sebelum merge  
🔹 **Progress Bar Animasi** → Lihat progresnya secara real-time  
🔹 **Auto-Cleanup** → Hapus `devDependencies` yang kosong  

---

## 💡 Catatan  
- **Pastikan file `package.json` valid** (bukan format lain)  
- Jika terjadi error, cek apakah file memiliki **dependencies atau devDependencies**  
- Output hasil merge selalu tersimpan di **`output/package.json`**  

---

## 📜 Lisensi  
MIT License © 2025  

---

🔥 **Repo ini dibuat untuk mempermudah proses merge package.json!**  
Kalau suka, jangan lupa kasih **⭐ Star** di repo ini ya! 😘🚀
