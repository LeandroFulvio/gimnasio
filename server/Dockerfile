# Usar imagen oficial de Node.js
FROM node:23-alpine

# Definir el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar solo los archivos necesarios
COPY package.json package-lock.json ./

# Instalar dependencias - el flag production hace que no se instalen dependencias de dev
RUN npm install --production

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto del servidor
EXPOSE 5050

# Comando para correr la aplicación
CMD ["npm", "start"]
