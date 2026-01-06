# Ćwiczenie 3 – Budowanie obrazów

Celem ćwiczenia było zbudowanie nowego obrazu Dockera na podstawie obrazu
`ubuntu:16.04` oraz dodanie do niego narzędzia `ping` przy użyciu pliku
Dockerfile.

---

## Przygotowanie środowiska

### Pobranie obrazu Ubuntu 16.04
Pobranie obrazu systemu Ubuntu w wersji 16.04 z DockerHub.

**Polecenie:**
```bash
docker pull ubuntu:16.04
```
![ss-01](ss-01.png)

### Sprawdzenie obrazów
**Polecenie:**
```bash
docker images
```
![ss-02](ss-02.png)

### Tworzenie pliku Dockerfile
**Polecenie:**
```bash
notepad Dockerfile
```
![ss-03](ss-03.png)

### Dodanie nagłówka do Dockerfile
**Polecenie:**
```bash
FROM ubuntu:16.04
LABEL author="David Elner"
RUN apt-get update
RUN apt-get install -y iputils-ping
```
![ss-03](ss-03.png)

###  Budowanie obrazu Dockera
**Polecenie:**
```bash
docker build -t radon/ping .
```
![ss-04](ss-04.png)

### Sprawdzenie obrazów
**Polecenie:**
```bash
docker images
```
![ss-05](ss-05.png)

### Optymalizacja obrazu
**Polecenie:**
```bash
RUN apt-get clean \
    && cd /var/lib/apt/lists && rm -fr *Release* *Sources* *Packages* \
    && truncate -s 0 /var/log/*log
```
![ss-06](ss-06.png)

### Brak poprawy
**Polecenie:**
```bash
docker images
```
![ss-07](ss-07.png)

### 2 Optymalizacja obrazu - poprawa
**Polecenie:**
```bash
docker images
```
![ss-08](ss-08.png)