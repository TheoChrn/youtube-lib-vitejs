
## Youtube Library

### Installation

1. Get a free youtube API Key at [Google for developers](https://developers.google.com/youtube/v3/getting-started?hl=fr)
2. Clone the repo
   ```sh
   git clone https://github.com/TheoChrn/youtube-lib-vitejs.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `.env`
   ```js
   VITE_YOUTUBE_API_KEY="YOUR_API_KEY"
   ```
5. Allow cors origin in `.\backend\src\index.ts`
   ```js
   app.use(
     cors({
       origin: "Add application origin",
     })
   );
   ```
6. Run the server in `cd .\backend\`
   ```sh
   npm run dev
   ```
7. Start the application in root folder
   ```sh
   npm run dev || npm run build && npm run preview
   ```
