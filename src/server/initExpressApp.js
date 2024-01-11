import session from 'express-session'
import express from 'express'
import methodOverride from 'method-override'

export const initExpressApp = (app) => {
    app.set('trust proxy', 1)
    app.use(session({
        secret: 's@!^b3!@9a/$!(',
        cookie: { secure: false },
        resave: false, 
        saveUninitialized: false
    }))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('src/static'))
    app.use(methodOverride('_method'))
}