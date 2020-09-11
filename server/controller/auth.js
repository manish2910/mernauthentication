require('dotenv').config();
const User = require('../model/user');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await User.findOne({ email }).exec(async (err, user)=>{
            if(user){
                return res.status(400).json({
                    error:'Email is already exist'
                })
            }
            
            try {
                let newUser = new User({
                    name, 
                    email,
                    password
                });
                await newUser.save((err, newuser)=>{
                    if(err){
                        return res.status(400).json({
                            error:err
                        })
                    }

                    const token = jwt.sign({ email: newuser.email }, process.env.JWT_SECRET, { expiresIn:process.env.JWT_SECRET_LIFE });
                    return res.status(200).json({ token });
                })
            } catch (error) {
                res.status(400).json({
                    error:error
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            error:error
        })
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        await User.findOne({ email }).exec(async (err, user)=>{
            if(!user || err){
                return res.status(400).json({
                    error:'User doesnot exist. Please signup.'
                });
            }

            if(!user.authenticate(password)){
                return res.status(400).json({
                    error:'Email and Password doesno\'\t match'
                });
            }
            
            try {
                const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn:process.env.JWT_SECRET_LIFE });
                
                return res.status(200).json({ token });
            } catch (error) {
                res.status(400).json({
                    error:error
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            error:error
        })
    }
};

exports.userAccess = (req, res) => {
    return res.status(200).json({ msg:"Access" });
};

exports.signout = (req, res) => {
    res.json({
        message:'Signout success'
    });
};

exports.requireSignin = (req, res, next) => {
    let token = req.headers['authorization'];
        token = token && token.replace("Bearer ","");
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
          if (err) {
              return res.status(401).json({ message: 'Unauthorized access.' });
          }
        req.user = decoded;
        next();
      });
    } else {
      return res.status(403).send({ message: 'No token provided.' });
    }
};

exports.authUser = async (req, res, next) => {
    const authUserEmail = req.user.email;
    await User.findOne({ 'email':authUserEmail }).exec((err, user) => {
        if( err || !user ){
            return res.status(400).json({
                error : 'User not found'
            })
        }
        next();
    });
}