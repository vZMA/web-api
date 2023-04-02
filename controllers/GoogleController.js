import express from 'express';
import dotenv from 'dotenv';
import getGoogleClientInfo from '../helpers/googleInfoHelper.js';
import getGoogleClientSecret from '../helpers/googleInfoHelper.js';

const router = express.Router();

import User from '../models/User.js';
import Config from '../models/Config.js';

router.get('/googleinfo', async (req, res) => {
	dotenv.config();

	const googleClientId = getGoogleClientInfo();
	const googleClientSecret = getGoogleClientSecret();
	console.log(googleClientId);
	console.log(googleClientSecret);

	res.stdRes.data = {
		clientId: googleClientId,
		clientSecret: googleClientSecret
	}

	return res.json(res.stdRes);
});

export default router;