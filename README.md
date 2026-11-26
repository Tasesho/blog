# tase.devlog

Blog personal/devlog minimalista, filesystem-first y self-hosted.

> [!NOTE]
> Blog URL: [blog.tasedev.me](https://blog.tasedev.me)
>
> All entries are written manually by me and describe my own experiences. I use AI to check spelling, grammar, and vocabulary mistakes so the writing is easier for everyone to understand. Since I am not a Markdown expert, I also use AI to recommend where certain elements—such as tables and `NOTE`, `WARNING`, or `IMPORTANT` tags—could improve my essays.
>
> Thanks for your understanding.

## Idea

- HTML, CSS y JavaScript puro.
- Entradas Markdown en `entries/`.
- Sin base de datos.
- Sin CMS.
- Sin panel admin.
- Docker + Nginx para servir archivos estaticos.
- Un contador pequeno guarda las visitas en un volumen persistente de Docker.

## Estructura

```txt
blog/
├── entries/        # posts markdown e index.json
├── public/         # frontend estatico
├── scripts/        # herramientas locales
├── visitor-counter/ # servicio local para contar visitas
├── Dockerfile
├── Dockerfile.counter
├── nginx.conf
└── docker-compose.yml
```

## Crear una entrada

```sh
./scripts/new-entry.sh "titulo de la entrada"
```

El script crea un archivo en `entries/` y regenera `entries/index.json`.

Tambien puedes editar o crear archivos Markdown a mano y luego correr:

```sh
node scripts/build-index.js
```

## Desarrollo local

Para probar el sitio y el contador juntos, inicia ambos servicios con Docker:

```sh
docker compose up --build
```

Abre `http://localhost:8080`. El contador suma como maximo una visita por navegador cada 24 horas; el total se conserva en el volumen `visitor-data`.

## Docker

```sh
docker compose up --build
```

El sitio queda disponible en `http://localhost:8080`.
