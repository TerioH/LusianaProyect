# Sistema de Ventas - Lusiana Store

## Tecnologías

- Java 21
- Spring Boot
- MySQL
- HTML
- CSS
- JavaScript
- Bootstrap 5

## Requisitos

- JDK 21
- Maven
- MySQL

## Configuración

1. Crear una base de datos en MySQL.
2. Importar el archivo:

```
database/sistema_ventas_uniformes.sql
```

3. Configurar el puerto en `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3307/sistema_ventas_uniformes
spring.datasource.username=root
spring.datasource.password=TU_PASSWORD
```

4. Ejecutar el backend:

```bash
mvn spring-boot:run
```

5. Abrir el frontend:

```
frontend/index.html
```

## Usuario de prueba

- Usuario: `admin`
- Contraseña: `1234`