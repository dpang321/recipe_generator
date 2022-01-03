import csv
import psycopg2

# csv file name
filename = '/Users/dennispang/Desktop/full_dataset.csv'

# initializing the titles and rows list and ingredients dict
fields = []
rows = []
ingredients = {}

# reading csv file
with open(filename, 'r') as csvfile:
    # creating a csv reader object
    csvreader = csv.reader(csvfile)

    # extracting field names through first row
    fields = next(csvreader)

    # extracting each data row one by one
    for row in csvreader:
        rows.append(row)

# reading each entry of csv
for row in rows:

    # Selecting the NER column
    ner_col = row[-1]

    # cleaning up the data
    disallowed_characters = "\"[]"
    for character in disallowed_characters:
        ner_col = ner_col.replace(character, "")

    # Spliting entries of NER up by delimiter
    nerList = ner_col.split(',')

    # Formatting data in NER
    for x in nerList:
        x = x.lstrip()

        # Counting occurrences of ingredient in NER, and adding to a global dict
        # We will insert this dict to our DB
        if x in ingredients:
            ingredients[x] += 1

        else:
            ingredients[x] = 1

# print(ingredients)
# print(len(ingredients))
# print("\n\n")

# for i in ingredients:
#     if ingredients[i] == 1:
#         del ingredients[i]

# Deleting ingredient from ingredients Dict if count <= 3
for key in [key for key in ingredients if ingredients[key] <= 3]:
    del ingredients[key]

# print(len(ingredients))

# Connecting to DB
conn = psycopg2.connect(
    "host=shelfchefdb.ce8xqxcjyt3m.us-west-1.rds.amazonaws.com dbname=shelfchefdb user=dpang321 password=password123 port=5432")
cur = conn.cursor()

# Creating our table
cur.execute("""
    CREATE TABLE ingredients
    (
        ingredient text,
        count integer,
        PRIMARY KEY (ingredient)
    )
""")

# Inserting each entry of our ingredients dict to the table on our db
for i in list(ingredients.items()):
    cur.execute("INSERT into ingredients(ingredient, count) VALUES (%s, %s)", i)

# Commit
conn.commit()

print("Done!\n")

# Close connections
cur.close()
conn.close()
