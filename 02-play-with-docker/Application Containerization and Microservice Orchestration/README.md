# Docker for Beginners - Linux

## Przygotowanie środowiska
**Polecenie:**
```bash
git clone https://github.com/ibnesayeed/linkextractor.git
cd linkextractor
git checkout demo

```
![ss-01](ss-01.png)

## Task 0
### Basic Link Extractor Script
### Przełącza repo na wersję bez Dockera.
**Polecenie:**
```bash
git checkout step0
```
### Pokazuje strukturę katalogów i plików
**Polecenie:**
```bash
tree
```
### Wyświetla prosty skrypt Pythona do wyciągania linków
**Polecenie:**
```bash
cat linkextractor.py
```
### Próba uruchomienia skryptu jako programu (błąd uprawnień)
**Polecenie:**
```bash
./linkextractor.py http://example.com/
ls -l linkextractor.py

```
### Uruchamia skrypt interpreterem Python (błąd: brak bibliotek)
**Polecenie:**
```bash
python3 linkextractor.py http://example.com/

```
![ss-02](ss-02.png)

## Task 1
### Przechodzi do wersji z Dockerfile.
**Polecenie:**
```bash
git checkout step1
```
**Polecenie:**
```bash
tree
```
**Polecenie:**
```bash
cat Dockerfile

```
![ss-03](ss-03.png)

### Buduje obraz Dockera 
**Polecenie:**
```bash
docker image build -t linkextractor:step1 .
```

![ss-04](ss-04.png)


**Polecenie:**
```bash
docker image ls

```
![ss-05](ss-05.png)

### Uruchamia kontener jednorazowo i usuwa go po zakończeniu
**Polecenie:**
```bash
docker container run -it --rm linkextractor:step1 http://example.com/

```
![ss-06](ss-06.png)

### Testuje skrypt na stronie z wieloma linkami

**Polecenie:**
```bash
docker container run -it --rm linkextractor:step1 https://training.play-with-docker.com/

```
![ss-07](ss-07.png)

## Task 2
### Pełne URL + tekst linków

**Polecenie:**
```bash
git checkout step2

cat linkextractor.py
```
![ss-08](ss-08.png)

### Budowanie nowego obrazu

**Polecenie:**
```bash
docker image build -t linkextractor:step2 .
```
![ss-09](ss-09.png)

**Polecenie:**
```bash
docker image ls
```
![ss-10](ss-10.png)

### Pokazuje współistniejące wersje obrazów

**Polecenie:**
```bash
docker container run -it --rm linkextractor:step2 https://training.play-with-docker.com/
```
![ss-11](ss-11.png)

### Potwierdza, że stara wersja nadal działa

**Polecenie:**
```bash
docker container run -it --rm linkextractor:step1 https://training.play-with-docker.com/

```
![ss-12](ss-12.png)

## Task 3

### API Service (Flask)

**Polecenie:**
```bash
git checkout step3
tree
```
![ss-13](ss-13.png)


**Polecenie:**
```bash
cat Dockerfile

```
![ss-14](ss-14.png)

### Dockerfile uruchamia teraz main.py (serwer Flask)

**Polecenie:**
```bash
cat main.py

```
![ss-15](ss-15.png)

### Buduje obraz API

**Polecenie:**
```bash
docker image build -t linkextractor:step3 .

```
**Polecenie:**
```bash
docker container run -d -p 5000:5000 --name=linkextractor linkextractor:step3

```
**Polecenie:**
```bash
docker container ls

```
**Polecenie:**
```bash
curl -i http://localhost:5000/api/http://example.com/

```
![ss-16](ss-16.png)

### Wyświetla logi serwera Flask 
**Polecenie:**
```bash
docker container logs linkextractor
```
![ss-17](ss-17.png)

### Zatrzymuje i usuwa kontener API
**Polecenie:**
```bash
docker container rm -f linkextractor
```
![ss-17](ss-17.png)


## Task 4 
### API + Web Frontend (PHP) + Docker Compose

**Polecenie:**
```bash
git checkout step4
tree
```
![ss-18](ss-18.png)


**Polecenie:**
```bash
cat docker-compose.yml
```

![ss-19](ss-19.png)

### Podmiana pliku strony  

**Polecenie:**
```bash
cat docker-compose.yml
cat www/index.php
docker-compose up -d --build

```
![ss-20](ss-20.png)

### Sprawdza działające serwisy
**Polecenie:**
```bash
curl -i http://localhost:5000/api/http://example.com/
```

![ss-21](ss-21.png)

![ss-22](ss-22.png)

## Task 5

### Redis Cache + self-contained images

**Polecenie:**
```bash
Redis Cache + self-contained images
```

**Polecenie:**

```bash
cat www/Dockerfile

```
**Polecenie:**

```bash
cat api/main.py

```
![ss-25](ss-25.png)

**Polecenie:**

```bash
docker-compose up -d --build

```
![ss-27](ss-27.png)

**Polecenie:**

```bash
sed -i 's/Link Extractor/Super Link Extractor/g' www/index.php

```
![ss-28](ss-28.png)
![ss-29](ss-29.png)

**Polecenie:**

```bash
git reset --hard
docker-compose down

```
![ss-28](ss-28.png)
![ss-29](ss-29.png)

## Task 6

### Zamiana API Python → Ruby

**Polecenie:**

```bash
git checkout step6
cat api/linkextractor.rb
cat docker-compose.yml
docker-compose up -d --build

```
![ss-31](ss-31.png)


**Polecenie:**

```bash
curl -i http://localhost:4567/api/http://example.com/

```
![ss-35](ss-35.png)

![ss-34](ss-34.png)

**Polecenie:**

```bash
docker-compose down
cat logs/extraction.log


```
![ss-36](ss-36.png)
