import React, { useState } from "react";
import { reviewData } from "../data";

const AppContext = React.createContext(null);

export const useAppContext = () => React.useContext(AppContext);

function AppContextProvider(props) {
  const { children } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [formObject, setFormObject] = useState({
    name: "",
    poster: "",
    screening_date: "",
    cast: [{ actor: "", character: "" }],
    rating: 0,
    description: "",
  });

  const onSearchMovie = (e) => {
    if (e) {
      setReviews((prev) => {
        return prev.filter((i) => i.name.toLowerCase().includes(e));
      });
    } else {
      setReviews(JSON.parse(localStorage.getItem("reviewLists")));
    }
  };

  const onChangeFormObject = (key, value) => {
    console.log(key, value);
    setFormObject((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const onChangeCastDetails = (index, key, value) => {
    let temp = formObject.cast;

    temp[index][key] = value;

    console.log(temp);

    setFormObject((prev) => ({
      ...prev,
      cast: temp,
    }));
  };

  let data = {
    modalVisible,
    reviews,
    formObject,
    onChangeCastDetails,
    onChangeFormObject,
    setFormObject,
    setModalVisible,
    onSearchMovie,
    setReviews,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
