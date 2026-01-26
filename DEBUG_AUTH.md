# Authentication Debug Guide

## Issue
Payment is failing with "Field 'userId' doesn't have a default value" which means the JWT token is not being sent or parsed correctly.

## Check Authentication Token

### 1. Open Browser Console
Press `F12` or `Cmd+Option+I` (Mac) to open DevTools

### 2. Check localStorage
In the Console tab, run:

```javascript
localStorage.getItem('access_token')
```

**Expected**: Should return a JWT token string like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**If null or undefined**: You are not logged in!

### 3. Check if token is sent in API requests

Go to **Network tab** in DevTools:
1. Click on the `/payment/create-order` request (failed one)
2. Click on **Headers** tab
3. Look for **Request Headers**
4. Find **Authorization** header

**Expected**:
```
Authorization: Bearer eyJhbGciOiJIUzI1...
```

**If missing**: Token is not being attached to requests!

---

## Quick Fix Steps

### If No Token in localStorage:

1. **Login again**:
   - Go to `/login`
   - Enter credentials
   - Login

2. **Check token after login**:
   ```javascript
   localStorage.getItem('access_token')
   ```

### If Token Exists but Not Sent:

The issue is with the API service. Check if `apiService.ts` is correctly attaching the token.

**File**: `/src/services/api.service.ts`

Should have this code:
```typescript
const token = storage.getAccessToken();

headers: {
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}
```

---

## Test Authentication

### Quick Test in Console:

```javascript
// Get token
const token = localStorage.getItem('access_token');
console.log('Token:', token ? 'EXISTS' : 'MISSING');

// Make test request
fetch('http://localhost:3000/api/v1/payment/create-order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    amount: 10,
    currency: 'INR'
  })
})
.then(r => r.json())
.then(d => console.log('Response:', d))
.catch(e => console.error('Error:', e));
```

---

## Expected Backend Logs

If authentication works correctly, backend should log:

```
DEBUG: req.user = {"id":"123e4567-e89b-12d3-a456-426614174000","email":"user@example.com",...}
Creating payment order for user: 123e4567-e89b-12d3-a456-426614174000, amount: ₹10
```

If authentication fails:

```
DEBUG: req.user = undefined
User ID is missing from request
```

---

## Common Issues

### 1. Not Logged In
**Symptom**: No token in localStorage
**Fix**: Login at `/login`

### 2. Token Expired
**Symptom**: Token exists but gets 401 Unauthorized
**Fix**: Logout and login again

### 3. Token Not Sent
**Symptom**: Token exists but Authorization header missing
**Fix**: Check `api.service.ts` implementation

### 4. Wrong Token Key
**Symptom**: Using different storage key
**Fix**: Ensure using `access_token` key

---

## Manual Test

1. **Logout** (clear localStorage):
   ```javascript
   localStorage.clear();
   ```

2. **Go to `/login`**

3. **Login with credentials**

4. **Check token**:
   ```javascript
   localStorage.getItem('access_token')
   ```

5. **Try payment again**

---

## Next Steps

1. Open browser console
2. Run the commands above
3. Share the output with me:
   - Token status (exists/missing)
   - Authorization header status
   - Backend logs from terminal

This will help identify the exact issue!
