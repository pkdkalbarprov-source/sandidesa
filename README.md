# SANDI DESA — Sistem Analisis Data Indeks Desa Kalimantan Barat

Dashboard web statis (satu file HTML) untuk analisis dan visualisasi data indeks desa di Kalimantan Barat, lengkap dengan filter, ringkasan skor per dimensi, grafik status desa, dan ekspor data ke Excel/CSV.

## 🚀 Demo

Setelah di-deploy ke GitHub Pages, dashboard bisa diakses di:

```
https://<username-github-anda>.github.io/<nama-repo>/
```

## 📦 Isi Repo

| File | Keterangan |
|---|---|
| `index.html` | Aplikasi dashboard utama (self-contained: HTML + CSS + JS dalam satu file) |
| `README.md` | Dokumentasi ini |
| `.gitignore` | File/folder yang diabaikan Git |

## 🛠️ Cara Menjalankan di Lokal

Karena aplikasi ini murni HTML/CSS/JS tanpa server backend, cukup buka langsung di browser:

1. Clone atau unduh repo ini.
2. Buka file `index.html` dengan browser (double-click, atau klik kanan → Open with → Browser).

Atau jalankan server lokal sederhana (opsional, agar tidak ada kendala CORS saat mengembangkan lebih lanjut):

```bash
# Python 3
python -m http.server 8000
# lalu buka http://localhost:8000
```

## ☁️ Cara Deploy ke GitHub Pages

1. **Buat repository baru** di GitHub (public atau private — Pages gratis tersedia untuk repo public; untuk private butuh GitHub Pro/Team/Enterprise).
2. **Upload file-file ini** ke repo, lalu commit & push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SANDI DESA dashboard"
   git branch -M main
   git remote add origin https://github.com/<username-anda>/<nama-repo>.git
   git push -u origin main
   ```
3. Buka repo di GitHub → tab **Settings** → menu **Pages** (di sidebar kiri).
4. Pada bagian **Build and deployment** → **Source**, pilih **Deploy from a branch**.
5. Pada **Branch**, pilih `main` dan folder `/ (root)`, lalu klik **Save**.
6. Tunggu 1–2 menit, GitHub akan menampilkan URL situs Anda di bagian atas halaman Pages (format `https://<username>.github.io/<nama-repo>/`).

> **Catatan:** GitHub Pages hanya membutuhkan file `index.html` di root repo — sudah disiapkan di sini, jadi tidak perlu langkah tambahan.

## 🔄 Cara Update Dashboard di Kemudian Hari

Jika Anda memiliki versi HTML baru:

```bash
# Ganti isi index.html dengan versi baru, lalu:
git add index.html
git commit -m "Update dashboard: <deskripsi perubahan>"
git push
```

GitHub Pages akan otomatis rebuild dan mempublikasikan versi terbaru dalam waktu singkat.

## 📄 Lisensi

Tambahkan lisensi sesuai kebutuhan Anda (misalnya MIT) jika ingin membuat repo ini open source.
