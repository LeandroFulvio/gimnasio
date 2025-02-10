# Usar imagen oficial de Node.js
FROM node:23-alpine

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

# Usar una imagen ligera para servir los archivos estáticos
FROM nginx:alpine

# Copiar los archivos construidos a la carpeta de Nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Exponer el puerto para servir la aplicación
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
