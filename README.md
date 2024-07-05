COMO FUNCIONA CADA RUTA : 


RUTAS DE USUARIOS: 
POST: http://localhost:3000/users
body: 
{
  "name": "Nombre del usuario",
  "lastname": "Apellido del usuario",
  "email": "correo@ejemplo.com",
  "password": "contraseña",
  "role": "student", 
  "nivel": "A1", 
}

POST: http://localhost:3000/login 
body: 
{
  "matricula": 202414, // Matrícula del usuario
  "password": "contraseña"
}

GET: http://localhost:3000/users
HEADERS: Authorization: Bearer <token>








RUTAS DE VIDEOS
GET /: Obtiene todos los videos almacenados.
GEThttp://localhost:3000/videos  

GET /:id: Obtiene un video específico por su ID, validando primero si el ID es válido y si el usuario tiene acceso al video.
GET http://localhost:3000/videos/6688104b65dcc52daa142fc4

POST /: Crea un nuevo video, subiendo un archivo de video y validando los datos antes de crearlo.
POST: http://localhost:3000/videos
title: "colocar titulo al video"
user: "colocar id de usuario"

selecciona un video a subir y colocamos "video" y listo. (si probamos el id de un teacher de mensaje saldra "acceso no autorizado")

PUT /:id: Actualiza un video existente por su ID, validando el ID y los datos antes de la actualización.
PUT http://localhost:3000/videos/66880b87a8014a2c4db29101
title "Nuevo titulo"
user:66858a30b766f2b1c7b14935 
video:  selecciona archivo de video nuevo send. 

DELETE /:id: Elimina un video por su ID, validando primero si el ID es válido y si el usuario tiene permisos para eliminarlo.
DELETE http://localhost:3000/videos/66880b87a8014a2c4db29101