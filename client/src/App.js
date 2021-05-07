import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function HomePage() {
  return (
    <body>
      <NavComp />
      <header>
        <h1>
          <u>Http:// Link Note Home</u>
        </h1>
      </header>
      <section>
        <h2>Users</h2>
        <p>
          Go to <a href="/links-client">Links Client</a> to see a link!
        </p>
        <p>
          Go to <a href="/link-submit">Link Submit Page</a> to submit a link!
        </p>
      </section>
      <section>
        <h2>Developers</h2>
        <p>
          Want to use the Link Note API? There's no API key - so have at it!
          Here are the endpoints:
        </p>
        <p>
          Endpoint One: <a href="/get-links">/get-links</a>
        </p>
        <p>
          Endpoint Two: <a href="/get-links?name=">/get-links?name=</a>
        </p>
      </section>
      <section>
        <h2>Administrators</h2>
        <p>
          Go to <a href="/admin-client">Admin Client</a> to see all the data!
        </p>
        <p>
          Check out the <a href="/error">404 page</a>
        </p>
        <p>
          Check out our <a href="/get-style">Style Sheet</a>
        </p>
        <p>
          Check out our <a href="/get-logo">Logo</a>
        </p>
      </section>
      <footer>
        <img src="get-logo" alt="Let me tell you some Jokes!" />
        <p>2021 John Zhang</p>
      </footer>
    </body>
  );
}

function AdminPage() {
  return (
    <body>
      <NavComp />
      <header>
        <h1>
          <u>Http:// Administrators</u>
        </h1>
      </header>
      <div id="content"></div>
      <section>
        <div id="linksContainer"></div>
      </section>
    </body>
  );
}

function LinksPage() {
  return (
    <body>
      <NavComp />
      <header>
        <h1>
          <u>Http:// Links</u>
        </h1>
      </header>
      <div id="content"></div>
      <section>
        <input id="nameField" type="text" />
        <p>
          <button id="getLinkBttn">Search Link</button>
        </p>
        <p>
          <button id="getRandomLinksBttn">Random Links</button>
        </p>
        <p>
          <button id="getLinksBttn">All Links</button>
        </p>
        <div id="linksContainer"></div>
      </section>
    </body>
  );
}

function SubmitPage() {
  return (
    <body>
      <NavComp />
      <header>
        <h1>
          <u>Http:// Link Sumbit</u>
        </h1>
      </header>
      <div id="content"></div>
      <section>
        <h2>Create Link</h2>
        <label for="nameField">Name: </label>
        <input id="nameField" type="text" />
        <label for="linkField">Link: </label>
        <input id="linkField" type="text" />
        <label for="noteField">Note: </label>
        <input id="noteField" type="text" />
        <label for="colorPicker">Color: </label>
        <input id="colorPicker" type="color" />
        <button id="btnSend">Add Link</button>
      </section>
    </body>
  );
}

function ErrorPage() {
  return (
    <body>
      <NavComp />
      <h1>404 - File Not Found!</h1>
      <p>
        Perhaps you are looking for <a href="/links-client">Links Client</a> or{" "}
        <a href="/link-submit">Link Submit Page</a>
      </p>
    </body>
  );
}

function NavComp(){
  return(
    <nav>
    <a class="navLinks" href="/home-client">
      Home
    </a>
    <br />
    <a class="navLinks" href="/link-submit">
      Submit
    </a>
    <br />
    <a class="navLinks" href="/links-client">
      Links
    </a>
    <br />
    <a class="navLinks" href="/admin-client">
      Admin
    </a>
  </nav>
  );
}

function App(props) {
  const [page, setPage]= useState("Home");

  switch ({page}) {
    case "Home":
      return <HomePage />;
      break;
    case "Submit":
      return <AdminPage />;
      break;
    case "Home":
      return <LinksPage />;
      break;
    case "Home":
      return <SubmitPage />;
      break;
    case "Home":
      return <ErrorPage />;
      break;
    default:
      return <HomePage />;
  }
}

export default App;
