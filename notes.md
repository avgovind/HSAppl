

To start the client
>> npm run start

Access using http://localhost:3010

Async Redux code based on:
https://github.com/reactjs/redux/tree/master/examples/async

Installing Semantic-UI

`npm install gulp -g
npm install semantic-ui --save`

**Photos Implementation:**
----------------------
Photos should be similar to Flikr style

Video clips should have same cards style as Photos


**File Upload:**
------------


react-fileupload for front-end
https://www.npmjs.com/package/react-fileupload

or
https://www.npmjs.com/package/react-fileupload-progress
This one is not easy to getstarted so not the preferred one even though it has progress feature


multer for nodejs side rest api for file upload

REST Client:
-----------
```
npm install --save isomorphic-fetch es6-promise
```

**Reducers using Immutable:**
http://facebook.github.io/immutable-js/


PDF Viewer:
-----------
installed 'react-pdf'
Download PDF.js from http://mozilla.github.io/pdf.js/getting_started/#download 
And add to index.html 
```
 <script src="pdfjs-1.5.188-dist/build/pdf.js"></script>
```
 

```
$ npm install react-pdf --save
```
react-pdf depends on PDF.JS (http://mozilla.github.io/pdf.js/)

To install PDF.js:
```
$ git clone git://github.com/mozilla/pdf.js.git
$ cd pdf.js

$ gulp generic

```

Google API Client registration:
{
  "web": {
    "client_id": "971270578758-mfmfamsug6d1iea5vad34ci767gprpgi.apps.googleusercontent.com",
    "project_id": "hsappl-147905",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "U1XBeR_Q-veTpWSxfVsl-8hH",
    "javascript_origins": [
      "http://localhost:3010"
    ]
  }
}