const { Router } = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');
const router = Router();

const checkUser = async (userId) => {
    const user = await User.findOne({
        '_id': userId
    });

    const candidate = await User.findOne(user);

    return candidate;
}

router.post('/add', auth, async (req, res) => {
    const candidate = await checkUser(req.jwtUserID);
    if (candidate) {
        // user found, we can add object
        const data = req.body;
        await candidate.addItem(data);
        res.json({todos:candidate.todo.items});
    } else {
        // user not found
        res.json({status: "failure", text:"notfound"});
    }
});

router.get('/show', auth, async (req, res) => {
    const candidate = await checkUser(req.jwtUserID);

    if (candidate) {
        res.json({todos: candidate.todo.items})
    } else {
        // user not found
        res.json({status: "failure", text:"notfound"});
    }
});

router.delete('/:id/remove', auth, async (req, res) => {
    const candidate = await checkUser(req.jwtUserID);
    console.log(candidate, 'CANDIDATE');
    if (candidate) {
        // user found, we can add object
        const data = req.body;
        console.log('DATA FOR DELETE', req.body)
        await candidate.removeItem(data);
        res.json({todos:candidate.todo.items});
    } else {
        // user not found
        res.json({status: "failure", text:"notfound"});
    }
});


router.post('/update', auth, async (req, res) => {
    const candidate = await checkUser(req.jwtUserID);
    console.log(candidate, 'CANDIDATE');
    if (candidate) {
        // user found, we can add object
        const data = req.body;
        console.log('DATA FOR UPDATE', req.body)
        await candidate.updateProp(data);
        res.json({todos:candidate.todo.items});
    } else {
        // user not found
        res.json({status: "failure", text:"notfound"});
    }
});


module.exports = router;