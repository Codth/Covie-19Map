const express = require('express');
var router = express.Router();
const request = require('request');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

router.get('/', (req, res) => {
    https://covidtracking.com/api/v1/us/current.json

    request.get("https://covidtracking.com/api/v1/states/current.json", (err, response, body) => {

        request.get("https://covidtracking.com/api/v1/us/current.json", (err, response, body2) => {
            console.log(JSON.parse(body2));
        res.render('view/index', { 
            title: 'Covid-19 Map',
            data: JSON.parse(body),
            total: JSON.parse(body2)[0],
        });

        });
    });
});

router.get('/:state', (req, res) => {
    request.get("https://covidtracking.com/api/v1/states/current.json", (err, response, body) => {
        let position;
        let name = req.params.state;

        let state = JSON.parse(body);

        for(let i =0; i<state.length; i++){
            if(state[i].state == name){
                position = i;
                break;
            }
        }
        res.render('view/detail', {
            title: 'Covid-19 Detail',
            data:state[position]
        });
    });
});



module.exports = router;




// var express = require('express');
// var router = express.Router();
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');
//
// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
// query {
//   author {
//     id
//     name
//     articles {
//       id
//       title
//     }
//   }
// }
// `);
//
// // The root provides a resolver function for each API endpoint
// var root = {
//
//     "data": {
//     "author": [
//         {
//             "id": 1,
//             "name": "Justin",
//             "articles": [
//                 {
//                     "id": 15,
//                     "title": "vel dapibus at"
//                 },
//                 {
//                     "id": 16,
//                     "title": "sem duis aliquam"
//                 }
//             ]
//         },
//         {
//             "id": 2,
//             "name": "Beltran",
//             "articles": [
//                 {
//                     "id": 2,
//                     "title": "a nibh"
//                 },
//                 {
//                     "id": 9,
//                     "title": "sit amet"
//                 }
//             ]
//         },
//         {
//             "id": 3,
//             "name": "Sidney",
//             "articles": [
//                 {
//                     "id": 6,
//                     "title": "sapien ut"
//                 },
//                 {
//                     "id": 11,
//                     "title": "turpis eget"
//                 },
//                 {
//                     "id": 14,
//                     "title": "congue etiam justo"
//                 }
//             ]
//         }
//     ]
//
// }
// };
//
// router.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
// }));
//
//
// module.exports = router;