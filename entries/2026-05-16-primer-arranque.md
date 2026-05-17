---
title: Primer arranque
date: 2026-05-16
description: Punto de partida del blog y sus decisiones tecnicas iniciales.
thumbnail: https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80
---

# Primer arranque

Este blog parte con una idea simple: escribir sin pelear contra una herramienta
grande. Un archivo Markdown por entrada, un frontend estatico y Docker para
servirlo desde mi propio servidor.

## Decisiones

- Los posts viven en `entries/`.
- El navegador carga un indice JSON y luego el Markdown.
- No hay base de datos.
- No hay panel admin.
- La escritura ocurre localmente, con scripts pequenos.

## Por que asi

La meta no es construir una plataforma. La meta es dejar rastro: comandos que
funcionaron, errores que costaron, notas de Linux, backend, Docker, homelab y
aprendizaje real.

```sh
./scripts/new-entry.sh "debugging nginx en docker"
./scripts/build-index.js
```

Si algo empieza a pedir demasiada arquitectura, probablemente todavia no es el
momento.
