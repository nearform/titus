FROM nginx:stable-alpine

# Remove the default Nginx config and add ours
RUN rm -rf /etc/nginx/nginx.conf /etc/nginx/conf.d/*
COPY docker/etc/nginx.conf /etc/nginx/nginx.conf

# Copy the built static assets
COPY build /usr/share/nginx/titus

# Expose the server port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
