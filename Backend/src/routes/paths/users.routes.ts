import express from 'express';
import { check } from "express-validator";
import { validateFields } from '../../helpers/ValidateFields';
import { getUsers, createUsers, updateUsers, deleteUsers, getUsersById, getUsersByEmail, getUsersByStatus, getUsersByUsername, loginUsers } from '../../controllers/user.controller';
import { validateJWT } from '../../helpers/ValidateJWT';

const UsersRouter = express.Router();

UsersRouter.get('/', [validateFields], getUsers);

UsersRouter.get('/:_id', [check('_id', 'The id of username is required and must be validated').isLength({ min: 1 }), check('_id', 'The id is must required in query').not().isEmpty(), validateFields], getUsersById);

UsersRouter.get('/email/:email', [check('email', 'The email of user is required and must be validated').isEmail(), check('email', 'The email is must required in query').not().isEmpty(), validateFields], getUsersByEmail);

UsersRouter.get('/status/:status', [check('status', 'The email of user is required and must be validated').isLength({ min: 1 }), check('status', 'The status is must required in query').not().isEmpty(), validateFields], getUsersByStatus);

UsersRouter.get('/username/:username', [check('username', 'The username of user is required and must be validated').isLength({ min: 3 }), check('username', 'The username is must required in query').not().isEmpty(), validateFields], getUsersByUsername);

UsersRouter.post('/', [validateFields, check('email', 'The email of user is required and must be validated').isEmail(), check('username', 'The username is required').isLength({ min: 3 }), check('password', 'The password is required and must be than 3 characters').isLength({ min: 3 })], createUsers);

UsersRouter.put('/id/:_id', [validateFields, check('email', 'The email of user is required and must be validated').isEmail(), check('username', 'The username is required').isLength({ min: 3 }), check('password', 'The password is required and must be than 3 characters').isLength({ min: 3 })], updateUsers);

UsersRouter.delete('/:_id', [check('_id', 'The id of username is required and must be validated').isLength({ min: 1 }), validateFields], deleteUsers);

UsersRouter.post("/login", [check('email', 'The email is required and must be validated').isEmail(), check('password', 'The password is required').isLength({ min: 8 }), validateFields], loginUsers);

export { UsersRouter };

