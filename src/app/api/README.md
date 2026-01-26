# Next.js API Routes

This directory is for Next.js API routes (serverless functions) that will be deployed with your Next.js application.

## Structure

```
src/app/api/
├── auth/
│   └── route.ts          # Authentication endpoints
├── payments/
│   └── route.ts          # Payment gateway integrations
├── webhooks/
│   └── route.ts          # Webhook handlers
└── email/
    └── route.ts          # Email sending endpoints
```

## Usage

### Creating an API Route

Create a file `src/app/api/example/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Server-side code
  // Access environment variables: process.env.API_KEY
  // Make external API calls
  // Access database
  // Send emails
  
  return NextResponse.json({ message: 'Hello from API route' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Process payment
  // Send email
  // Trigger backend API
  
  return NextResponse.json({ success: true });
}
```

## Environment Variables

- **Client-side**: Use `NEXT_PUBLIC_*` prefix
- **Server-side**: Use any variable name (not exposed to client)

Example:
```env
# Client-side (exposed to browser)
NEXT_PUBLIC_API_URL=https://api.example.com

# Server-side only (secure)
PAYMENT_GATEWAY_KEY=sk_live_...
EMAIL_SERVICE_API_KEY=...
DATABASE_URL=...
```

## AWS Amplify Support

✅ API routes are fully supported on AWS Amplify
✅ Serverless functions are automatically deployed
✅ Environment variables are available at runtime
✅ No additional configuration needed

## Use Cases

1. **Payment Processing** ⚠️ **NOT Recommended from Website**
   - **Recommended**: Website → Backend API → Payment Gateway
   - Payment gateway keys should **never** be in the website
   - All payment processing should go through your backend API
   - Website only calls: `POST /api/v1/payments/process` (backend endpoint)
   - Backend handles payment gateway integration securely

2. **Email Sending**
   - Send transactional emails
   - Use services like SendGrid, AWS SES
   - Keep email API keys secure

3. **Backend API Triggers**
   - Proxy requests to backend
   - Add authentication headers
   - Transform request/response

4. **Webhook Handlers**
   - Receive webhooks from external services
   - Process events asynchronously
   - Update database

## Security Best Practices

1. **Never expose sensitive keys** - Use server-side env vars
2. **Validate input** - Always validate request data
3. **Rate limiting** - Implement rate limiting for public endpoints
4. **CORS** - Configure CORS properly
5. **Authentication** - Verify JWT tokens for protected routes

## Example: Payment Processing (Correct Architecture)

**❌ DON'T**: Process payments directly from website API routes

**✅ DO**: Call backend API from website

```typescript
// src/services/payment.service.ts (Website)
import { apiService } from './api.service';

export async function processPayment(data: PaymentRequest) {
  // Call backend API - backend handles payment gateway
  return apiService.post('/payments/process', data);
}

// Backend (NestJS) handles:
// - Payment gateway API keys (secure)
// - Payment processing logic
// - Webhook handling
// - Transaction recording
```

**Why this approach?**
- ✅ Payment gateway keys never in frontend
- ✅ PCI compliance maintained
- ✅ Centralized business logic
- ✅ Better security posture

