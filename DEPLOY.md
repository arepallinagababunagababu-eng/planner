# Deploy Instructions

## Backend (Render)

1. Create a new Web Service on Render:
   - Connect your GitHub repo
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`

2. Set environment variables on Render:
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = same secret used to sign JWTs
   - `FRONTEND_URL` = your Vercel frontend URL (https://your-app.vercel.app)

## Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel:
   - Connect to your GitHub repo
   - Framework Preset: Next.js
   - Root Directory: `.` (repo root)
   - Build Settings: Use defaults
   
3. Set environment variable in Vercel:
   - `NEXT_PUBLIC_API_URL` = your Render backend URL (https://your-api.onrender.com)

4. Deploy!

## Local Development

1. Backend:
   ```bash
   cd backend
   cp .env.example .env  # Then edit .env with your values
   npm install
   npm run dev
   ```

2. Frontend:
   ```bash
   # In another terminal
   npm install
   npm run dev
   ```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000  # Local development
# or
NEXT_PUBLIC_API_URL=https://your-api.onrender.com  # Production
```