# Translator 
## Description
- It is a simple translator based on historical data from mongodb, So you can upload your subtitles and get the translated version of them


## Demo
[Heroku Link](https://mo-salah-lengoo-v1.herokuapp.com/api-docs/#/)

## How you can use it as a client side
- Upload the subtitle text file
- You will got notified by an email with an attachment file contains the translated version
  
## How it works
- Upload the subtitles text file
- Parses the text file data into an object with the follow shape
```typescript
{
  index: number;
  time: string;
  text: string;
}
```
- The parsed version will be the input for our score similarity algorithm 
- It will compare the subtitle input with the data stored from mongodb **NOTE: it will look at data with approved status only** 
- Then this function will return the following shape

```typescript
  message: string;
  index: number;
  time: string;
  similar: {
    data: {
        _id: string;
        text: string;
        defaultLanguage: Language;
        translations: {
            [k: string]: string;
        };
        createdAt: Date;
        updatedAt: Date;
    };
    score: number;
  }[];
```
- Next step this output will be an input for the `getTranslatedSubtitles` function to get a translated version in a suitable format
- Finally the email is being sent you the client

## Normal Flow
- Importing data **[Default Status is under_review]** or use the seed command 
- Approve these data with the backoffice change status URL 
```ts
POST /backoffice/:textTranslationId/status

BODY {
  status: APPROVED
} 
```
- Try the translate POST route

## Tools
- Nodejs
- TypeScript
- MongoDB
- ExpressJs
- Jest
- Mongodb in memory
- supertest

## Score similarity algorithm
- It's a simple algorithm which is based on find the similar sentence from mongodb using regex for example 
- stored sentence inside db is
  **Hi , Welcome how are you**
and the input is **welcome how are you**
so the database query will return this document
- next step check the similarity based on [Levenshtein distance algorithm](https://en.wikipedia.org/wiki/Levenshtein_distance)

## Limitation 
- the similarity score based on the whole sentence not every word
- In order to get the score we are not based on the context of the text
- If we have missed characters inside the sentence the db query will not return the similar sentences
  - example
  if the input is **Hi, Hello Wrld** and the stored translation text is **Hi, Hello World** So the db query will not return this stored translation text because we missed the **o** letter at input

## Near future improvements 
- Using NLP (deeplearning) algorithm instead of this simple one
- We can use [Atlas Search](https://www.mongodb.com/docs/atlas/atlas-search/atlas-search-overview/) for faster queries
  - If we decided to use this one we will not need to make our algorithm to check the score, the db will create it for us
- Add more test cases
- Use SendGrid for emails instead of nodemailer
- Caching for Most frequently used sentences 
- Don't wait the send email request to response to /translation request
- Authenticate/Authorize the access for the backoffice routes
- Logging
- Add CI/CD
- Linting
- More integration tests (and mocking)

## How to run the project
### Without Docker
- Download Nodejs
- Create Atlas MongoDB Cluster
- Set your env file
```bash
npm install -g yarn
```
```bash
yarn
```
```bash
yarn start:dev
```
```bash
yarn watch:dev
```
### Using docker
- Download Docker
- Set your env file
- type in your bash
  ```bash 
  docker-compose build 
  ```
  ```bash 
  docker-compose up -d
  ```

## Testing
- Write the following command 

    ```bash
    yarn test
    ```
## Data Seeding
- Write the following command to insert translations into the store without using the POST /import data

    ```bash
    yarn seed
    ```
## API Documentation
- Swagger UI
```GET /api-docs```


## Postman collection

[JSON Link](https://www.getpostman.com/collections/a6a60b853685f8f8785a)

## Diagrams 
### Translate flow
[translate flow](https://i.ibb.co/qRHJLZv/image.png)
<img src="https://i.ibb.co/qRHJLZv/image.png" alt="image" border="0">
### Import data flow
[import data flow](https://i.ibb.co/MNcTq7C/image.png)
<img src="https://i.ibb.co/MNcTq7C/image.png" alt="image" border="0">

### Approve translation data
[approve data flow](https://i.ibb.co/C0SqKZ9/image.png)
<img src="https://i.ibb.co/C0SqKZ9/image.png" alt="image" border="0">
