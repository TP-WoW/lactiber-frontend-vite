# Problemas de Base de Datos

Síntomas frecuentes:

- Conexión rechazada / connection refused al intentar conectar desde backend.
- Timeouts de consultas o operaciones lentas.
- Deadlocks, bloqueos o hilos esperando locks.
- Errores de integridad (FK violations) o migraciones fallidas.

Diagnóstico inicial:

- Verificar estado del servicio de base de datos:

```bash
systemctl status postgresql
# o para MySQL
systemctl status mysql
```

- Conexión manual desde el servidor backend:

```bash
psql "host=DB_HOST user=DB_USER dbname=DB_NAME"
# o
mysql -h DB_HOST -u DB_USER -p DB_NAME
```

- Revisar logs de la base de datos (`/var/log/postgresql/` o `mysqld` logs) para errores de conexión, out-of-memory o límites de conexiones.

- Ejecutar EXPLAIN ANALYZE sobre consultas lentas para identificar índices faltantes.

Posibles causas y soluciones:

- Límite de conexiones alcanzado:
  - Incrementar `max_connections` o usar pool de conexiones (pgbouncer, pool en backend).
- Consultas sin índices => optimizar mediante índices o reescribir la consulta.
- Migraciones incompletas => revisar estado de migraciones y aplicar pendientes.
- Deadlocks => detectar con logs y rediseñar transacciones/orden de locks.

Checks rápidos:

```sql
-- PostgreSQL: ver conexiones activas
SELECT count(*) FROM pg_stat_activity WHERE state = 'active';

-- Ver consultas lentas (Postgres: pg_stat_statements)
SELECT query, total_time FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;
```

Insights operativos:

- Usar pooling para evitar spikes de conexiones.
- Monitorizar métricas: latencia, IOPS, CPU, número de conexiones.
- Establecer alertas cuando p99 de consultas supere umbrales.
