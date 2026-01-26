/**
 * Authentication Debug Script
 *
 * Run this in your browser console (F12 → Console tab)
 * to check if you're authenticated
 */

console.log('🔍 Checking Authentication Status...\n');

// 1. Check if token exists
const token = localStorage.getItem('access_token');
console.log('1. Access Token:');
if (token) {
  try {
    const parsed = JSON.parse(token);
    console.log('   ✅ EXISTS');
    console.log('   Length:', parsed.length, 'characters');
    console.log('   Preview:', parsed.substring(0, 50) + '...');

    // Decode JWT to check expiry
    try {
      const parts = parsed.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        console.log('   Payload:', payload);
        console.log('   User ID (sub):', payload.sub);
        console.log('   Expires:', new Date(payload.exp * 1000).toLocaleString());

        // Check if expired
        if (payload.exp * 1000 < Date.now()) {
          console.log('   ⚠️  TOKEN EXPIRED!');
        } else {
          console.log('   ✅ Token is still valid');
        }
      }
    } catch (e) {
      console.log('   Could not decode JWT:', e.message);
    }
  } catch (e) {
    console.log('   ❌ Token exists but is not JSON:', token.substring(0, 100));
  }
} else {
  console.log('   ❌ NO TOKEN FOUND - You are not logged in!');
}

console.log('\n2. User Data:');
const userData = localStorage.getItem('user_data');
if (userData) {
  try {
    const user = JSON.parse(userData);
    console.log('   ✅ User:', user.email || user.phone || 'Unknown');
    console.log('   ID:', user.id);
  } catch (e) {
    console.log('   ❌ Invalid user data');
  }
} else {
  console.log('   ❌ No user data');
}

console.log('\n3. Test API Request:');
if (token) {
  const parsedToken = JSON.parse(token);
  fetch('http://localhost:3000/api/v1/payment/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${parsedToken}`
    },
    body: JSON.stringify({ amount: 10, currency: 'INR' })
  })
  .then(async r => {
    const data = await r.json();
    if (r.ok) {
      console.log('   ✅ API Request SUCCESSFUL');
      console.log('   Response:', data);
    } else {
      console.log('   ❌ API Request FAILED');
      console.log('   Status:', r.status);
      console.log('   Error:', data);
    }
  })
  .catch(e => {
    console.log('   ❌ Network Error:', e.message);
  });
} else {
  console.log('   ⏭️  Skipped (no token)');
}

console.log('\n📋 Summary:');
console.log('━'.repeat(50));
if (!token) {
  console.log('❌ PROBLEM: You are not logged in');
  console.log('✅ FIX: Go to /login and login again');
} else {
  console.log('✅ Token exists');
  console.log('⏳ Check the API request result above');
  console.log('\nIf API fails, check backend logs for:');
  console.log('  DEBUG: req.user = ...');
}
console.log('━'.repeat(50));
