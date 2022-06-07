import React from "react";

function ReviewContent(props) {
  const { item } = props;

  const Poster = () => {
    return <img src={item.poster} width={"290vw"} />;
  };

  return (
    <div style={styles.contentContainer}>
      <Poster />
    </div>
  );
}

export default ReviewContent;

const styles = {
  flex: (flex) => ({
    display: flex,
    flexDirection: flex,
  }),
  container: {
    marginTop: 10,
    height: "80vh",
    border: "1px solid gray",
    borderRadius: 5,
    // backgroundColor: "tomato",
    overflowY: "auto",
  },
  contentContainer: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
  },
  divider: {
    height: 1.5,
    backgroundColor: "#80808080",
    width: "100%",
  },
  mainReviewContainer: {
    display: "flex",
    flexDirection: "column",
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  cast: {
    marginRight: 10,
  },
};
