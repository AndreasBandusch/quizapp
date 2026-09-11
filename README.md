# QuizApp

A four-category multiple-choice quiz (HTML, CSS, JavaScript, Bootstrap) — pick a category, answer four questions, see your score.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

---

## Features

- **Four quiz categories** — HTML, CSS, JavaScript, Bootstrap, four questions each, stored as plain data
- **Progress bar** and question counter (e.g. "2 / 4") while a quiz is running
- **Answer feedback** — correct/incorrect styling on the clicked button plus a matching sound effect
- **End screen** — final score with a cheer or consolation sound depending on the result, replay button
- **Legal pages** — Impressum and Datenschutz loaded as HTML fragments into an overlay (see *Architecture*)

---

## Tech Stack

| Technology | Notes |
|---|---|
| JavaScript (ES6, `async`/`await`) | No framework |
| HTML5 / CSS3 | Bootstrap-styled UI (CSS only, no JS plugins used) |

No `package.json`, no bundler, no build step — a plain static site, consistent with the other bootcamp-era projects (El Pollo Loco, Pokedex).

---

## Getting Started

The app fetches its legal-page fragments (`includes/impressum.html`, `includes/datenschutz.html`) at runtime, which browsers block under the `file://` origin — **serving it locally is required**, unlike the pure-canvas or pure-DOM bootcamp projects:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

---

## Architecture

### Quiz data and state

All questions live in `scripts/data.js` as a `games` array — one object per category, each holding four `{question, answer-1..4, right-answer}` objects. Three module-level variables (`activeGame`, `currentQuestion`, `rightAnswers`) track where the player is; there's no class or state object, `init()` is called from every navigation point in the HTML (`onclick="init(1, 0, false, false)"` for "start CSS quiz", etc.) with the target game/question baked into the call itself.

### HTML includes

`html-include.js` implements a small `w3-include-html` pattern: any element with that attribute gets its content replaced by the result of `fetch()`-ing the referenced file. The Impressum and Datenschutz pages use this to reuse the same markup fragment from `includes/` inside an overlay, rather than being separate HTML pages — the reason the app needs to run from a server instead of being opened directly.

### Scoring

`checkAnswer()` compares the clicked answer's number against `right-answer` from the data, increments `rightAnswers` on a match, and immediately disables all four answer buttons so a second click can't change the outcome. The end screen picks between two different sound cues based on whether the final score clears an internal threshold in `showEndScreen()`.

---

## Project Structure

```
quizapp/
├── index.html
├── includes/
│   ├── impressum.html        # Loaded into an overlay via fetch()
│   └── datenschutz.html
├── scripts/
│   ├── data.js                # Quiz content: categories and questions
│   ├── script.js               # Game state, rendering, scoring
│   └── html-include.js         # Fragment-include helper
├── styles/
│   ├── style.css
│   └── fonts.css
├── fonts/                      # Self-hosted webfonts
├── img/                        # Logo, favicon set, result graphics
└── sounds/                     # Correct/incorrect/end-of-game audio cues
```

## Status

Completed bootcamp project from the Developer Akademie, not under further active development. `robots.txt` disallows crawling `/includes/` (the legal-page fragments aren't meant to be indexed as standalone pages), the rest of the site has no crawl restriction.

## Author

**Andreas Bandusch**
