this is a vulnerable website created using react in frotend and php in backend
to start the frontend:
open terminal and change directory to the one you have this repos and enter this command:
npm start
#if you changed the default react port whis is 3000, you should change it back to 3000 because the backend "server.php" is sending this header :
header('Access-Control-Allow-Origin: http://localhost:3000')
#if you dont want to change the react default port change the server.php port to your react port
to start the backend:
open terminal and change directory to the one you have this repos and enter this commands:
cd backend
php -S localhost:3001
