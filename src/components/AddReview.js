import { Button, Modal, Input, Tooltip, DatePicker, Rate, Upload } from "antd";
import React from "react";
import { useAppContext } from "../contexts/appContext";
import {
  PlusCircleOutlined,
  SearchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import FormInput from "./FormInput";
import ArrayItemManage from "./ArrayItemManage";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";

const { Search } = Input;

function AddReview(props) {
  const {
    formObject,
    setModalVisible,
    modalVisible,
    onSearchMovie,
    onChangeFormObject,
    onChangeCastDetails,
  } = useAppContext();

  const FieldTip = ({ tip }) => {
    return (
      <Tooltip title={tip}>
        <InfoCircleOutlined style={{ marginLeft: 10, color: "#939792" }} />
      </Tooltip>
    );
  };

  return (
    <>
      <div style={styles.flex("row")}>
        <Search
          allowClear
          placeholder="Search by name of movie"
          style={{ width: 300 }}
          onSearch={onSearchMovie}
          enterButton={<Button type="primary" icon={<SearchOutlined />} />}
        />
        <Button
          style={styles.button}
          icon={<PlusCircleOutlined />}
          type="primary"
          onClick={() => setModalVisible(true)}
        >
          Add new review
        </Button>
      </div>

      <Modal
        title={"New Movie Review"}
        width={"30%"}
        maskClosable={false}
        visible={modalVisible}
        centered
        onCancel={() => setModalVisible(false)}
      >
        <div
          style={{
            ...styles.flex("column"),
            height: "60vh",
            overflowY: "auto",
          }}
        >
          <FormInput
            label={"Name"}
            rightLabel={<FieldTip tip={"Movie title"} />}
            value={formObject["name"]}
            onChange={(e) => onChangeFormObject("name", e.target.value)}
          />

          <FormInput
            label={"Poster"}
            rightLabel={<FieldTip tip={"Movie Poster"} />}
            customRender={
              <div
                style={{
                  ...styles.flex("column"),
                }}
              >
                <Upload
                  accept=".jpg, .jpeg, .png"
                  showUploadList={false}
                  onChange={(e) => {
                    onChangeFormObject("poster", {
                      ...e.file,
                      url: URL.createObjectURL(e.file.originFileObj),
                    });
                  }}
                >
                  <Button style={styles.uploadBtn}>Attach Image</Button>
                </Upload>

                {Object.keys(formObject["poster"]).length > 0 && (
                  <div
                    style={{
                      ...styles.flex("flex"),
                      flexDirection: "column",
                      marginTop: 10,
                    }}
                  >
                    <img
                      src={formObject["poster"].url || formObject["poster"]}
                      width={"120vw"}
                    />
                  </div>
                )}
              </div>
            }
          />

          <FormInput
            label={"Screening Date"}
            rightLabel={<FieldTip tip={"The date the movie is released"} />}
            customRender={
              <DatePicker
                format={"DD MMM YYYY"}
                value={moment(formObject["screening_date"], "DD MMM YYYY")}
                onChange={(e) =>
                  onChangeFormObject(
                    "screening_date",
                    moment(e).format("DD MMM YYYY")
                  )
                }
              />
            }
          />

          <FormInput
            label={"Cast"}
            rightLabel={<FieldTip tip={"The casting of the movie"} />}
            customRender={
              <ArrayItemManage
                array={formObject["cast"]}
                onAddItem={() =>
                  onChangeFormObject("cast", [
                    ...formObject["cast"],
                    { actor: "", character: "" },
                  ])
                }
                onRemoveItem={(i) => {
                  formObject["cast"].splice(i, 1);
                  onChangeFormObject("cast", formObject["cast"]);
                }}
                onChangeCast={(i, j, k) => onChangeCastDetails(i, j, k)}
              />
            }
          />

          <FormInput
            label={"Rating"}
            rightLabel={
              <FieldTip
                tip={
                  "Rate the movie, 1 star being close to worst and 5 star being great"
                }
              />
            }
            customRender={<Rate allowHalf allowClear />}
          />

          <FormInput
            label={"Comment"}
            rightLabel={<FieldTip tip={"Comments on the movie"} />}
            customRender={
              <TextArea
                rows={4}
                value={formObject["description"]}
                onChange={(e) =>
                  onChangeFormObject("description", e.target.value)
                }
              />
            }
          />
        </div>
      </Modal>
    </>
  );
}

export default AddReview;

const styles = {
  flex: (flex) => ({
    display: "flex",
    flexDirection: flex,
  }),
  button: {
    width: 200,
    borderRadius: 10,
    marginLeft: 20,
  },
  uploadBtn: {
    borderRadius: 5,
  },
};
