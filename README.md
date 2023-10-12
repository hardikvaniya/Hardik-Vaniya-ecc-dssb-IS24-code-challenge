# BC Task
During development, I used below tools
```
node version@v18.18.0
yarn@1.22.19
```

# To start service
## Step 1: Clone repository
```
git clone https://github.com/hardikvaniya/Hardik-Vaniya-ecc-dssb-IS24-code-challenge.git
```

Or alternative you can download zip file from github and unzip it.

## Step 2: Start backend service
In Terminal 1 execute below commands to start backend service
```
cd Hardik-Vaniya-ecc-dssb-IS24-code-challenge/backend

# Install depedency
yarn install

# Start backend service
yarn start
```
It would start backend instance at http://localhost:5000. To access swagger documentation head to http://localhost:5000/api-docs

## Step 3: Start frontend service
In Terminal 2 execute below commands to start frontend service
```
cd Hardik-Vaniya-ecc-dssb-IS24-code-challenge/frontend

# Install depedency
yarn install

# Start backend service
yarn start
```
It would start backend instance at http://localhost:3000. 

# Swagger documentation
1. Once backend service is running, swagger documentation can be accessed from http://localhost:5000/api-docs

# Design and implementation notes
1. Why frontend and backend are in two different directories ?
    - To allow API processing at backend side, and if required in the future, it will be easy separate codebase of frontend and backend
2. mock_data_generate.py (backend/src/mock_data/mock_data_generator.py)
    - This file is aimed to generate mocked_data
3. AddProductForm component uses material UI to showcase compotency in modern framework. On other hand, opted to use generic HTML elements in Grid Component. Ideally, in real-life project consistence approach should be followed across project.
4. Due to time constraint, haven't been able to add confirmation before deleting product. Ideally, there should be confirmation before deleting the product.
