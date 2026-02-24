# Problemas de Red y SSL

Síntomas:

- Errores de conexión (ECONNREFUSED), TLS/SSL handshake failures.
- Navegador muestra aviso de certificado no seguro (self-signed).
- Requests dirigidas al host equivocado (DNS o proxy configurado mal).

Diagnóstico:

- Comprobar conectividad básica:

```bash
ping api.example.local
curl -v https://api.example.local/health
```

- Comprobar certificados TLS:

```bash
openssl s_client -connect api.example.local:443 -showcerts
```

- Revisar proxy / reverse-proxy (nginx, traefik) logs y configuración de cabeceras `X-Forwarded-*`.

Problemas comunes y soluciones:

- Certificado autofirmado en dev: aceptar temporalmente en navegador o añadir excepción. Para evitarlo, generar certificado trusted local (mkcert) o usar HTTP en dev.
- Proxy que no pasa `Host`/`X-Forwarded-Proto`: configurar correctamente en nginx/traefik para que backend construya URLs correctas.
- Load balancer devolviendo 502: revisar salud de instancias de backend y la configuración de health-check.

Insights operativos:

- Implementar health endpoints (`/health`) que revisen dependencias (DB, cola) y sean usados por el LB.
- Añadir métricas de latencia y disponibilidad (Prometheus/Grafana) para identificar degradaciones de red.
