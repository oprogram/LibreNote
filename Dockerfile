FROM node:16.7.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --production

# Bundle app source
COPY . .

RUN ["node", "src/create-commands.js"]
CMD ["node", "src/index.js"]