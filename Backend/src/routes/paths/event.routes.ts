import express from "express";
import { validateFields } from "../../helpers/ValidateFields";
import { check } from "express-validator";
import { saveEvent, getEventById, getEventsByIdUser, updateEvent, deleteEvent } from "../../controllers/event.controller";
import { validateJWT } from "../../helpers/ValidateJWT";

const EventsRouter = express.Router();

EventsRouter.get('/user/:_id', [validateFields ], getEventsByIdUser);

EventsRouter.get('/users/:_id', [
    check('_id', 'The id is required').not().isEmpty(),
    check('_id', 'The id must be a valid MongoDB ObjectId').isMongoId(),
    validateFields
], getEventById);

EventsRouter.post('/', [
    check('title', 'The title of Event is required').not().isEmpty(),
    check('notes', 'The notes of Event is required').not().isEmpty(),
    check('start', 'The start of Event is required').isISO8601().withMessage('Invalid date format'),
    check('end', 'The end of Event is required').isISO8601().withMessage('Invalid date format'),
    validateFields
], saveEvent);

EventsRouter.delete('/:_id', [
    check('_id', 'The id is required').not().isEmpty(),
    validateFields,
], deleteEvent);

EventsRouter.put('/:_id', [
    check('_id', 'The id is required').not().isEmpty(),
    check('_id', 'The id must be a valid MongoDB ObjectId').isMongoId(),
    validateFields,
    validateJWT
], updateEvent);

export { EventsRouter };