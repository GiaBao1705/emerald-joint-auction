# Backend API for Emerald Joint Auction

## Setup

1. Copy `.env.example` to `.env`.
2. Fill in your Supabase project URL and service role key.
3. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Run the API server:

   ```bash
   npm run dev
   ```

## Endpoints

- `GET /api/posts`
- `GET /api/posts?category=news|activity|video|legal`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`

Use JSON bodies for `POST` and `PUT`.
