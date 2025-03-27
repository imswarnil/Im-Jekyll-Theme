---
layout: docs
title: Configuring robots.txt
subtitle: SEO & Indexing
toc: true
sidebar: false
---
# Configuring robots.txt

## Introduction

This guide explains how to configure `robots.txt` in the theme. The theme dynamically generates `robots.txt` using data from `_config.yml` and individual page settings.

---

## 1. Enabling or Disabling Site-Wide Indexing

To **allow or disallow the entire site** from being indexed by search engines, modify `_config.yml`:

```yaml
robots:
  indexing: true  # true = Allow full indexing, false = Noindex entire site
```

If `indexing: false`, the site will **not be indexed**, and the `robots.txt` will contain:

```
User-agent: *
Disallow: /
```

---

## 2. Controlling Search Bots

You can specify which bots are allowed or disallowed in `_config.yml`:

```yaml
robots:
  bots:
    "*":
      enabled: true
      disallow: []
      allow: ["/"]
      
    Googlebot:
      enabled: true
      disallow: []
      allow: ["/"]
      
    Bingbot:
      enabled: true
      disallow:
        - "/private/"
      allow: []
```

### How It Works

- `"*"` applies rules to all bots.  
- `disallow` blocks specific paths.  
- `allow` grants access to certain paths.  
- `enabled: false` disables bot indexing.

---

## 3. Blocking or Allowing Specific Pages

To **block specific pages from being indexed**, add this to the page's front matter:

```yaml
---
layout: page
title: Private Page
indexing: false
---
```

This will **automatically** add a rule in `robots.txt`:

```
User-agent: *
Disallow: /private-page/
```

---

## 4. Example robots.txt Output

If you have the following settings:

- Site-wide indexing is **enabled**.
- `indexing: false` is set on `/private/` and `/hidden/`.
- Googlebot is allowed but **blocked from `/test/`**.

The generated `robots.txt` will be:

```
# robots.txt for example.com

User-agent: *
Allow: /

User-agent: Googlebot
Disallow: /test/

# Page-Specific Noindex Rules
User-agent: *
Disallow: /private/
Disallow: /hidden/

# 🔗 Sitemap reference
Sitemap: https://example.com/sitemap.xml
```

---

## 5. Summary of Features

✅ **Control entire site indexing** (`robots.indexing: false`)
✅ **Customize bot permissions** (Googlebot, Bingbot, etc.)
✅ **Block specific pages from indexing** (`indexing: false` in front matter)
✅ **Auto-generates a sitemap reference**

---

By following this guide, you can fully control how search engines and web crawlers interact with your site. 🚀