import express from 'express';
const router = express.Router();

import User from '../models/User.js';
import Config from '../models/Config.js';

router.get('/googleinfo', async (req, res) => {
	
	const clientId = process.env.GOOGLE_AUTH_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;
	
	console.log(clientId);
	console.log(clientSecret);

	res.stdRes.data = {
		ClientId: clientId,
		ClientSecret: clientSecret
	}

	return res.json(res.stdRes);
});

export default router;