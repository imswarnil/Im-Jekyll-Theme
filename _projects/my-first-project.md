---
id: p1 # Unique ID for the project
title: "My First Awesome Project"
description: "A detailed description of this awesome project, highlighting its goals, challenges, and outcomes. Built using modern web technologies."
date: 2023-10-26 # Date project was completed or last updated
# keywords: ["web development", "portfolio", "javascript", "bulma", "jekyll"] # Optional: specific keywords
category: ["Web Development", "Portfolio"] # Broader categories
tags: [jekyll, bulma, sass, javascript, personal site] # Specific technologies or topics
author: Swarnil # Uses default from config
image: /assets/images/projects/my-first-project-cover.jpg # Specific image for this project
sidebar: false # Example override if needed
TLTR: "Created a cool project using Jekyll and Bulma." # Optional summary
layout : project

# --- Project Specific Fields ---
status: "Completed" # e.g., Completed, In Progress, Archived
repo_url: "https://github.com/yourusername/my-first-project" # Link to code repository
live_url: "https://my-first-project.yourdomain.com" # Link to live demo/site
technologies: ["Jekyll", "Bulma", "Sass", "JavaScript ES6"] # List of key tech used
featured: true # Set to true to show on homepage showcase
---

## Project Overview

This is where the main content of your project page goes. You can use Markdown to structure it.

Talk about:

*   The **problem** it solves or the **goal** it achieves.
*   The **technologies** used and **why**.
*   Interesting **challenges** faced during development.
*   Key **features** or functionalities.
*   What you **learned**.

Include screenshots or diagrams using standard Markdown image syntax:

![Screenshot of Project Feature](/assets/images/projects/my-first-project-screenshot1.png)

### Technical Details

Go into more depth about specific aspects if relevant.

```javascript
// Example code snippet
function greet(name) {
  console.log(`Hello, ${name}!`);
}