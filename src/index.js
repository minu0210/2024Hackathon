import _ from 'lodash'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from './db/connectDB.js'
import { initExpressApp } from './server/initExpressApp.js'

import { getUsersRoute } from './server/routes/users/getUsers.js'
import { signupRoute } from './server/routes/users/signup.js'
import { signinRoute } from './server/routes/users/signin.js'
import { createPostRoute } from './server/routes/posts/createPost.js'
import { getPostsRoute } from './server/routes/posts/getPosts.js'

const routes = [
    getUsersRoute,
    signupRoute,
    signinRoute,
    createPostRoute,
    getPostsRoute
]

async function bootstrap () {
    const app = express()
    await connectDB()

    await initExpressApp(app)

    routes.forEach(route => {
        app[route.method](route.path, (req, res) => {
            route.handler(req, res)
            .catch((err) => {
                console.error('Api Error:', err)

                const [statusCode, errorMessage] = err.message.split(':')
                
                return res
                    .status(statusCode)
                    .json({
                        success: false,
                        message: errorMessage
                })
            })
        })
    })

    app.listen(process.env.PORT, () => {
        console.log(`App is running on http://localhost:${process.env.PORT}`);
    })
}

bootstrap()
    .catch(err => {
        console.error(err)
    })