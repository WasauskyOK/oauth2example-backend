import {Router} from 'express';
import passport from 'passport';
const router=Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
      res.status(401).json({
        authenticated: false,
        message: "user has not been authenticated"
      });
    } else {
      next();
    }
  };

router.get('/saludar',(req,res)=>{
  res.json({message:"Buenos dias , Success"})
});
router.get('/',authCheck,(req,res)=>{
    res.status(200).json({
        authenticated: true,
        message: "user successfully authenticated",
        user: req.user,
        cookies: req.cookies
      });
    //res.send({message:"Hello :D"});
    // res.header('Access-Control-Allow-Origin', "http://localhost:3001");
    //  res.header('Access-Control-Allow-Headers');
});
//GOOGLE
router.get('/google',passport.authenticate('google',
 { scope: ["profile", "email"] }))


router.get('/auth/google/redirect',passport.authenticate('google',{
    successRedirect:'http://localhost:3000',
    failureRedirect:'/auth/login/failed'
})); 
router.get('/auth/login/success',(req,res)=>{
    // res.header('Access-Control-Allow-Origin', "http://localhost:3001");
     res.header('Access-Control-Allow-Headers');     
     if(req.user)
    {
        res.json({
            success:true,
            message:'user has successfully authenticated',
            user:req.user,
            cookies:req.cookies
        });
    }
    res.status(401).json({
      success:false,
      message:'User failed  to authenticate'
  });
});

router.get('/auth/login/failed',(req,res)=>{
    res.status(401).json({
        success:false,
        message:'User failed  to authenticate'
    });
});
router.get('/logout',async (req,res)=>{
//    await  console.log('REQUESITO ELIMINAR 1',req.user)
    res.send({
    success:false,
    message:'logout'
    }); 
//     await delete  req.user;
//     //await req.logout();
    
    //console.log('requesisto elimiinar 2',req.user);
});

//FACEBOOK

router.get('/facebook',passport.authenticate('facebook',
 { scope: ['email'] }
 ));
router.get('/auth/facebook/redirect',passport.authenticate('facebook',{
    successRedirect:'https://auth.choquesaurus.com/profile',
    failureRedirect:'/auth/login/failed'
}));


router.get('/github',passport.authenticate('github'));
router.get('/auth/github/redirect',passport.authenticate('github',{
    successRedirect:'https://auth.choquesaurus.com/profile',
    failureRedirect:'/auth/login/failed'
}));

router.get('/linkedin',passport.authenticate('linkedin'));
  router.get('/auth/linkedin/redirect',passport.authenticate('linkedin', {
    successRedirect: 'https://auth.choquesaurus.com/profile',
    failureRedirect: '/auth/login/failed'
  }));
export default router;