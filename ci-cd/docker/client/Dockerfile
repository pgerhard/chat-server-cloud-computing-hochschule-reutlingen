FROM nginx:stable-alpine

LABEL maintainer="Arina.Markova@Student.Reutlingen-University.DE"
LABEL maintainer="philipp.gerhard@student.reutlingen-university.de"

ARG PROJECT_DIRECTORY

ENV BASE_URL="/"

RUN apk --no-cache add gettext

# expose port 8080
EXPOSE 80
EXPOSE 8080

# Execute the docker entrypoint script. This script will pass the content of the run command to the same shell and execute it as a command
ENTRYPOINT ["/docker-entrypoint.sh"]

# run nginx
CMD ["nginx", "-g", "daemon off;"]

# Copy the entry point script to the image
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy nginx configuration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copy artifact build from the 'build environment'
ADD $PROJECT_DIRECTORY /usr/share/nginx/html