import nodemailer from 'nodemailer';
import neh from 'nodemailer-express-handlebars';
import path from 'path';

//let aws=require("@aws-sdk/client-ses");
//let { defaultProvider } = require("@aws-sdk/credential-provider-node");

const __dirname = path.resolve();

//const ses= new aws.SES({
	//apiVersion: "2012-10-17",
	//region: "us-east-1",
	//defaultProvider,
//});

const transport = nodemailer.createTransport({

//	SES: {ses, aws},
//	sendingRate: 1
//host: "mail.zmaartcc.net",
//port: 587,
//secure: false,
host: "smtp.hostinger.com",
port: 465,
secure: true,

ignoreTLS: true,
auth: {
		user: 'no-reply@zmaartcc.net',
		pass: process.env.EMAIL_PASSWORD
	},
});

transport.use('compile', neh({
	viewPath: __dirname+"/email",
	viewEngine: {
		extName: ".hbs",
		layoutsDir: __dirname+"/email",
		partialsDir: __dirname+"/email",
		defaultLayout: "main"
	},
	extName: ".hbs"
}));

export default transport;
