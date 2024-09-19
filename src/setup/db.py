import psycopg2
from config import load_config

def run_commands():
    commands = ["SELECT * FROM category"]
    try:
        config = load_config()
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                # execute the CREATE TABLE statement
                for command in commands:
                    cur.execute(command)
                    print(cur.fetchall())
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)

if __name__ == '__main__':
    run_commands()