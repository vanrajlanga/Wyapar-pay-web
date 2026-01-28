# WyaparPay Website - Deployment Guide

## 🚀 Automated Deployment Setup

This guide explains how to deploy updates with just `git pull`, `npm run build`, and restart.

---

## 📋 One-Time Server Setup

### Step 1: Configure Plesk Node.js Settings

**IMPORTANT:** Use `.next/standalone` as your document root!

```
Node.js Version:         23.11.1 (or 20.x)
Package Manager:         npm
Document Root:           /wyaparpay.kabootz.in/.next/standalone  ← IMPORTANT!
Application Root:        /wyaparpay.kabootz.in
Application Startup:     .next/standalone/server.js
Application Mode:        production
Application URL:         https://wyaparpay.kabootz.in
```

### Step 2: Set Environment Variables

Click **[specify]** next to "Custom environment variables":

```bash
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

# Your backend API URL
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api/v1

# Razorpay (use live keys in production)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY

# App URLs
NEXT_PUBLIC_APP_URL=https://wyaparpay.kabootz.in
NEXT_PUBLIC_SITE_URL=https://wyaparpay.kabootz.in
NEXT_PUBLIC_APP_NAME=WyaparPay
```

### Step 3: Enable Node.js

- Click **"Enable Node.js"** button
- Click **"NPM Install"** (installs dependencies)
- Click **"Restart App"**

---

## 🔄 Deploying Updates (Simple Workflow)

Once the one-time setup is complete, deploying updates is easy:

### Via SSH (Recommended):

```bash
# 1. Navigate to project
cd /var/www/vhosts/kabootz.in/wyaparpay.kabootz.in

# 2. Pull latest code
git pull origin main

# 3. Install dependencies (if package.json changed)
npm ci

# 4. Build (this runs postbuild automatically)
npm run build

# 5. Restart app via Plesk
# Go to Plesk → Node.js → Click "Restart App"
# Or if you have pm2: pm2 restart wyaparpay
```

### Via Plesk Interface:

1. **Pull Code:**
   - Use Plesk Git integration
   - Or upload files via File Manager

2. **Build:**
   - Plesk → Node.js → Click **"NPM Install"**
   - Then SSH in and run: `npm run build`

3. **Restart:**
   - Plesk → Node.js → Click **"Restart App"**

---

## 🎯 What Happens During Build

When you run `npm run build`:

1. ✅ Next.js builds the application
2. ✅ Creates `.next/standalone/` folder with server
3. ✅ Post-build script automatically runs
4. ✅ Copies `.next/static` → `.next/standalone/.next/static`
5. ✅ Copies `public/*` → `.next/standalone/public/*`
6. ✅ Everything is self-contained in `.next/standalone/`

**Result:** All assets are in the right place for the web server!

---

## 📂 Server Directory Structure

After build, your server should look like this:

```
/wyaparpay.kabootz.in/
├── .next/
│   └── standalone/              ← Document Root points here
│       ├── .next/
│       │   └── static/          ← Static assets (auto-copied)
│       │       ├── chunks/      ← JS files
│       │       ├── css/         ← CSS files
│       │       └── media/       ← Fonts
│       ├── node_modules/        ← Dependencies
│       ├── public/              ← Public assets (auto-copied)
│       │   ├── logo.png
│       │   ├── manifest.json
│       │   └── ...
│       ├── server.js            ← Startup file
│       └── package.json
├── src/                         ← Source code
├── public/                      ← Source public files
├── package.json
└── ...
```

---

## ✅ Verification

After deployment, verify:

1. **Website loads:** https://wyaparpay.kabootz.in
2. **No 404 errors:** Press F12 → Network tab
3. **Proper styling:** Colors, fonts, images showing
4. **Node.js running:** Check Plesk Node.js status

---

## 🐛 Troubleshooting

### Issue: 404 errors for static files

**Solution:** Check Document Root is set to `.next/standalone`:
```
Document Root: /wyaparpay.kabootz.in/.next/standalone  ✅
NOT: /wyaparpay.kabootz.in  ❌
```

### Issue: Files not updating after build

**Solution:**
```bash
# Clear .next folder and rebuild
npm run clean
npm run build
# Restart app in Plesk
```

### Issue: Environment variables not working

**Solution:**
- Check they're set in Plesk Node.js settings
- Restart app after changing env vars
- Server-side vars (without NEXT_PUBLIC_) only work in API routes/server code

### Issue: Build fails on server

**Solution:**
```bash
# Check Node version
node -v  # Should be 20.x or 23.x

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

---

## 🔐 Security Notes

1. **Never commit .env files** to git
2. **Use environment variables** in Plesk for secrets
3. **Use live Razorpay keys** in production
4. **Enable HTTPS** for production domain
5. **Document Root security:** Using `.next/standalone` is secure - it only exposes built files, not source code

---

## 📊 Performance Tips

1. **Enable compression** in Plesk (gzip)
2. **Use CDN** for static assets (optional)
3. **Monitor memory usage** in Plesk
4. **Set up PM2** for auto-restart on crashes (optional)

---

## 🚀 Quick Reference

### Deploy Command (on server):
```bash
cd /var/www/vhosts/kabootz.in/wyaparpay.kabootz.in && \
git pull && \
npm ci && \
npm run build && \
echo "✅ Build complete! Now restart app in Plesk"
```

### Local Build Test:
```bash
npm run build
npm run start:local  # Test on http://localhost:3001
```

### View Logs:
```bash
# Plesk logs location (usually)
tail -f /var/log/nodejs/wyaparpay.kabootz.in.log

# Or check in Plesk → Node.js → View Logs
```

---

## 📞 Support

For issues:
- Check this deployment guide
- Review Next.js standalone docs: https://nextjs.org/docs/advanced-features/output-file-tracing
- Check Plesk Node.js logs

---

**Happy Deploying!** 🎉
