const express = require('express');
var router = express.Router();
const request = require('request');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

function getDate(date){
    let month = date.substring(4, 6);
    let month_words;
    switch(true) {
        case (month == '03'):
            month_words = "March";
            break;
        case (month == '04'):
            month_words = "April";
            break;
        case (month == '05'):
            month_words = "May";
            break;
        case (month == '06'):
            month_words = "June";
            break;
        case (month == '07'):
            month_words = "July";
            break;
        case (month == '08'):
            month_words = "August";
            break;
        case (month == '09'):
            month_words = "September";
            break;
    }
    let day = date.substring(6, 8);
    let str = '' + month_words  + day;
    return str.toString();
}

function getArray(info, identifier){
    let doc = JSON.parse(info);

    let labels = [];
    let totalcases = [];
    let positiveIncrease = [];
    let death = [];
    let hospitalized = [];
    let recorved = [];
    let inIcuCumulative= [];

    let tar_length = (identifier== 1)? 50 : 1;

    for(let i = doc.length-tar_length; i>=0; i--){
        labels.push( getDate(doc[i].date.toString()));
        totalcases.push(parseInt( (doc[i].positive == null)? 0: doc[i].positive));
        positiveIncrease.push(parseInt((doc[i].positiveIncrease == null)? 0: doc[i].positiveIncrease));
        death.push(parseInt((doc[i].death == null)? 0: doc[i].death));
        hospitalized.push(parseInt((doc[i].hospitalized == null)? 0: doc[i].hospitalized));
        recorved.push(parseInt((doc[i].recorved == null)? 0: doc[i].recorved));
        inIcuCumulative.push(parseInt((doc[i].inIcuCumulative == null)? 0: doc[i].inIcuCumulative));
    }

    return [labels,totalcases,positiveIncrease,death,hospitalized,recorved,inIcuCumulative];

}


router.get('/', (req, res) => {
    request.get("https://covidtracking.com/api/v1/states/current.json", (err, response, body) => {

        request.get("https://covidtracking.com/api/v1/us/current.json", (err, response, body2) => {
            request.get("https://covidtracking.com/api/v1/us/daily.json", (err, response, info) => {

                let arr = getArray(info,1);

                res.render('view/index', {
                    title: 'Covid-19 Map',
                    data: JSON.parse(body),
                    total: JSON.parse(body2)[0],

                    label: arr[0],
                    totalcases: arr[1],
                    positiveIncrease: arr[2],
                    death: arr[3],
                    hospitalized: arr[4],
                    recorved:arr[5],
                    inIcuCumulative: arr[6]
                });

            });
        });
    });
});



router.get('/:state', (req, res) => {
    request.get("https://covidtracking.com/api/v1/states/current.json", (err, response, body) => {
        request.get("https://covidtracking.com/api/v1/states/info.json", (err, response, body2) => {
            let url = "https://covidtracking.com/api/v1/states/" + req.params.state.toLowerCase() + "/daily.json";
            request.get(url, (err, response, info) => {
                let doc = JSON.parse(info);

                let arr = getArray(info,2);

                let position;
                let name = req.params.state;

                let state = JSON.parse(body);
                let state2 = JSON.parse(body2);

                for(let i =0; i<state.length; i++){
                    if(state[i].state == name){
                        position = i;
                        break;
                    }
                }

                res.render('view/detail', {
                    title: 'Covid-19 Detail',
                    data:  state[position],
                    meta: state2[position],
                    label: arr[0],
                    totalcases: arr[1],
                    positiveIncrease: arr[2],
                    death: arr[3],
                    hospitalized: arr[4],
                    recorved:arr[5],
                    inIcuCumulative: arr[6]
                });

            });
        });
    });
});



module.exports = router;