FROM nginx:1.27-alpine

COPY public/ /usr/share/nginx/html/
COPY entries/ /usr/share/nginx/html/entries/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
