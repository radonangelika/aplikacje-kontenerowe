# Exercise 1: Uruchamianie kontenerów

W tym ćwiczeniu poznajemy podstawy pobierania obrazów, uruchamiania, zatrzymywania oraz usuwania kontenerów Docker.

---

## Pobieranie obrazów (Pulling an image)

Aby uruchamiać kontenery, musimy najpierw pobrać obrazy.

### Sprawdzenie dostępnych obrazów lokalnie
Sprawdzamy, jakie obrazy znajdują się aktualnie na naszej maszynie, używając polecenia `docker images`.

![ss-01](./ćwiczenie-1/ss-01.png)

---

### Wyszukiwanie obrazów w DockerHub
Obrazy możemy wyszukiwać w DockerHub za pomocą polecenia `docker search`.

![ss-02](ss-02.png)

---

### Pobranie obrazu Ubuntu 22.04
Pobieramy obraz Ubuntu w wersji 22.04 z DockerHub.

![ss-03](ss-03.png)

---

### Pobranie obrazu Ubuntu 22.10
Pobieramy inną wersję tego samego obrazu – Ubuntu 22.10.

![ss-04](ss-04.png)

---

### Sprawdzenie obrazów po pobraniu
Ponownie sprawdzamy listę obrazów dostępnych lokalnie.

![ss-05](ss-05.png)

---

### Usunięcie niepotrzebnego obrazu
Usuwamy obraz Ubuntu 22.10, którego nie będziemy dalej używać.

![ss-06](ss-06.png)

---

### Sprawdzenie listy obrazów po usunięciu
Po usunięciu obrazu sprawdzamy ponownie listę dostępnych obrazów.

![ss-07](ss-07.png)

---

### Usunięcie wszystkich obrazów
Korzystamy ze skrótu do usunięcia wszystkich obrazów z systemu.

![ss-08](ss-08.png)

---

## Uruchamianie kontenerów (Running containers)

### Uruchomienie kontenera z poleceniem echo
Uruchamiamy kontener na bazie obrazu Ubuntu 22.04 i wykonujemy polecenie `echo`.

![ss-09](ss-09.png)

---

### Sprawdzenie uruchomionych kontenerów
Sprawdzamy aktualnie działające kontenery.

![ss-10](ss-10.png)

---

### Sprawdzenie wszystkich kontenerów (również zatrzymanych)
Wyświetlamy wszystkie kontenery, w tym zatrzymane.

![ss-11](ss-11.png)

---

### Uruchomienie kontenera z Bash (tryb nieinteraktywny)
Uruchamiamy kontener z poleceniem `/bin/bash` bez trybu interaktywnego.

![ss-12](ss-12.png)

---

### Sprawdzenie kontenerów po uruchomieniu Bash
Sprawdzamy stan kontenerów po wykonaniu polecenia.

![ss-13](ss-13.png)

---

### Uruchomienie kontenera w trybie interaktywnym
Uruchamiamy kontener z flagami `-it`, aby wejść do interaktywnej sesji Bash.

![ss-14](ss-14.png)

---

### Praca wewnątrz kontenera
Sprawdzamy aktualny katalog oraz zawartość systemu plików wewnątrz kontenera.

![ss-15](ss-15.png)

---

### Uruchomienie kontenera w tle (detached mode)
Uruchamiamy kontener w tle z poleceniem `sleep 3600`.

![ss-16](ss-16.png)

---

### Sprawdzenie działającego kontenera
Sprawdzamy, czy kontener działa w tle.

![ss-17](ss-17.png)

---

### Wejście do działającego kontenera (docker exec)
Dołączamy się do działającego kontenera za pomocą `docker exec`.

![ss-18](ss-18.png)

---

### Sprawdzenie procesów w kontenerze
Wyświetlamy listę procesów działających wewnątrz kontenera.

![ss-19](ss-19.png)

---

### Sprawdzenie kontenerów po wyjściu z exec
Sprawdzamy, czy kontener nadal działa po wyjściu z sesji Bash.

![ss-20](ss-20.png)

---

### Zatrzymanie kontenera
Zatrzymujemy działający kontener za pomocą polecenia `docker stop`.

![ss-21](ss-21.png)

---

### Sprawdzenie stanu kontenera po zatrzymaniu
Sprawdzamy stan kontenera po jego zatrzymaniu.

![ss-22](ss-22.png)

---

## Usuwanie kontenerów (Removing containers)

### Lista kontenerów przed usunięciem
Wyświetlamy listę wszystkich kontenerów przed ich usunięciem.

![ss-23](ss-23.png)

---

### Usunięcie kontenerów
Usuwamy zatrzymane kontenery przy użyciu polecenia `docker rm`.

---

### Automatyczne usuwanie kontenera (--rm)
Uruchamiamy kontener z flagą `--rm`, aby został automatycznie usunięty po zakończeniu działania.

