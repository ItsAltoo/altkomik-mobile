# AltKomik API Documentation

Dokumen ini merangkum seluruh *endpoint* API internal yang tersedia di dalam direktori `src/app/api` pada *project* AltKomik.

---

## 1. Authentication (NextAuth)
> [!NOTE]
> Rute ini dikelola secara otomatis oleh *library* NextAuth.js untuk keperluan *login* via *browser*.

- **Endpoint:** `/api/auth/[...nextauth]`
- **Deskripsi:** Menangani semua alur OAuth (Google, Discord, Twitter) seperti *redirect*, *callback*, *signin*, dan *signout* untuk pengguna *web browser*.
- **Otentikasi:** Tidak perlu (publik).

---

## 2. Mobile Authentication
> [!TIP]
> Rute khusus untuk aplikasi *mobile* (Expo/React Native) agar bisa terhubung dengan sistem *session* NextAuth.

### `POST /api/mobile-auth`
- **Deskripsi:** Menerima `idToken` dari Google Sign-In SDK di *mobile*, memverifikasinya, dan mengembalikan Token Sesi NextAuth (*JWT*).
- **Body Request:**
  ```json
  {
    "idToken": "eyJhbGciOiJSUzI1NiIs..."
  }
  ```
- **Response Sukses (200):**
  ```json
  {
    "success": true,
    "token": "JWT_SESSION_TOKEN_HERE",
    "user": {
      "id": "cm08a...",
      "name": "Nama User",
      "email": "user@email.com",
      "image": "https://..."
    }
  }
  ```

---

## 3. Bookmarks
> [!IMPORTANT]
> Semua rute `/api/bookmarks` membutuhkan otentikasi. Jika diakses via *browser*, NextAuth akan mendeteksinya otomatis. Jika via *mobile*, pastikan mengirim *header*: `Cookie: next-auth.session-token=TOKEN_MU`.

### `GET /api/bookmarks`
- **Deskripsi:** Mengambil daftar komik yang disimpan (*bookmark*) oleh pengguna yang sedang *login*.
- **Query Params:** 
  - `page` (opsional, default: 1)
  - `limit` (opsional, default: 10)
- **Response (200):**
  ```json
  {
    "meta": { "total": 10, "page": 1, "limit": 10 },
    "result": [
      { "slug": "komik-a", "title": "Komik A", "thumbnail": "...", "type": "Manhwa", "status": "Ongoing", "chapters": null }
    ]
  }
  ```

### `POST /api/bookmarks`
- **Deskripsi:** Menyimpan komik baru ke daftar *bookmark* pengguna.
- **Body Request:**
  ```json
  {
    "slug": "komik-a",
    "title": "Komik A",
    "thumbnail": "https://...",
    "type": "Manhwa",
    "status": "Ongoing"
  }
  ```
- **Response (201):** `{ "message": "Bookmark added successfully", "bookmark": {...} }`
- **Response (409):** `{ "error": "Bookmark already exists" }`

### `DELETE /api/bookmarks`
- **Deskripsi:** Menghapus komik dari daftar *bookmark* pengguna.
- **Query Params:** `slug` (wajib, contoh: `?slug=komik-a`)
- **Response (200):** `{ "message": "Bookmark removed successfully" }`

### `GET /api/bookmarks/check`
- **Deskripsi:** Mengecek apakah sebuah komik sudah di-*bookmark* atau belum.
- **Query Params:** `slug` (wajib, contoh: `?slug=komik-a`)
- **Response (200):** `{ "isBookmarked": true }`

---

## 4. Proxy Services
> [!WARNING]
> Rute *proxy* ini membutuhkan kunci `API_KEY` dari *environment variables* untuk menembus *backend* utama/eksternal.

### `GET /api/proxy/[...path]`
- **Deskripsi:** Meneruskan (*forward*) semua *request* ke `API_URL` utama dengan menyisipkan *header* `"x-api-key"`. Digunakan agar kunci rahasia API tidak bocor ke *client/browser*.
- **Contoh Penggunaan:** Memanggil `/api/proxy/search?query=solo` akan di-*forward* ke `API_URL/api/search?query=solo`.

### `GET /api/proxy-image`
- **Deskripsi:** Mengambil data gambar (*binary*) dari server eksternal dan meneruskannya kembali ke *client*. Berfungsi untuk membypass batasan CORS atau perlindungan *hotlinking* gambar dari server sumber.
- **Query Params:** `url` (wajib URL gambar yang di-encode)
- **Contoh:** `/api/proxy-image?url=https%3A%2F%2Fcontoh.com%2Fgambar.jpg`
- **Response:** File gambar mentah (contoh: `image/jpeg`) dengan *header* `Cache-Control: private, max-age=31536000, immutable`.
