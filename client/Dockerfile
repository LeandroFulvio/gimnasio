# Usar imagen oficial de Node.js
FROM node:23-alpine AS build

# Definir el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar solo los archivos esenciales para instalar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación con Vite
RUN npm run build

# Usa una imagen de nginx para contener la aplicacion compilada
FROM nginx:alpine

# Copiar los archivos compilados a la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto para servir la aplicación
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
