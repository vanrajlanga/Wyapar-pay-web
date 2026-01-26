# Razorpay + KWIKAPI Integration Guide

## Overview

This guide explains the complete payment and recharge flow integration in the WyaparPay website using Razorpay for payments and KWIKAPI for mobile recharges.

---

## Architecture

```
User Flow:
1. Select mobile number → Detect operator (KWIKAPI)
2. Enter amount or browse plans
3. Proceed to Checkout → Pay with Razorpay
4. Payment Success → Process recharge via KWIKAPI
5. Poll status (max 3 attempts)
6. Show result (Success/Failed/Pending)
```

---

## Files Created/Modified

### New Files

1. **`/src/services/payment.service.ts`** - Razorpay payment service
   - Initialize Razorpay SDK
   - Create payment orders
   - Verify payment signatures
   - Open Razorpay checkout

2. **`/src/app/checkout/page.tsx`** - Updated checkout page
   - Razorpay integration
   - Payment order creation
   - Payment verification
   - KWIKAPI recharge trigger
   - Status polling

3. **`/src/app/recharge/status/page.tsx`** - Recharge status page
   - Success/Failed/Pending status display
   - Transaction details
   - Next actions (New recharge, View history)

4. **`/.env.local`** - Environment variables
   - Razorpay key configuration
   - API URL configuration

### Modified Files

1. **`/src/services/recharge.service.ts`**
   - Added `getKwikApiBalance()` - Check KWIKAPI wallet balance
   - Added `processKwikApiRecharge()` - Execute recharge
   - Added `checkKwikApiStatus()` - Poll recharge status
   - Added `completeRecharge()` - Full flow with status polling

2. **`/src/constants/index.ts`**
   - Added `PAYMENT` endpoints
   - Added `KWIKAPI` endpoints under RECHARGE

3. **`/src/app/recharge/page.tsx`**
   - Updated to store recharge details in sessionStorage
   - Changed redirect from `/recharge/review` to `/checkout`

---

## Environment Variables

Add to `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_API_TIMEOUT=30000

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_Ix8RzvBSwH687S

# App Configuration
NEXT_PUBLIC_APP_NAME=WyaparPay
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

---

## API Endpoints

### Payment Endpoints (Backend)

#### 1. Create Payment Order
```typescript
POST /api/v1/payment/create-order
Authorization: Bearer <token>

Request:
{
  "amount": 29900,      // Amount in paise (₹299 = 29900)
  "currency": "INR",
  "receipt": "recharge_1234567890",
  "notes": {
    "mobile_number": "9876543210",
    "operator": "Airtel",
    "operator_id": "3"
  }
}

Response:
{
  "id": "order_xxxxxxxxxxxxx",
  "entity": "order",
  "amount": 29900,
  "amount_paid": 0,
  "amount_due": 29900,
  "currency": "INR",
  "receipt": "recharge_1234567890",
  "status": "created",
  "attempts": 0,
  "notes": {...},
  "created_at": 1234567890
}
```

#### 2. Verify Payment
```typescript
POST /api/v1/payment/verify
Authorization: Bearer <token>

Request:
{
  "razorpay_order_id": "order_xxxxxxxxxxxxx",
  "razorpay_payment_id": "pay_xxxxxxxxxxxxx",
  "razorpay_signature": "abc123..."
}

Response:
{
  "success": true,
  "message": "Payment verified successfully",
  "order": {
    "id": "order_xxxxxxxxxxxxx",
    "status": "paid",
    "amount": 29900,
    "currency": "INR"
  }
}
```

### KWIKAPI Endpoints (Backend)

#### 1. Get Wallet Balance
```typescript
GET /api/v1/recharge/kwikapi/balance?forceRefresh=false
Authorization: Bearer <token>

Response:
{
  "response": {
    "balance": "1234.56",
    "plan_credit": "1293"
  }
}
```

#### 2. Process Recharge
```typescript
POST /api/v1/recharge/kwikapi/recharge
Authorization: Bearer <token>

Request:
{
  "number": "9876543210",
  "amount": 299,
  "opid": "3",           // Operator ID from detection
  "state_code": 0,       // Always 0
  "order_id": "1706123456789123456"  // Max 20 digits
}

Response:
{
  "status": "PENDING",   // PENDING | SUCCESS | FAILED
  "order_id": "1706123456789123456",
  "opr_id": "",
  "balance": "1234.56",
  "number": "9876543210",
  "provider": "Airtel",
  "amount": "299",
  "charged_amount": "293.02",
  "message": "RECHARGE SUBMITTED SUCCESSFULLY"
}
```

#### 3. Check Recharge Status
```typescript
GET /api/v1/recharge/kwikapi/status?orderId=1706123456789123456
Authorization: Bearer <token>

Response:
{
  "response": {
    "order_id": "1706123456789123456",
    "operator_ref": "4162140972233",
    "opr_id": "416214093455",
    "status": "SUCCESS",  // PENDING | SUCCESS | FAILED | REFUNDED
    "number": "9876543210",
    "amount": "299",
    "service": "Prepaid Recharge",
    "charged_amount": "293.02",
    "closing_balance": "941.54",
    "available_balance": "941.54",
    "pid": "15494934555",
    "date": "2024-06-10 14:23:53"
  }
}
```

---

## Payment Service Usage

### Initialize Razorpay

```typescript
import { paymentService } from '@/services/payment.service';

// Set Razorpay key (usually in useEffect)
const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
paymentService.setRazorpayKey(razorpayKey);
```

### Create Order and Open Checkout

```typescript
await paymentService.initiatePayment({
  amount: 299 * 100,  // Amount in paise
  currency: 'INR',
  receipt: `recharge_${Date.now()}`,
  notes: {
    mobile_number: '9876543210',
    operator: 'Airtel',
    operator_id: '3',
  },
  prefill: {
    contact: '9876543210',
  },
  onSuccess: async (response) => {
    // Payment successful
    console.log('Payment ID:', response.razorpay_payment_id);
    console.log('Order ID:', response.razorpay_order_id);
    console.log('Signature:', response.razorpay_signature);

    // Verify payment
    const verifyResponse = await paymentService.verifyPayment({
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    });

    if (verifyResponse.success) {
      // Process recharge...
    }
  },
  onDismiss: () => {
    console.log('Payment cancelled by user');
  },
});
```

---

## Recharge Service Usage

### Complete Recharge Flow

```typescript
import { rechargeService } from '@/services/recharge.service';

// After payment verification success
const result = await rechargeService.completeRecharge({
  mobileNumber: '9876543210',
  amount: 299,
  operatorId: '3',
  razorpayOrderId: 'order_xxxxx',
  razorpayPaymentId: 'pay_xxxxx',
});

if (result.success) {
  console.log('Recharge successful!');
  console.log('Operator Ref:', result.data.operator_ref);
} else if (result.status === 'TIMEOUT') {
  console.log('Status check timeout - check later');
} else {
  console.log('Recharge failed:', result.message);
}
```

### Manual Balance Check

```typescript
// Get balance (uses 30-min cache)
const balance = await rechargeService.getKwikApiBalance();
console.log('Balance:', balance.response.balance);

// Force refresh (ignores cache)
const freshBalance = await rechargeService.getKwikApiBalance(true);
```

---

## Complete Checkout Flow

### Step-by-Step Process

1. **User arrives at checkout page**
   - Recharge details loaded from RechargeContext or sessionStorage
   - Razorpay SDK initialized

2. **User clicks "Pay Securely"**
   - Frontend calls backend: `POST /payment/create-order`
   - Backend creates Razorpay order and returns order details
   - Frontend opens Razorpay checkout modal with order ID

3. **User completes payment**
   - Razorpay handles payment processing
   - On success, Razorpay returns: `order_id`, `payment_id`, `signature`

4. **Payment verification**
   - Frontend calls backend: `POST /payment/verify`
   - Backend verifies signature using HMAC-SHA256
   - Returns success/failure

5. **Recharge processing** (if payment verified)
   - Frontend calls backend: `POST /recharge/kwikapi/recharge`
   - Backend calls KWIKAPI with mobile number, amount, operator ID
   - KWIKAPI returns PENDING status (usually)

6. **Status polling** (max 3 attempts)
   - Wait 5 seconds
   - Call backend: `GET /recharge/kwikapi/status?orderId=xxx`
   - If PENDING, wait 30 seconds and retry
   - Max 3 attempts to respect KWIKAPI rate limit

7. **Show result**
   - SUCCESS → Show success page with transaction details
   - FAILED → Show failure page with refund message
   - TIMEOUT → Show pending page with check-later message

---

## Status Polling Logic

```typescript
// Wait 5 seconds after recharge initiation
await sleep(5000);

// Poll up to 3 times
for (let attempt = 1; attempt <= 3; attempt++) {
  const statusResponse = await checkKwikApiStatus(orderId);

  if (status === 'SUCCESS') {
    return { success: true, data: statusResponse };
  } else if (status === 'FAILED') {
    return { success: false, message: 'Recharge failed' };
  } else if (status === 'PENDING') {
    if (attempt < 3) {
      await sleep(30000); // Wait 30 seconds
    } else {
      return { success: false, status: 'TIMEOUT' };
    }
  }
}
```

---

## SessionStorage Keys

The following keys are used to persist recharge data across pages:

```typescript
// Stored during operator detection
sessionStorage.setItem('recharge_operatorId', '3');
sessionStorage.setItem('recharge_circleCode', '17');
sessionStorage.setItem('recharge_circleName', 'MAHARASHTRA');
sessionStorage.setItem('recharge_operatorCode', 'JIO');
sessionStorage.setItem('recharge_operatorName', 'Jio');

// Stored when proceeding to checkout
sessionStorage.setItem('recharge_mobile_number', '9876543210');
sessionStorage.setItem('recharge_amount', '299');
sessionStorage.setItem('recharge_operator', 'Airtel');
sessionStorage.setItem('recharge_operator_id', '3');
sessionStorage.setItem('recharge_circle_name', 'MAHARASHTRA');

// Stored after recharge completion
sessionStorage.setItem('recharge_status', 'SUCCESS');
sessionStorage.setItem('recharge_result', JSON.stringify(result));
```

---

## Error Handling

### Payment Errors

```typescript
try {
  await paymentService.initiatePayment({...});
} catch (error) {
  // Payment initiation failed
  console.error('Payment failed:', error.message);
  alert('Payment failed. Please try again.');
}
```

### Recharge Errors

```typescript
try {
  const result = await rechargeService.completeRecharge({...});

  if (!result.success) {
    if (result.status === 'TIMEOUT') {
      // Show pending status - user should check later
      router.push('/recharge/status?status=pending');
    } else {
      // Recharge failed - initiate refund
      router.push('/recharge/status?status=failed');
    }
  }
} catch (error) {
  // Network or API error
  console.error('Recharge processing failed:', error);

  // Payment was successful but recharge failed
  // User should contact support with payment ID
  alert(`Payment successful but recharge failed. Payment ID: ${paymentId}`);
}
```

---

## Rate Limits

### KWIKAPI Rate Limits

- **Balance API**: 2 hits/hour (cached for 30 min automatically)
- **Status API**: 3 hits/transaction (hence max 3 polling attempts)
- **Recharge API**: No documented limit, but has 120s timeout

---

## Testing

### Test with Real Payment (Razorpay Test Mode)

1. Use test card details:
   ```
   Card Number: 4111 1111 1111 1111
   Expiry: Any future date
   CVV: Any 3 digits
   ```

2. UPI Test ID:
   ```
   success@razorpay
   ```

3. Monitor console logs for payment flow

### Test KWIKAPI (Requires Balance)

1. Ensure KWIKAPI wallet has sufficient balance
2. Use test mobile number: `7070300613`
3. Use minimum amount: ₹10
4. Check backend logs for KWIKAPI responses

---

## Production Checklist

Before deploying to production:

- [ ] Replace `NEXT_PUBLIC_RAZORPAY_KEY_ID` with live key
- [ ] Update backend with Razorpay live key and secret
- [ ] Ensure KWIKAPI account has sufficient balance
- [ ] Configure webhook URL for payment confirmations
- [ ] Set up refund policy and mechanism
- [ ] Add error tracking (Sentry, LogRocket, etc.)
- [ ] Test complete flow end-to-end
- [ ] Set up monitoring for KWIKAPI balance alerts
- [ ] Configure SMS/Email notifications for users
- [ ] Add transaction receipt generation

---

## Troubleshooting

### Issue: Razorpay checkout not opening

**Solution**: Check browser console for Razorpay SDK loading errors. Ensure `https://checkout.razorpay.com/v1/checkout.js` is not blocked.

### Issue: Payment verified but recharge failed

**Solution**: Check KWIKAPI wallet balance. Verify operator ID is correct. Check backend logs for KWIKAPI error response.

### Issue: Status always shows PENDING

**Solution**: KWIKAPI may take longer than expected. User should check recharge history later or contact support.

### Issue: Recharge details not showing in checkout

**Solution**: Ensure sessionStorage keys are being set correctly on recharge page. Check browser console for errors.

---

## Support

For issues or questions:
- Backend API: Check `/Volumes/Krishna/Krishna/wyapar-pay/Wyapar/backend/KWIKAPI_INTEGRATION_GUIDE.md`
- KWIKAPI Docs: Contact KWIKAPI support
- Razorpay Docs: https://razorpay.com/docs/

---

**Integration Complete!** ✅

All Razorpay and KWIKAPI APIs are now integrated in the website.
