# Despliegue de la aplicación

Este documento explica cómo desplegar la aplicación completa (FrontEnd, BackEnd Node.js) en contenedores Docker, comunicándose con una base de datos MSSQL Server 2022 instalada en el host cuyo nombre es `<application-host>` y con base de datos `TPFORMS`.

Resumen de componentes:

- FrontEnd: aplicación Vite/React (build estático servido por Nginx).
- BackEnd: Node.js (API) con conexión a MSSQL.
- Base de datos: Microsoft SQL Server 2022 instalada en el host `\<application-host\>` (no en contenedor).

Requisitos previos en el host `<application-host>`:

- Tener SQL Server 2022 corriendo y escuchando en el puerto TCP 1433.
- Habilitar autenticación SQL (modo mixto) y crear un usuario con permisos para la BD `TPFORMS`.
- Abrir el puerto 1433 en el firewall para los nodos que necesiten conectarse (si procede).
- Tener Docker y Docker Compose instalados en la máquina donde se alojarán los contenedores (puede ser el mismo host o un servidor distinto con conectividad a `<application-host>`).

1) Configuración de la base de datos (en el host)

- Crear la base `TPFORMS` si no existe.
- Crear un login SQL y un usuario para la BD:

```sql
CREATE LOGIN app_user WITH PASSWORD = 'P@ssw0rd!';
CREATE USER app_user FOR LOGIN app_user;
ALTER ROLE db_datareader ADD MEMBER app_user;
ALTER ROLE db_datawriter ADD MEMBER app_user;
```

- Revisar permisos y crear las tablas/migraciones necesarias (ver apartado de migraciones más abajo).

2) Estructura de ficheros (repositorio)

- `./frontend/` — código fuente del frontend (Vite).
- `./backend/` — código fuente del backend (Node.js, express/fastify, etc.).
- `docker-compose.yml` — orquestación (ejemplo más abajo).
- `.env.example` — variables de entorno necesarias.

3) Dockerfiles de ejemplo

Frontend (serve build con Nginx) — `./frontend/Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

BackEnd (Node.js) — `./backend/Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY backend/package*.json ./
RUN npm ci --production
COPY backend/ .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

4) `docker-compose.yml` de ejemplo

Este `docker-compose` crea dos servicios: `frontend` (Nginx) y `backend`. La base MSSQL está fuera de los contenedores y se conecta usando el host `<application-host>`.

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    container_name: lactiber-backend
    env_file: .env
    environment:
      - NODE_ENV=production
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
    ports:
      - '3000:3000'
    restart: unless-stopped
    networks:
      - app-network

  frontend:
    build: ./frontend
    container_name: lactiber-frontend
    ports:
      - '80:80'
    restart: unless-stopped
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

5) Variables de entorno (ejemplo `.env`)

```
DB_HOST=<application-host>
DB_PORT=1433
DB_NAME=TPFORMS
DB_USER=app_user
DB_PASSWORD=P@ssw0rd!

# Otros envs
API_PORT=3000
FRONTEND_PORT=80
```

6) Cadena de conexión desde el backend

Ejemplo para `tedious` o `mssql` (Node.js):

```js
const config = {
  server: process.env.DB_HOST, // '<application-host>'
  port: Number(process.env.DB_PORT) || 1433,
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }
  },
  options: {
    database: process.env.DB_NAME,
    encrypt: false, // ajustar según TLS
    trustServerCertificate: true,
  }
}
```

O con cadena clásica:

```
Server=<application-host>,1433;Database=TPFORMS;User Id=app_user;Password=P@ssw0rd!;TrustServerCertificate=True;
```

Notas importantes:

- Si los contenedores se ejecutan en una máquina distinta al host donde corre MSSQL, asegúrate de que `DB_HOST` sea resolvible y accesible desde el host del contenedor (p. ej. DNS, IP pública o VPN interna).
- En entornos Windows/WSL o Mac, para referirse al host desde un contenedor local, también se puede usar `host.docker.internal` (si el host tiene el servicio de base de datos). En producción, usa el nombre de host real o IP privada.

7) Migraciones y bootstrap de base de datos

- Ejecuta migraciones desde el contenedor `backend` (si tienes scripts):

```bash
docker-compose run --rm backend npm run migrate
```

- Alternativamente, mantener un contenedor de utilidades que ejecute scripts de inicialización.

8) Salud y monitoreo

- Añade `HEALTHCHECK` al `Dockerfile` del backend para comprobar `http://localhost:3000/health`.
- Exportar métricas (Prometheus) y logs (stdout) para recolección centralizada.

9) Backup y restore

- Programar backups de `TPFORMS` con `sqlcmd` o herramientas nativas y almacenarlos fuera del host (S3, NAS):

```bash
BACKUP DATABASE [TPFORMS] TO DISK = N'/var/backups/tpforms_full.bak' WITH FORMAT;
```

10) Seguridad y producción

- Nunca guardar contraseñas en texto en el repo; usar secretos del orquestador o un vault.
- Habilitar TLS entre el backend y MSSQL si se transmiten credenciales a través de redes no confiables.
- Limitar acceso al puerto 1433 por firewall y a la interfaz necesaria.

11) Pasos rápidos para desplegar

1. Editar `.env` con `DB_HOST=<application-host>` y credenciales seguras.
2. Construir y levantar los servicios:

```bash
docker-compose build
docker-compose up -d
```

3. Ejecutar migraciones:

```bash
docker-compose run --rm backend npm run migrate
```

4. Ver logs y comprobar endpoints:

```bash
docker-compose logs -f backend
curl http://localhost:3000/health
curl http://localhost/
```

---

Si quieres, genero también:

- Plantillas `Dockerfile` completas en `./frontend` y `./backend` dentro del repo.
- Un `docker-compose.override.yml` para entornos de desarrollo.
- Ejemplos de scripts de migración y backups.
