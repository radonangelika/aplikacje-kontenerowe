# section 2

## Uruchomienie testowego kontenera

**Opis:**  
Sprawdzenie poprawności instalacji Dockera poprzez uruchomienie obrazu testowego.

**Polecenie:**
docker container run hello-world


---
![ss-01](ss-01.png)

## Uruchomienie Ubuntu w trybie interaktywnym

**Opis:**  
Uruchomiono kontener z systemem Ubuntu i sprawdzono jego system plików.

**Polecenie:**
docker run -it ubuntu
ls /
exit


---
![ss-02](ss-02.png)

## Uruchomienie kontenera działającego w tle – looper

**Opis:**  
Utworzono kontener o nazwie *looper*, który w nieskończonej pętli wypisuje aktualną datę.

**Polecenie:**
docker run -d -it --name looper ubuntu sh -c "while true; do date; sleep 1; done"


---
![ss-03](ss-03.png)

## Sprawdzenie działających kontenerów

**Opis:**  
Wyświetlono listę aktualnie uruchomionych kontenerów.

**Polecenie:**
docker container ls


---
![ss-04](ss-04.png)

## Podgląd logów kontenera

**Opis:**  
Wyświetlono strumień wyjścia programu działającego w kontenerze *looper*.

**Polecenie:**
docker logs -f looper


---
![ss-05](ss-05.png)

## Wstrzymanie i wznowienie kontenera

**Opis:**  
Tymczasowo zatrzymano wykonywanie procesu w kontenerze, a następnie wznowiono jego działanie.

**Polecenie:**
docker pause looper
docker unpause looper


---
![ss-06](ss-06.png)

## Dołączenie do działającego kontenera

**Opis:**  
Podłączono terminal do procesu uruchomionego w kontenerze.

**Polecenie:**
docker attach looper


---
![ss-07](ss-07.png)

## Wyświetlenie wszystkich kontenerów

**Opis:**  
Sprawdzono również kontenery, które zakończyły działanie.

**Polecenie:**
docker ps -a


---
![ss-08](ss-08.png)

## Ponowne uruchomienie kontenera

**Opis:**  
Uruchomiono wcześniej zatrzymany kontener i ponownie podłączono się do jego wyjścia.

**Polecenie:**
docker start looper
docker attach --no-stdin looper


---
![ss-09](ss-09.png)

##  Wykonanie polecenia w działającym kontenerze

**Opis:**  
Bez przerywania działania kontenera wykonano polecenie listujące pliki.

**Polecenie:**
docker exec looper ls -la


---
![ss-10](ss-10.png)

##  Instalacja oprogramowania w Ubuntu

**Opis:**  
W nowym kontenerze zainstalowano edytor nano.

**Polecenie:**
docker run -it ubuntu
apt-get update
apt-get install nano


---
![ss-11](ss-11.png)

## Interaktywny skrypt pobierający stronę WWW

**Opis:**  
Utworzono kontener proszący użytkownika o adres strony, a następnie pobierający jej zawartość.

**Polecenie:**
docker run -it --name task2 ubuntu sh -c 'while true; do echo "Input website:"; read website; echo "Searching..."; sleep 1; curl http://$website; done'


---
![ss-12](ss-12.png)
