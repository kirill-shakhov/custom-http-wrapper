import { CustomHTTP } from './CustomHTTP/CustomHTTP';

const customHTTP = new CustomHTTP();

// GET запрос

customHTTP.get('https://jsonplaceholder.typicode.com/posts/1sad') // Первый запрос
    .then((response) => {
        console.log('GET Response:', response);
    })
    .catch((error) => {
        console.error('GET Error:', error);
    });

// customHTTP.patch('https://jsonplaceholder.typicode.com/posts/1', {
//     title: 'title',
//     body: 'body'
// }) // Первый запрос
//     .then((response) => {
//         console.log('PATCH Response:', response);
//     })
//     .catch((error) => {
//         console.error('PATCH Error:', error);
//     });


// customHTTP.delete('https://jsonplaceholder.typicode.com/posts/1').then((response) => {
//     console.log('DELETE Response:', response);
// }).catch((error) => {
//     console.log('DELETE Response:', error)
// })

// customHTTP.put('https://jsonplaceholder.typicode.com/posts/1', {
//     id: 1,
//     title: 'test',
//     body: 'bar',
//     userId: 1,
// }) // Первый запрос
//     .then((response) => {
//         console.log('PUT Response:', response);
//     })
//     .catch((error) => {
//         console.error('PUT Error:', error);
//     });
