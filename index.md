---
title: Im Jekyll Theme
description: "An open-source Jekyll theme crafted using the Bulma CSS framework. This theme utilizes Bulma SCSS, making it incredibly easy to customize and adapt to your specific needs. With over 7 layouts and 10+ collections"
image: /assets/logos/logo.svg
layout: default
---

{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://jekyll.imswarnil.com/#person",
      "name": "Swarnil Singhai",
      "alternateName": "Swarnil",
      "url": "https://jekyll.imswarnil.com/",
      "image": {
        "@type": "ImageObject",
        "url": "https://jekyll.imswarnil.com/assets/logos/logo@512px.png", // Using a specific sized PNG for better compatibility
        "width": 512,
        "height": 512,
        "caption": "Swarnil Singhai Logo"
      },
      "sameAs": [
        "https://twitter.com/imswarnil",
        "https://linkedin.com/in/imswarnil",
        "https://github.com/imswarnil",
        "https://youtube.com/@imswarnil",
        "https://instagram.com/imswarnil"
      ],
      "jobTitle": "Software Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "Twilio"
      },
      "description": "Software Engineer at Twilio. Passionate about data, CRM, and building impactful solutions.",
      "homeLocation": {
        "@type": "Place",
        "name": "Bangalore, India"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://jekyll.imswarnil.com/#website",
      "url": "https://jekyll.imswarnil.com/",
      "name": "Imswarnil",
      "description": "Personal website and portfolio of Swarnil Singhai, a Software Engineer at Twilio specializing in CRM Analytics, Salesforce, and web technologies. Based in Bangalore, India.",
      "keywords": ["Swarnil Singhai", "Salesforce", "CRM Analytics", "Tableau CRM", "Einstein Analytics", "Apex", "LWC", "Software Engineer", "Twilio", "Bangalore", "Resume", "Portfolio"],
      "inLanguage": "en-IN",
      "publisher": {
        "@id": "https://jekyll.imswarnil.com/#person" // Referencing the Person schema defined above
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://jekyll.imswarnil.com/search/?q={search_term_string}" // Assuming you have a search page at /search/
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "ImageObject",
      "@id": "https://jekyll.imswarnil.com/assets/logos/logo@512px.png#logo", // Giving the main logo an ID
      "url": "https://jekyll.imswarnil.com/assets/logos/logo@512px.png",
      "width": 512,
      "height": 512,
      "caption": "Imswarnil Site Logo"
    },
    {
      "@type": "WebPage",
      "@id": "https://jekyll.imswarnil.com/#webpage", // Homepage specific WebPage
      "url": "https://jekyll.imswarnil.com/",
      "name": "Imswarnil - Personal Website & Portfolio of Swarnil Singhai",
      "isPartOf": {
        "@id": "https://jekyll.imswarnil.com/#website"
      },
      "primaryImageOfPage": {
        "@id": "https://jekyll.imswarnil.com/assets/logos/logo@512px.png#logo"
      },
      "description": "Explore the personal website and portfolio of Swarnil Singhai, a Software Engineer at Twilio. Discover projects, resume, and insights on Salesforce, CRM Analytics, and web development.",
      "mainContentOfPage": {
        "@type": "WebPageElement",
        "cssSelector": ".hero" // Assuming your hero section is a primary content block
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://jekyll.imswarnil.com/"
        }]
      }
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://jekyll.imswarnil.com/#sitenavigation",
      "name": "Main Navigation",
      "description": "Main navigation links for Imswarnil's website",
      "potentialAction": [
        {
          "@type": "NavigateAction",
          "name": "Home",
          "target": "https://jekyll.imswarnil.com/"
        },
        {
          "@type": "NavigateAction",
          "name": "About",
          "target": "https://jekyll.imswarnil.com/about/"
        },
        {
          "@type": "NavigateAction",
          "name": "Elements",
          "target": "https://jekyll.imswarnil.com/elements/"
        },
        {
          "@type": "NavigateAction",
          "name": "Categories",
          "target": "https://jekyll.imswarnil.com/categories/"
        },
        {
          "@type": "NavigateAction",
          "name": "Resume",
          "target": "https://jekyll.imswarnil.com/resume/" // Adding resume as it's a key page
        },
        {
          "@type": "NavigateAction",
          "name": "Contact",
          "target": "https://jekyll.imswarnil.com/contact/" // Adding contact as it's a key page
        }
        // You can add more important top-level links here
      ]
    }
  ]
}
</script>