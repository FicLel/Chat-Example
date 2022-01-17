# PWA IMPORTANT

To run PWA version of the project you must use front directory, and run the following command

```npm build && cd dist && http-server && cd .. ```

This is because vue and webpack does not provides a default way to show on localhost the option for install a pwa application, and in the front-chat directory we have vite, and it needs luck to work as pwa.

# Run project


For both projects you shoud run the following commands:

- npm run install
- npm run dev


Back end will run on port 3005 and Front on 3002

For the front end, we have used Vue 3 and Vite as bundler in place of webpack.

Using scss and Bulma css for styles


# Indicaciones de clase

Partiendo del chat visto en clase: https://socket.io/get-started/chat, modificar el código para permitir las siguientes funcionalidades:  
-Enviar un mensaje a los usuarios conectados cuando alguien se conecta o se desconecta.  
-Entrar con nombre de usuario.   
-No enviar el mismo mensaje al usuario que lo envió.  
-Permitir mensajes a un usuario concreto.  
-Mostrar quién está en línea.  
-Modificar index.html. Crear un archivo para CSS, otro para JS siguiendo las buenas prácticas vistas en clase.  
-Hacer que la aplicación cliente sea PWA.  
-Hacer la aplicación cliente instalable.  
    
Fecha máxima para realizar push: 16/01/2022 23:59:59 a la rama /nombre.apellido   
