# Worker (Planificador)

## Resumen

El worker es el proceso encargado de reclamar y ejecutar trabajos programados (triggers) almacenados en la base de datos. El código principal está en `src/services/worker.js`. En el arranque normal de la aplicación el worker se inicia desde `src/index.js` (se importa `require('./services/worker')`).

## Comportamiento principal

- Conecta a SQL Server usando las variables de entorno de conexión.
- Reclama triggers vencidos mediante el procedimiento almacenado configurado en `claimProc` (por defecto `dbo.usp_ClaimDueTriggers`).
- Ejecuta el procedimiento asociado a cada trigger usando la convención `ParamsJson` y `CorrelationId`.
- Reporta el resultado de la ejecución con otro procedimiento (`reportProc`, por defecto `dbo.usp_ReportTriggerRunResult`).
- Calcula el siguiente `nextRunAt` según el tipo de programación: once, intervalo o cron (usa `cron-parser` y `luxon`).
- Gestiona concurrencia con `p-limit` y parámetros configurables (concurrency, batchSize, leaseSeconds, etc.).

## Cómo ejecutar

- De forma integrada: ejecutar el servidor web (`npm run dev` o `npm start`) también inicializa el worker porque `src/index.js` lo requiere.
- De forma independiente: puede ejecutarse con `node src/services/worker.js` si se necesita aislarlo.

## Configuración relevante

El worker toma varias opciones desde variables de entorno (ver `docs/env.md`), entre las más importantes:

- `SQL_*` — credenciales y servidor para SQL Server.
- `POLLING_MS` — intervalo de sondeo para nuevos triggers (por defecto `5000`).
- `BATCH_SIZE` — cantidad máxima de triggers a reclamar por tick (por defecto `5`).
- `LEASE_SECONDS` — tiempo de lease para una tarea reclamada (por defecto `120`).
- `CONCURRENCY` — número de trabajos paralelos (por defecto `3`).
- `ALLOWLIST` — lista separada por comas de `schema.proc` permitidos (si se configura limita los procedimientos ejecutables).
- `WORKER_ID` — identificador del worker (si no se proporciona se genera uno automático).

## Seguridad y buenas prácticas

- Validación de nombres de esquema/procedimiento para evitar inyecciones: el worker valida `ProcedureSchema` y `ProcedureName` contra un patrón seguro.
- Uso de allowlist: si se requiere control estricto, configurar `ALLOWLIST` para enumerar procedimientos autorizados.
- Registrar errores y resultados: el worker reporta fallos detallados via `reportProc`.
