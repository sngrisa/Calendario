import { Response, Router } from 'express';
import { UsersRouter } from './paths/users.routes';
import { EventsRouter } from './paths/event.routes';
import { CalendarRouter } from './paths/calendar.routes';

const BrowserRouter: any = Router();

BrowserRouter.use('/users', UsersRouter);

BrowserRouter.use('/events', EventsRouter);

BrowserRouter.use('/calendar', CalendarRouter);

BrowserRouter.get('/ping', (_req: Request, res: Response): void => {
    res.status(200).json({
        ok: true,
        msg: 'pong',
    })
})


export default BrowserRouter;