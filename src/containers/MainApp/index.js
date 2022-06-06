import { Button } from "antd";
import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { useAppContext } from "../../contexts/appContext";
import AddReview from "../../components/AddReview";
import ReviewListing from "../../components/ReviewListing";
import { reviewData } from "../../data";

function MainApp(props) {
  const { setReviews } = useAppContext();

  useEffect(() => {
    setReviews(reviewData);
    localStorage.setItem("reviewLists", JSON.stringify(reviewData));
  }, []);

  return (
    <div style={styles.container}>
      <h2>Movie Review Beta</h2>

      <AddReview />

      <ReviewListing />
    </div>
  );
}

export default MainApp;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "50px",
  },
  btn: {
    width: 100,
    borderRadius: 8,
  },
  formBody: {
    width: "50%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
};
