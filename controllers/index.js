const router = require('express').Router()
const homeRoutes = require('./home-routes')
const apiRoutes = require('./api')
const dashboardRoutes = require('./dashboard-routes')
const auth = require('../utils/auth')
const postRoutes = require('./post-routes')

router.use('/', homeRoutes)
router.use('/dashboard', auth, dashboardRoutes)
router.use('/api', apiRoutes)
router.use('/posts', postRoutes)

module.exports = router 