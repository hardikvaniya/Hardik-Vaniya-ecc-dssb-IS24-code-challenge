import random
import json

# Define possible values for each field
product_count = 40
product_ids = list(range(100000, 100000 + product_count))  # Generate product IDs from 1 to 40

# Generate product names
product_names = []
words = ["Tech", "Innovate", "Solutions", "Digital", "Code", "Engineering", "Hub", "Data", "Analytics", "Cloud", "AI", "App", "Mobile", "Web"]
for _ in range(product_count):
    product_name = random.choice(words) + " " + random.choice(words) + " " + random.choice(words)
    product_names.append(product_name)

owner_names = ["Owner " + str(i) for i in product_ids]
developer_names = ["NAME_" + str(i) for i in range(1, 15)]
scrum_master_names = ["Scrum Master " + str(i) for i in product_ids]
start_dates = ["2023/10/" + str(i) for i in range(1, 41)]
methodologies = ["Agile", "Waterfall"]
locations = ["Location " + str(i) for i in product_ids]

# Generate random JSON examples
json_examples = []

for _ in range(product_count):
    example = {
        "productId": random.choice(product_ids),
        "productName": random.choice(product_names),
        "productOwnerName": random.choice(owner_names),
        "Developers": random.sample(developer_names, random.randint(1, 5)),
        "scrumMasterName": random.choice(scrum_master_names),
        "startDate": random.choice(start_dates),
        "methodology": random.choice(methodologies),
        "location": random.choice(locations),
    }
    json_examples.append(example)

file_path = "backend/src/mock_data/"
file_name = "products.json"
file_path += file_name

# Save the generated JSON data to the file
with open(file_path, "w") as json_file:
    json.dump(json_examples, json_file, indent=2)

print(f"Generated data saved to {file_path}")
