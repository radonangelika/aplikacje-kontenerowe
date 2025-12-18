# Ćwiczenie 2 – Zmiana obrazów

W tym ćwiczeniu pokazano, jak zmodyfikować istniejący obraz Dockera,
zainstalować dodatkowe narzędzie w kontenerze oraz zapisać zmiany jako nowy obraz.

---

## Przygotowanie środowiska

### Pobranie obrazu Ubuntu 16.04
Pobranie obrazu systemu Ubuntu w wersji 16.04 z DockerHub.

**Polecenie:**
```bash
docker pull ubuntu:16.04
```
![ss-01](/ss-01.png)

**Polecenie:**
```bash
ping google.com
```
![ss-02](ss-02.png)


**Polecenie:**
```bash
apt-get update
```
![ss-03](ss-03.png)

**Polecenie:**
```bash
apt-get install iputils-ping
```
![ss-04](ss-04.png)

**Polecenie:**
```bash
docker ps
```
**Polecenie:**
```bash
docker commit d21a2ed274a9 radon/ping:lates
```
**Polecenie:**
```bash
docker images
```
![ss-05](ss-05.png)


