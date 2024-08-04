import { Injectable } from '@nestjs/common';
import { PlanSuscripcion } from 'src/plan-suscripcion';

@Injectable()
export class PlanesService {
  private planesSuscripcion: PlanSuscripcion[] = [];

  //2.2.1 El servicio debe inicializarse con los siguientes planes

  constructor() {
    this.planesSuscripcion.push(
      new PlanSuscripcion(1, 'Plan básico', 3000, '720p', true),
    );
    this.planesSuscripcion.push(
      new PlanSuscripcion(2, 'Plan estándar', 5000, '1024p', true),
    );
    this.planesSuscripcion.push(
      new PlanSuscripcion(1, 'Plan premium', 7000, '4k', false),
    );
  }

  //2.2.2 Obtener un plan según su id, validar que exista el plan según su id, si no existe devolver un error (codigo 404, mensaje : plan no existe)
  obtenerPlan(id: number): PlanSuscripcion {
    for (let i = 0; i < this.planesSuscripcion.length; i++) {
      if (this.planesSuscripcion[i].id === id) {
        return this.planesSuscripcion[i];
      }
    }
    return null;
  }

  //2.2.3 Obtener todos los planes
  obtenerTodos(): PlanSuscripcion[] {
    return this.planesSuscripcion;
  }
}
