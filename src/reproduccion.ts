import { Pelicula } from './pelicula';

export class Reproduccion {
  constructor(
    public id: number,
    public pelicula: Pelicula,
    public fecha: Date,
  ) {}
}
