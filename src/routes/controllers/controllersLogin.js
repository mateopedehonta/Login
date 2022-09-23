export const getHome = (req,res)=>{
    const user = req.session.user
    res.render("index", { user });
}

export const getLogin = (req,res)=>{
    const alert = null
    res.render("login",{alert});
}
export const postLogin = (req,res)=>{
    req.session.user = req.user.email;
    res.redirect('/')
}

export const getLogout = (req,res)=>{
    req.session.destroy((err) => {
        res.redirect("/login");
    })
}

export const getRegister = (req,res)=>{
    res.render('register',{alert:null})
}

export const postRegister = (req,res)=>{
    res.redirect('/login')
}
export const getFailLogin = (req,res)=>{
    console.log(req.query)
    const alert = req.query.alert
    res.render('login',{alert})
}
export const getFailRegister = (req,res)=>{
    console.log(req.query)
    const alert = req.query.alert
    res.render('register',{alert})
}