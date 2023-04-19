const express = require('express')
const sequelize = require('./config/connection')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const exphandlebars = require('express-handlebars')
const routes = require('./controllers')

const app = express()

const sess = {
    secret: 'secret',
    cookie: {maxAge: 36000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session(sess))

// handlebar config
const hbs = exphandlebars.create({})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(routes)

sequelize.sync()
// add a port definition
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('server is running 3001')
})


