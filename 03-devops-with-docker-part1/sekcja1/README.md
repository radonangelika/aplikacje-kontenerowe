# Devops with Docker
## section 1

### Sprawdzenie instalacji Dockera, uruchomienie testowego obrazu 'hello word'
**Polecenie:**
```bash
docker container run hello-world
```
![ss-01](ss-01.png)

### Uruchomienie kontenera Ubuntu i instalacja narzędzi
**Polecenie:**
```bash
docker container run -it ubuntu sh -c "apt update && apt install -y curl && curl https://www.google.com"
```
![ss-02](ss-02.png)


### Wyświetlenie listy kontenerów
**Polecenie:**
```bash
docker container ls -a
```

![ss-03](ss-03.png)


### Usunięcie niepotrzebnego kontenera
**Polecenie:**
```bash
git clone https://github.com/dodocker container stop <ID_kontenera>
docker container rm <ID_kontenera>
```

![ss-04](ss-04.png)

### Pobranie obrazu Ubuntu
**Polecenie:**
```bash
docker image pull ubuntu
```

![ss-05](ss-05.png)

### Wyświetlenie listy obrazów

**Polecenie:**
```bash
docker image ls
```
![ss-06](ss-06.png)


![ss-07](ss-07.png)

