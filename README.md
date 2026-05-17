# tase.devlog

Blog personal/devlog minimalista, filesystem-first y self-hosted.

## Idea

- HTML, CSS y JavaScript puro.
- Entradas Markdown en `entries/`.
- Sin base de datos.
- Sin CMS.
- Sin panel admin.
- Docker + Nginx para servir archivos estaticos.

## Estructura

```txt
blog/
├── entries/        # posts markdown e index.json
├── public/         # frontend estatico
├── scripts/        # herramientas locales
├── Dockerfile
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

Como el navegador usa `fetch`, sirve la carpeta con un servidor local:

```sh
python3 -m http.server 8080
```

Abre `http://localhost:8080/public/` para probarlo sin Docker.

## Docker

```sh
docker compose up --build
```

El sitio queda disponible en `http://localhost:8080`.
