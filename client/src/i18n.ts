import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const gbTranslations = {
  "largest": "Largest collections",
  "latest": "Latest items",
  "succes-toast": "You logged in successfully",
  "email-error": "Please enter your email",
  "password-error": "Password is required",
  "password": "Password",
  "account-text": "You don't have an account yet? Sign up",
  "here": "here",
  "send": "Send",
  "collection-created": "Collection created",
  "collection-creation-error": "Something went wrong. Pls try again",
  "create-collection": "Create new collection",
  "title": "Title",
  "describe-collection": "Describe your collection",
  "add-image": "Add image url adress",
  "name": "Name",
  "type": "Type",
  "number": "Number",
  "text": "Text",
  "multiline-text": "Multiline text",
  "boolean": "Boolean",
  "date": "Date",
  "rating": "Rating",
  "add-new-filed": "Add new filed",
  "create-collection-button": "Create",
  "select-topic": "Select collection topic",
  "books": "Books",
  "alcohol": "Alcohol",
  "movies": "Movies",
  "greenery": "Greenery",
  "vehicles": "Vehicles",
  "jewellery": "Jewellery",
  "outfit": "Outfit",
  "memories": "Memories",
  "other": "Other",
  "logout-toast": "Logged out successfully",
  "your-collections": "Your collections",
  "admin-page": "Admin page",
  "logout": "Logout",
  "login": "Login",
};

const plTranslations: typeof gbTranslations = {
  "largest": "Największe kolekcje",
  "latest": "Ostatnio dodate elementy",
  "succes-toast": "Zalogowałeś się poprawnie",
  "email-error": "Wpisz swój adres e-mail",
  "password-error": "Hasło jest wymagane",
  "password": "Hasło",
  "account-text": "Nie masz jeszcze konta? zarejestruj się",
  "here": "tutaj",
  "send": "Zaloguj się",
  "collection-created": "Kolekcja została stworzona",
  "collection-creation-error": "Coś poszło nie tak. Spróbój ponownie",
  "create-collection": "Stwórz nową kolekcję",
  "title": "Tytuł",
  "describe-collection": "Opisz swoją kolecję",
  "add-image": "Dodaj adres url obrazka",
  "name": "Nazwa",
  "type": "Typ pola",
  "number": "Liczba",
  "text": "Teks",
  "multiline-text": "Wielowierszowy tekst",
  "boolean": "Prawda/Fałsz",
  "date": "Data",
  "rating": "Ocena",
  "add-new-filed": "Dodaj nowe pole",
  "create-collection-button": "Stwórz kolekcję",
  "select-topic": "Wybierz temat kolekcji",
  "books": "Książki",
  "alcohol": "Alkohol",
  "movies": "Filmy",
  "greenery": "Zieleń",
  "vehicles": "Pojazdy",
  "jewellery": "Biżuteria",
  "outfit": "Ubrania",
  "memories": "Wspomnienia",
  "other": "Inne",
  "logout-toast": "Wylogowałeś się poprawnie",
  "your-collections": "Twoje kolekcje",
  "admin-page": "Strona admina",
  "logout": "Wyloguj się",
  "login": "Zaloguj się",

};


i18n
  .use(initReactI18next)
  .init({
    resources: {
      GB: { translation: gbTranslations },
      PL: { translation: plTranslations }
    },
    lng: localStorage.getItem("lang") || "GB",
    fallbackLng: localStorage.getItem("lang") || "GB",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;