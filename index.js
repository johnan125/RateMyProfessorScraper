const express = require('express');
const path = require('path');
const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const Professor = require('./models/professor');

mongoose.connect(config.database);
var db = mongoose.connection;

async function run() {
    let results = [];
    for (let i = 0; i < 1000; i++ ) {
        let url = "http://www.ratemyprofessors.com/ShowRatings.jsp?tid=" + i;
        try {
            let body = await rp(url);
            let $ = cheerio.load(body);
            if($('.error').text().substring(0, 14) == "Page Not Found"){
            } else {
                console.log($('.error').text().substring(0, 14) );
                let professor = new Professor();
                let professorData = {};
                let pfname = $('.pfname');
                let plname = $('.plname');
                let pfschool = $('.school').text();
                let professorName = pfname.text().replace(/\s/g, '') + " " +plname.text().replace(/\s/g, '');
                professorData.name = professorName;
                professorData.url = url;
                //
                professor.name = professorName;
                professor.school = pfschool;
                professor.url = url;
                //
                console.log(professorData.name);
                console.log(pfschool);
                console.log(professorData.url);
                results.push(professorData);
            }

        } catch(e) {
            console.log(url, e);
        }
    }
    return results;
}

run().then(results => {
    console.log(results);
}).catch(err => {
    console.log(err);
});
