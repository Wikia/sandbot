FROM node:18.15.0

# Fetch fresh certificates to dated container
RUN curl -k https://letsencrypt.org/certs/isrgrootx1.pem.txt -o /usr/local/share/ca-certificates/isrgrootx1.crt
RUN curl -k https://letsencrypt.org/certs/letsencryptauthorityx1.pem.txt -o /usr/local/share/ca-certificates/letsencryptauthorityx1.crt
RUN curl -k https://letsencrypt.org/certs/letsencryptauthorityx2.pem.txt -o /usr/local/share/ca-certificates/letsencryptauthorityx2.crt
RUN curl -k https://letsencrypt.org/certs/lets-encrypt-x1-cross-signed.pem.txt -o /usr/local/share/ca-certificates/letsencryptx1.crt
RUN curl -k https://letsencrypt.org/certs/lets-encrypt-x2-cross-signed.pem.txt -o /usr/local/share/ca-certificates/letsencryptx2.crt
RUN curl -k https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem.txt -o /usr/local/share/ca-certificates/letsencryptx3.crt
RUN curl -k https://letsencrypt.org/certs/lets-encrypt-x4-cross-signed.pem.txt -o /usr/local/share/ca-certificates/letsencryptx4.crt

# Ignore old unwanted CA
RUN sed -i 's/mozilla\/DST_Root_CA_X3.crt/!mozilla\/DST_Root_CA_X3.crt/g' /etc/ca-certificates.conf

# Reconfigure
RUN update-ca-certificates

# Copy Sandbot code
COPY . /usr/sandbot

RUN chmod +x /usr/sandbot/entrypoint.sh
RUN chown -R sandbot:sandbot /usr/sandbot
USER node
WORKDIR /usr/sandbot/
RUN npm install

CMD [ "bash", "entrypoint.sh" ]

EXPOSE 80