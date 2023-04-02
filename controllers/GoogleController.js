import express from 'express';
const router = express.Router();

import User from '../models/User.js';
import Config from '../models/Config.js';

router.get('/googleinfo', async (req, res) => {
	
	console.log(clientId);
	console.log(clientSecret);

	res.stdRes.data = {
		clientId: googleClientId,
		clientSecret: googleClientSecret
	}

	return res.json(res.stdRes);
});

export default router;