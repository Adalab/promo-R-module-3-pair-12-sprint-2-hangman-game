import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// api
import getWordFromApi from "../services/api";
// styles
import "../styles/App.scss";
import "../styles/Dummy.scss";
import "../styles/Letters.scss";
import "../styles/Form.scss";
import "../styles/Header.scss";
import Header from "./Header";
import Dummy from "./Dummy";
import SolutionLetters from "./SolutionLetters";
import ErrorLetters from "./ErrorLetters";
import Form from "./Form";
import Footer from "./Footer";
import Instructions from "./Instructions";
import Options from "./Options";

function App() {
  const [word, setWord] = useState("");
  const [userLetters, setUserLetters] = useState([]);

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
  }, []);

  // events

  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  return (
    <div className="page">
      <Header></Header>
      <main className="main">
        <section>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SolutionLetters
                    word={word}
                    userLetters={userLetters}
                  ></SolutionLetters>
                  <ErrorLetters
                    word={word}
                    userLetters={userLetters}
                  ></ErrorLetters>
                  <Form
                    userLetters={userLetters}
                    setUserLetters={setUserLetters}
                  />
                </>
              }
            />
             <Route
              path="/instructions"
              element={<Instructions />}
            />
              <Route
              path="/options"
              element={<Options />}
            />
          </Routes>
        </section>
        <Dummy numberOfErrors={getNumberOfErrors()}></Dummy>
      </main>
      <Footer />
    </div>
  );
}

export default App;
