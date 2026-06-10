import jwt from 'jsonwebtoken';
import userModel from '../model/User.js';
import { model } from 'mongoose';

const verifyToken = async (req, res, next) => {
    if(req.headers && req.headers.authorization){
        const token = req.headers.authorization.replace('Bearer ', '');
        if (!token) {
            let outputjson = { message: 'token is Not Found', status: 401 }
            return res.json(outputjson);
        }
        try {
            const decoded = jwt.verify(token, 'abcdtoken12345');
            const user = await userModel.findById(decoded.id);
            if (!user) {
                let outputjson = { message: 'User Not Found', status: 401 }
                return res.json(outputjson);
            }
            req.user = user;
            next();
        } catch (error) {
            console.log(error);
        }
    } else {
        let outputjson = { message: 'token is Not Found', status: 401 }
            return res.status(401).json(outputjson);
    }
}

export default verifyToken;