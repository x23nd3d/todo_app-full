const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization;
        const decodedTokenHeader = jwt.verify(tokenHeader, 'todoApplicationAPIGenerationDev');
        req.jwtUserID = decodedTokenHeader.userId;
        next();
    } catch {
        // TODO: 401 status error
        res.status(201).json({status:'failure'})
    }
};
