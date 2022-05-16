# Translator 
## Description
- It is a simple translator based on historical data from mongodb, So you can upload your subtitles and get the translated version of them


## How you can use it as a client side
- Upload the subtitle text file
- You will got notified by an email with an attachment file contains the translated version
- 
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
- It will compare the subtitle input with the data stored from mongodb
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

## Tools
- Nodejs
- TypeScript
- MongoDB
- ExpressJs
- Jest

## Score similarity algorithm
- It's a simple algorithm which is based on find the similar sentence from mongodb using regex for example 
- stored sentence inside db is
  ```Hi , Welcome how are you```
and the input is ```welcome how are you```
so the database query will return this document
- next step check the similarity based on [Levenshtein distance algorithm](https://en.wikipedia.org/wiki/Levenshtein_distance)


## Near future improvements 
- Using NLP (deeplearning) algorithm instead of this simple one
- We can use [Atlas Search](https://www.mongodb.com/docs/atlas/atlas-search/atlas-search-overview/) for faster queries
- Caching for Most frequently used sentences 
- Use SendGrid for emails instead of nodemailer

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
yarn start
```
### Using docker
- Download Docker
- Set your env file
- type in your bash

  ```bash 
  docker-compose up -d
  ```

## Testing
- Write the following command 

    ```bash
    yarn test
    ```
