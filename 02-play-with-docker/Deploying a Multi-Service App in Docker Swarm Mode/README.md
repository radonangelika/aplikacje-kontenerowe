# Deploying a Multi-Service App in Docker Swarm Mode

## Task 1
### Terminal 1
**Polecenie:**
```bash
docker swarm init --advertise-addr $(hostname -i)


```
![ss-01](ss-01.png)

## Terminal 2
**Polecenie:**
```bash
docker swarm join --token SWMTKN-1-41lfo5fanyk8pm8ikgo7pbjj5lod5om9laz05vbqbdd9wwyfgt-0sfgqj6gd105219sz5en8b4ci 192.168.0.19:2377

```
![ss-02](ss-02.png)

## Task 2
## Terminal 1
### Sprawdzenie członków Swarm 
**Polecenie:**
```bash
docker node ls
```

![ss-03](ss-03.png)

## Task 3
### Pobieranie kod Voting App
**Polecenie:**
```bash
git clone https://github.com/docker/example-voting-app
```

![ss-04](ss-04.png)

## Task 4 
### Wdróż stack (deploy aplikacji w Swarm)**Polecenie:**
```bash
docker stack deploy --compose-file=docker-stack.yml voting_stack
```

![ss-05](ss-05.png)

## Task 5
### Sprawdź, czy stack działa

**Polecenie:**
```bash
docker stack ls

```
![ss-06](ss-06.png)


![ss-07](ss-07.png)

## Task 6

### Sprawdź rozmieszczenie replik (tasks) serwisu vote
**Polecenie:**
```bash
docker service ps voting_stack_vote

```
![ss-07](ss-07.png)

### Sprawdzenie

![ss-08](ss-08.png)
