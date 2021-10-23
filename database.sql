CREATE DATABASE skatepark;

CREATE TABLE skaters (id SERIAL PRIMARY KEY, email VARCHAR(50) PRIMARY KEY, nombre VARCHAR(25) NOT NULL, password VARCHAR(100) NOT NULL, anos_experiencia INT NOT NULL, especialidad VARCHAR(50) NOT NULL, foto VARCHAR(255) NOT NULL, estado BOOLEAN NOT NULL);

INSERT INTO skaters (email,nombre,password,anos_experiencia,especialidad,foto,estado) VALUES ('admin@oz.cl','admin','$2b$10$iRvzJMSnEQ/6T/0q5kGQSO2h7yNLEOO6lMW6tSopwZcj7b72ZdXDq',10,'admin','/assets/images/participantes/admin.jpg',true);