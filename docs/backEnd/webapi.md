# Web API

## Resumen

La aplicación expone una API REST construida con Express ubicada en `src/index.js`. Las rutas principales se montan bajo el prefijo `/api` y delegan la lógica a los controladores en `src/controllers`.

## Cómo ejecutar

- Instalar dependencias: `npm install`
- En desarrollo (con reinicio automático): `npm run dev`
- En producción: `npm start`

El servidor escucha en el puerto especificado por la variable de entorno `PORT` (por defecto `3000`).

## Rutas principales

- `/api/forms` — controlador: `src/controllers/forms.controller.js`
- `/api/form-attributes` — controlador: `src/controllers/formAttributes.controller.js`
- `/api/form-reports` — controlador: `src/controllers/formReport.controller.js`
- `/api/login` — controlador: `src/controllers/login.controller.js`
- `/api/users` — controlador: `src/controllers/user.controller.js`
- `/api/dbtest` — endpoint de diagnóstico que invoca `testSqlConnection` en `src/database.js`

Las rutas se declaran en `src/routes` (ver archivos `src/routes/*.route.js`).

## Componentes relevantes

- `src/index.js`: inicializa Express, registra middleware (`cors`, `express.json`) y monta las rutas.
- `src/database.js`: abstracción para la conexión a SQL Server y funciones auxiliares.
- `src/controllers/*`: lógica de negocio para cada recurso.
- `src/routes/*`: definición de endpoints y mapeo a controladores.
- `src/utils/utils.js`: utilidades compartidas.

Nota: el archivo `src/services/eventTrigger.js` no está incluido en esta documentación, tal como se pidió.
