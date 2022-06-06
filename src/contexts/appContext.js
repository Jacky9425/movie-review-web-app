import React, { useState } from "react";
import { reviewData } from "../data";

const AppContext = React.createContext(null);

export const useAppContext = () => React.useContext(AppContext);

function AppContextProvider(props) {
  const { children } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState(reviewData);

  const onSearchMovie = (e) => {
    if (e) {
      setReviews(reviewData.filter((i) => i.name.toLowerCase().includes(e)));
    } else {
      setReviews(reviewData);
    }
  };

  let data = {
    modalVisible,
    reviews,
    setModalVisible,
    onSearchMovie,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
