# CustomHTTP

CustomHTTP is a lightweight HTTP client library for making HTTP requests in JavaScript using XMLHttpRequest.

## Installation

You can install the library using npm:

```bash
npm i custom-http-wrapper
```
## Usage
### Importing
```javascript
import { CustomHTTP } from 'custom-http';
import { HttpMethod } from 'custom-http/constants/httpMethods';
```
### Creating an instance
```javascript
const http = new CustomHTTP();
```
## Examples
### Making a GET request
```javascript
customHTTP.get('https://jsonplaceholder.typicode.com/posts/1') // Первый запрос
    .then((response) => {
        console.log('GET Response:', response);
    })
    .catch((error) => {
        console.error('GET Error:', error);
    });
```
### Making a Patch request
```javascript
customHTTP.patch('https://jsonplaceholder.typicode.com/posts/1', {
title: 'title',
body: 'body'
}) // Первый запрос
.then((response) => {
console.log('PATCH Response:', response);
})
.catch((error) => {
console.error('PATCH Error:', error);
});
```