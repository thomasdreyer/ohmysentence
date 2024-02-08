# OhMySentence

## Description
This project is a ReactJS application designed to facilitate the creation of sentences by selecting words from predefined word types. It interacts with an API to fetch word lists and submit constructed sentences.

## Features
- Select word types from a grid.
- Display words of the selected type in a grid.
- Add selected words to a sentence.
- Submit the constructed sentence to an API.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
```bash
cd <project_directory>
```
3. Install dependencies:
```bash
npm install
```
4. Usage
Start the development server:
```bash
npm start
```
Access the application in your web browser at http://localhost:3000.

## Components
#### App: Main container component managing application state and rendering child components.
#### TypeGridComponent: Displays a grid of word types fetched from the API.
#### WordGridComponent: Displays a grid of words based on the selected word type.
#### AddWord: Component for adding new words to the API.
