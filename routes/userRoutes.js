import express from 'express';
const userRoutes = express.Router();
import userctrl from '../controller/User.js';

/**
 * @swagger
 * /api/user/createUser:
 *   post:
 *     summary: Create New User
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *                 example: admin
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *               phoneNumber:
 *                 type: string
 *                 example: +918861662775
 *     responses:
 *       200:
 *         description: Create New User successful
 *       400:
 *         description: Invalid Inputs or Email
 */
userRoutes.post('/createUser', userctrl.createUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User Login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *               phoneNumber:
 *                 type: string
 *                 example: +918861662775
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
userRoutes.post('/login', userctrl.login);

/**
 * @swagger
 * /api/user/send-otp:
 *   post:
 *     summary: Send Otp
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: +918861662775
 *     responses:
 *       200:
 *         description: Send OTP successful
 *       400:
 *         description: Invalid Number credentials
 */
userRoutes.post('/send-otp', userctrl.sendOtp);
/**
 * @swagger
 * /api/user/verify-otp:
 *   post:
 *     summary: Verify Otp
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: +918861662775
 *               otp:
 *                 type: string
 *                 example: 12345
 *     responses:
 *       200:
 *         description: OTP Verified successful
 *       400:
 *         description: Invalid Number credentials
 */
userRoutes.post('/verify-otp', userctrl.verifyOtp);
export default userRoutes;