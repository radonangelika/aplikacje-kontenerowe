# Sekcja 3 – Wolumeny w praktyce + Docker Compose


## 1. Redmine + PostgreSQL + Adminer

### Uruchomienie

```bash
docker compose up -d
```
![ss-01](ss-01.png)

### Sprawdzenie wolumenów

```bash
docker container inspect db_redmine | grep -A 5 Mounts
docker volume ls
docker volume inspect material-applications_database
```
![ss-02](ss-02.png)
![ss-03](ss-03.png)
![ss-04](ss-04.png)

Wynik potwierdza, że baza używa wolumenu:

```bash
docker compose up
```
![ss-06](ss-06.png)

### Dostęp do aplikacji

- Redmine: http://localhost:9999  
- Adminer: http://localhost:8083  
![ss-07](ss-07.png)
![ss-08](ss-08.png)

Logowanie do Adminera:

- Server: db  
- User: postgres  
- Password: example  
- Database: postgres  
![ss-11](ss-11.png)

---

## 2. Ćwiczenie 2.6 – dodanie Postgresa do backendu
![ss-09](ss-09.png)

---

## 3. Ćwiczenie 2.7 – bind mount bazy
![ss-10](ss-10.png)


