# api de alquiler de autos con mongodb

### uso:

- primero clone el repo `git clone https://github.com/JJMoraless/mongo_alquiler`
- por defecto el la app se ejecuta en localhost puerto 5050. se puede cambiar en las variables de entorno ubicadas en el `.env`
- instale dependencias `git i`
- ejecute la app `npm run dev`

## Endpoints método get de ejemplo:
- antes de usar cualquier funcionalidad primero tiene que obtener un token, el token sirve para cualquier endpoint y dura 1 día, el token se almacena en cookies y se valida desde la cookies, o también puede poner el token en la cabeceras como `authorization` .
- para obtener el token use el endpoint: http://localhost:5050/auth/login
- para eliminar el token use el endpoint: http://localhost:5050/auth/logout

| total alquileres registrados en la db | http://localhost:5050/alquileres/total |
| --- | --- |
| Listar todos los alquileres activos junto con los datos de los clientes relacionados. | http://localhost:5050/alquileres/activos |
| Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'. | http://localhost:5050/alquileres/fecha_inicio |
| Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'. | http://localhost:5050/alquileres/fecha |
| Obtener el costo total de un alquiler específico. | http://localhost:5050/alquileres/1/total |
| Obtener los detalles del alquiler con el ID_Alquiler específico. | http://localhost:5050/alquileres/1 |
| Listar todos los automóviles ordenados por marca y modelo. | http://localhost:5050/automoviles |
| Obtener todos los automóviles disponibles para alquiler. | http://localhost:5050/automoviles/disponibles |
| Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles. | http://localhost:5050/automoviles/disponibles_capacidad5 |
| 11.Mostrar todos los automóviles con una capacidad mayor a 5 personas. | http://localhost:5050/automoviles/mayor_5 |
| Mostrar todos los clientes registrados en la base de datos. | http://localhost:5050/clientes |
| Obtener los datos de los clientes que realizaron al menos un alquiler | http://localhost:5050/clientes/unalquiler |
| Listar los clientes con el DNI específico. | http://localhost:5050/clientes/12345678 |
| Listar los empleados con el cargo de "Vendedor". | http://localhost:5050/empleados/vendedores |
| Mostrar los empleados con cargo de "Gerente" o "Asistente". | http://localhost:5050/empleados/gerente_asistente |
| Listar las reservas pendientes realizadas por un cliente específico. | http://localhost:5050/reservas/pendientes/1 |
| Mostrar todas las reservas pendientes con los datos del cliente  y el automóvil reservado. | http://localhost:5050/reservas/pendientes |
| Mostrar la cantidad total de automóviles disponibles en cada sucursal. | http://localhost:5050/sucursales/autos_totales |
| Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección. | http://localhost:5050/sucursales/autos_totales_direccion |
|  |  |