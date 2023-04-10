const router = require('express').Router()
const { User } = require('../../models')


router.post('/signup', (req, res) => {
    const { username, password } = req.body
    User.create({ username, password })
        .then((createduser) => {
            req.session.save(() => {
                req.session.userid = createduser.id
                req.session.username = createduser.username
                req.session.isLoggedIn = true

                res.json({ id: createduser.id, username: createduser.username })
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: 'server error try again' })
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body

    User.findOne({
        where: {
            username
        }
    }).then((dbUser) => {
        if (!dbUser) {
            return res.status(400).json({ message: "Username does not exist" })
        }
        const isPasswordValid = dbUser.checkPassword(password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }
        req.session.save(() => {
            req.session.userid = dbUser.id
            req.session.username = dbUser.username
            req.session.isLoggedIn = true

            res.json({ id: dbUser.id, username: dbUser.username })
        })
    }) .catch((error)=>{
        res.status(500).json({message:'Internal sever error try again'})
    })
})


module.exports = router 