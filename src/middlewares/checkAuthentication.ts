import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function checkAuthentication(request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new Error('Authentication token is missing');
	}

	const [, token] = authHeader.split(' ');

	try{
		const decoded = verify(token, authConfig.jwt.secret);

		const { sub } = decoded as TokenPayload;

		request.user = {
			id: sub.replace(/^"(.*)"$/, '$1')
		};

		return next();
	} catch {
		throw new Error('Invalid JWT token');
	}
	
}