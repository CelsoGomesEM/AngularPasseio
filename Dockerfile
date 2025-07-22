FROM node:22-alpine AS build

WORKDIR /app

#copia os arquivos que possuem as dependcias do meu projeto angular para dentro da pasta app no docker
COPY ./package.json ./package-lock.json ./

#instala estes pacotes e cria a pasta node_modules na pasta app do docker
RUN npm install

#copia todos os arquivos da raiz onde esta o DockerFile e joga dentro para a pasta APP
COPY . .

#builda dentro do container nosso projeto
RUN npm run build --prod

#etapa 2: Rodar a Aplicação
FROM nginx:alpine

#Quando tem a instalação do nginx vai ter os arquivos HTML que ele vai ser o servidor, estamos deletando este arquivo
RUN rm -rf /usr/share/nginx/html/*

#Copiando meu projeto buildado para a pasta que vai servir nossa aplicação no nginx
COPY --from=build /app/dist/angular-passeio/browser /usr/share/nginx/html/

#Expoe a porta 80 que é a que o nginx usa por padrão
EXPOSE 80

#Starta o nginx dentro do container
ENTRYPOINT nginx -g 'daemon off;'
