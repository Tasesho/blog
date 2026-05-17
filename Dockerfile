FROM nginx:1.27-alpine

COPY public/ /usr/share/nginx/html/
COPY entries/ /usr/share/nginx/html/entries/

EXPOSE 80
