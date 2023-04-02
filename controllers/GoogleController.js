import express from 'express';
const router = express.Router();

import User from '../models/User.js';
import Config from '../models/Config.js';

router.get('/googleinfo', async (req, res) => {
	
	console.log(app.googleClientId);
	console.log(app.googleClientSecret);

	res.stdRes.data = {
		clientId: app.googleClientId,
		clientSecret: app.googleClientSecret
	}

	return res.json(res.stdRes);
});

export default router;