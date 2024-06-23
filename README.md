# TRABAJO FINAL BACKEND

## Descripción

Este proyecto es una aplicación web desarrollada para gestionar [describe brevemente la funcionalidad principal de tu aplicación]. La aplicación está dividida en un backend y un frontend.

## Tecnologías

- **Backend**: Java, Spring Boot
- **Frontend**: React, TypeScript, Vite
- **Base de datos**: PostgreSQL

## Requisitos

- Node.js (para el frontend)
- PostgreSQL
- Java (para el backend)

## Instalación y configuración

### Backend

1. Clona el repositorio:

   ```bash
   git clone https://github.com/ju4n-avendanoa/TORRES-MARDELYS_AVENDANO-JUAN.git
   cd TORRES-MARDELYS_AVENDANO-JUAN/backend

   ```

2. Configura la base de datos PostgreSQL. Asegúrate de tener PostgreSQL instalado y ejecutándose en el puerto por defecto (5432). Crea una base de datos y configura las credenciales en el archivo application.properties.

3. Crea un archivo application.properties en el directorio backend/src/main/resources y añade la siguiente configuración, reemplazando la información personal según sea necesario:

```
spring.application.name=clinica-dental
# Configuración de la base de datos PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/tu_base_de_datos
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.datasource.driver-class-name=org.postgresql.Driver

# Configuración de JPA y Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

4. Inicia el servidor backend:

```bash
./mvnw spring-boot:run
```

El servidor backend se ejecutará en http://localhost:3000.

### Frontend

1. Ve al directorio del frontend:

```bash
cd ../frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia la aplicación frontend:

```bash
npm run dev
```

La aplicación frontend se ejecutará en http://localhost:5173.
