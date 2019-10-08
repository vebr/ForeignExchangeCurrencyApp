# Foreign Exchange Currency App

## Description

I created this website for testing for the Frontend Web Developer test, this website able to convert currency base on selected currency,
and able to add more currency to the list.


## Usage

### With Docker

> docker build . -t fec && docker run fec -p 3000:3000

### without docker

> npm install

> npm start


## Lighthouse Score

> **Applied Slow 4G, 4x CPU Slowdown :**

[![Performance: 94/100](https://lighthouse-badge.appspot.com/?score=94&category=Performance&compact)](https://gojek.com) [![Accessibility: 85/100](https://lighthouse-badge.appspot.com/?score=85&category=Accessibility&compact)](https://gojek.com) [![Best-Practice: 100/100](https://lighthouse-badge.appspot.com/?score=100&category=Best%20Practice&compact)](https://gojek.com) [![SE): 96/100](https://lighthouse-badge.appspot.com/?score=96&category=SEO&compact)](https://gojek.com) [![PWA: 100/100](https://lighthouse-badge.appspot.com/?score=100&category=PWA&compact)](https://gojek.com)

> **Simulated Slow 4G, 4x CPU Slowdown :**

[![Performance: 100/100](https://lighthouse-badge.appspot.com/?score=100&category=Performance&compact)](https://gojek.com) [![Accessibility: 85/100](https://lighthouse-badge.appspot.com/?score=85&category=Accessibility&compact)](https://gojek.com) [![Best-Practice: 100/100](https://lighthouse-badge.appspot.com/?score=100&category=Best%20Practice&compact)](https://gojek.com) [![SE): 96/100](https://lighthouse-badge.appspot.com/?score=96&category=SEO&compact)](https://gojek.com) [![PWA: 100/100](https://lighthouse-badge.appspot.com/?score=100&category=PWA&compact)](https://gojek.com)


## Demo
since lighthouse need HTTPS to make perfect score for PWA, I uploaded the website to firebase hosting, you can test it with a lighthohuse there.

Here is a working live demo :  https://foreignexchangecurrencyapp.web.app/

  
## Folder Structures

    ├── src
    │   ├── assets
    │   ├── component
    │        └── app
    │        └── context
    │        └── currency
    │        └── utils
    │   ├── index.js
    │   ├── index.css
    │   ├── serviceWorker.js
    ├── Dockerfile

>  The **context** folder contains file that use context api of react for store data on global state
