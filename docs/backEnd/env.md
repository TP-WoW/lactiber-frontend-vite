# Variables de Entorno

Este documento describe las variables de entorno usadas por la aplicación. No contiene los valores actuales; solo describe propósito y formato esperado.

## Variables generales

- `PORT` — puerto en el que escucha la API (por defecto `3000`).
- `NODE_ENV` — entorno de ejecución (`development`, `production`, etc.).

## Conexión a SQL Server

- `SQL_USER` — usuario de la base de datos.
- `SQL_PASSWORD` — contraseña del usuario SQL.
- `SQL_SERVER` — host/servidor de SQL (puede incluir puerto si aplica).
- `SQL_DATABASE` — nombre de la base de datos.
- `SQL_ENCRYPT` — `true` o `false` (si la conexión debe usar TLS/SSL). Por defecto se normaliza a `false` salvo configuración.
- `SQL_POOL_MAX` — tamaño máximo del pool de conexiones (número entero, por defecto `10`).

## Worker / Planificador

- `POLLING_MS` — intervalo de sondeo en milisegundos entre ticks del worker (entero, por defecto `5000`).
- `BATCH_SIZE` — número máximo de triggers reclamables por tick (entero, por defecto `5`).
- `LEASE_SECONDS` — duración del lease en segundos al reclamar un trigger (entero, por defecto `120`).
- `CONCURRENCY` — cantidad de trabajos paralelos permitidos (entero, por defecto `3`).
- `JOB_TIMEOUT_MS` — timeout en milisegundos para la ejecución de un job (entero, por defecto `120000`).
- `ALLOWLIST` — lista separada por comas de entradas `Schema.ProcedureName` permitidas. Si se deja vacía, no se aplica allowlist.
- `WORKER_ID` — identificador opcional del worker; si no se define el worker genera uno (hostname + pid + sufijo aleatorio).

## Otros

- `POLLING_MS`, `BATCH_SIZE`, `LEASE_SECONDS`, `CONCURRENCY` y `JOB_TIMEOUT_MS` deben ser números válidos; si no se definen la aplicación usa valores por defecto en el código.
- Las variables se cargan mediante `dotenv` (archivo `.env` si existe), pero pueden definirse en el entorno del sistema o en la plataforma de despliegue.

### Recomendaciones

- Nunca subir archivos `.env` con secretos a repositorios públicos.
- Use mecanismos de gestión de secretos para entornos de producción (Azure Key Vault, AWS Secrets Manager, etc.).
