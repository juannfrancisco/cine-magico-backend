import { Injectable } from '@nestjs/common';
import { Pelicula } from 'src/pelicula';

@Injectable()
export class PeliculasService {
  private peliculas: Pelicula[] = [];

  //3.2.1 El servicio debe inicializarse con las siguientes películas
  constructor() {
    this.peliculas.push(
      new Pelicula(
        1,
        'Toy Story',
        'Animación',
        2020,
        'TE',
        81,
        'Inglés',
        ['Español', 'Francés', 'Alemán'],
        false,
      ),
    );
    this.peliculas.push(
      new Pelicula(
        2,
        'Harry Potter y la piedra filosofal',
        'Fantasía',
        152,
        'TE',
        100,
        'Inglés',
        ['Español', 'Francés', 'Alemán'],
        false,
      ),
    );
    this.peliculas.push(
      new Pelicula(
        3,
        'El juego del miedo',
        'Terror',
        2020,
        'TE',
        117,
        'Inglés',
        ['Español', 'Alemán'],
        false,
      ),
    );
    this.peliculas.push(
      new Pelicula(
        4,
        'Deadpool & Wolverine',
        'Acción',
        2024,
        'MA18',
        127,
        'Inglés',
        ['Español'],
        true,
      ),
    );
  }

  //3.2.2 Registrar una nueva película.
  crearPelicula(pelicula: Pelicula): Pelicula {
    pelicula.id = this.peliculas.length + 1;
    this.peliculas.push(pelicula);
    return pelicula;
  }

  //3.2.3 Obtener una película según su id, validar que exista la película según su id, si no existe devolver un error (código 404, mensaje : película no existe)
  obtenerPelicula(id: number): Pelicula {
    for (let i = 0; i < this.peliculas.length; i++) {
      if (this.peliculas[i].id == id) {
        return this.peliculas[i];
      }
    }
    return null;
  }

  //3.2.4 Obtener todas las películas, permite filtrar dado un género cinematográfico.
  obtenerTodas(genero: string): Pelicula[] {
    if (genero) {
      const peliculasFiltradas = [];
      for (let i = 0; i < this.peliculas.length; i++) {
        if (this.peliculas[i].genero == genero) {
          peliculasFiltradas.push(this.peliculas[i]);
        }
      }
      return peliculasFiltradas;
    }
    return this.peliculas;
  }
  //3.2.5 Eliminar una película según su id, validar que exista la película según su id, si no existe devolver un error (código 404, mensaje : película no existe)
  eliminarPelicula(id: number): boolean {
    for (let i = 0; i < this.peliculas.length; i++) {
      if (this.peliculas[i].id == id) {
        this.peliculas.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}
