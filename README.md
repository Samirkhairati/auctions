# ♠️ Auctions: a real-time live bidding app

## Screenshots

![image](https://github.com/user-attachments/assets/f3adb4a4-6d01-496a-abeb-ba1562b34ccc)
![image](https://github.com/user-attachments/assets/321f932e-8e96-496f-b8c4-e7d0d35e95f3)
![image](https://github.com/user-attachments/assets/a59c0574-49d6-4dea-99ee-d9a080371693)
![image](https://github.com/user-attachments/assets/426f89b1-72fa-4ca8-838f-f3c0597fbc72)
![image](https://github.com/user-attachments/assets/cc8c0b05-2dda-4d06-b77d-e5acd4ca8a3b)
![image](https://github.com/user-attachments/assets/79cb9c50-b295-443a-bedd-9d59e69d6bcd)
![image](https://github.com/user-attachments/assets/95b6c3b7-8b1f-4d24-a380-8f639cc91d6a)
![image](https://github.com/user-attachments/assets/0bfc4e6f-3077-4db7-89c8-3cf5b38df9a7)
![image](https://github.com/user-attachments/assets/4bcd27aa-3889-4140-9646-16aaa738db9f)


## Features

 1. List items with name, description, bidding period date, images and videos
 2. Place bids on them while the bidding period is active
 3. All users can be sellers and buyers
 4. Sellers can close the deal and let the highest bidder win
 5. Seller can generate a QR Code, which can be scanned by the winner to confirm acquisition of the item
 6. Interface to chat with the seller
 7. Log in with Google option
 8. NextJS SSR for fast load times
 9. Redis for caching and very fast data retrieval
 10. Updates are in real time with web sockets
 11. Progressive Web App: can be downloaded on Windows, Mac, Android, iOS
  
## Tech Stack

 1. NextJS
 2. Prisma
 3. Postgresql
 4. NeonDB
 5. Pusher
 6. Redis
 7. Axios

## Usage

Visit the [website](https://auctions2.vercel.app/)
or
```
npm i
npm run build
npm run start
```

## env
```
DATABASE_URL=
REDIS_URL=

AUTH_SECRET=
AUTH_TRUST_HOST=
NEXT_PUBLIC_VERCEL_URL=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

PUSHER_APP_ID=
NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_SECRET=
```
