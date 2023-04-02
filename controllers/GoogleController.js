import express from 'express';
import microAuth from '../middleware/microAuth.js';
const router = express.Router();

import User from '../models/User.js';
import Config from '../models/Config.js';

router.get('/googleinfo', async (req, res) => {
	
	const clientId = process.env.GOOGLE_AUTH_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;
	
	res.stdRes.data = {
		ClientId: clientId,
		ClientSecret: clientSecret
	}

	console.log(res);

	return res.json(res.stdRes);
});

export default router;