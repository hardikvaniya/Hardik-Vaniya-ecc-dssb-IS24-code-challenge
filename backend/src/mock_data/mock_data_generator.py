import random
import json

# Define possible values for each field
product_ids = list(range(1, 41))  # Generate product IDs from 1 to 40
product_names = ["Product " + str(i) for i in product_ids]
owner_names = ["Owner " + str(i) for i in product_ids]
developer_names = ["NAME_" + str(i) for i in range(1, 6)]
scrum_master_names = ["Scrum Master " + str(i) for i in product_ids]
start_dates = ["2023/10/" + str(i) for i in range(1, 41)]
methodologies = ["Agile", "Scrum", "Kanban", "Waterfall", "DevOps"]
locations = ["Location " + str(i) for i in product_ids]

# Generate random JSON examples
json_examples = []

for _ in range(40):
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

# Define the file path to save the JSON data
file_path = "backend/src/mock_data/"
file_name = "products.json"
file_path += file_name

# Save the generated JSON data to the file
with open(file_path, "w") as json_file:
    json.dump(json_examples, json_file, indent=2)

print(f"Generated data saved to {file_path}")
