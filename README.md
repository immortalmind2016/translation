# Lengoo Coding Challenge: Backend

Congratulations on making it to the coding challenge step of recruiting @ Lengoo!

You've already impressed our Recruiting partner, as well as one of our key Engineers. You are now at the most important part of the process, which is an opportunity to show us your coding skills. We can't wait to see what you have in store for us.


## How to approach this challenge

You'll find below a set of requirements. You are expected to deliver an implementation of those requirements using tools of your choice, with only a few constraints.

We will evaluate your submission as a whole. That means we'll pay attention to:

- Does your solution work?
- Did you follow the instructions?
- Is your code easy to understand and maintain?
- Have you documented your approach so that a reviewer can understand your thought process, choices and tradeoffs?

This is exactly how you can expect daily work at Lengoo to be.

A successful challenge will be reviewed together with you, and you'll have a chance to answer questions, elaborate on tradeoffs, and offer ideas of things that are missing but could have been done with more time.

### Timeline

This challenge can take as little as a few hours. Quantity does not equal quality. Please do give us a sample of what you can do, but there is no need to overdeliver. It's possible to deliver a pragmatic, tight solution that still showcases lots of technique and knowledge.

---

## Instructions
These are important. Please follow them carefully.

1. Clone this repo.
2. Create a new `development` branch.
3. Use commits liberally. We'd love to read through your progress. Good commit messages are valuable.
4. After finishing your work, create a Pull Request to the master branch. Please describe your approach, limitations, tradeoffs, running instructions, and anything that you would be interested in knowing if you were reviewing the code. This is extremely important.
5. Keep an eye on the Pull Request, as our team might ask you questions in the PR comments.


## Business requirements

You are asked to implement a Subtitles Translation service.

It takes one or more subtitle files as input, and returns files with the translated subtitles. The translation is performed by using historical data stored in a [Translation Management System (TMS)](https://en.wikipedia.org/wiki/Translation_management_system). Each translation is performed by going through the following steps:

1. Parses the subtitles file and extract the translatable source.
2. Translates the source using historical data.
3. Pairs the result with the source.
4. Reconstructs the subtitles file.

Below you can find an example of what a subtitles file looks like:

```
1 [00:00:12.00 - 00:01:20.00] I am Arwen - I've come to help you.
2 [00:03:55.00 - 00:04:20.00] Come back to the light.
3 [00:04:59.00 - 00:05:30.00] Nooo, my precious!!.
```

As you can see, a subtitle is defined by the id of the line, the time range, and then the content to be translated.

The output for this input would be a new file containing something like:

```
1 [00:00:12.00 - 00:01:20.00] Ich bin Arwen - Ich bin gekommen, um dir zu helfen.
2 [00:03:55.00 - 00:04:20.00] Komm zurück zum Licht.
3 [00:04:59.00 - 00:05:30.00] Nein, my Schatz!!.
```

The second part of the system is the aforementioned TMS. As its name states, it's a system that stores past translations so they can be reused. A TMS can be relatively straightforward: two endpoints, one for adding data, another for translating content.

A TMS translation happens according to this flow:

1. Search for strings that are **approximately** equal in the database — They might not be the same but close enough to be consider a translation.
2. It calculates the distance between the query and the closest string found. — A standard way of calculating strings distance is by using [Levenshtein distance algorithm](https://en.wikipedia.org/wiki/Levenshtein_distance).
3. If using Levenshtein, a distance of less than 5 is considered a translation.
4. If no translation is found, the TMS returns the input as a result.

For importing data, the following structure is used:

```json
[
  {
    "source": "Hello World",
    "target": "Hallo Welt",
		"sourceLanguage": "en",
		"targetLanguage": "de"
  },
  {
    "source": "Hello guys",
    "target": "Hallo Leute",
		"sourceLanguage": "en",
		"targetLanguage": "de"
  },
  {
    "source": "I walk to the supermarket",
    "target": "Ich gehe zum Supermarkt.",
		"sourceLanguage": "en",
		"targetLanguage": "de"
  }
]
```

Feel free to define the API contracts and the project structure on your own.


## Technical requirements

1. Create a REST API for uploading subtitles in a plain text format (.txt) and send an email with the translation as attachment once the process done.
2. Create the TMS either inside or outside the document translator (however you feel is the best way) with the two endpoints stated before.
3. The task could be developed with NodeJS(Javascript/TypeScript), Python, Java, PHP, Golang or C/C++.
4. All code as well as documentation or comments must be in English.
5. The code must run. You can assume the reviewer has the programming language and docker on their machine, but no databases or other runtimes.


### Evaluation criteria
These are how we evaluate coding challenges. Please refer back to the earlier part of this document for details.

1. Does the solution work
2. Is the code clean and understandable
3. Is the code tested
4. Is the solution well documented
5. Were all instructions followed

### Strech goals
These will count in your favour but are not required for success:

- Usage of Docker

---


Good luck!
