import {Router} from 'express';
import passport from 'passport';
const router=Router();

router.get('/',(req,res,next)=>{
    res.send({message:"Hello :D"});
});
//GOOGLE
router.get('/google',passport.authenticate('google',
 { scope: ["profile", "email"] }));

router.get('/auth/google/redirect',passport.authenticate('google',{
    successRedirect:'https://auth2.netlify.app/profile',
    failureRedirect:'/auth/login/failed'
})); 
router.get('/auth/login/success',async (req,resp,next)=>{
    if(req.user)
    {
        resp.json({
            success:true,
            message:'user has successfully authenticated',
            user:req.user,
            cookies:req.cookies
        });
    }
});

router.get('/auth/login/failed',(req,resp,next)=>{
    resp.status(401).json({
        success:false,
        message:'User failed  to authenticate'
    });
});
router.get('/logout',async (req,resp,next)=>{
//    await  console.log('REQUESITO ELIMINAR 1',req.user)
    resp.send({
    success:false,
    message:'user  is  not authenticated'
    }); 
//     await delete  req.user;
//     //await req.logout();
    
    console.log('requesisto elimiinar 2',req.user);
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