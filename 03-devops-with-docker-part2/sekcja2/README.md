# Devops with docker
## Sieci dockera
### ćw. 2.4
**Polecenia:**
```bash
docker compose up -d --build
```
![ss-01](ss-01.png)
![ss-02](ss-02.png)

**Skalowanie**
```bash
docker-compose -f docker-compose.whoami.yml up --scale whoami=3
docker-compose -f docker-compose.whoami.yml port --index 1 whoami 8000
docker-compose -f docker-compose.whoami.yml port --index 2 whoami 8000
docker-compose -f docker-compose.whoami.yml port --index 3 whoami 8000
```
![ss-12](ss-12.png)
![ss-11](ss-11.png)
![ss-08](ss-08.png)

**Polecenia:**
```bash
curl localhost:80
```
![ss-13](ss-13.png)

**Polecenie**
```bash
curl whoami.colasloth.com
```
![ss-09](ss-09.png)

## 2.5

**Uruchomiono obraz devopsdockeruh/simple-web-service z mapowaniem pliku logów do hosta. Aplikacja zapisuje dane do /usr/src/app/text.log, które są widoczne lokalnie**
**Polecenia:**
```bash
docker-compose up --scale compute=3
```
![ss-10](ss-10.png)

