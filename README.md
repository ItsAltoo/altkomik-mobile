<div align="center">
  <img src="./assets/images/icon-app.png" alt="AltKomik Logo" width="120" />
  <h1>📚 AltKomik Mobile</h1>
  <p><strong>Aplikasi Baca Komik Modern, Cepat, dan Elegan.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Gluestack_UI-E11D48?style=for-the-badge&logo=react&logoColor=white" alt="Gluestack" />
  </p>
</div>

---

## ✨ Fitur Utama

- 🌙 **Dark Mode Eksklusif**: Tampilan mode gelap yang elegan, dirancang untuk kenyamanan membaca berjam-jam tanpa membuat mata lelah.
- 🔖 **Manajemen Bookmark**: Simpan komik favoritmu dan pantau rilis terbarunya. Terintegrasi dengan akun Google untuk sinkronisasi antar perangkat.
- 📖 **Riwayat Baca Pintar**: Lupa sampai chapter berapa? AltKomik mencatat riwayat bacaanmu secara otomatis dan menyediakan jalan pintas instan untuk melanjutkannya.
- ⚡ **Super Cepat & Responsif**: Dibangun menggunakan arsitektur modern dan *FlashList* demi menghasilkan *scrolling* ribuan komik tanpa hambatan.
- 🔍 **Pencarian Cerdas**: Temukan komik idamanmu dalam hitungan detik melalui antarmuka pencarian yang terintegrasi.
- 📱 **Native-Feel Experience**: Dilengkapi transisi animasi yang mulus, *swipe actions*, dan *toast notifications* yang memberikan kesan aplikasi premium.

---

## 🛠️ Teknologi & Stack

AltKomik Mobile dibangun di atas pondasi teknologi terdepan dalam ekosistem *mobile development*:
- **Framework Utama**: [Expo](https://expo.dev/) & [React Native](https://reactnative.dev/)
- **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/)
- **Styling & UI Kit**: [Gluestack-UI v4](https://gluestack.io/) berpadu harmoni dengan kekuatan **NativeWind** (TailwindCSS).
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: SWR (Stale-While-Revalidate)
- **Autentikasi**: Google Sign-In

---

## 🚀 Panduan Memulai (Getting Started)

Ingin berkontribusi atau sekadar menjajal aplikasinya secara lokal? Ikuti langkah-langkah berikut:

### Prasyarat Instalasi
- Node.js (Versi LTS sangat disarankan)
- Package Manager: `pnpm` (jika belum, jalankan `npm install -g pnpm`)

### Langkah Eksekusi
1. **Kloning Repositori**
   ```bash
   git clone https://github.com/ItsAltoo/altkomik-mobile.git
   cd altkomik-mobile
   ```

2. **Pasang Dependensi**
   ```bash
   pnpm install
   ```

3. **Jalankan Aplikasi (Development Server)**
   ```bash
   pnpm dev
   ```
   > Buka aplikasi Expo Go di smartphone kamu lalu *scan* QR Code yang muncul di terminal, atau cukup tekan `a` untuk membuka Android Emulator.

---

## 🏗️ Arsitektur Proyek (Feature-Sliced Design)

Demi menjaga kebersihan, skalabilitas, dan kemudahan dalam kolaborasi tim, *codebase* ini mengadopsi pola **Feature-Sliced / Domain-Driven Structure**.

### 1. Pemisahan Routing & UI (`src/app/`)
Direktori ini hanya dikhususkan untuk konfigurasi **routing** melalui *Expo Router*. Berkas di dalamnya dibuat sangat minimal, sekadar mengimpor *view* utama dari folder `src/screens`.

### 2. Arsitektur Berbasis Layar (`src/screens/`)
Masing-masing halaman utama (contoh: `home`, `library`, `detail`) memiliki ruang/foldernya sendiri. Pola ini memastikan bahwa kode suatu fitur terisolasi dengan rapi.

Di dalam sebuah folder layar (misalnya: `src/screens/home/`), umumnya memuat:
- 📄 **`index.tsx`**: Gerbang utama (*entry point*) dan *View* pembentuk halaman.
- 📁 **`components/`**: Komponen UI yang **eksklusif** hanya digunakan di layar terkait. (Komponen global disimpan di `src/components/`).
- 📁 **`hooks/`**: Logika bisnis dan manajemen *state* khusus untuk layar tersebut.
- 📄 **`repository.ts`**: Akses data (API Calls, *formatting*, *fetching*). Memisahkan interaksi *backend* dari UI.
- 📄 **`types.ts`**: Definisi antarmuka TypeScript spesifik.
- 📄 **`utils.ts`**: Kumpulan fungsi utilitas ringan.

### 3. Keseragaman TypeScript
- **Kewajiban Penggunaan `type`**: Untuk standardisasi yang konsisten, keseluruhan kode ini wajib menggunakan `type` (alih-alih `interface`) ketika mendefinisikan tipe maupun *props*.

---

## 🤝 Kontribusi

Sangat tertarik untuk ikut membangun AltKomik menjadi lebih hebat? Kami menerima segala jenis dukungan dan kontribusi!
Mohon sempatkan waktu untuk membaca **[CONTRIBUTING.md](./CONTRIBUTING.md)** untuk petunjuk teknis mengenai format pembuatan *issue*, tata cara *commit* (menggunakan *Conventional Commits*), serta aturan penamaan *branch*.

---
<div align="center">
  <p>Dibuat dengan ❤️ untuk seluruh penikmat komik.</p>
</div>
