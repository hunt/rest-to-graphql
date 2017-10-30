const express = require('express')
const _ = require('lodash')
const moment = require('moment')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const groups = require('./groups.json')
groups.forEach((group, i) => {
  group.id = i + 1
})

const idols = require('./idols.json')
idols.forEach((idol, i) => {
  // create ID for each idols
  idol.id = i + 1
  // date format
  idol.birthdate = moment(idol.birthdate, 'MMMM D, YYYY').format('YYYY-MM-DD') + 'T00:00:00Z'
  // set group name to group id
  idol.group = _.find(groups, { name: idol.group }).id
})

const app = express()

app.use(morgan('dev'))

app.get('/idols', (req, res) => {
  let result = idols.slice()
  ;['team', 'bloodType', 'birthplace', 'generation'].forEach((key) => {
    if (req.query[key]) result = _.filter(result, { [key]: req.query[key] })
  })
  ;['group'].forEach((key) => {
    if (req.query[key]) result = _.filter(result, { [key]: parseInt(req.query[key]) })
  })
  res.json(result)
})

app.get('/idols/:id', (req, res) => {
  const idol = _.find(idols, { id: parseInt(req.params.id) })
  if (!idol) return res.status(404).send('idol not found')
  res.json(idol)
})

app.get('/groups', (req, res) => {
  res.json(groups)
})

app.get('/groups/:id', (req, res) => {
  const group = _.find(groups, { id: parseInt(req.params.id) })
  if (!group) return res.status(404).send('group not found')
  res.json(group)
})

app.post('/idols', bodyParser.json(), (req, res) => {
  const idol = req.body
  idol.id = idols.length
  idols.push(idol)
  res.json(idol)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`listen http://localhost:${PORT}`)
})  

