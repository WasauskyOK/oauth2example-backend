if(process.env.NODE_ENV ==='development')
{
    require('dotenv').config();
}


import passport from 'passport';
import GoogleStrategy from "passport-google-oauth20";
import FacebookStrategy from "passport-facebook";
import User from "../models/User";
import {Strategy} from 'passport-github';
var GitHubStrategy = Strategy;

const LinkedinStrategy=require('@sokratis/passport-linkedin-oauth2').Strategy;



passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user);
    });
});
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect",
    scope:["profile"]
},async (accessToken,refreshToken,profile,done)=>
{
    const search=await User.findOne({IdApp:profile.id});
    if(!search)
    {   
        new User({
            IdApp:profile.id,
            username:profile.displayName,
            photo:profile._json.picture
        })
        .save()
        .then(data=>{
            done(null,data);
        }); 
    }
    if(search)
    {
        done(null,search);
    }

}));
passport.use('facebook',new FacebookStrategy({
    clientID:process.env.FACEBOOK_CLIENT_ID,
    clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL:"https://oauth2examplefirst.herokuapp.com/auth/facebook/redirect",
    profileFields: ['id', 'displayName', 'photos', 'email']
},async(accessToken,refreshToken,profile,done)=>{ 
    const search=await User.findOne({IdApp:profile.id});
    if(search)
    {
        done(null,search);
    }
    if(!(search))
    {
        new User({
            IdApp:profile.id,
            username:profile.displayName,
            photo:`https://graph.facebook.com/${profile.id}/picture/?type=large`
        }).save().then(data=>done(null,data));
    }
}));
passport.use('github',new GitHubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL:'https://oauth2examplefirst.herokuapp.com/auth/github/redirect'
},async(access_token,refreshToken,profile,done)=>{
    const  search=await User.findOne({IdApp:profile.id});
    if(search)
    {
        done(null,search);
    }
    if(!(search))
    {
        const {id:IdApp,username,_json:{avatar_url:photo}} = profile;
        new User({
            IdApp,
            username,
            photo
        }).save().then(user=>done(null,user));
    }
}));
passport.use('linkedin',new LinkedinStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "https://oauth2examplefirst.herokuapp.com/auth/linkedin/redirect",
    scope: ['r_emailaddress', 'r_liteprofile'],
},async(access_token,refreshToken,profile,done)=>{
    const search=await User.findOne({IdApp:profile.id});
    if(search)
    {
        done(null,search);
    }
    if(!(search))
    {
        new User({
            IdApp:profile.id,
            username:profile.displayName,
            photo:profile.photos[2].value
        }).save().then(data=>done(null,data));
    }
}));