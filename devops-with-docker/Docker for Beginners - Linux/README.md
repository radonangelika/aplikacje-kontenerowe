# Docker for Beginners - Linux

## Task O - Prerequistes
### Klonowanie repozytorium
**Polecenie:**
```bash
git clone https://github.com/dockersamples/linux_tweet_app
```
![ss-01](ss-01.png)

## Task 1
### Uruchamia kontener z obrazu alpine i wykonuje w nim komendę hostname
**Polecenie:**
```bash
docker container run alpine hostname
```
![ss-02](ss-02.png)


### Sprawdzenie kontenerów
**Polecenie:**
```bash
docker container ls --all
```

![ss-03](ss-03.png)

### Startuje Ubuntu,--rm usuwa kontener po wyjściu
**Polecenie:**
```bash
docker container run --interactive --tty --rm ubuntu bash
```

![ss-04](ss-04.png)

### Listuje katalog główny w kontenerze. Pokazuje procesy działające w kontenerze.

**Polecenie:**
```bash
ls /
ps aux
cat /etc/issue
```
![ss-05](ss-05.png)

### Wyjście z bash
**Polecenie:**
```bash
exit
```
![ss-06](ss-06.png)

### Pokazuje wersję systemu hosta

**Polecenie:**
```bash
cat /etc/issue

```
![ss-07](ss-07.png)

### Uruchomienie kontenera MySQL w tle

**Polecenie:**
```bash
docker container run \
  --detach \
  --name mydb \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  mysql:latest

```
![ss-08](ss-08.png)

### Pokazuje uruchomione kontenery

**Polecenie:**
```bash
docker container ls
```
![ss-09](ss-09.png)

### Wyświetla logi kontenera MySQL
**Polecenie:**
```bash
docker container logs mydb
```
![ss-10](ss-10.png)

### Pokazuje procesy działające w kontenrze

**Polecenie:**
```bash
docker container top mydb
```
![ss-11](ss-11.png)

### Sprawdzenie wersji MySQL 

**Polecenie:**
```bash
docker exec -it mydb \
  mysql --user=root --password=$MYSQL_ROOT_PASSWORD --version
```
![ss-12](ss-12.png)

### Wejście do shella w działającym kontenerze

**Polecenie:**
```bash
docker exec -it mydb sh
mysql --user=root --password=$MYSQL_ROOT_PASSWORD --version
```
![ss-13](ss-13.png)


## Task 2 Task 2: Spakowanie i uruchomienie aplikacji

**Polecenie:**
```bash
cd ~/linux_tweet_app

cat Dockerfile
```
![ss-14](ss-14.png)

### Ustawienie DockerID w zmiennej

**Polecenie:**
```bash
export DOCKERID=angelikaradon
echo $DOCKERID

```
![ss-15](ss-15.png)

### Uruchomienie kontenera z NGINX i publikacja portu

**Polecenie:**
```bash
docker container run \
  --detach \
  --publish 80:80 \
  --name linux_tweet_app \
  $DOCKERID/linux_tweet_app:1.0
```
![ss-17](ss-17.png)

### Uruchomienie kontenera z NGINX i publikacja portu

**Polecenie:**
```bash
docker image build --tag $DOCKERID/linux_tweet_app:1.0 .
```
![ss-16](ss-16.png)

### Sprawdzenie

![ss-18](ss-18.png)

### Usunięcie działającego kontenera

**Polecenie:**
```bash
docker container rm --force linux_tweet_app
```
## Task 3

### Start aplikacji z bind mount 

**Polecenie:**
```bash
docker container run \
  --detach \
  --publish 80:80 \
  --name linux_tweet_app \
  --mount type=bind,source="$(pwd)",target=/usr/share/nginx/html \
  $DOCKERID/linux_tweet_app:1.0
```

![ss-19](ss-19.png)

### Podmiana pliku strony  

**Polecenie:**
```bash
cp index-new.html index.html

```
![ss-21](ss-21.png)

![ss-22](ss-22.png)

### Powrót do poprzedniej wersji 

**Polecenie:**
```bash
docker rm --force linux_tweet_app
```

**Polecenie:**

```bash
docker container run \
  --detach \
  --publish 80:80 \
  --name linux_tweet_app \
  $DOCKERID/linux_tweet_app:1.0
```
![ss-23](ss-23.png)

![ss-24](ss-24.png)

## Task 4 

### Budowa nowej wersji

**Polecenie:**

```bash
docker image build --tag $DOCKERID/linux_tweet_app:2.0 .
docker image ls

```
![ss-25](ss-25.png)

### Uruchomienie starej wersji równolegle na innym porcie

**Polecenie:**

```bash
docker container run \
  --detach \
  --publish 80:80 \
  --name linux_tweet_app \
  $DOCKERID/linux_tweet_app:2.0

```
**Polecenie:**

```bash
docker container run \
  --detach \
  --publish 8080:80 \
  --name old_linux_tweet_app \
  $DOCKERID/linux_tweet_app:1.0

```
![ss-27](ss-27.png)
![ss-26](ss-26.png)

## Task 5 

### Push obrazów do Docker Hub

**Polecenie:**
```bash
docker image ls -f reference="$DOCKERID/*"

```
**Polecenie:**
```bash
docker login

```
![ss-28](ss-28.png)

**Polecenie:**
```bash
docker image push $DOCKERID/linux_tweet_app:1.0
docker image push $DOCKERID/linux_tweet_app:2.0

```
![ss-29](ss-29.png)

### Sprawdzenie

![ss-30](ss-30.png)

