# section 2

## Uruchomienie testowego kontenera

**Opis:**  
Sprawdzenie poprawności instalacji Dockera poprzez uruchomienie obrazu testowego.

```bash
docker container run hello-world
```
---
![ss-01](ss-01.png)

## Uruchomienie Ubuntu w trybie interaktywnym

**Opis:**  
Uruchomiono kontener z systemem Ubuntu i sprawdzono jego system plików.

```bash
docker run -it ubuntu
ls /
exit
```

---
![ss-02](ss-02.png)

## Uruchomienie kontenera działającego w tle – looper

**Opis:**  
Utworzono kontener o nazwie *looper*, który w nieskończonej pętli wypisuje aktualną datę. Wyświetlono listę aktualnie uruchomionych kontenerów.


```bash
docker run -d -it --name looper ubuntu sh -c "while true; do date; sleep 1; done"
docker container ls

```

---
![ss-03](ss-03.png)

---

## Podgląd logów kontenera

**Opis:**  
Wyświetlono strumień wyjścia programu działającego w kontenerze *looper*.

```bash
docker logs -f looper
```
---
![ss-04](ss-04.png)


## Wstrzymanie i wznowienie kontenera

**Opis:**  
Tymczasowo zatrzymano wykonywanie procesu w kontenerze, a następnie wznowiono jego działanie.

**Polecenie:**
docker pause looper
docker unpause looper


---
![ss-05](ss-05.png)
![ss-06](ss-06.png)

## Dołączenie do działającego kontenera

**Opis:**  
Podłączono terminal do procesu uruchomionego w kontenerze.

```bash
docker attach looper
docker ps -a
docker start looper
docker attach --no-stdin looper

```
---
![ss-07](ss-07.png)

##  Bez przerywania działania kontenera wykonano polecenie listujące pliki.

```bash
docker exec looper ls -la

```
---
![ss-08](ss-08.png)

##  Instalacja oprogramowania w Ubuntu. W nowym kontenerze zainstalowano edytor nano.

```bash
docker run -it ubuntu
apt-get update
apt-get install nano
```

---
![ss-09](ss-09.png)

## Interaktywny skrypt pobierający stronę WWW

```bash
docker run -it --name task2 ubuntu sh -c 'while true; do echo "Input website:"; read website; echo "Searching..."; sleep 1; curl http://$website; done'
```

---
![ss-10](ss-10.png)

## Uruchomienie gotowej aplikacji simple-web-service

```bash
docker run -d --name task devopsdockeruh/simple-web-service:ubuntu
```

---
![ss-11](ss-11.png)

## Wejście do kontenera i odczyt logów aplikacji

```bash
docker exec -it task bash
tail -f ./text.log
```

---
![ss-12](ss-12.png)
**Wynik:**  
W pliku cyklicznie pojawiał się komunikat:

Secret message is: 'You can find the source code here: https://github.com/docker-hy'

oraz znaczniki czasu generowane przez aplikację.