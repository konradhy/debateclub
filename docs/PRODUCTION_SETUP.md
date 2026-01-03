# Production Setup Guide

This guide covers all the steps needed to deploy DebateClub to production.

## Overview

Before going live, you need to configure:
1. **Google OAuth** - For user authentication
2. **Stripe Payments** - For subscriptions and token purchases

## 1. Google OAuth Production Setup

### Step 1: Google Cloud Console Configuration

1. **Go to Google Cloud Console**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project (or create one)

2. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" → "OAuth consent screen"
   - Fill out required fields:
     - App name: "DebateClub"
     - User support email: your email
     - Developer contact: your email
   - Choose "External" for public app
   - Add test users if needed during development

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web Application"
   - Set name (e.g., "DebateClub Production")

4. **Configure Authorized URIs**
   
   **For Development:**
   - Authorized JavaScript origins: `http://localhost:5173`
   - Authorized redirect URI: `https://YOUR-DEV-DEPLOYMENT.convex.site/api/auth/callback/google`
   
   **For Production:**
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URI: `https://YOUR-PROD-DEPLOYMENT.convex.site/api/auth/callback/google`

   > **Finding your Convex URL:** Go to Convex Dashboard → Settings → URL & Deploy Key

### Step 2: Set Environment Variables

**Development:**
```bash
npx convex env set AUTH_GOOGLE_ID your-dev-client-id
npx convex env set AUTH_GOOGLE_SECRET your-dev-client-secret
```

**Production:**
```bash
# Switch to production deployment first
npx convex env set AUTH_GOOGLE_ID your-prod-client-id --prod
npx convex env set AUTH_GOOGLE_SECRET your-prod-client-secret --prod
```

### Step 3: Test OAuth Flow

1. Deploy your changes: `npx convex deploy --prod`
2. Visit your production login page
3. Click "Continue with Google"
4. Verify successful authentication

## 2. Stripe Payment Setup

See [STRIPE_SETUP.md](./STRIPE_SETUP.md) for complete Stripe configuration.

**Quick checklist:**
- [ ] Switch Stripe to Live mode
- [ ] Create production products with `npx convex run setupStripeProducts:createAllProducts`
- [ ] Update price IDs in `convex/lib/monetization.ts`
- [ ] Configure production webhook endpoint
- [ ] Set `STRIPE_SECRET_KEY` environment variable

## 3. Domain Configuration

### Custom Domain (Optional)

If using a custom domain instead of `.convex.site`:

1. **Configure DNS**
   - Point your domain to Convex (see Convex docs)
   
2. **Update OAuth Settings**
   - Add your custom domain to Google OAuth authorized origins
   - Update redirect URI to use custom domain

3. **Update Environment Variables**
   - Set `SITE_URL=https://yourdomain.com` in Convex

## 4. Pre-Launch Checklist

### Authentication
- [ ] Google OAuth working in production
- [ ] Test user registration flow
- [ ] Test password reset emails
- [ ] Verify email templates display correctly

### Payments
- [ ] Stripe webhook receiving events
- [ ] Test token purchase flow
- [ ] Test subscription signup
- [ ] Verify billing page functionality
- [ ] Test subscription cancellation

### Core Features
- [ ] Opponent creation working
- [ ] Research generation functional
- [ ] Debate sessions starting properly
- [ ] Voice integration (Vapi) working
- [ ] Post-debate analysis generating

### Performance
- [ ] Check Convex function performance
- [ ] Monitor API costs (OpenRouter, Gemini, etc.)
- [ ] Verify caching working properly

## 5. Monitoring & Maintenance

### After Launch
- Monitor Convex Dashboard for errors
- Check Stripe Dashboard for payment issues
- Review API usage and costs
- Monitor user feedback and support requests

### Regular Tasks
- Review and rotate API keys quarterly
- Monitor webhook delivery success rates
- Check for failed payments and follow up
- Update OAuth consent screen if needed

## Troubleshooting

### OAuth Issues
- **"redirect_uri_mismatch"**: Add exact Convex URL to Google Console
- **"invalid_client"**: Check client ID/secret are correct
- **"access_denied"**: User declined or app not approved

### Stripe Issues
- **Webhook failures**: Check endpoint URL and signing secret
- **Payment failures**: Verify price IDs and live mode settings
- **Subscription issues**: Check webhook event handling

## Support Resources

- **Convex**: [docs.convex.dev](https://docs.convex.dev)
- **Google OAuth**: [developers.google.com/identity/protocols/oauth2](https://developers.google.com/identity/protocols/oauth2)
- **Stripe**: [stripe.com/docs](https://stripe.com/docs)

---

**Need Help?** Check the individual setup guides:
- [STRIPE_SETUP.md](./STRIPE_SETUP.md) - Detailed Stripe configuration
- Project documentation in `/rules/` folder