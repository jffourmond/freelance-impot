FROM httpd:2.4

RUN apt-get update -y && apt-get install -y nodejs-legacy npm

RUN mkdir -p /docker/freelance-impot
COPY . /docker/freelance-impot/
WORKDIR /docker/freelance-impot

RUN npm install
RUN npm run build

# Copies the source code to Apache's default directory
COPY . /usr/local/apache2/htdocs