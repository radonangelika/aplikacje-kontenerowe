FROM python:3.12-slim

RUN useradd -m appuser

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py /app/
COPY wait-for-it.sh /app/

# chmod wewnątrz obrazu
RUN chmod +x /app/wait-for-it.sh

USER appuser

EXPOSE 5000

CMD ["python", "app.py"]
