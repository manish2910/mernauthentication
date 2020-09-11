const express = require('express');
const router = express.Router();
const { signup, signin, signout, requireSignin, authUser, userAccess } = require('../controller/auth');
const { userSignupValidator, userSigninValidator } = require('../validator/auth');
const { runValidation } = require('../validator/index');

router.post("/signup", userSignupValidator, runValidation, signup);

router.post("/signin", userSigninValidator, runValidation, signin);

router.get("/signout", signout);

router.get("/user", requireSignin, authUser, userAccess);

module.exports = router;