import express from 'express';

const router = express.Router();

router.get('/googleinfo', async (req, res) => {
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