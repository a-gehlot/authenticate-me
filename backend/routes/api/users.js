const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

router.post('/', async(req, res) => {
    const { email, password, username } = req.body
    const user = await User.signup({ username, email, password })

    setTokenCookie(res, user);

    return res.json({
        user
    });
})

module.exports = router;
