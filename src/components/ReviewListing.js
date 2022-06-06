import React from "react";
import { useAppContext } from "../contexts/appContext";
import { Button, Rate, Typography } from "antd";
import styled from "styled-components";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Wrapper = styled("div")`
  .ant-typography {
    font-size: 20px;
  }

  .edit-button {
    background-color: #38f409;
    border-color: #38f409;
  }

  .edit-button:hover {
    background-color: #38f40999;
  }
`;

function Field(props) {
  const { label, value, customRender } = props;
  return (
    <div style={styles.fieldContainer}>
      <Text style={{ width: 150 }}>{label} :</Text>
      {customRender || <Text>{value}</Text>}
    </div>
  );
}

function ReviewListing(props) {
  const { reviews } = useAppContext();

  return (
    <div style={styles.container}>
      {reviews.map((item) => {
        return (
          <Wrapper key={item.id}>
            <div style={styles.contentContainer}>
              {/* poster */}
              <img src={item.image_path} width={"290vw"} />

              {/* content */}
              <div style={styles.reviewContainer}>
                {/* top section */}
                <div style={styles.mainReviewContainer}>
                  <Field label={"Name"} value={item.name} />
                  <Field label={"Release date"} value={item.screening_date} />
                  <Field
                    label={"Rating"}
                    customRender={<Rate allowHalf value={item.rating} />}
                  />
                  <Field
                    label={"Casting"}
                    customRender={
                      <div style={styles.flex("column")}>
                        {item.cast.map((cast, index2) => {
                          return (
                            <Text key={index2} style={styles.cast}>
                              <Text strong>{cast.actor}</Text> as{" "}
                              <Text strong style={{ color: "#93C4F7" }}>
                                {cast.character}
                              </Text>
                            </Text>
                          );
                        })}
                      </div>
                    }
                  />

                  <Field label={"Comments"} value={item.description} />
                </div>

                {/* Bottom section */}
                <div style={styles.bottomSection}>
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    Review Date: {item.date_of_review}
                  </Text>

                  <div style={styles.flex("row")}>
                    <Button
                      type="primary"
                      className="edit-button"
                      style={styles.actionButton}
                      icon={<EditOutlined />}
                    >
                      Edit
                    </Button>

                    <Button
                      type="primary"
                      danger
                      style={styles.actionButton}
                      icon={<DeleteOutlined />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.divider} />
          </Wrapper>
        );
      })}
    </div>
  );
}

export default ReviewListing;

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
  reviewContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    marginLeft: 30,
  },
  bottomSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    marginRight: 15,
    borderRadius: 5,
  },
};
