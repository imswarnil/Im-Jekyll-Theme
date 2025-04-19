---
title: Looks like you're offline
indexing: false
sitemap: false
permalink: "/offline/"
---

<!DOCTYPE html>
<html lang="{{ site.lang | default: "en-US" }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ page.title }}</title>
  <style>
    body {
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background-color: #f4f4f4;
    }
    h1 {
      color: #333;
      margin-bottom: 20px;
    }
    p {
      color: #666;
      text-align: center;
      margin-bottom: 15px;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>{{ page.title }}</h1>
  <p>It appears that you've lost your network connection and this page is not available offline.</p>
  <p>Try either <a href="javascript:history.back()">returning to the previous page</a>, using the site navigation (if available), or restoring your network connection.</p>
</body>
</html>