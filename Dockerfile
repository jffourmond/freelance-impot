FROM httpd:2.2

RUN apt-get update -y && apt-get install -y nodejs-legacy npm

RUN mkdir -p /docker/freelance-impot
COPY . /docker/freelance-impot/
WORKDIR /docker/freelance-impot

RUN npm install

RUN date > version.txt
RUN npm run build
RUN cp -R * /usr/local/apache2/htdocs
