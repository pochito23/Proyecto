/*
tipo_destino(Id,Nombre).
tipo_transporte(Id,Nombre).
destino(Id,Nombre,TipoId,Zona,LimitePersonas).
guia(Id,Nombre,Idioma).
salida(HoraSalida,Duracion).
conexion(DestinoOrigenId,DestinoFinalId,Minutos).
perfil(Id,Nombre).
turista(Id,Nombre,PerfilId,GuiaId).
visita(TuristaId,ListaDestinosId).
grupo(Id,guiaId,Tamano).
duracionMaxVisita(50).
*/

tipo_destino(1,historico).
tipo_destino(2,naturaleza).
tipo_destino(3,cultural).
tipo_destino(4,divertido).

tipo_transporte(1,busUrbano).
tipo_transporte(2,particular).
tipo_transporte(3,taxi).

destino(1,'Santa Lucia',3,occidente,20).
destino(2, 'Basílica de Suyapa',1, suyapa, 50).
destino(3, 'Cristo del Picacho',2,picacho, 30).
destino(4,'parque aurora',4,norte,30).
destino(5,'museo',1,centro,25).

perfil(1,'familiar').
perfil(2,'personal').
perfil(3,'romantico').

duracionMaxVisita(50).
