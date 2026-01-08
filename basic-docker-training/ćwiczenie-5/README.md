# Ćwiczenie 5 – Wolumeny

### Uruchamianie serwera

**Polecenie:**
```bash
docker run --rm -d --name apache -p 80:80 httpd:2.4
```
![ss-01](ss-01.png)

**Polecenie:**
```bash
curl localhost
```
![ss-02](ss-02.png)

**Polecenie:**
```bash
docker stop apache
docker run --rm -d --name apache -p 80:80 httpd:2.4
curl localhost
```

![ss-03](ss-03.png)
![ss-04](ss-04.png)


### Zarządzanie wolumenami
**Polecenie:**
```bash
docker volume ls
```
![ss-05](ss-05.png)


**Polecenie:**
```bash
docker volume create 25084volume
```
![ss-06](ss-06.png)

**Polecenie:**
```bash
docker volume rm 25084volume

```
![ss-07](ss-07.png)

**Polecenie:**
```bash
docker docker volume ls

```
![ss-08](ss-08.png)

### Montowanie wolumenów

**Polecenie:**
```bash
docker volume create httpd_htdocs
```
![ss-09](ss-09.png)

**Polecenie:**
```bash
ddocker run --rm -d --name apache -p 80:80 -v httpd_htdocs:/usr/local/apache2/htdocs/ httpd:2.4
```
![ss-10](ss-10.png)

**Polecenie:**
```bash
curl localhost
```
![ss-11](ss-11.png)


**Polecenie:**
```bash
docker stop apache
```
![ss-12](ss-12.png)


**Polecenie:**
```bash
ddocker run --rm -d --name apache -p 80:80 -v httpd_htdocs:/usr/local/apache2/htdocs/ httpd:2.4

curl localhost
```
![ss-15](ss-15.png)


**Polecenie:**
```bash
docker run --rm -d --name apache -p 80:80 -v C:\Users\radon\Desktop\kontenery-25084\basic-docker-training\ćwiczenie-5:/usr/local/apache2/htdocs/ httpd:2.4

curl localhost
```
![ss-15](ss-15.png)

### Porównanie z powyższym

**Polecenie:**
```bash
curl localhost
```
![ss-16](ss-16.png)