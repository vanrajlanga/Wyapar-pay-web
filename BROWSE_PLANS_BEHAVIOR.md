# Browse Plans Behavior - Complete Guide

## 🎯 How "Browse Plans" Works

### Data Requirements
The Browse Plans functionality requires **KWIKAPI-specific IDs**:
- `operatorId` - KWIKAPI operator ID (e.g., "1" for Airtel, "2" for Jio)
- `circleCode` - KWIKAPI circle code (e.g., "1" for Delhi, "9" for UP East)

These IDs are **only available** from the KWIKAPI "Detect Operator" API.

---

## 📋 User Scenarios

### ✅ Scenario 1: Use Detected Operator (Recommended)
```
1. User enters: 9876543210
2. Clicks "Detect"
3. System detects: Airtel, UP East
   - operatorId: "1"
   - circleCode: "9"
4. Airtel is auto-selected and highlighted
5. Circle dropdown shows: UP East (pre-selected)
6. User clicks "Browse Plans"
   ✅ SUCCESS - Uses operatorId="1" and circleCode="9"
   ✅ Gets real plans from KWIKAPI
```

**Result:** ✅ **Works perfectly!** Gets accurate plans for the detected operator and circle.

---

### ✅ Scenario 2: Keep Detected, Change Circle
```
1. User enters: 9876543210
2. Clicks "Detect"
3. System detects: Airtel, UP East (operatorId="1", circleCode="9")
4. User keeps Airtel selected
5. User manually changes circle to "Delhi" (circleCode="1")
6. User clicks "Browse Plans"
   ✅ SUCCESS - Uses operatorId="1" (Airtel) and circleCode="1" (Delhi)
   ⚠️ Plans shown are for Airtel in Delhi (not UP East)
```

**Result:** ✅ **Works!** But shows plans for wrong circle (Delhi instead of UP East).

**Note:** This scenario works technically but may show incorrect plans since the circle was manually changed.

---

### ❌ Scenario 3: Change to Different Operator
```
1. User enters: 9876543210
2. Clicks "Detect"
3. System detects: Airtel (operatorId="1", circleCode="9")
4. User manually selects "Jio" instead
5. System clears: operatorId=null, circleCode=null
6. Warning appears: "You selected a different operator than detected"
7. User clicks "Browse Plans"
   ❌ ERROR - "You selected a different operator. Please click Detect again."
```

**Result:** ❌ **Blocked!** Cannot browse plans without proper detection.

**Solution:** User must click "Detect" button again to get correct Jio operatorId.

---

### ✅ Scenario 4: Manually Select Same Operator
```
1. User enters: 9876543210
2. Clicks "Detect"
3. System detects: Airtel (operatorId="1", circleCode="9")
4. User clicks "Airtel" button (same as detected)
5. System restores: operatorId="1", circleCode="9"
6. User clicks "Browse Plans"
   ✅ SUCCESS - Uses operatorId="1" and circleCode="9"
```

**Result:** ✅ **Works perfectly!** Same as Scenario 1.

---

## 🔒 Validation Logic

When user clicks "Browse Plans", the system checks:

1. ✅ **Operator selected?**
   - If NO: Show error "Please select an operator first"

2. ✅ **Mobile number entered?**
   - If NO: Show error "Please enter mobile number first"

3. ✅ **Same operator as detected?**
   - If NO: Show error "You selected a different operator. Please click Detect again"

4. ✅ **Has operatorId and circleCode?**
   - If NO: Show error "Missing operator detection data. Please click Detect first"

5. ✅ **All checks passed?**
   - Navigate to plans page
   - Fetch plans using operatorId and circleCode

---

## 💡 User Guidance

### Warning Messages

**When user selects different operator:**
```
⚠️ Warning: You selected a different operator than detected.
To browse plans, please click "Detect" again with this number,
or change the operator back to Airtel.
```

**When trying to browse without detection:**
```
⚠️ Missing operator detection data. Please click "Detect" button first.
```

---

## 🎯 Best Practices

### For Users:
1. ✅ **Always click "Detect" first** - This ensures accurate operator and circle detection
2. ✅ **Use detected operator** - Don't manually change unless it's wrong
3. ✅ **If detection is wrong** - Click "Detect" again or enter correct number
4. ⚠️ **Avoid manual circle change** - Use detected circle for best results

### For Developers:
1. ✅ `operatorId` and `circleCode` must come from KWIKAPI detection
2. ✅ Don't allow plan browsing without valid KWIKAPI IDs
3. ✅ Show clear warnings when user deviates from detected values
4. ✅ Store detection data in sessionStorage for page navigation

---

## 🔧 Technical Details

### Data Flow:
```
User Input → Detect API → KWIKAPI Response
                           ↓
                    operatorId + circleCode
                           ↓
                    sessionStorage + Context
                           ↓
                    Browse Plans Button
                           ↓
                    Plans Page → Fetch Plans API
                           ↓
                    KWIKAPI Plans Response
```

### Session Storage Keys:
- `recharge_operatorId` - KWIKAPI operator ID
- `recharge_circleCode` - KWIKAPI circle code
- `recharge_circleName` - Circle name for display
- `recharge_operatorCode` - Operator code (AIRTEL, JIO, etc.)
- `recharge_operatorName` - Operator name for display
- `recharge_mobile_number` - Mobile number entered

---

## ❓ FAQ

**Q: Why can't I browse plans after manually selecting an operator?**
A: KWIKAPI requires specific operator IDs that only come from the detection API. Manual selection doesn't provide these IDs.

**Q: What if the detection is wrong?**
A: Click "Detect" again, or try entering a different test number for the correct operator.

**Q: Can I manually change the circle?**
A: Yes, but the plans may not be accurate for your actual circle. Best to use detected circle.

**Q: What's the difference between operatorCode and operatorId?**
A:
- `operatorCode`: User-friendly code like "AIRTEL", "JIO"
- `operatorId`: KWIKAPI internal ID like "1", "2" (required for API calls)

---

## 🎨 UI States

### State 1: No Detection
```
[Mobile Number Input] [Detect Button]
[Operator Grid - not highlighted]
❌ Browse Plans button hidden
```

### State 2: Detection Success
```
[Mobile Number Input] [Detect Button]
✅ Detected: Airtel • UP East
[Operator Grid - Airtel highlighted]
[Circle Dropdown - UP East selected]
✅ Browse Plans button visible
```

### State 3: Different Operator Selected
```
[Mobile Number Input] [Detect Button]
✅ Detected: Airtel • UP East
[Operator Grid - Jio highlighted]
⚠️ Warning: Different operator selected
✅ Browse Plans button visible (but will show error on click)
```

---

**Last Updated:** 2026-01-26
