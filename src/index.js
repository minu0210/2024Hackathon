import _ from 'lodash'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

// moduleAlias.addAliases({
//     '@root': __dirname,
//     '@db': __dirname + '/db',
//     '@lib': __dirname + '/lib',
//     '@server': __dirname + '/server',
//     '@routers': __dirname + '/server/routes',
//     '@models': __dirname + '/server/models',
//     '@controllers': __dirname + '/server/controllers',
//     '@validate': __dirname + '/validate'
// })

import { connectDB } from './db/connectDB.js'
import { initExpressApp } from './server/initExpressApp.js'

// const routes = [
//     getUsersRoute,
//     signupRoute,
//     signinRoute,
//     signoutRoute,
//     createPostRoute,
//     getPostsRoute
// ]

async function bootstrap () {
    const app = express()
    await connectDB()

    await initExpressApp(app)

    // routes.forEach(route => {
    //     app[route.method](route.path, (req, res) => {
    //         route.handler(req, res)
    //         .catch((err) => {
    //             console.error('Api Error:', err)

    //             const [statusCode, errorMessage] = err.message.split(':')
                
    //             return res
    //                 .status(statusCode)
    //                 .json({
    //                     success: false,
    //                     message: errorMessage
    //             })
    //         })
    //     })
    // })

    app.listen(process.env.PORT, () => {
        console.log(`App is running on http://localhost:${process.env.PORT}`);
    })
}

bootstrap()
    .catch(err => {
        console.error('Error is occured while running application. Error: ', err)
    })