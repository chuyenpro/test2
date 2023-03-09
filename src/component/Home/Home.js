import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import { Routes, Route, Link } from "react-router-dom";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { GrFormNextLink } from "react-icons/gr";

const cx = classNames.bind(styles);
const Home = () => {
  const [showQuotes, setShowQuotes] = useState([]);
  const [indexRandom, setIndexRandom] = useState([]);
  const [random, setRandom] = useState(0);
  const [author, setAuthor] = useState([]);
  const [showAuthor, setShowAuthor] = useState(false);
  const [authorQuotes, setAuthorQuotes] = useState([]);

  const [showAuthorQuotes, setShowAuthorQuotes] = useState(false);

  useEffect(() => {
    fetch("https://api.quotable.io/quotes")
      .then((res) => res.json())
      .then((data) => {
        setShowQuotes(data.results[0]);
        setIndexRandom(data.results);
      });
  }, []);

  const handleRandom = () => {
    setRandom(Math.floor(Math.random() * indexRandom.length));
    setShowAuthorQuotes(false);

    fetch("https://api.quotable.io/quotes")
      .then((res) => res.json())
      .then((data) => {
        setShowQuotes(data.results[random]);
        setIndexRandom(data.results);
      });
  };


  const handleAuthorQuotes = (author) => {
    setShowAuthorQuotes(true);
    setShowQuotes(false);
    const quotesByAuthor = indexRandom.filter(
      (quote) => quote.author === author
    );
    setAuthorQuotes(quotesByAuthor);
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <button className={cx("random")} onClick={handleRandom}>
          random <GiPerspectiveDiceSixFacesRandom />
        </button>

        <div className={cx("content")}>
          <p className={cx("text")}>{showQuotes.content}</p>
          {!showAuthorQuotes ? (
            <div className={cx("author")}>
              <button
                className={cx("author-btn")}
                onClick={() => handleAuthorQuotes(showQuotes.author)}
              >
                {showQuotes.author}
                <GrFormNextLink className={cx("icon")} />
              </button>
              <p>{showQuotes.tags}</p>
            </div>
          ) : (
            <ul>
              {authorQuotes.map((quote) => (
                <li
                  style={{
                    listStyle: "none",
                  }}
                  key={quote._id}
                >
                  <h3>{quote.author}</h3>
                  <h4
                    style={{
                      paddingLeft: "20px",
                      borderLeft: "3px solid sandybrown ",
                      marginBottom: "30px",
                    }}
                  >
                    {quote.content}
                  </h4>
                  <h5>{quote.tags}</h5>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
