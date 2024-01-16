import session from 'express-session'
import express from 'express'
import methodOverride from 'method-override'
import userRouter from './routers/userRouter.js'
import postRouter from './routers/postRouter.js'
import dotenv from 'dotenv'
import { protectorMiddleware } from '../middlewares/middleware.js'
dotenv.config()

export const initExpressApp = (app) => {
    app.set('trust proxy', 1)
    app.use(session({
        secret: process.env.SESSION_SECRET,
        cookie: { secure: false },
        resave: false, 
        saveUninitialized: false
    }))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('src/static'))
    app.use(methodOverride('_method'))
    app.use('/', userRouter, postRouter)
    app.use(protectorMiddleware)
}