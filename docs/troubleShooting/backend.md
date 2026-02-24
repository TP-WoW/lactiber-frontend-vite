# Problemas del Backend y API

Descripción breve:

Esta sección cubre errores y fallos entre el frontend y el backend: respuestas 4xx/5xx, timeouts, errores de serialización, auth y CORS.

Síntomas comunes y diagnóstico rápido:

- Respuestas 500 / 502 / 503 del API:
  - Revisar logs del servidor backend (stdout/stderr, systemd journal, contenedores `docker logs`).
  - Buscar stack traces, excepciones no controladas y OutOfMemory.
  - Comprobar dependencias externas (DB, servicios de terceros) en el momento del error.

- Errores 401 / 403 (autenticación / autorización):
  - Verificar tokens (JWT) expirados o firmas incorrectas.
  - Revisar configuración de middleware de auth en backend.
  - Validar la cabecera `Authorization` que envía el frontend.

- Errores CORS / bloqueos por política de seguridad:
  - Revisar las cabeceras `Access-Control-Allow-Origin` en las respuestas del backend.
  - En entornos de desarrollo, comprobar que el backend permite `https://localhost:5174` o el origen del frontend.

- Timeouts al llamar API (frontend ve errores de red o request fallido):
  - Revisar timeouts en el cliente HTTP del backend y en el fetch del frontend.
  - Comprobar latencia de dependencias (DB/servicios externos).

Comandos y lugares donde mirar:

- Contenedores Docker:

```bash
docker ps
docker logs <backend-container> --since "10m"
```

- Servidor systemd:

```bash
journalctl -u backend.service -f
```

- Prueba rápida del endpoint desde la máquina dev:

```bash
curl -v https://api.example.local/health
curl -v -H "Authorization: Bearer <token>" https://api.example.local/api/forms
```

Insights y soluciones comunes:

- 500 por excepción no controlada: añadir try/catch, devolver errores estructurados y mejorar logging con request id.
- 401 por token: sincronizar reloj del servidor (NTP), revisar expiración y refresco de tokens.
- CORS: en backend añadir origenes permitidos o configurar reverse-proxy que haga la cabecera.
- Timeouts: aumentar timeout transitorio y corrija la operación subyacente (índices DB, caching).

Registro y correlación:

- Añadir `X-Request-ID` en frontend y pasarlo al backend para correlación de logs.
- Registrar latencias en endpoints críticos para identificar degradaciones.
