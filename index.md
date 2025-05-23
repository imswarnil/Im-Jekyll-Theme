---
title: Im Jekyll Theme
description: "An open-source Jekyll theme crafted using the Bulma CSS framework. This theme utilizes Bulma SCSS, making it incredibly easy to customize and adapt to your specific needs. With over 7 layouts and 10+ collections"
image: /assets/logos/logo.svg
layout: default
---

{% if page.url == "/" %}
<section class="section home-hero">
  <div class="container">
    <div class="columns is-vcentered is-desktop">
      <div class="column is-7-desktop">
        <h1 class="title is-1 home-hero-title">
          Hello, I’m <span class="has-text-primary">{{ site.author.name | default: "Swarnil Singhai" }}</span><br>
          <span class="has-text-grey-dark is-size-4">Filmmaker. Engineer. Storyteller.</span>
        </h1>
        <p class="subtitle is-4 mt-4">
          I blend <strong>code</strong> and <strong>chaos</strong> into cinematic stories. Currently building cool stuff as a <strong>{{ site.resume.personal_details.title | default: "Software Engineer" }}</strong> at <strong>{{ site.resume.work_experience[0].company | default: "a cool company" }}</strong>.
        </p>
        <div class="is-flex is-align-items-center mt-5">
          <a href="{{ '/contact/' | relative_url }}" class="button is-primary is-medium is-rounded mr-3">
            <span class="icon"><i class="ph-duotone ph-paper-plane-tilt"></i></span>
            <span>Let’s Talk</span>
          </a>
          <a href="{{ '/resume/' | relative_url }}" class="button is-light is-medium is-rounded">
            <span class="icon"><i class="ph-duotone ph-read-cv-logo"></i></span>
            <span>Resume</span>
          </a>
        </div>
        <p class="is-size-6 mt-5 has-text-grey">
          Based in {{ site.resume.personal_details.location | default: "Bangalore, India" }} • Dreaming in Frames • Coding with Coffee
        </p>
      </div>
      <div class="column is-5-desktop is-hidden-touch has-text-centered">
        <figure class="image is-1by1">
          <img src="/assets/swarnil.gif" alt="Swarnil's Portrait">
        </figure>
      </div>

    </div>
  </div>
</section>
{% endif %}

 <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column {% if page.sidebar == true %}is-three-quarters{% else %}is-full{% endif %}">
          <h1 class="title is-1 has-text-centered">Blog Posts</h1>
          <p class="subtitle has-text-centered">Thoughts, tutorials, and updates</p>
        </div>  
        {% if page.sidebar == true %}
          {% include sidebar/blog-detail.html %}
        {% endif %}
      </div>
    </div>
</div>



<script type="application/ld+json">
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