## Prueba Zapping

Para correr el proyecto, sólo hay que usar el comando `docker compose up`, lo que crea contenedores para base de datos (postgres), backend (express js) y frontend (react). El [dockerfile de backend](backend/Dockerfile) descarga y descomprime los segmentos de video automaticamente.

Una vez creado, el frontend se encuentra en http://localhost:9000
