process.env.NODE_ENV = 'test';

const server = require("../server");
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

let mongoose = require("mongoose");
let Game = require('../models/game');


chai.use(chaiHttp);

describe("/api/games",()=>{
    describe("GET",()=>{
        it('it should GET all the Games', (done) => {
            chai.request(server)
                .get('/api/games')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                  done();
                });
        });

    });

    describe("POST",()=>{
        let game = {
            id: "0truhfkru4",
            author:"Manuel Castro",
            team: "UCAT FC",
            players:[
                { id:"idPlayer", name: "Manuel Castro", fieldPosition:"midfilder"},
                { id:"idPlayer2", name: "Heberth Strube", fieldPosition:"striker"}
            ],
            createdAt: new Date()
        };

        afterEach((done) => {
            Game.remove({}, (err) => { 
               done();         
            });     
        });

        it("should accept and add a valid new item",(done)=>{
            chai.request(server)
                .post('/api/games')
                .send(game)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Game successfully added!'); 
                    res.should.have.status(200);
                    chai.request(server)
                        .get("/api/games")
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(1);
                            done();
                        });
                    done();
                });
        })
    })
})

