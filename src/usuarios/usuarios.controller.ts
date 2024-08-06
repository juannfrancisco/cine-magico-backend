import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from 'src/usuario';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  //Registrar un nuevo usuario
  @Post()
  registrarUsuario(@Body() usuario: Usuario) {
    return usuario;
  }
  //Obtener un usuario según su id
  @Get(':id')
  obtenerUsuario(@Param('id') id: number) {
    return id;
  }
  //Modificar un usuario según su id
  @Put(':id')
  modificarUsuario(@Param('id') id: number, @Body() usuario: Usuario) {
    return usuario;
  }
  //Reproducir una película
  @Post(':idUsuario/peliculas/:idPelicula')
  reproducirPelicula(
    @Param('idUsuario') id: number,
    @Param('idPelicula') idPelicula: number,
    @Res() res: Response,
  ) {
    const resultado = this.usuariosService.reproducirPelicula(id, idPelicula);
    if (resultado == 0) {
      res.status(200).send('OK');
    }
    if (resultado == 1) {
      res.status(404).send('La pelicula no existe');
    }
    if (resultado == 2) {
      res.status(400).send('Su plan no permite reproducir la pelicula');
    }
    if (resultado == 3) {
      res.status(400).send('La pelicula no es apta');
    }
  }
}
