# Deploying a Serverless Web Application on AWS

## Overview
This project demonstrates the deployment of a serverless web application using AWS services. The application is designed to manage student data, leveraging AWS S3, API Gateway, Lambda, DynamoDB, and CloudFront for a scalable, cost-effective, and secure solution.

## Why This is Important
Serverless architecture enables developers to build and deploy applications without managing underlying infrastructure. This approach provides:
- **Scalability**: Automatic scaling based on demand.
- **Cost Efficiency**: Pay only for the compute and storage used.
- **Security**: Managed services reduce attack surfaces and improve reliability.
- **Performance**: CloudFront caching and API Gateway integration enhance responsiveness.

## What We Learned
This project provided valuable insights into:
- **AWS Lambda**: Writing and deploying serverless functions to handle backend logic.
- **API Gateway**: Creating RESTful APIs and handling integrations with Lambda.
- **DynamoDB**: Storing and retrieving structured data efficiently.
- **S3 Hosting**: Hosting a static website with proper configurations.
- **CloudFront Security**: Implementing secure access through content delivery networks.
- **CORS Handling**: Understanding and resolving cross-origin issues in API calls.

## Technologies Used
- **AWS S3**: Hosting the frontend as a static website.
- **AWS API Gateway**: Handling API requests.
- **AWS Lambda**: Executing backend logic.
- **AWS DynamoDB**: Storing and retrieving student data.
- **AWS CloudFront**: Enhancing security and performance.

## Project Structure
The project is divided into three main parts:

### Part 1: Setting Up DynamoDB and Lambda Functions
1. Create a **DynamoDB table** (student data storage).
2. Develop two **Lambda functions**:
   - `get_student_data`: Retrieves student details from DynamoDB.
   - `insert_student_data`: Inserts new student records.
3. Configure IAM roles for Lambda to access DynamoDB.
4. Improved the code to return data in ascending order for better readability.

### Part 2: Configuring API Gateway and Hosting the Frontend
1. Set up an **API Gateway**:
   - Create `GET` and `POST` methods to trigger Lambda functions.
   - Deploy the API and obtain an invoke URL.
2. Develop a **static frontend**:
   - Create `index.html` and `scripts.js`.
   - Configure API endpoints within `scripts.js`.
3. Upload the frontend files to an **S3 bucket** and enable static web hosting.
4. Modify S3 bucket policies for public access.
5. **Resolved CORS Issue**:
   - API Gateway initially blocked frontend requests due to CORS restrictions.
   - Fixed by adding necessary CORS headers separately in **Method Response** and **Integration Response**:
     - **Method Response** ensures API Gateway correctly defines response headers.
     - **Integration Response** ensures the backend includes necessary CORS headers in the response.
   - Added headers:
     - `Access-Control-Allow-Origin`: `*`
     - `Access-Control-Allow-Methods`: `GET, POST, PUT, DELETE, OPTIONS`
     - `Access-Control-Allow-Headers`: `Content-Type, Authorization`
   - Explained that S3 CORS policy does not impact API Gateway requests.
   - Clarified why CORS headers must be added to responses rather than requests.

### Part 3: Securing with CloudFront
1. Set up **CloudFront** in front of the S3 bucket for HTTPS access.
2. Update S3 permissions to block direct public access.
3. Use CloudFront’s secure URL to access the application.

## Deployment Steps
1. **Create the DynamoDB Table**:
   - Define the table name (`student_data`).
   - Set `student_id` as the partition key.
   
2. **Create Lambda Functions**:
   - Use Python and the `boto3` library to interact with DynamoDB.
   - Deploy the functions and test with sample JSON inputs.

3. **Set Up API Gateway**:
   - Define REST API endpoints for `GET` and `POST` methods.
   - Integrate with Lambda functions.
   - Deploy and retrieve the invoke URL.

4. **Configure S3 Static Web Hosting**:
   - Upload the `index.html` and `scripts.js` files.
   - Enable public read access and note the website endpoint.

5. **Deploy CloudFront**:
   - Create a distribution pointing to the S3 bucket.
   - Update S3 policies to restrict direct access.
   - Use the CloudFront URL for secure access.

## Usage
1. Open the CloudFront-provided URL in a browser.
2. Add new student data using the provided form.
3. Retrieve all stored student records.

## Security Considerations
- Using CloudFront prevents direct access to S3 objects.
- API Gateway restricts access to Lambda functions.
- IAM roles ensure least-privilege permissions for AWS services.
- CORS properly configured to allow frontend access to the backend.

