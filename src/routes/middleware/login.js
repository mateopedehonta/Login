export const getHomeMiddleware = (req,res,next) =>{
    if (!req.session.user){
        res.redirect('/login')
    }else{
        next()
    }
}
export const getLoginMiddleware = (req,res,next) =>{
    if (req.session.user){
        res.redirect('/')
    }else{
        next()
    }
}