import express from 'express';
import dotenv from 'dotenv';

const router = express.Router();

import User from '../models/User.js';
import Config from '../models/Config.js';

router.get('/googleinfo', async (req, res) => {
	dotenv.config();

	const googleClientId = process.env.GOOGLE_AUTH_CLIENT_ID;
	const googleClientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;
	console.log(googleClientId);
	console.log(googleClientSecret);

	res.stdRes.data = {
		clientId: googleClientId,
		clientSecret: googleClientSecret
	}

	return res.json(res.stdRes);
});

export default router;