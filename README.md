## Prueba Zapping

Para correr el proyecto, sólo hay que usar el comando `docker compose up`, lo que crea contenedores para base de datos (postgres), backend (rust) y frontend (react). El [dockerfile de backend](backend/Dockerfile) descarga y descomprime los segmentos de video automaticamente.

Una vez creado, el frontend se encuentra en http://localhost:9000

Mejoras posibles:

1. Hashing de contraseña (no se hizo para mantener la simplicidad).
2. Realizar alguna acción cuando el stream termina, para que el usuario tenga feedback.
3. Usar JWT u otra alternativa para manejar sesiones tanto en frontend como en backend
4. 
