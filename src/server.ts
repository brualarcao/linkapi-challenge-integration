import express from 'express'
import "reflect-metadata"
import bodyParser from 'body-parser'
import MakeOrderController from './controllers/MakeOrderController'

import './connection'

const makeOrder = new MakeOrderController()

const app = express()

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.get('/order', makeOrder.create)

app.listen(3333)
