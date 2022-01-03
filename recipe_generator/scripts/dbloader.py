import csv
import psycopg2

# Connecting to DB
conn = psycopg2.connect(
    "host=shelfchefdb.ce8xqxcjyt3m.us-west-1.rds.amazonaws.com dbname=shelfchefdb user=dpang321 password=password123 port=5432")
cur = conn.cursor()

# Create Table in DB
cur.execute("""
    CREATE TABLE recipes
    (
        id integer,
        title text,
        ingredients jsonb,
        directions jsonb,
        link text,
        source text,
        NER jsonb
    )
""")

# Opening our csv data set
with open('/Users/dennispang/Desktop/data_test.csv', 'r') as f:
    next(f)  # Skip the header row.
    cur.copy_from(f, 'recipes_test3', sep=',')  # Copying in each entry of CSV

print("Done!\n")

# Commit
conn.commit()

# Close connections
cur.close()
conn.close()
