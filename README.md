<<<<<<< HEAD
# URL Shortener API

A complete RESTful API service that shortens long URLs, built with Node.js, Express, and MongoDB (with in-memory option).

## Features

- Shorten long URLs to easy-to-share short URLs
- Redirect to original URLs using short codes
- Track URL clicks and access statistics
- Rate limiting to prevent abuse
- URL validation
- Automatic URL expiration (default: 30 days)
- Web interface for easy testing
- Comprehensive API documentation
- Postman collection included

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (optional, for persistent storage)

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open in browser:
   ```
   http://localhost:3000
   ```

## Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
# For MongoDB (uncomment to enable)
# MONGODB_URI=mongodb://127.0.0.1:27017/url-shortener?directConnection=true
BASE_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX=100           # Max requests per window
```

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Shorten a URL
- **URL**: `/shorten`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "longUrl": "https://example.com/very/long/url"
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "success": true,
    "originalUrl": "https://example.com/very/long/url",
    "shortUrl": "http://localhost:3000/abc123",
    "urlCode": "abc123",
    "expiresAt": "2023-07-20T12:00:00.000Z"
  }
  ```

#### 2. Redirect to Original URL
- **URL**: `/:code`
- **Method**: `GET`
- **Response**: 302 Redirect to original URL

#### 3. Get URL Statistics
- **URL**: `/:code/stats`
- **Method**: `GET`
- **Success Response (200)**:
  ```json
  {
    "success": true,
    "data": {
      "originalUrl": "https://example.com/very/long/url",
      "shortUrl": "http://localhost:3000/abc123",
      "clicks": 5,
      "createdAt": "2023-06-20T12:00:00.000Z",
      "lastAccessed": "2023-06-21T10:30:00.000Z",
      "expiresAt": "2023-07-20T12:00:00.000Z"
    }
  }
  ```

#### 4. Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "OK",
    "timestamp": "2023-06-20T12:00:00.000Z"
  }
  ```

## Web Interface

Access the web interface at `http://localhost:3000` to:
- Shorten URLs
- Test redirections
- View basic statistics

## Postman Collection

Import the `URL_Shortener_Postman_Collection.json` file into Postman to test the API endpoints.

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Deployment

### With MongoDB (Recommended for Production)
1. Set up a MongoDB database (local or MongoDB Atlas)
2. Update the `MONGODB_URI` in `.env`
3. Start the server with `npm start`

### With PM2 (Production)
```bash
npm install -g pm2
pm2 start app.js --name "url-shortener"
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Port to run the server | 3000 |
| MONGODB_URI | MongoDB connection string (optional) | - |
| BASE_URL | Base URL for short URLs | http://localhost:3000 |
| RATE_LIMIT_WINDOW_MS | Rate limiting window in milliseconds | 900000 (15 minutes) |
| RATE_LIMIT_MAX | Maximum requests per window | 100 |

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:

```json
{
  "success": false,
  "error": "Error message"
}
```

## License

MIT
=======
# url_shortener
>>>>>>> 699b820ecd34ec9e5e3d4e7b36d5a33c75908ccf
