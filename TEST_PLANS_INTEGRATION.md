# 🧪 TEST KWIKAPI PLANS INTEGRATION

## ✅ **WHAT WAS FIXED**

The error "Please detect operator first" was happening because:
1. ❌ Website wasn't properly storing `operatorId` and `circleCode` from detection
2. ❌ Plans page wasn't receiving these values from context
3. ❌ Service was passing wrong parameter names to backend

**All fixed now!** ✅

---

## 🔄 **CORRECT FLOW**

```
Step 1: User enters mobile number
    ↓
Step 2: Click "Detect" button
    ↓ Calls: POST /api/v1/recharge/detect-operator
    ↓ Returns:
    {
      "operatorCode": "VI",
      "operatorName": "VI",
      "operatorId": "3",      ← Stored in context
      "circleCode": "17",     ← Stored in context
      "circleName": "Bihar (BR)"
    }
    ↓
Step 3: Click "Browse Plans"
    ↓ Navigates to /recharge/plans
    ↓ Plans page checks: operatorId? circleCode? ✅
    ↓ Calls: GET /recharge/plans?operatorCode=VI&operatorId=3&circleCode=17&category=POPULAR
    ↓
Step 4: Backend → KWIKAPI
    ↓ POST /api/v2/recharge_plans.php
    ↓ Form-data: api_key, opid=3, state_code=17
    ↓
Step 5: KWIKAPI Returns 113 plans
    ↓ Backend normalizes to your format
    ↓ Returns to website
    ↓
Step 6: Website displays plans ✅
```

---

## 🧪 **HOW TO TEST**

### 1. Start Backend
```bash
cd /Volumes/Krishna/Krishna/wyapar-pay/Wyapar/backend
npm run start:dev

# Wait for:
# ✅ KWIKAPI Service initialized successfully
```

### 2. Start Website
```bash
cd /Volumes/Krishna/Krishna/wyapar-pay/website
npm run dev

# Opens at: http://localhost:3001
```

### 3. Test the Flow

#### A. Login
- Go to: http://localhost:3001/login
- Email: `admin@wyaparpay.com`
- Password: `admin`

#### B. Navigate to Recharge
- Go to: http://localhost:3001/recharge

#### C. Enter Mobile Number
- Type: `7070300613`
- Click "Detect" button

**Expected Result:**
```
✓ Detected: VI in Bihar (BR)
Circle: Bihar (BR)
```

**Check Browser Console:**
```javascript
Operator detected: {
  operatorCode: "VI",
  operatorName: "VI",
  operatorId: "3",        // ← Should be present!
  circleCode: "17",       // ← Should be present!
  circleName: "Bihar (BR)"
}
```

#### D. Browse Plans
- Click "Browse Plans" button
- Should navigate to: http://localhost:3001/recharge/plans

**Expected Result:**
```
Loading plans from KWIKAPI...
✅ Fetched 113 plans from KWIKAPI
```

**Check Browser Console:**
```javascript
🔍 Fetching plans with KWIKAPI data: {
  operator: "VI",
  operatorName: "VI",
  operatorId: "3",      // ← Should be present!
  circleCode: "17",     // ← Should be present!
  category: "POPULAR"
}

✅ Fetched 113 plans from KWIKAPI
```

**Check Backend Logs:**
```
[Nest] Fetching plans for operator ID: 3, circle: 17
✅ Found 113 plans for IDEA in BIHAR
💰 Credit Balance: 9993
Normalized 113 plans from KWIKAPI (filtered: POPULAR)
✅ Fetched 113 plans from KWIKAPI
```

#### E. Verify Plans Display
You should see plans like:
```
₹224 - 30 Days
Get Unlimited Calls + 4GB data for 30 Days

✓ Unlimited Calls
✓ 4GB data for 30 Days
📊 4GB
[Select Button]
```

#### F. Test Category Filtering
- Click "Data" tab → Should show only data plans
- Click "Unlimited" tab → Should show unlimited plans
- Click "Popular" tab → Should show popular plans

---

## 🐛 **TROUBLESHOOTING**

### Error: "Please detect operator first"

**Cause:** operatorId or circleCode not stored from detection

**Fix:**
1. Open browser DevTools (F12) → Console tab
2. After clicking "Detect", check the log
3. Verify operatorId and circleCode are present:
   ```javascript
   Operator detected: {
     operatorId: "3",     // ← Must be here!
     circleCode: "17"     // ← Must be here!
   }
   ```
4. If missing, check backend response

### Error: "Failed to fetch plans"

**Cause:** Backend not running or API error

**Fix:**
1. Check backend logs for errors
2. Verify backend is running on port 3000
3. Test backend directly:
   ```bash
   curl -X GET "http://localhost:3000/api/v1/recharge/plans?operatorCode=VI&operatorId=3&circleCode=17" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

### Error: Empty plans array

**Cause:** Wrong operatorId or circleCode

**Fix:**
1. Verify detection returned correct values
2. Check backend logs for KWIKAPI response
3. Try different mobile numbers

### Plans not displaying

**Cause:** Frontend rendering issue

**Fix:**
1. Check browser console for errors
2. Verify plans array in state
3. Check network tab for API response

---

## ✅ **EXPECTED RESULTS**

### Detection Response:
```json
{
  "operatorCode": "VI",
  "operatorName": "VI",
  "operatorId": "3",
  "circleCode": "17",
  "circleName": "Bihar (BR)",
  "creditBalance": "9993"
}
```

### Plans API Call:
```
GET /recharge/plans?operatorCode=VI&operatorId=3&circleCode=17&category=POPULAR
```

### Plans Response:
```json
[
  {
    "id": "kwik-FULLTT-224-0",
    "amount": 224,
    "validity": "30 Days",
    "data": "4GB",
    "calling": "Unlimited",
    "category": "UNLIMITED",
    "type": "Plan Voucher",
    "operator": "IDEA",
    "circle": "BIHAR",
    "description": "Get Unlimited Calls + 4GB data for 30 Days...",
    "benefits": [
      "Unlimited Calls",
      "4GB data for 30 Days"
    ]
  },
  // ... 112 more plans
]
```

---

## 📊 **SUCCESS CRITERIA**

- ✅ Detection returns operatorId and circleCode
- ✅ Values stored in RechargeContext
- ✅ Plans page receives values from context
- ✅ Backend receives correct query parameters
- ✅ KWIKAPI returns 113 plans
- ✅ Backend normalizes plans correctly
- ✅ Website displays 113 plans
- ✅ Category filtering works
- ✅ Plan selection works

---

## 🔍 **DEBUG MODE**

Open browser console and run:
```javascript
// Check context state
console.log('Context state:', {
  operatorId: /* check RechargeContext */,
  circleCode: /* check RechargeContext */,
});

// Check if detection worked
localStorage.getItem('debug') // Enable debug logs
```

---

## 🎯 **NEXT STEPS AFTER SUCCESS**

Once you see 113 plans:
1. ✅ Test with different mobile numbers
2. ✅ Test different operators
3. ✅ Test all category filters
4. ✅ Test plan selection
5. ✅ Ready to integrate recharge processing API!

---

**Date:** 2026-01-22
**Status:** Ready for testing
**Expected Result:** 113 real KWIKAPI plans displayed
