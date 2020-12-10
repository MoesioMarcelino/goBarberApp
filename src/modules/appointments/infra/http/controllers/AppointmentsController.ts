import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date: parsedDate,
    });

    return res.json(appointment);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.body;

    const listAppointments = container.resolve(ListAppointmentsService);

    const appointments = await listAppointments.execute({ provider_id });

    return res.json(appointments);
  }
}
