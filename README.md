# 🛠 Scraper Samehadaku

Mengambil data dari website [samehadaku.vip](https://samehadaku.vip) yaitu website download dan stream anime.

----------------------------------------

## 🔧 Fungsi
| Fungsi | Deskripsi | Hasil |
| :------  | :--------: | ----: |
| `list(letter)` | Fungsi `list`, mendapatkan data daftar anime berdasarkan huruf alphabet. | `{ title: String; url: string; image: String; shortDesc: String; }[];` |
| `batch()` | Fungsi `batch`, mendapatkan data dari halaman batch. | `{ page: number; data: Object[]; }[]` |
| `search(anime)` | Fungsi `search`, mencari anime berdasarkan kata kunci. | `{ page: number, data: Object[]; }[]` |
| `popular()` | Fungsi `popular`, mendapatkan data dari halaman anime yang populer. | `{ name: String; url: String; }[]` |
| `get(url)` | Fungsi `get`, mendapatkan data anime berdasarkan URL website Samehada. | `{ title: String; description: String; image: String; rating: number; genres: { name: String; url: String; }[] }[]` |
| `getGenre(genre)` | Fungsi `getGenre`, mendapatkan data genre berdasarkan genre yang dimasukan dalam argumen. | `{ page: number; data: Object[]; }[]` |

## 💉 Instalasi
### Menggunakan NPM
> npm install github.com/hansputera/samehadaku-scraper.git

## 🧲 Dependencies
- [Axios](https://npmjs.com/axios)
- [Cheerio](https://cheerio.js.org)

## ⚙️ Kontribusi
~~Jika mau, boleh banget~~