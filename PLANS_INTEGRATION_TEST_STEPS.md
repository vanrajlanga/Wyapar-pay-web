# Mobile Recharge Plans Integration - Testing Guide

## Changes Made

### Website Changes:
1. ✅ **Recharge Page** - Added sessionStorage persistence for detection data
   - Stores: operatorId, circleCode, circleName, operatorCode, operatorName
   - Location: `website/src/app/recharge/page.tsx`

2. ✅ **Plans Page** - Added sessionStorage fallback and comprehensive logging
   - Reads from sessionStorage if context is null
   - Uses effective values from local state or context
   - Location: `website/src/app/recharge/plans/page.tsx`

3. ✅ **Backend** - Added comprehensive logging
   - Logs all incoming parameters
   - Logs KWIKAPI fetch attempts
   - Location: `Wyapar/backend/src/modules/recharge/recharge.service.ts`

## Testing Steps

### 1. Start Backend
```bash
cd /Volumes/Krishna/Krishna/wyapar-pay/Wyapar/backend
npm run start:dev

# Wait for: ✅ KWIKAPI Service initialized successfully
```

### 2. Start Website
```bash
cd /Volumes/Krishna/Krishna/wyapar-pay/website
npm run dev

# Opens at: http://localhost:3001
```

### 3. Test Flow

#### Step A: Login
- Go to: http://localhost:3001/login
- Email: `admin@wyaparpay.com`
- Password: `admin`

#### Step B: Navigate to Recharge
- Go to: http://localhost:3001/recharge

#### Step C: Detect Operator
- Enter mobile: `7070300613`
- Click "Detect" button

**Expected Browser Console Logs:**
```javascript
🔍 Starting operator detection for: 7070300613
✅ Detection Response: {
  operatorCode: "VI",
  operatorName: "VI",
  operatorId: "3",        // ← Must be present!
  circleCode: "17",       // ← Must be present!
  circleName: "Bihar (BR)"
}
📋 Extracted values: { operatorId: "3", circleCode: "17", ... }
💾 Storing in context...
💾 Also stored in sessionStorage for persistence
✅ Stored in context: { operatorId: "3", circleCode: "17", ... }
```

**Expected UI:**
```
✓ Detected: VI in Bihar (BR)
Circle: Bihar (BR)
```

#### Step D: Browse Plans
- Click "Browse Plans" button
- Should navigate to: http://localhost:3001/recharge/plans

**Expected Browser Console Logs:**
```javascript
🔍 Plans Page - Context Values: {
  mobileNumber: "7070300613",
  selectedOperator: "VI",
  operatorId: "3",        // ← Should be present!
  circleCode: "17",       // ← Should be present!
  circleName: "Bihar (BR)"
}

// If context is null, fallback logs:
⚠️ Context values missing, checking sessionStorage...
📦 SessionStorage values: {
  storedOperatorId: "3",
  storedCircleCode: "17",
  ...
}
✅ Restored from sessionStorage

🔍 Fetching plans with KWIKAPI data: {
  operator: "VI",
  operatorName: "VI",
  operatorId: "3",        // ← Must be passed!
  circleCode: "17",       // ← Must be passed!
  category: "POPULAR"
}

✅ Fetched 113 plans from KWIKAPI
```

**Expected Backend Logs:**
```
📥 getPlans called with parameters: {
  operatorCode: 'VI',
  circleCode: '17',
  category: 'POPULAR',
  operatorId: '3',        // ← Backend received it!
  hasOperatorId: true,
  hasCircleCode: true
}

✅ Valid KWIKAPI params - Fetching plans from KWIKAPI: Operator ID 3, Circle 17

[Nest] Fetching plans for operator ID: 3, circle: 17
✅ Found 113 plans for IDEA in BIHAR
💰 Credit Balance: 9993
Normalized 113 plans from KWIKAPI (filtered: POPULAR)
✅ Fetched 113 plans from KWIKAPI
```

**Expected UI:**
```
Loading plans from KWIKAPI...
✅ Displays 113 plans with:
- Category tabs: Popular, Data, Unlimited, Talktime
- Plan cards showing:
  - Amount (₹224, ₹299, etc.)
  - Validity (28 Days, 56 Days, etc.)
  - Description
  - Benefits with checkmarks
  - Data info (4GB, etc.)
  - Select button
```

#### Step E: Test Category Filtering
- Click "Data" tab → Should show only DATA plans
- Click "Unlimited" tab → Should show UNLIMITED plans
- Click "Talktime" tab → Should show TALKTIME plans
- Click "Popular" tab → Should show POPULAR plans

**Expected for each category:**
- Backend logs showing filter applied
- UI updates to show filtered plans
- Plan count changes based on category

#### Step F: Test Plan Selection
- Click "Select" on any plan
- Should navigate to review page with plan details

## Troubleshooting

### Error: "Please detect operator first"

**Check #1: Detection Response**
- Open DevTools Console
- Verify detection response contains operatorId and circleCode
- If missing → Backend detection API issue

**Check #2: SessionStorage**
- In DevTools Console, run:
  ```javascript
  console.log({
    operatorId: sessionStorage.getItem('recharge_operatorId'),
    circleCode: sessionStorage.getItem('recharge_circleCode'),
  });
  ```
- If null → Detection not storing properly

**Check #3: Backend Logs**
- Check if backend receives the parameters
- Look for: `📥 getPlans called with parameters:`
- If hasOperatorId: false → Frontend not sending

### Error: "Failed to fetch plans"

**Check #1: Backend Running**
- Verify backend is on port 3000
- Check for errors in backend logs

**Check #2: KWIKAPI Credentials**
- Verify API key is valid
- Check credit balance (should be > 0)

**Check #3: Network Tab**
- Check request URL includes operatorId and circleCode
- Example: `/recharge/plans?operatorCode=VI&operatorId=3&circleCode=17`

### Empty Plans Array

**Check #1: Category Filter**
- Try different categories
- Check backend logs for category mapping

**Check #2: KWIKAPI Response**
- Backend logs should show KWIKAPI response
- Verify it returned plans

## Success Criteria

- ✅ Detection returns operatorId ("3") and circleCode ("17")
- ✅ Values stored in both context AND sessionStorage
- ✅ Plans page receives values (from context or sessionStorage)
- ✅ Backend receives operatorId and circleCode parameters
- ✅ Backend calls KWIKAPI with opid=3 and state_code=17
- ✅ KWIKAPI returns 113 plans
- ✅ Website displays 113 plans
- ✅ Category filtering works
- ✅ Plan selection works

## Next Steps After Success

Once all tests pass:
1. Test with different mobile numbers
2. Test different operators (Airtel, Jio, etc.)
3. Test on mobile app
4. Integrate next API: Process Recharge

---

**Date:** 2026-01-22
**Status:** Ready for testing
**Expected Result:** 113 KWIKAPI plans displayed
