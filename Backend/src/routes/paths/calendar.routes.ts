import express from "express";
import { validateFields } from "../../helpers/ValidateFields";

const CalendarRouter = express.Router();

CalendarRouter.get('/calendar/:_id', [validateFields], ((_req , _res) =>{
    const id = _req.params.id;

    _res.status(200).json(({
        ok: true,
        desc: `Usuario logueado con el id ${id}`
    }))
}));

export { CalendarRouter };