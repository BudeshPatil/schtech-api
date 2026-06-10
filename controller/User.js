import userModel from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "validator";
import twilio from "twilio";
import dotenv from 'dotenv';
dotenv.config();
//My acc TWilio Keys 
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE

if (!accountSid || !authToken) {
    throw new Error('environment variables');
}

const client = twilio(accountSid, authToken);

//Following method to create User account
const createUser = async (req,res)=>{
    try {
        if(validator.isEmail(req.body.email)){
            const passowrdhashed = await bcrypt.hash(req.body.password,10);
            const userModelData = new userModel({
                name: req.body.name,
                email:req.body.email,
                password: passowrdhashed,
                phoneNumber: req.body.phoneNumber
            });
            console.log('hased passowrd '+passowrdhashed)
            const user = await userModelData.save();
            console.log('User Saved Sucessfully');
            res.status(200).json({
                message: 'User Saved Sucessfully',
                result: user
            })
        } else {
            res.status(400).json({
                message: 'Invalid Email'
            })
        }
    } catch(error){
        console.log(error.message);
        res.status(400).json({
            statuscode: 400,
            message: 'Error while saving User Data'
        })
    } 
}
//Following method to login to user account
const login = async (req,res)=>{
    try {
        const postBody = req.body;
        const { email, password } = req.body;
        
        if(!email || !password && !validator.isEmail(email)){
           let outputJson  = {code: 400, status: "faild", message: 'Invalid Email'};
            return res.json(outputJson);
        }
        let user = await userModel.findOne({email:email});
        if(user){
            const isvalidPassrd = await bcrypt.compareSync(password,user.password);
            if(!isvalidPassrd){
                let outputJson  = {code: 400, status: "faild", message: 'Invalid Password'};
                return res.json(outputJson);
            }
            let token = jwt.sign({id:user._id},'abcdtoken12345');
            const outputJson = {
                status: 200,
                message: 'logged in sucessful',
                result: user,
                token: token
            }
            return res.json(outputJson);
        } else {
            let outputJson  = {code: 400, status: "faild", message: 'Invalid User/Not Found'};
            return res.json(outputJson);
        }

    } catch (error){
        console.log(error);
        res.status(400).json({
            status: 400,
            message:'error while login'
        })
    }
}

//following method to Send OTP 
// Pass Phonenumber to generate OTP
const sendOtp = async (req,res)=>{
    try {
        let { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({
                status: 400,
                message: 'phoneNumber is required'
            });
        }
        if(!phoneNumber.includes('+')){
            phoneNumber = '+'+phoneNumber
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 2 * 60 * 1000);
        let user = await userModel.findOne({phoneNumber:phoneNumber});
        if(user){
            user.otpCode = otp;
            user.otpExpiry = expiry;
            await user.save();
            await client.messages.create({
                body: `Your OTP is ${otp}`,
                from: twilioPhone,
                to: phoneNumber
            });
            const outputJson = {
                status: 200,
                message: 'OTP Send successful'
            }
            return res.json(outputJson);
        } else {
            return res.status(400).json({
                status: 400,
                statusText: 'failed',
                message: 'Invalid User/Not Found'
            });
        }
    } catch (error){
        console.log(error);
        res.status(400).json({
            status: 400,
            message: error.message || 'Error while sending OTP'
        })
    }
}

//Following method is to verify the OTP
//Pass otp with Phonenumber to find Users

const verifyOtp = async (req,res)=>{
    try {
        const { phoneNumber, otp } = req.body;
        if (!phoneNumber || !otp) {
            return res.status(400).json({
                status: 400,
                message: 'phoneNumber and otp are required'
            });
        }

        let user = await userModel.findOne({phoneNumber:phoneNumber});
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.otpExpiry < new Date()) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }
        if (user.otpCode !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        user.isVerified = true;
        user.otpCode = null;
        user.otpExpiry = null;
        await user.save();
        let token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: "7d" });
        const outputJson = {
            status: 200,
            message: 'logged in successful',
            result: user,
            token: token
        }
        return res.json(outputJson);
    } catch (error){
        console.log(error);
        res.status(400).json({
            status: 400,
            message: error.message || 'Error while verifying OTP'
        })
    }
}

export default { createUser,login,sendOtp,verifyOtp }