const passUserToView = (req, res, next) => {
    res.locals.user = req.session.users ? req.session.user: null;
    next();
};

export default passUserToView;