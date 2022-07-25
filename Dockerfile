# get the base node image
FROM node:alpine as builder

# set the working dir for container
WORKDIR /home/frontend

# copy the json file first
COPY package.json /home/frontend

# install npm dependencies 
RUN yarn install

# copy other project files
COPY . /home/frontend

# build the folder
RUN npm run build

# Handle Nginx
FROM nginx
COPY --from=builder /home/frontend/build /usr/share/nginx/html
COPY default_nginx.conf /etc/nginx/conf.d/default.conf