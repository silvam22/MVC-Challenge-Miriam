const router = require('express').Router()

router.get('/', (req, res)=> {
    res.render('home')
})

router.get('/login', (req, res)=> {
    res.render('login')
})
router.get('/signup', (req, res)=> {
    res.render('signup')
})
router.get('/logout', (req, res) => {
    if (req.session.isLoggedIn) {
        req.session.destroy(()=>{
           // res.status(204).end()
           res.redirect('/')
        }) 
    } else {
        res.status(404).end()
    }
})

module.exports = router 