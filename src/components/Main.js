import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content page__main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__shading">
            <button
              className="profile__avatar-btn"
              type="button"
              aria-label="Кнопка - редактировать аватар"
              onClick={onEditAvatar}
            ></button>
          </div>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
        </div>
        <div className="profile__info">
          <div className="profile__box">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Кнопка редактирования"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Кнопка - добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((item) => {
            return <Card card={item} key={item._id} onCardClick={onCardClick} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
