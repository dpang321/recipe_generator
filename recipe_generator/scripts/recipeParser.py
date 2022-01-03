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
print(len(ingredients))
print("\n\n")

# Deleting ingredient from ingredients Dict if count <= 3
for key in [key for key in ingredients if ingredients[key] <= 500]:
    del ingredients[key]

print(len(ingredients))

for row in list(rows):
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
        if x not in ingredients:
            rows.remove(row)
            break

print(len(rows))
print("\n")

fields = ['id', 'title', 'ingredients', 'directions', 'link', 'source', 'NER']

with open('recipes_formatted.csv', 'w') as f:

    # using csv.writer method from CSV package
    write = csv.writer(f)

    write.writerow(fields)
    write.writerows(rows)

print("DONE\n")
