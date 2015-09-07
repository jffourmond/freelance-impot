# Se base sur une image Ubuntu 14.04
FROM ubuntu:14.04

# Met a jour les packages linux
RUN apt-get update

# Installe et configure Apache
RUN apt-get -y install apache2
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN mkdir /var/lock/apache2
env APACHE_RUN_USER    www-data
env APACHE_RUN_GROUP   www-data
ENV APACHE_PID_FILE /var/run/apache2.pid
ENV APACHE_RUN_DIR /var/run/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_LOG_DIR /var/log/apache2

# Installe Git, récupère les sources de l'appli et les copie dans le répertoire servi par Apache
RUN apt-get -y install git
RUN git clone https://github.com/jffourmond/freelance-impot.git
RUN cp -r freelance-impot/* /var/www/html

EXPOSE 80

# Lance Apache au démarrage du container
CMD ["/usr/sbin/apache2", "-DFOREGROUND"]
