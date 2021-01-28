import jsonwebtoken from 'jsonwebtoken';
import authConfig from '../config/auth';

export default function checkAuthentication(request, response, next) {
	const authHeader = request.headers.authorization;
	const { verify } = jsonwebtoken;

	if (!authHeader) {
		throw new Error('Authentication token is missing');
	}

	const [ , token] = authHeader.split(' ');

	try{
		const decoded = verify(token, authConfig.jwt.secret);

		const {sub} = decoded;

		request.headers.user_id = sub;

		return next();
	} catch {
		throw new Error('Invalid JWT token');
	}
	
}