import { Injectable } from '@nestjs/common';
import { Pelicula } from 'src/pelicula';
import { PeliculasService } from 'src/peliculas/peliculas.service';
import { PlanesService } from 'src/planes/planes.service';
import { Reproduccion } from 'src/reproduccion';
import { Usuario } from 'src/usuario';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [];

  constructor(
    private readonly peliculasService: PeliculasService,
    private readonly planesServices: PlanesService,
  ) {
    this.usuarios.push(
      new Usuario(
        1,
        'usuario1',
        'usuario1@mail.cl',
        7,
        'asds',
        this.planesServices.obtenerPlan(3),
        [],
        ['Animación', 'Fantasía'],
      ),
    );
    this.usuarios.push(
      new Usuario(
        2,
        'usuario2',
        'usuario2@mail.cl',
        15,
        'asds',
        this.planesServices.obtenerPlan(2),
        [],
        ['Acción', 'Aventura'],
      ),
    );
    this.usuarios.push(
      new Usuario(
        3,
        'usuario3',
        'usuario3@mail.cl',
        23,
        'asds',
        this.planesServices.obtenerPlan(1),
        [],
        ['Ciencia Ficción'],
      ),
    );
  }

  //4.2.1 Registrar un nuevo usuario. Validar que no exista un usuario registrado con el mismo correo, si ya existe un usuario devolver un error (código 400, mensaje: correo existe).
  registrarUsuario(usuario: Usuario): Usuario {
    usuario.id = this.usuarios.length + 1;
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].correoElectronico === usuario.correoElectronico) {
        return null;
      }
    }
    this.usuarios.push(usuario);
    return usuario;
  }

  //4.2.2 Obtener un usuario según su id, validar que exista el usuario según su id, si no existe devolver un error (código 404, mensaje : usuario no existe).
  obtenerUsuario(id: number) {
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id === id) {
        return this.usuarios[i];
      }
    }
    return null;
  }

  //4.2.3 Modificar un usuario según su id, solo se debe modificar los datos planSuscripcion y generosFavoritos.
  modificarUsuario(id: number, usuario: Usuario) {
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id === id) {
        this.usuarios[i].planSuscripcion = usuario.planSuscripcion;
        this.usuarios[i].generosFavoritos = usuario.generosFavoritos;
      }
    }
  }

  //4.2.4 Reproducir una película, debe considerar lo siguiente :
  //4.2.4.1 Validar que la película exista Si no cumple esta condición retornar error (código : 404, error : la pelicula no existe)
  //4.2.4.2 Validar si la película es un estreno, el usuario puede reproducir si y sólo si tiene la suscripción premium. Si no cumple esta condición retornar error (código : 400, error : su plan no permite reproducir la película)
  //4.2.4.3 Validar si el usuario puede reproducir una película por su clasificación y la edad del cliente.  Si no cumple esta condición retornar error (código : 400, error : la película no es apta )
  //4.2.4.4 Si los puntos anteriores son correctos se debe agregar una Reproducción a la lista de historialVisualizaciones del usuario y retornar un OK
  reproducirPelicula(idUsuario: number, idPelicula: number): number {
    const usuario = this.obtenerUsuario(idUsuario);
    const pelicula = this.peliculasService.obtenerPelicula(idPelicula);
    if (pelicula) {
      if (pelicula.estreno && usuario.planSuscripcion.id != 3) {
        return 2;
      }
      if (!this.validarCalificacion(usuario, pelicula)) {
        return 3;
      }
      usuario.historialVisualizaciones.push(
        new Reproduccion(
          usuario.historialVisualizaciones.length + 1,
          pelicula,
          new Date(),
        ),
      );
      return 0;
    } else {
      return 1;
    }
  }

  // Puede ser TE, todo espectador,
  //TE+7, recomendada para mayores de 7 años,
  //MA14, para mayores de 14 años o
  //MA18, para mayores de 18 años
  validarCalificacion(usuario: Usuario, pelicula: Pelicula) {
    if (pelicula.calificacion == 'TE') return true;
    if (pelicula.calificacion == 'TE+7' && usuario.edad >= 7) return true;
    if (pelicula.calificacion == 'MA14' && usuario.edad >= 14) return true;
    if (pelicula.calificacion == 'MA18' && usuario.edad >= 18) return true;

    return false;
  }
}
