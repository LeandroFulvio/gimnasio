# Gimnasio App

Aplicación de gimnasio desarrollada como parte del curso Programación III en INSPT - Informática Aplicada.

## Autor

Leandro Fulvio

## Profesor

Gaston Larriera

## Tecnologías utilizadas

- **MongoDB**: Base de datos de documentos NoSQL.
- **Express.js**: Framework para el backend en Node.js.
- **React.js con Vite**: Biblioteca para el frontend interactivo.
- **Node.js**: Entorno de ejecución de JavaScript en el servidor.
- **Docker**: Para contenerizar la aplicación y su base de datos local.

## Requisitos previos

Tener instalados los siguientes programas antes de ejecutar el proyecto:

- [Node.js](https://nodejs.org/) (versión recomendada: 23.x o superior)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) para manejar contenedores.

## Instalación y configuración

### 1. Clonar el repositorio

```sh
git clone https://github.com/LeandroFulvio/gimnasio.git
cd gimnasio
```

### 2. Configurar las variables de entorno

Crea un archivo `.env` en la carpeta `server` y define las variables necesarias como:

```env
PORT=5050
MONGO_URI=mongodb://root:root@localhost:27017/gimnasio?authSource=admin
JWT_SECRET=tu_secreto
```

Asegúrate de que `MONGO_URI` apunte a `localhost` para que el servidor se conecte a la instancia de MongoDB que se ejecutará en Docker.

## Entorno de desarrollo

En el entorno de desarrollo, levantaremos solo el servicio de MongoDB utilizando Docker Compose y ejecutaremos el servidor y el cliente en modo desarrollo localmente.

### 1. Levantar solo MongoDB con Docker Compose

Desde la raíz del proyecto:

```sh
docker-compose up -d mongo
```

Este comando iniciará el contenedor de MongoDB en segundo plano.

### 2. Instalar dependencias y ejecutar el servidor y el cliente en modo desarrollo

#### Servidor

Desde la carpeta `server`:

1. Instala las dependencias:

   ```sh
   npm install
   ```

2. Inicia el servidor en modo desarrollo:

   ```sh
   npm run dev
   ```

   El servidor estará disponible en `http://localhost:5050`.

#### Cliente

Desde la carpeta `client`:

1. Instala las dependencias:

   ```sh
   npm install
   ```

2. Inicia la aplicación React con Vite en modo desarrollo:

   ```sh
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`.

## Despliegue completo con Docker Compose

Para levantar toda la aplicación, incluyendo el cliente, el servidor y MongoDB, utilizando Docker Compose, sigue estos pasos:

### 1. Construir y ejecutar los contenedores

Desde la raíz del proyecto, ejecuta:

```sh
docker-compose up --build
```

Este comando construirá las imágenes necesarias y levantará los servicios definidos en el archivo `docker-compose.yml`.

### 2. Acceder a la aplicación

- **Cliente**: Disponible en `http://localhost:80`.
- **Servidor**: Disponible en `http://localhost:5050`.

## Otros comandos utiles docker

`docker images`: Lista todas las imágenes de Docker disponibles en el sistema.

`docker ps`: Muestra los contenedores en ejecución actualmente. Al agregar la opción `-a`, muestra todos los contenedores, tanto activos como detenidos.

`docker run`: Crea y ejecuta un nuevo contenedor a partir de una imagen especificada.

`docker stop`: Detiene un contenedor en ejecución de manera ordenada.

`docker start`: Inicia un contenedor que ha sido previamente detenido.

`docker rm`: Elimina uno o más contenedores detenidos del sistema.

`docker rmi`: Elimina una o más imágenes de Docker del sistema.

`docker logs`: Muestra los registros de salida (logs) de un contenedor específico.

`docker exec`: Ejecuta un comando en un contenedor que está en ejecución.

`docker compose up`: Construye y levanta todos los servicios definidos en un archivo docker-compose.yml. si le agregamos la flag `-d` los servicios se levantan en modo detached, es decir no veremos logs en la terminal, y para detenerlos deberemos usar el siguiente comando. agregar la opcion `--build` hara que se regeneren las imagenes antes de crear los containers

`docker compose down`: Detiene los servicios definidos en un docker-compose.yml
`docker system prune`: Este comando elimina todos los contenedores detenidos, redes no utilizadas, imágenes sin etiquetas (dangling) y cachés de compilación para liberar espacio en disco. 

Para eliminar también todas las imágenes no utilizadas (no solo las dangling) y volúmenes no referenciados por ningún contenedor, puedes usar:

```bash
docker system prune -a --volumes
```
**Nota:** Utiliza este comando con precaución, ya que eliminará recursos que no estén en uso activo, lo que podría incluir datos que deseas conservar.

---