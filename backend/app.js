
if(process.env.NODE_ENV ==='development')
{
    require('dotenv').config();
}
//import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rutas from './routes/rutas';
import passportSetup from './passport/passport-setup';
import conexion from './connection/conection';
import cookieSession from 'cookie-session';

import passport from 'passport';


class Aplication{
constructor(){
    this.app=express();
    this.config();
    this.routes();
}
config()
{
    this.app.use(express.json());
    this.app.use(morgan("dev"));

    this.app.use(cookieSession({
        name:"session",
        keys:[process.env.keySessionCookieKey]
    }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(
        cors({
          origin: "http://auth.choquesaurus.com", // allow to server to accept request from different origin
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          credentials: true // allow session cookie from browser to pass through
        })
      );
}
routes()
{
    this.app.use(rutas);
    // const  authCheck = (req, res, next) => {
    //     if (!req.user) {
    //       res.status(401).json({
    //         authenticated: false,
    //         message: "user has not been authenticated"
    //       });
    //     } else {
    //       next();
    //     }
    //   };
      
    //   // if it's already login, send the profile response,
    //   // otherwise, send a 401 response that the user is not authenticated
    //   // authCheck before navigating to home page
    //   this.app.get("/", authCheck,(req,res) => {
    //     res.status(200).json({
    //       authenticated: true,
    //       message: "user successfully authenticated",
    //       user: req.user,
    //       cookies: req.cookies
    //     });
    //   });
}
start()
{   
    this.app.listen(process.env.PORT||5000,()=>{
        console.log(`Run server`);
    })
}
}
new Aplication().start();
