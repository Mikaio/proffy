import { Request, Response } from 'express';
import db from '../database/connection';
import bcrypt, { hash } from 'bcrypt';

export default class UsersController {
    
    async index(request: Request, response: Response) {
        const { email, password } = request.body;

        const [ data ] = await db('users').where('email','=', email).select();
        
        if (data) {
            const match = await bcrypt.compare(password, data.password);
            
            if (match) {
                return response.json(data);
            } else {
                return response.status(400).send();
            }
        } else {
            return response.status(400).send();
        }
        

    }

    async create(request: Request, response: Response) {
        const {
            firstname,
            lastname,
            email,
            password,
        } = request.body;

        const saltRounds = 10;

        await bcrypt.hash(password, saltRounds).then((hash) => {
            return db('users').insert({
                firstname,
                lastname,
                email,
                password: hash
            });
        });
        

        return response.status(201).send();

    }
}