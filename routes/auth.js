const { Router } = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = Router();

const checkUser = async (userId) => {
    const user = await User.findOne({
        '_id': userId
    });

    const candidate = await User.findOne(user);

    return candidate;
}

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body)
        const candidate = await User.findOne({ email });

        if (candidate) {
            console.log(candidate, 'CANDIDATE');
            res.json({status: "failure", text:"registered:true"});
        } else {
            if (!password.length) {
                return res.json({status: "failure", text:"nopassword"});
            }
            if (!email.length) {
                return res.json({status: "failure", text:"noemail"});
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name,
                email,
                password: hashPassword,
                todo:{items:[]}
            })
            await user.save();
            res.status(200).json(user);
        }

    } catch (e) {
        console.log('Error', e)
    }

});


router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(req.body, 'LOGIN ATTEMPT')

        const candidate = await User.findOne({ email });

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password);

            if (areSame) {
                // TODO: DESTROY TOKEN THEN
                const token = jwt.sign({
                        userId: candidate.id
                    }, 'todoApplicationAPIGenerationDev',
                    {expiresIn: '3h'});
                res.json({ token, userId:candidate, status: 'Success' })
            } else {
                res.json({status: "failure", text:"notfound"});
            }

        } else {
            res.json({status: "failure", text:"notfound"});
        }
    } catch (e) {
        console.log('Error', e)
    }
});

router.post('/check', auth, async (req, res) => {
    const candidate = await checkUser(req.jwtUserID);

    if (candidate) {
        // user is logged in
        res.json({status:'connected'})
    } else {
        // user was logged out
        res.json({status:'failure'})
    }
})


module.exports = router;