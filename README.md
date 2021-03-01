[![LinkedIn][linkedin-shield]][linkedin-url]

# Custom Select-Dropdown

Read the section **Important Notes** before checking out the [Live Demo]()

<br/>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#demo">Demo</a></li>
        <li><a href="#important-notes">Important Notes</a></li>
        <li><a href="#correct-json-format">Correct JSON Format</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
	    <li><a href="#props">Props</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a relatively simple select-dropdown component. The goal is to create a component like the select HTML component from scratch (without using the native component). This leads to different challenges like:

1. Handle the visibility of the menu containing the options to select
2. Handle the length of the dropdown based on its content
3. Handle the selection of the menu's options
4. Making the dropdown customizable for the developer
5. ecc.

### Demo

The live demo of this project can be found at [this link](https://www.google.com).

The demo will show a simple dashboard, to interact with the select-dropdown, and the component itself, in order to show how it reacts to the possible inputs that it receives in input.

### Important Notes

Two of the inputs to interact with the select-dropdown should be objects.
Being impossibile to insert an object just by using plain text, the user will have to insert a valid JSON. If an invalid JSON is inserted, the dropdown may be empty.
Make sure that the JSON inserted does not contain spaces (except for the values).

Example:

1. {"id":"10","location":"Location to show"} :white_check_mark:
2. { "id": "10", "location": "Location to show" } :x:

### Correct JSON Format

In the input to insert the default value, the following JSON object is accepted:

1. {"nameField1":"valueNameField1","nameField2":"valueNameField2", ...}

In the input to insert the list with options to select, the following JSON object is accepted: 2. [
{"nameField1":"valueNameField1","nameField2":"valueNameField2", ...},
{"nameField1":"valueNameField1","nameField2":"valueNameField2", ...},
...
]

### Built With

- [ReactJS](https://reactjs.org/)
- [HTML5](https://www.w3schools.com/html/)
- [CSS3](https://www.w3schools.com/css/)
- [Material-UI](https://material-ui.com/)

<!-- GETTING STARTED -->

## Getting Started

### Props

- selectDropdownOptionsProp :
  1.  Info => Array of objects which represents the list of options to select
  2.  Default Value => `[]`
- nameFieldToShow :
  1.  Info => Name of the field which contains the text to display in the menu options
  2.  Default Value => `undefined`
- defaultValue :
  1.  Info => Default value that the dropdown assumes (Example: "Choose option")
  2.  Default Value => `undefined`
- closeAfterSelection :
  1.  Info => If true the options menu will close once an option is selected by the user.
  2.  Default Value => `false`
- fontSizeValueRem :
  1.  Info => Numeric value of the font size expressed in rem
  2.  Default Value => `1.2`
- onChange :
  1.  Info => Function to call every time an option is selected
  2.  Default Value => `undefined`

### Prerequisites

Make sure to have installed NodeJS and npm or yarn on your machine:

- [Install NodeJS](https://nodejs.org/en/download/)
- [How to install NodeJS and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Install yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

### Installation

If you wanna play with this example on your machine, clone this git repo using the "git clone" command:

```sh
git clone url_repository
```

To install all the dependencies in order to make the app work, move in to the folder you've cloned (using the terminal) and execute the command:

- npm install
  **or**
- yarn install

Then start the application by running from terminal:

- npm start
  **or**
- yarn start

<!-- LICENSE -->

## License

Distributed under the MIT License.

<!-- CONTACT -->

## Contact

Simone Paglino - [LinkedIn profile](https://www.linkedin.com/in/simone-paglino/)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Pages](https://pages.github.com)

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=2867bd
[linkedin-url]: https://www.linkedin.com/in/simone-paglino/
