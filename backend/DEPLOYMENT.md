To update the frontend that express will serve:
ensure you are in /var/www/w8r/frontend:

sudo npm ci
sudo npm run build

move build folder to the backend sub-directory:
sudo cp -a build/ ../backend/build

ensure you are in /var/www/w8r/backend:

stop pm2 instance if it is running:
pm2 stop index.js

start your pm2 project:
pm2 start index.js

restart nginx:
sudo service nginx stop && sudo service nginx start
