# Sanity Webhook Setup for On-Demand Revalidation

This guide explains how to set up Sanity webhooks to automatically trigger cache invalidation when content is updated.

## Overview

The site now uses **Static Site Generation (SSG)** with **On-Demand Revalidation**:
- Pages are built statically at build time (super fast)
- Content is cached indefinitely in production
- When you update content in Sanity, a webhook triggers Next.js to rebuild only the affected pages
- No more polling or time-based revalidation needed

## Setup Steps

### 1. Generate a Revalidation Secret

Generate a secure random string for the `REVALIDATE_SECRET` environment variable:

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2. Add Environment Variable

Add the secret to your `.env.local` file and deployment environment (Vercel/etc):

```bash
REVALIDATE_SECRET=your-generated-secret-here
```

### 3. Deploy Your Site

Deploy the updated code so the revalidation endpoint is available:

```bash
# Build locally to test
npm run build

# Deploy to production
git push
```

### 4. Configure Sanity Webhook

1. Go to your Sanity project dashboard: https://www.sanity.io/manage
2. Navigate to **API** → **Webhooks**
3. Click **Create webhook**
4. Configure the webhook:

   - **Name**: `Next.js Revalidation`
   - **URL**: `https://your-domain.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET`
     - Replace `your-domain.com` with your actual domain
     - Replace `YOUR_REVALIDATE_SECRET` with the secret from step 1
   - **Dataset**: Select your dataset (usually `production`)
   - **Trigger on**: Select the document types that should trigger revalidation:
     - ✓ `album`
     - ✓ `filmScore`
     - ✓ `videoProject`
     - ✓ `siteSettings`
     - ✓ `mammoth`
   - **HTTP method**: `POST`
   - **API version**: `v2021-03-25` (or latest)
   - **Include drafts**: Unchecked (unless you want draft changes to trigger revalidation)

5. Click **Save**

### 5. Test the Webhook

1. Update any document in Sanity (e.g., change an album title)
2. Publish the change
3. Check the webhook logs in Sanity to verify it was triggered
4. Visit your site to see the updated content (may take a few seconds)

## How It Works

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Sanity    │         │   Webhook    │         │   Next.js   │
│     CMS     │ ──────> │   Endpoint   │ ──────> │    Cache    │
│             │  POST   │              │ Clear   │             │
└─────────────┘         └──────────────┘         └─────────────┘
    Content              /api/revalidate          Homepage
    Updated              ?secret=xxx              Regenerated
```

1. You update content in Sanity and publish
2. Sanity sends a POST request to your webhook endpoint
3. Next.js verifies the secret and revalidates the homepage
4. The page is regenerated with fresh content
5. Users see updated content on their next visit

## Troubleshooting

### Webhook not triggering

- Verify the webhook URL is correct
- Check that the secret matches in both `.env.local` and the webhook URL
- Ensure the document type is selected in the webhook triggers

### Revalidation not working

- Check your deployment logs for errors
- Verify the `REVALIDATE_SECRET` environment variable is set in production
- Test the endpoint manually:
  ```bash
  curl -X POST "https://your-domain.com/api/revalidate?secret=YOUR_SECRET" \
    -H "Content-Type: application/json" \
    -d '{"_type":"album","_id":"test"}'
  ```

### Still seeing old content

- Hard refresh your browser (Cmd+Shift+R / Ctrl+Shift+R)
- Clear your browser cache
- Check if the revalidation endpoint returned a 200 status

## Local Development

In development mode (`NODE_ENV=development`), the site still uses time-based revalidation (10 seconds) for quick iteration. The webhook is only needed for production.

## Performance Benefits

- **Before**: Page regenerated every 60 seconds (even if no changes)
- **After**: Page cached indefinitely, only regenerated when content actually changes
- Result: Faster page loads, less server load, instant content updates
