import { Button } from "antd";
import React from "react";
import "antd/dist/antd.css";
import { useAppContext } from "../../contexts/appContext";
import AddReview from "../../components/AddReviewModal";
import ReviewListing from "../../components/ReviewListing";

function MainApp(props) {
  const { setModalVisible } = useAppContext();

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
