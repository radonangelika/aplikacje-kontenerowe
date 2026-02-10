import os
import time
import psycopg2
from flask import Flask, jsonify

app = Flask(__name__)

DB_HOST = os.getenv("DB_HOST", "db")
DB_PORT = int(os.getenv("DB_PORT", "5432"))
DB_NAME = os.getenv("DB_NAME", "appdb")
DB_USER = os.getenv("DB_USER", "appuser")
DB_PASS = os.getenv("DB_PASS", "apppass")

def get_conn():
    return psycopg2.connect(
        host=DB_HOST, port=DB_PORT, dbname=DB_NAME, user=DB_USER, password=DB_PASS
    )

@app.get("/")
def home():
    return "OK - Flask + Postgres via docker compose\n"

@app.get("/health")
def health():
    return jsonify(status="healthy")

@app.get("/db")
def db_check():
    # prosta próba połączenia z DB
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT NOW();")
    now = cur.fetchone()[0]
    cur.close()
    conn.close()
    return jsonify(db_time=str(now))

@app.get("/init")
def init_db():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS visits (id SERIAL PRIMARY KEY, ts TIMESTAMP DEFAULT NOW());")
    cur.execute("INSERT INTO visits DEFAULT VALUES;")
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(message="table ensured + one row inserted")

@app.get("/visits")
def visits():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM visits;")
    count = cur.fetchone()[0]
    cur.close()
    conn.close()
    return jsonify(visits=count)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
