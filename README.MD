# Telegram @notify_log_bot

Mengirim notifikasi menggunakan Bot Telegram dengan format menarik,intuitif dan mudah di pahami.

## Persyaratan
* Vercel
* Ngrox
* NodeJs

## Langkah instalasi
1. Clone repository
   ```bash
   git clone https://github.com/imamnurhy/telegram-bot-4p1.git
   ```
2. Install depedency
   ```bash
   npm install
   ```
3. Buat kunci dan konfitutasi enviroment
    > Buat secret key dengan perintah yang ada di Cheat Sheet 🤖

## Menjalankan Ngrok

Ngrok digunakan sebagai webhook untuk berinteraksi dengan bot telegram.

```bash
ngrok http 3000
```

## Jalankan bot dengan Vercel (local)
```bash
vercel dev
```
> Pastikan APP_URL nya mengarah ke url `ngrok` untuk berinteraksi dengan bot agar dapat akses key nya dengan perintah `/subscribe`

## Mengirim pesan dengan BOT
Sebelum mengirim pesan dengan bot matikan dulu `vercel` agar dapat menjalankan
```bash
npm run dev
```

### Contoh pengiriman pesan
```bash
curl --location 'https://<domain>/api/message' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'x-api-key: <Key dari BOT>' \
--data-urlencode 'code=200' \
--data-urlencode 'title=Example' \
--data-urlencode 'message=Text'
```

## Konfigurasi Webhook (Manual)
1. Memeriksa webhok yang aktif
   ``` bash 
   curl --location 'https://api.telegram.org/bot<BOT_TOKEN>/getWebhookInfo'
   ```
2. Membuat dan memperbaharui url `webhook`
   ```bash
   curl --location 'https://api.telegram.org/bot<BOT_TOKEN>' \
    --header 'Content-Type: application/json' \
    --data '{
    "url": "https://<domain>/api/webhook"
    }'
    ```
3. Menghapus `webhook`
    ```bash
    curl --location 'https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?remove'
    ```
> Gunakan langkah manual ini jika webhook tidak secara otomatis dibuat pada saat program dijalankan

# Contributing
Feel free to fork this repository, create a pull request, or report any issues. Contributions are welcome!

# License
This project is licensed under the MIT License - see the LICENSE file for details.