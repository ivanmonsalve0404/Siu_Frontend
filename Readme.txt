#*******************************************************************
1. Crear el proyecto

	npx create-react-app front_siu --template=typescript
#*******************************************************************
#*******************************************************************
2. Cargar los recursos_plantilla.zip en src
#*******************************************************************
#*******************************************************************
3. Definir la estructura de carpetas

	md src/app
	md src/assets

	md src/app/public
	md src/app/private
	md src/app/shared

	md src/assets/img
	md src/assets/css

	md src/models
	md src/services
	md src/routes
	md src/utilities

	md src/utilities/domains
	md src/utilities/functions
	md src/utilities/myHocks
#*******************************************************************
#*******************************************************************
4. Instalación de Librerias

	npm i bootstrap
	npm i @fortawesome/fontawesome-free

	npm i react-router-dom 
	npm i react-bootstrap 
	npm i react-toastify 
	npm i react-datetime 
	npm i sass

	npm i jssha
	npm i jwt-decode

#*******************************************************************
5. Cargar los css y js en el index.tsx

	import 'bootstrap/dist/css/bootstrap.min.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import 'react-toastify/dist/ReactToastify.css';
	import 'bootstrap/dist/js/bootstrap.bundle.js';

	import 'scss/volt.scss';

#*******************************************************************
6. Limpiar los index.css y App.tsx
#*******************************************************************
7. 
#*******************************************************************
8. Cargar el recurso 01_formulario sesion en el componente sesion
#*******************************************************************
#*******************************************************************