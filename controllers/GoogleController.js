import express from 'express';
const router = express.Router();

import User from '../models/User.js';
import Config from '../models/Config.js';

router.get('/googleinfo', async (req, res) => {
	
	console.log(googleClientId);
	console.log(googleClientSecret);

	res.stdRes.data = {
		clientId: googleClientId,
		clientSecret: googleClientSecret
	}

	return res.json(res.stdRes);
});

export default router;