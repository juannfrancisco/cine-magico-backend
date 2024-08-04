import { Controller, Get, Param, Res } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { Response } from 'express';

@Controller('planes')
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  //2.1.1 Obtener un plan según su id
  @Get(':id')
  obtenerPlan(@Param() id: number, @Res() res: Response) {
    const plan = this.planesService.obtenerPlan(id);
    if (plan) {
      res.status(200).send(plan);
    } else {
      res.status(404).send('plan no existe');
    }
  }

  //2.1.2 Obtener todos los planes
  @Get()
  obtenerTodos() {
    return this.planesService.obtenerTodos();
  }
}
