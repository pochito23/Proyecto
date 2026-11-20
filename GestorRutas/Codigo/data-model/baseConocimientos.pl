/*
tipo_destino(Id,Nombre).
tipo_transporte(Id,Nombre).
destino(Id,Nombre,TipoId,Zona,LimitePersonas).
guia(Id,Nombre,Idioma).
estacion(Id,Nombre,Zona).
linea(Id,Nombre,TipoTransporteId,EstacionOrigenId,EstacionDestinoId).
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
tipo_destino(5,casual).

tipo_transporte(1,'bus urbano').
tipo_transporte(2,particular).
tipo_transporte(3,taxi).

perfil(1,familiar).
perfil(2,personal).
perfil(3,romantico).

guia(1, 'Jose', español).
guia(2, 'Janior', ingles).
guia(3, 'Axcel', italiano).

%destino(Id,Nombre,TipoId,Zona,LimitePersonas).
destino(1,'Santa Lucia',3,occidente,20).
destino(2, 'Basílica de Suyapa',1, suyapa, 50).
destino(3, 'Cristo del Picacho',2,picacho, 30).
destino(4,'Parque Aurora',4,norte,30).
destino(5,'Museo',1,centro,25).
destino(6, 'Tatumbla',3,oriente,22).
destino(7, 'Valle de Angeles',4,occidente,20).
destino(8, 'La Tigra', 2, norte, 35).


estacion(1, 'Centro', centro).
estacion(2, 'Suyapa', suyapa).
estacion(3, 'El Picacho', picacho).
estacion(4, 'Estacion Norte', norte).
estacion(5, 'Terminal Oriente', oriente).
estacion(6, 'Parada Occidente', occidente).

linea(1, 'Ruta Centro - Suyapa', 1, 1, 2).
linea(2, 'Ruta Centro - Picacho', 1, 1, 3).
linea(3, 'Expreso Oriente', 2, 1, 5).
linea(4, 'Taxi Directo Norte', 3, 2, 4).
linea(5, 'Ruta Occidente', 1, 1, 6).

salida(800, 30).
salida(930, 45).
salida(1100, 25).
salida(1400, 40).
salida(1600, 35).

conexion(5, 2, 20).
conexion(5, 3, 25).
conexion(5, 1, 30).
conexion(2, 6, 35).
conexion(2, 5, 20).
conexion(3, 4, 40).
conexion(3, 5, 25).
conexion(4, 8, 30).
conexion(4, 3, 40).
conexion(1, 6, 45).
conexion(1, 5, 30).
conexion(6, 7, 25).
conexion(6, 2, 35).
conexion(7, 6, 25).
conexion(7, 1, 40).
conexion(8, 4, 30).
conexion(8, 3, 35).

turista(1, 'Carlos', 1, 1).
turista(2, 'Elena', 3, 2).
turista(3, 'Marco', 2, 3).
turista(4, 'Sofia', 1, 1).
turista(5, 'David', 2, 2).
turista(6, 'Valeria', 3, 1).
turista(7, 'Andres', 1, 2).
turista(8, 'Camila', 2, 3).
turista(9, 'Luis', 3, 3).
turista(10, 'Fernanda', 1, 1).
turista(11, 'Diego', 2, 2).
turista(12, 'Paola', 3, 1).

visita(1, [5, 2, 6]).
visita(2, [3, 1, 6]).
visita(3, [5, 3, 4, 8]).
visita(4, [2, 4, 7]).
visita(5, [1, 6, 7]).
visita(6, [5, 2, 1]).
visita(7, [3, 4, 8]).
visita(8, [6, 7, 2]).
visita(9, [1, 5, 3]).

grupo(1, 1, 15).
grupo(2, 2, 8).
grupo(3, 3, 22).
grupo(4, 1, 35).

duracionMaxVisita(50).

% 1. conectados(A, B): existe conexión entre dos destinos distintos.
conectados(A, B) :-
    conexion(A, B, _),
        A \= B.

% 2. ruta_valida(Ruta): lista de destinos sin repetir, cada salto con
%    conexión existente y duración <= duracionMaxVisita.
ruta_valida([_]).
ruta_valida([A, B | Resto]) :-
    sin_repetidos([A, B | Resto]),
    conexion(A, B, _),
    ruta_valida([B | Resto]).

sin_repetidos([]).
sin_repetidos([X | Xs]) :-
    \+ member(X, Xs),
    sin_repetidos(Xs).

sin_colision(G1, G2) :-
    ocupacion(G1, DestinoId, Inicio1, Dur1),
    ocupacion(G2, DestinoId, Inicio2, Dur2),
    sin_colision(G1, G2, DestinoId, Inicio1, Dur1, Inicio2, Dur2).

sin_colision(G1, G2, _, Inicio1, Dur1, Inicio2, Dur2) :-
    G1 \= G2,
    Fin1 is Inicio1 + Dur1,
    Fin2 is Inicio2 + Dur2,
    (Fin1 =< Inicio2 ; Fin2 =< Inicio1).

respeta_capacidad(GrupoId, DestinoId) :-
    grupo(GrupoId, _, Tamano),
    destino(DestinoId, _, _, _, LimitePersonas),
    Tamano =< LimitePersonas.

destinos_relacionados(D, R) :-
    destino(D, _, _, _, _),
    destino(R, _, _, _, _),
    visita(_, ListaDestinos),
    member(D, ListaDestinos),
    member(R, ListaDestinos),
    D \= R.

turistas_de_guia(G, T) :-
    turista(T, _, _, G).

destinos_de_turista(T, D) :-
    visita(T, ListaDestinos),
    member(D, ListaDestinos).

frecuencia_destino(D, N) :-
    destino(D, _, _, _, _),
    findall(1, (visita(_, ListaDestinos), member(D, ListaDestinos)), Visitas),
    length(Visitas, N).