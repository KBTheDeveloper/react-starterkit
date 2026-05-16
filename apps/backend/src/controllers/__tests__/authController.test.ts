import { Request, Response } from 'express';
import { register, login, logout, getMe } from '../authController.js';
import db from '../../models/index.js';

jest.mock('../../models');

describe('Auth Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = { body: {}, cookies: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn(),
        };
    });

    describe('register', () => {
        it('should create user and set cookie', async () => {
            req.body = { name: 'Test', email: 'test@example.com', password: '123456' };
            const mockUser = { id: 1, name: 'Test', email: 'test@example.com' };
            (db.User.findOne as jest.Mock).mockResolvedValue(null);
            (db.User.create as jest.Mock).mockResolvedValue(mockUser);

            await register(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.cookie).toHaveBeenCalledWith('token', expect.any(String), expect.any(Object));
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });
    });

    describe('login', () => {
        it('should set cookie and return user without token', async () => {
            const email = 'test@example.com';
            req.body = { email: email, password: '123456' };
            const mockUser = {
                id: 1,
                name: 'Test',
                email,
                dataValues: { id: 1, name: 'Test', email},
                validatePassword: jest.fn().mockResolvedValue(true),
            };
            (db.User.findOne as jest.Mock).mockResolvedValue(mockUser);

            await login(req as Request, res as Response);

            expect(res.cookie).toHaveBeenCalledWith('token', expect.any(String), expect.any(Object));
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Test', email });
        });
    });
});
