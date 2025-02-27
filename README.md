# Prosigliere Assessment

![Preview-Screens](https://raw.githubusercontent.com/bernalvinicius/prosigliere-assessment/refs/heads/main/public/image.png)

If you want to take a look at all the screens of the application, they are [here](https://prosigliere-assessment.vercel.app/?page=1&filter=All).

## Why?

This project is part of the selection process for [Prosigliere](https://www.prosigliere.com/). It involves developing a frontend application to render an API with characters from the Harry Potter movie using ReactJS. The application has the following features:

- Home Page
- Favorites Page
- Character Details Page

## Some Observations about this App

**1** - For this challenge, Material-UI was used, which brings all the features of Material Design to React projects. For specific styling, `emotion` was used. The layout sought to be as aesthetic as possible.

**2** - The application routes:

- Homepage: https://localhost:3000
- Character Details Page: https://localhost:3000/character/:id
- Favorites page: http://localhost:3000/favorites

## Functionalities

- Home Page:
  - On this page the user can add or remove a character as a favorite, navigate to the details page, select between All, Students and Staff, select the favorite house, which can be Gryffindor, Slytherin, Hufflepuff or Ravenclaw. In the Navbar it is also possible to navigate between the favorites page and the character list;
- Favorites Page:
  - The Card with the favorite characters is rendered, it is similar to the Home Page, but with fewer resources, if there are no favorites, the message "No Favorites Found" is shown to the user..
- Character Details Page:
  - On the home page, the user can select a character and is directed to the page to consult their characteristics in detail. At this point, the user can favorite or not their character. When it does this, a list is created in the local storage with this information.

## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment to run a React App, that can be found [here.](https://reactjs.org/docs/getting-started.html)

### Installing

**Cloning this repository**

```
$ https://github.com/bernalvinicius/prosigliere-assessment.git
$ cd prosigliere-assessment
```

**Installing Dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

**Running**

With all dependencies installed and the environment properly configured, you can now run the app:

```
$ npm run dev
```

The application will only work if the Node version is higher than 18.

## Contributing

Email-me: bernalvinicius@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/vin%C3%ADcius-de-arruda-bernal/)

Thank you!
