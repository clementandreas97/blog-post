// TODO: move to script
process.env.NODE_ENV = 'test' 

const mongoose = require('mongoose')
const Post = require('../models/post')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

const redis = require('redis')
const clientTest = redis.createClient(process.env.REDIS_PORT)

const should = chai.should()

chai.use(chaiHttp)

describe('Posts', () => {
    // Clear Database before each tests
    beforeEach((done) => {
        clientTest.del('posts', (err, res) => {
        })
        Post.remove({}, (error) => {
            done()
        })
    })

    describe('/GET Posts', () => {
        it('should get all posts', (done) => {
            chai.request('http://localhost:3005')
                .get('/posts')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(0)
                    done()
                })
        })
    })
})