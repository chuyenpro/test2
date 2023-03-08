import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Author from "../Author/Author";
import { Routes, Route, Link } from "react-router-dom";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

const cx = classNames.bind(styles);
const Home = () => {
  const [showQuotes, setShowQuotes] = useState([]);
  const [indexRandom, setIndexRandom] = useState([]);
  const [random, setRandom] = useState(0);

  useEffect(() => {
    fetch("https://api.quotable.io/quotes")
      .then((res) => res.json())
      .then((data) => {
        setShowQuotes(data.results[0]);
        setIndexRandom(data.results);

        console.log(showQuotes);
      });
  }, []);

  const handleRandom = () => {
    setRandom(Math.floor(Math.random() * indexRandom.length));

    fetch("https://api.quotable.io/quotes")
      .then((res) => res.json())
      .then((data) => {
        setShowQuotes(data.results[random]);
        setIndexRandom(data.results);
      });
  };
  return (
    <>
      <div className={cx("wrapper")}>
        <button className={cx("random")} onClick={handleRandom}>
          random <GiPerspectiveDiceSixFacesRandom />
        </button>

        <div className={cx("content")}>
          <p className={cx("text")}>{showQuotes.content}</p>
          <div className={cx("author")}>
            <Link to='/author' className={cx("author-btn")}>{showQuotes.author}</Link>
            <p>{showQuotes.tags}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
