import express from "express";
import { validateFields } from "../../helpers/ValidateFields";
import { check } from "express-validator";
import { saveEvent, getEventById, getEvents, updateEvent } from "../../controllers/event.controller";
import { validateJWT } from "../../helpers/ValidateJWT";
import { isDate } from "../../validations/isDate";


const EventsRouter = express.Router();

EventsRouter.get('/', validateJWT);

EventsRouter.get('/', [validateFields, validateJWT], getEvents);

EventsRouter.get('/:id', [check('id', 'The id required more than 1 characters').isLength({ min: 1 }), check('id', 'The id is required').not().isEmpty(), validateFields, validateJWT], getEventById);

EventsRouter.post('/', [
    check('title', 'The title of Event is required').not().isEmpty(),
    check('notes', 'The notes of Event is required').not().isEmpty(),
    check('start', 'The start of Event is required').not().custom(isDate),
    check('end', 'The end of Event is required').not().custom(isDate),
    validateFields], saveEvent);

EventsRouter.delete('/:id', [check('id', 'The id required more than 1 characters').isLength({ min: 1 }), check('id', 'The id is required').not().isEmpty(), validateFields, validateJWT],);

EventsRouter.put('/:id', [check('id', 'The id required more than 1 characters').isLength({ min: 1 }), check('id', 'The id is required').not().isEmpty(), validateFields, validateJWT], updateEvent);

export { EventsRouter };