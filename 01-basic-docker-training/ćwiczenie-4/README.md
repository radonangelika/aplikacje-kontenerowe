# Ćwiczenie 4 – Udostępnianie obrazów


### Logowanie do Docker Hub
Pobranie obrazu systemu Ubuntu w wersji 16.04 z DockerHub.

**Polecenie:**
```bash
docker login
```
![ss-01](ss-01.png)

### Szukanie obrazów
**Polecenie:**
```bash
docker search kafka
```
![ss-02](ss-02.png)

### Pobranie przykładowego obrazu
**Polecenie:**
```bash
docker pull apache/kafka
```
![ss-03](ss-03.png)

### Sprawdzenie lokalnych obrazów
**Polecenie:**
```bash
docker images
```
![ss-04](ss-04.png)

###  Usunięcie tagu obrazu ping
**Polecenie:**
```bash
docker rmi radon/ping

```
![ss-05](ss-05.png)

### Tagowanie obrazu własnym Docker ID i wysłanie obrazu do Docker Hub
**Polecenie:**
```bash
docker tag 805af1117805 angelikaradon/ping:1.0
docker push angelikaradon/ping:1.0

```
![ss-05](ss-06.png)



