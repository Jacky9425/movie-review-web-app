import React, { useState } from "react";
import { reviewData } from "../data";
import moment from "moment";

const defaultFormObject = {
  name: "",
  poster: {},
  screening_date: moment().format("DD MMM YYYY"),
  date_of_review: moment().format("DD MMM YYYY"),
  cast: [{ actor: "", character: "" }],
  rating: 0,
  description: "",
};

const AppContext = React.createContext(null);

export const useAppContext = () => React.useContext(AppContext);

function AppContextProvider(props) {
  const { children } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [formObject, setFormObject] = useState({
    ...defaultFormObject,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

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
    setFormObject((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const onChangeCastDetails = (index, key, value) => {
    let temp = [...formObject.cast];

    temp[index][key] = value;

    console.log(temp);

    setFormObject((prev) => ({
      ...prev,
      cast: temp,
    }));
  };

  const setForm = (item) => {
    setModalVisible(true);
    setFormObject(item);
  };

  const deleteReview = (index) => {
    let temp = [...reviews]; // needed

    temp.splice(index, 1);

    localStorage.setItem("reviewLists", JSON.stringify(temp));
    setReviews(temp);
  };

  const resetForm = () => {
    setFormObject(defaultFormObject);
  };

  const onAddReview = () => {
    let defaultList = [...reviews];

    setModalVisible(false);
    localStorage.setItem(
      "reviewLists",
      JSON.stringify([
        ...defaultList,
        { id: defaultList.length + 1, ...formObject },
      ])
    );
    setReviews((prev) => {
      return [...prev, { id: defaultList.length + 1, ...formObject }];
    });
  };

  const onEditReview = () => {
    setButtonLoading(true);

    let editId = formObject.id;

    let index = reviews.findIndex((i) => i.id === editId);

    let temp = [...reviews];
    temp.splice(index, 1, formObject);

    setTimeout(() => {
      setModalVisible(false);
      setButtonLoading(false);
      setReviews(temp);
      localStorage.setItem("reviewLists", JSON.stringify(temp));
    }, 3000);
  };

  let data = {
    modalVisible,
    reviews,
    formObject,
    isEdit,
    buttonLoading,
    setButtonLoading,
    setIsEdit,
    onChangeCastDetails,
    onChangeFormObject,
    setFormObject,
    setModalVisible,
    onSearchMovie,
    setReviews,
    resetForm,
    setForm,
    deleteReview,
    onAddReview,
    onEditReview,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
