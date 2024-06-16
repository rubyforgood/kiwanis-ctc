<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://rubyforgood.github.io/kiwanis-ctc/">
    <img src="src/images/logo.svg" alt="Logo">
  </a>


</div>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#react-style-guide">React Style Guide</a></li>
    <li><a href="#commit-style-guide">Commit Style Guide</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This application enables the Arlington chapter of Kiwanis International to easily track orders for their annual blueberry fundraising drive.

### Built With

This section entails the technologies we have used thus far in our project.

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.Js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

<!-- GETTING STARTED -->

## Getting Started

We recommend downloading [Visual Studio Code](https://code.visualstudio.com/download) as it has helpful extensions as suggested below. Also, if on Windows, please ensure you have a command line program like [Git Bash Terminal](https://git-scm.com/downloads).

Some helpful extensions on VS Code:

- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css)
- [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
- [Typescript React code snippets](https://marketplace.visualstudio.com/items?itemName=infeng.vscode-react-typescript)
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)

### Prerequisites

Start by checking the version of Node installed on your device by running the following command:

```bash
npm -v
```

If the npm command is not recognized, please install the latest version of [Node.js](https://nodejs.org/en/download/).

### Installation

1. After you have cloned the git repository and ensured npm and node.js is installed, to install all necessary node modules, please type:

```bash
npm i
```

2. To start the local server, please run this command:

```bash
npm start
```

**_Note:_**

After running this command, the following link should open in your default browser:

```
http://localhost:3000
```

If you have issues with the linter, please run:

```bash
npx eslint --fix .
```

## React Style Guide 
* [This style guide](https://css-tricks.com/react-code-style-guide/) provides a good baseline for writing readable React code. Please ensure that your code follows these conventions.
* Prefer the use of function components over class components as they also improve readability

## Commit Style Guide
* Follow [semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) when writing your commits
* Branch names should be in the format `jdoe/name-of-feature` where `jdoe` is in the format first initial, last name. Use dashes (`-`) to separate words

