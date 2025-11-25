# WakaTime Integration Guide

## 📊 Setup WakaTime Stats

Follow these steps to integrate WakaTime coding statistics into your portfolio.

### 1. Get Your WakaTime API Key

1. **Sign up/Login** to [WakaTime](https://wakatime.com)
2. Go to **Settings** → **Account** → **API Key**
3. Or visit directly: https://wakatime.com/settings/account
4. Copy your API key (format: `waka_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### 2. Add API Key to Environment Variables

Open your `.env` file and add:

```bash
WAKATIME_API_KEY=waka_your_actual_api_key_here
```

**Important:**
- ✅ Use `WAKATIME_API_KEY` (without `NEXT_PUBLIC_` prefix)
- ✅ API key should start with `waka_`
- ✅ Don't share your API key publicly
- ✅ Make sure `.env` is in `.gitignore`

### 3. Restart Development Server

After adding the API key, restart your dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 4. Test the Integration

Visit: `http://localhost:3000/stats`

You should see your coding statistics!

---

## 🔧 Troubleshooting

### Error: "WakaTime API key not configured"

**Solution:**
- Make sure you added `WAKATIME_API_KEY` to your `.env` file
- Restart the development server
- Check that `.env` is in the root directory

### Error: "Invalid WakaTime API key format"

**Solution:**
- API key must start with `waka_`
- Get a new key from https://wakatime.com/settings/account
- Make sure there are no extra spaces in the `.env` file

### Error: 401 Unauthorized

**Solution:**
- Your API key is invalid or expired
- Generate a new API key from WakaTime settings
- Make sure you copied the entire key

### Error: 403 Forbidden

**Solution:**
- Check API key permissions in WakaTime settings
- Make sure your WakaTime account is active

### Error: No data available

**Solution:**
- Make sure you have WakaTime plugin installed in your code editor
- Check that you've been coding in the last 7 days
- Verify data is showing on https://wakatime.com/dashboard

---

## 📝 Environment Variables Reference

```bash
# .env file

# Required for Stats Page
WAKATIME_API_KEY=waka_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Optional - Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GITHUB_USERNAME=your_username
```

---

## 🎨 Customization

### Add More Stats

WakaTime API provides additional endpoints:

- **All time stats**: `/users/current/all_time_since_today`
- **Goals**: `/users/current/goals`
- **Projects**: `/users/current/projects`
- **Durations**: `/users/current/durations`

See: https://wakatime.com/developers

---

## 🔒 Security Best Practices

1. **Never commit `.env` file** to Git
2. **Use environment variables** in production (Vercel, Netlify, etc.)
3. **Rotate API keys** periodically
4. **Don't use `NEXT_PUBLIC_` prefix** for API keys (keeps them server-side only)

---

## 🚀 Deployment

### Vercel

1. Go to your project settings on Vercel
2. Navigate to **Environment Variables**
3. Add:
   - Name: `WAKATIME_API_KEY`
   - Value: `waka_your_api_key`
4. Redeploy your application

### Netlify

1. Go to **Site settings** → **Environment variables**
2. Add:
   - Key: `WAKATIME_API_KEY`
   - Value: `waka_your_api_key`
3. Redeploy

---

## 📚 Resources

- [WakaTime API Documentation](https://wakatime.com/developers)
- [WakaTime Dashboard](https://wakatime.com/dashboard)
- [WakaTime Plugins](https://wakatime.com/plugins)

---

## ✅ Checklist

- [ ] Created WakaTime account
- [ ] Installed WakaTime plugin in code editor
- [ ] Got API key from settings
- [ ] Added `WAKATIME_API_KEY` to `.env`
- [ ] Restarted dev server
- [ ] Tested at `/stats` page
- [ ] Verified data is showing

---