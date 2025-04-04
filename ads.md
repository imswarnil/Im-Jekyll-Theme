---
title: Elements
description: "A demo of Markdown and HTML includes"
layout : ads
permalink : /ads
---

# Typography
<hr>

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

<small>A small element</small>

## A Link 
<hr>



[A link](https://david.darn.es "A link")

Lorem ipsum dolor sit amet, consectetur adip* isicing elit, sed do eiusmod *tempor incididunt ut labore et dolore magna aliqua.

Duis aute irure dolor in [A link](https://david.darn.es "A link") reprehenderit in voluptate velit esse cillum **bold text** dolore eu fugiat nulla pariatur. Excepteur span element sint occaecat cupidatat non proident, sunt _italicised text_ in culpa qui officia deserunt mollit anim id `some code` est laborum.

##  Lists

### Unordered List

* An item
* An item
* An item
* An item
* An item

## Unordered List

1. Item one
2. Item two
3. Item three
4. Item four
5. Item five


> A simple blockquote that appears with a typing effect.
>
> - Author Name


> A simple blockquote

Some HTML...

``` html
<blockquote cite="http://www.imdb.com/title/tt0284978/quotes/qt1375101">
  <p>You planning a vacation, Mr. Sullivan?</p>
  <footer>
    <a href="http://www.imdb.com/title/tt0284978/quotes/qt1375101">Sunways Security Guard</a>
  </footer>
</blockquote>
```

...CSS...

``` css
blockquote {
  text-align: center;
  font-weight: bold;
}
blockquote footer {
  font-size: .8rem;
}
```

...and JavaScript

``` js
const blockquote = document.querySelector("blockquote")
const bolden = (keyString, string) =>
  string.replace(new RegExp(keyString, 'g'), '<strong>'+keyString+'</strong>')

blockquote.innerHTML = bolden("Mr. Sullivan", blockquote.innerHTML)
```

`Single line of code`

## HTML Includes
<hr>

### Contact form
<hr>
{% include site-form.html %}

``` html
{% raw %}{% include site-form.html %}{% endraw %}
```

### Demo map embed
<hr>
{% include map.html id="1UT-2Z-Vg_MG_TrS5X2p8SthsJhc" title="Coffee shop map" %}

``` html
{% raw %}{% include map.html id="XXXXXX" title="Coffee shop map" %}{% endraw %}
```

### Button include
<hr>
{% include button.html text="A button" link="https://david.darn.es" %}
{% include button.html text="A button with icon" link="https://twitter.com/" icon="twitter" %}
{% include button.html text="Primary Button" link="#" color="primary" %}
{% include button.html text="Info Button" link="#" color="info" %}
{% include button.html text="Success Button" link="#" color="success" %}
{% include button.html text="Warning Button" link="#" color="warning" %}
{% include button.html text="Danger Button" link="#" color="danger" %}
{% include button.html text="Small Primary" link="#" color="primary" size="small" %}
{% include button.html text="Large Primary" link="#" color="primary" size="large" %}
{% include button.html text="Full Width Button" link="#" color="primary" fullwidth=true %}
{% include button.html text="Outlined Button" link="#" color="primary" outlined=true %}
{% include button.html text="Rounded Button" link="#" color="primary" rounded=true %}
{% include button.html text="Hovered Button" link="#" color="primary" hovered=true %}
{% include button.html text="Active Button" link="#" color="primary" active=true %}
{% include button.html text="Button with Icon" link="#" color="primary" icon="bold" %}

```html
{% raw %}
{% include button.html text="A button" link="https://david.darn.es" %}
{% include button.html text="A button with icon" link="https://twitter.com/imswarnil" icon="home" %}
{% include button.html text="Primary Button" link="#" color="primary" %}
{% include button.html text="Info Button" link="#" color="info" %}
{% include button.html text="Success Button" link="#" color="success" %}
{% include button.html text="Warning Button" link="#" color="warning" %}
{% include button.html text="Danger Button" link="#" color="danger" %}
{% include button.html text="Small Primary" link="#" color="primary" size="small" %}
{% include button.html text="Large Primary" link="#" color="primary" size="large" %}
{% include button.html text="Full Width Button" link="#" color="primary" fullwidth=true %}
{% include button.html text="Outlined Button" link="#" color="primary" outlined=true %}
{% include button.html text="Rounded Button" link="#" color="primary" rounded=true %}
{% include button.html text="Hovered Button" link="#" color="primary" hovered=true %}
{% include button.html text="Active Button" link="#" color="primary" active=true %}
{% include button.html text="Button with Icon" link="#" color="primary" icon="bold" %}{% endraw %}
```
## Embed

### Youtube Video Embed

 {% include embed/youtube.html 
    id="uV3eTXpEBOg" 
    title="Rick Astley - Never Gonna Give You Up" 
    description="Music video by Rick Astley performing Never Gonna Give You Up." 
    author="Rick Astley"
    date = "15-July-1995" 
    start_time="0" 
    end_time="0" 
    autoplay="false" 
    controls="true" 
    muted="false" 
    showinfo="true" 
    loop="false" 
  %}

``` html
{% raw %} {% include embed/youtube.html 
    id="uV3eTXpEBOg" 
    title="Rick Astley - Never Gonna Give You Up" 
    description="Music video by Rick Astley performing Never Gonna Give You Up." 
    author="Rick Astley"
    date = "15-July-1995" 
    start_time="0" 
    end_time="0" 
    autoplay="false" 
    controls="true" 
    muted="false" 
    showinfo="true" 
    loop="false" 
  %}{% endraw %}
```
<hr>

### Tweet Embed 

  {% include embed/tweet.html 
    id="1465053672593784834"
    custom_title="Check out this amazing tweet!"
    user_handle="tweet"
  %}

``` html
{% raw %}{% include embed/tweet.html 
    id="1465053672593784834"
    custom_title="Check out this amazing tweet!"
    user_handle="tweet"
  %}{% endraw %}
```
### Instagram Embed

<div class="container">
  <h1 class="title">Sample Instagram Embed</h1>
  {% include embed/instagram.html 
    id="C6a6rKcJLh7"
    custom_title="Check out this amazing post!"
    user_handle="frazmohammad"
  %}
</div>

### Spotify Embed 
  {% include embed/spotify.html 
    id="36N5awamOX6XX5pQn3aFXZ"
    custom_title="Check out this amazing track!"
    user_handle="yourusername"
    theme="0"
    height="152"
  %}


{% include utility/icon.html type="image" src="https://cdn-icons-png.flaticon.com/512/317/317031.png" alt="Example Icon" size="is-64x64" %}
{% include utility/icon.html type="font-awesome" name="twitter" size="is-large" %}
{% include utility/icon.html type="material" name="home" size="is-medium" %}


### Image includes

{% include figure.html image="https://picsum.photos/600/800?image=894" caption="Image with caption" width="300" height="800" %}

{% include figure.html image="https://picsum.photos/600/800?image=894" caption="Right aligned image" position="right" width="300" height="800" %}

{% include figure.html image="https://picsum.photos/600/800?image=894" caption="Left aligned image" position="left" width="300" height="800" %}

{% include figure.html image="https://picsum.photos/1600/800?image=894" alt="Image with just alt text" %}

``` html
{% raw %}{% include figure.html image="https://picsum.photos/600/800?image=894" caption="Image with caption" width="300" height="800" %}

{% include figure.html image="https://picsum.photos/600/800?image=894" caption="Right aligned image" position="right" width="300" height="800" %}

{% include figure.html image="https://picsum.photos/600/800?image=894" caption="Left aligned image" position="left" width="300" height="800" %}

{% include figure.html image="https://picsum.photos/1600/800?image=894" alt="Image with just alt text" %}{% endraw %}
```

 <section class="hero is-primary">
        <div class="hero-body">
            <div class="container">
                <nav class="columns">
                    <a class="column has-text-centered" href="#">
                        <span class="icon is-large" style="margin-right: -15px;">
                            <i class="fas fa-lg fa-mobile-alt"></i>
                        </span>
                        <span class="icon is-large">
                            <i class="fas fa-2x fa-tablet-alt"></i>
                        </span>
                        <span class="icon is-large" style="margin-right: 10px;">
                            <i class="fas fa-3x fa-desktop"></i>
                        </span>
                        <p class="title is-4" style="margin-top: 0.5em;"><strong>100% Responsive</strong></p>
                        <p class="subtitle">Designed for <strong>mobile</strong> first</p>
                    </a>
                    <a class="column has-text-centered" href="#">
                        <span class="icon is-large">
                            <i class="fas fa-3x fa-cubes"></i>
                        </span>
                        <p class="title is-4" style="margin-top: 0.5em;"><strong>Modular</strong></p>
                        <p class="subtitle">Just import what you <strong>need</strong></p>
                    </a>
                    <a class="column has-text-centered" href="#">
                        <span class="icon is-large">
                            <i class="fab fa-3x fa-css3"></i>
                        </span>
                        <p class="title is-4" style="margin-top: 0.5em;"><strong>Modern</strong></p>
                        <p class="subtitle">Built with <strong>Flexbox</strong></p>
                    </a>
                    <a class="column has-text-centered" href="#">
                        <span class="icon is-large">
                            <i class="fab fa-3x fa-github"></i>
                        </span>
                        <p class="title is-4" style="margin-top: 0.5em;"><strong>Free</strong></p>
                        <p class="subtitle">Open source on <strong>GitHub</strong></p>
                    </a>
                </nav>
            </div>
        </div>
    </section>

 <style>
        .pagination-box {
            justify-content: space-between;
            align-items: center;
        }
    </style>
</head>
<body>
    <div class="section">
        <div class="container">
            <div class="columns my-6">
                <div class="column is-6">
                    <a class="box is-flex pagination-box" href="https://hugo-mini-course.netlify.app/sections/intro/welcome/">
                        <span class="icon is-medium">
                            <i class="fas fa-2x fa-chevron-circle-left"></i>
                        </span>
                        <div class="has-text-right">
                            <div class="has-text-weight-bold is-size-7 has-text-grey">Previous Section</div>
                            <span class="is-size-5">Welcome</span>
                        </div>
                    </a>
                </div>
                <div class="column is-6">
                    <a class="box is-flex pagination-box" href="https://hugo-mini-course.netlify.app/sections/intro/setup/">
                        <div>
                            <div class="has-text-weight-bold is-size-7 has-text-grey">Next Section</div>
                            <span class="is-size-5">Setup</span>
                        </div>
                        <span class="icon is-medium">
                            <i class="fas fa-2x fa-chevron-circle-right"></i>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
