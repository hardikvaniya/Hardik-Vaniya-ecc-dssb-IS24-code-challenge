import random
import json
from datetime import datetime, timedelta

# Define possible values for each field
product_count = 40
product_ids = list(range(100000, 100000 + product_count))

# Generate product names
product_names = []
words = ["Tech", "Innovate", "Solutions", "Digital", "Code", "Engineering", "Hub", "Data", "Analytics", "Cloud", "AI", "App", "Mobile", "Web"]
for _ in range(product_count):
    product_name = random.choice(words) + " " + random.choice(words) + " " + random.choice(words)
    product_names.append(product_name)

# Generate two-word names for owner names, developer names, and scrum master names
name_words = ["John", "Jane", "Smith", "Doe", "Brown", "White", "Taylor", "Lee", "Williams", "Davis", "Wilson", "Johnson", "Clark", "Parker"]
owner_names = [random.choice(name_words) + " " + random.choice(name_words) for _ in range(product_count)]
developer_names = [random.choice(name_words) + " " + random.choice(name_words) for _ in range(1, 15)]
scrum_master_names = [random.choice(name_words) + " " + random.choice(name_words) for _ in range(product_count)]

# Define a list of 5 random URLs
urls = [
    "https://github.com/bcgov/BC-Policy-Framework-For-GitHub",
    "https://github.com/bcgov/design-system",
    "https://github.com/bcgov/api-guidelines",
    "https://github.com/bcgov/digital-principles",
    "https://github.com/bcgov/developer-portal"
]

# Generate random JSON examples
json_examples = []

# Define a date range for random start dates
start_date = datetime(2023, 10, 1)
end_date = datetime(2023, 11, 29)

for idx in range(product_count):
    random_start_date = start_date + timedelta(days=random.randint(0, (end_date - start_date).days))
    example = {
        "productId": product_ids[idx],
        "productName": random.choice(product_names),
        "productOwnerName": random.choice(owner_names),
        "developers": random.sample(developer_names, random.randint(1, 5)),
        "scrumMasterName": random.choice(scrum_master_names),
        "startDate": random_start_date.strftime("%Y-%m-%d"),  # Convert date to string in the desired format
        "methodology": random.choice(["Agile", "Waterfall"]),
        "location": random.choice(urls),  # Choose a random URL from the list
    }
    json_examples.append(example)

file_path = "backend/src/mock_data/"
file_name = "products.json"
file_path += file_name

# Save the generated JSON data to the file
with open(file_path, "w") as json_file:
    json.dump(json_examples, json_file, indent=2)

print(f"Generated data saved to {file_path}")
