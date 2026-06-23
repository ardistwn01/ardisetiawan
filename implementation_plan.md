# Rencana Implementasi Foto Profil (Home & About)

Fitur ini akan memungkinkan Anda mengunggah dua foto yang berbeda melalui halaman Admin Profile: satu untuk halaman **Home** dan satu lagi untuk halaman **About**.

## Langkah-langkah Implementasi

1. **Pembaruan Halaman Admin Profil (`AdminProfileTab.jsx`)**
   - Menambahkan dua input *file upload* khusus gambar: "FOTO UNTUK HOME" dan "FOTO UNTUK ABOUT".
   - Mengintegrasikan logika upload ke **Supabase Storage** (menggunakan bucket `profile-images`).
   - Menyimpan URL publik dari gambar tersebut ke dalam tabel `profile` di database.

2. **Pembaruan Halaman Utama (`Home.jsx`)**
   - Mengganti komponen avatar ilustrasi komik (`ComicAvatar`) dengan foto asli jika Anda sudah mengunggah `home_image_url`.
   - Tetap menggunakan `ComicAvatar` sebagai *fallback* (cadangan) jika Anda belum mengunggah foto.

3. **Pembaruan Halaman About (`About.jsx`)**
   - Menambahkan kotak/bingkai foto bergaya komik di sebelah teks Bio.
   - Menampilkan `about_image_url` pada bingkai tersebut.

> [!WARNING]
> ## Tindakan Manual yang Dibutuhkan
> Sama seperti saat kita menambahkan foto project sebelumnya, fitur ini membutuhkan konfigurasi di dashboard **Supabase** Anda sebelum kode dapat berjalan tanpa *error*.
> 
> **1. Jalankan SQL ini di SQL Editor Supabase:**
> ```sql
> ALTER TABLE profile ADD COLUMN home_image_url text;
> ALTER TABLE profile ADD COLUMN about_image_url text;
> ```
> 
> **2. Buat Bucket Storage Baru:**
> - Buat bucket baru bernama `profile-images`
> - Centang menjadikannya **Public**
> - Jalankan SQL berikut untuk mengatur keamanan (Policy)-nya:
> ```sql
> CREATE POLICY "Public View Access Profile" ON storage.objects FOR SELECT USING ( bucket_id = 'profile-images' );
> CREATE POLICY "Admin Insert Access Profile" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'profile-images' );
> CREATE POLICY "Admin Update Access Profile" ON storage.objects FOR UPDATE TO authenticated USING ( bucket_id = 'profile-images' );
> ```

Jika Anda setuju dengan rencana ini, silakan klik tombol Approve / beri tahu saya, dan saya akan mulai menulis kodenya!
