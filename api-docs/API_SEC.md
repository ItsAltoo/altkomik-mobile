# AltKomik API Documentation

This document summarizes all available internal API endpoints within the `src/app/api` directory of the AltKomik project.

---

## 1. Authentication (NextAuth)
> [!NOTE]
> These routes are automatically managed by the NextAuth.js library for browser-based login purposes.

- **Endpoint:** `/api/auth/[...nextauth]`
- **Description:** Handles all OAuth flows (Google, Discord, Twitter) such as redirects, callbacks, signins, and signouts for web browser users.
- **Authentication:** Not required (Public).

---

## 2. Mobile Authentication
> [!TIP]
> Special route for mobile applications (Expo/React Native) to connect with the NextAuth session system.

### `POST /api/mobile-auth`
- **Description:** Receives the `idToken` from the Google Sign-In SDK on mobile, verifies it, and returns the NextAuth Session Token (JWT).
- **Request Body:**
  ```json
  {
    "idToken": "eyJhbGciOiJSUzI1NiIs..."
  }
  ```
- **Success Response (200):**
  ```json
  {
    "success": true,
    "token": "JWT_SESSION_TOKEN_HERE",
    "user": {
      "id": "cm08a...",
      "name": "User Name",
      "email": "user@email.com",
      "image": "https://..."
    }
  }
  ```

---

## 3. Bookmarks
> [!IMPORTANT]
> All `/api/bookmarks` routes require authentication. If accessed via a browser, NextAuth will detect it automatically. If accessed via mobile, ensure you send the following header: `Cookie: next-auth.session-token=YOUR_TOKEN`.

### `GET /api/bookmarks`
- **Description:** Retrieves the list of comics saved (bookmarked) by the currently logged-in user.
- **Query Params:** 
  - `page` (optional, default: 1)
  - `limit` (optional, default: 10)
- **Response (200):**
  ```json
  {
    "meta": { "total": 10, "page": 1, "limit": 10 },
    "result": [
      { "slug": "comic-a", "title": "Comic A", "thumbnail": "...", "type": "Manhwa", "status": "Updated 1 week ago.", "chapters": null }
    ]
  }
  ```

### `POST /api/bookmarks`
- **Description:** Saves a new comic to the user's bookmark list.
- **Request Body:**
  ```json
  {
    "slug": "comic-a",
    "title": "Comic A",
    "thumbnail": "https://...",
    "type": "Manhwa",
    "status": "Updated 1 week ago."
  }
  ```
- **Response (201):** `{ "message": "Bookmark added successfully", "bookmark": {...} }`
- **Response (409):** `{ "error": "Bookmark already exists" }`

### `DELETE /api/bookmarks`
- **Description:** Removes a comic from the user's bookmark list.
- **Query Params:** `slug` (required, example: `?slug=comic-a`)
- **Response (200):** `{ "message": "Bookmark removed successfully" }`

### `GET /api/bookmarks/check`
- **Description:** Checks whether a comic is already bookmarked or not.
- **Query Params:** `slug` (required, example: `?slug=comic-a`)
- **Response (200):** `{ "isBookmarked": true }`

### `POST /api/bookmarks/sync`
- **Description:** Synchronizes bookmark status updates with the external API (maximum 20 comics at once).
- **Request Body:**
  ```json
  {
    "items": [
      {
        "id": "cm08a...",
        "title": "Comic A",
        "slug": "comic-a",
        "status": "Updated 1 week ago."
      }
    ]
  }
  ```
- **Response (200):** `{ "result": [{ "id": "cm08a...", "userId": "...", "slug": "comic-a", "title": "Comic A", "thumbnail": "https://...", "type": "Manga", "status": "Updated 1 week ago.", "createdAt": "2026-07-20T13:03:55.134Z" }] }` (Returns an array of updated comics)

---

## 4. Proxy Services
> [!WARNING]
> These proxy routes require the `API_KEY` from environment variables to bypass the main/external backend.

### `GET /api/proxy/[...path]`
- **Description:** Forwards all requests to the main `API_URL` while injecting the `"x-api-key"` header. Used so that the API secret key is not leaked to the client/browser.
- **Usage Example:** Calling `/api/proxy/search?query=solo` will be forwarded to `API_URL/api/search?query=solo`.

### `GET /api/proxy-image`
- **Description:** Fetches image data (binary) from an external server and forwards it back to the client. Functions to bypass CORS restrictions or image hotlinking protection from the source server.
- **Query Params:** `url` (required, encoded image URL)
- **Example:** `/api/proxy-image?url=https%3A%2F%2Fexample.com%2Fimage.jpg`
- **Response:** Raw image file (example: `image/jpeg`) with header `Cache-Control: private, max-age=31536000, immutable`.
