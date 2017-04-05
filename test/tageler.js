const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);
const fixtures = require('node-mongoose-fixtures');
const faker = require('faker');
var _ = require('lodash');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../src/config/database');

describe('Fill MongoDB with Tageler entries', function () {
    before(function (done) {
        // Connect To Database
        if (mongoose.connection.db) {
            mongoose.connection.collections["tagelers"].drop(function (err) {
                console.log(err);
            });
        } else {
            mongoose.connect(config.database);
        }

        mongoose.connection.on('open', function () {
            mongoose.connection.db.dropDatabase(function (err) {
                console.log(err);
            });
        });
        return done();
    });
    beforeEach(function (done) {
        done();
    });
    afterEach(function() {
        mongoose.connection.close();
    });
    it('creates some tagelers', function (done) {
        var tageler = [{
            title: 'Megafun im Wald',
            text: 'sdfg',
            group: 'Baghira',
            start: '2016-06-03T10:34',
            end: '2016-06-04T10:34',
            bring_along: 'BMPTNZ',
            uniform: 'bruni hosä',
            picture: 'http://www.beobachter.ch/fileadmin/dateien/bilder-editionen/Natur_2014/05_14/wald_gruenflaeche.jpg',
            checkout: {
                deadline: '2016-06-03',
                contact: {
                    name: 'Hans Hansenstein',
                    phone: '123456',
                    mail: 'hans@hans.hans',
                    other: ':)'
                }
            }
        },
            {
                title: 'Fürlä',
                text: 'adsfdg',
                group: 'Tschil',
                start: '2016-06-03T10:34',
                end: '2016-06-04T10:34',
                bring_along: 'Fürzüg u Brönnsprit',
                uniform: 'Fürfeschti häntschä',
                picture: 'http://s1.1zoom.me/big3/877/390221-svetik.jpg',
                checkout: {
                    deadline: '2017-01-02',
                    contact: {
                        name: 'Ben Zin',
                        phone: '0333333333',
                        mail: 'ben.zin@pfadi.ch',
                        other: ''
                    }
                }
            }];

        for (let i = 2, len = 12; i < len; i++) {
            tageler[i] = {
                title: faker.lorem.sentence(3, 8),
                text: faker.hacker.phrase() + ' ' + faker.hacker.phrase(),
                group: _.sample(['Baghira', 'Tschil', 'Turmalin', 'Obsidian', 'Raschka', 'Rikki-Tikki', 'Bratwurscht']),
                start: faker.date.future(),
                end: faker.date.future(),
                bring_along: faker.lorem.sentence(5, 8),
                uniform: faker.hacker.phrase(),
                picture: faker.image.image(),
                checkout: {
                    deadline: faker.date.future(),
                    contact: {
                        name: faker.name.findName(),
                        phone: faker.phone.phoneNumber(),
                        mail: faker.internet.email(),
                        other: faker.hacker.phrase()
                    }
                }
            };
        }
        let cnt = 0;

        for (var i = 0; i < tageler.length; i++) {
            api.post('/api/v1/tageler/admin/create')
                .send(tageler[i])
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        console.log("Could not create Tageler: " + i + err.toString());
                    }
                    cnt++;
                    // console.log('Created tageler' + " " + cnt);
                    if (cnt == tageler.length) {
                        done();
                    }
                });
        }
    });
});