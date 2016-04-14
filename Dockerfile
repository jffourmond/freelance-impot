FROM httpd:2.4

# Copies the source code to Apache's default directory
COPY . /usr/local/apache2/htdocs