# Usar imagen oficial de Node.js
FROM node:23-alpine

# Definir el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar solo los archivos necesarios
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto del servidor
EXPOSE 5000

# Comando para correr la aplicación
CMD ["npm", "start"]
