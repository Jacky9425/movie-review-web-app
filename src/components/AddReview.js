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

const tips = {
  name: "Movie title",
  poster: "Movie poster",
  screeningDate: "The date the movie is released.",
  cast: "The castings of the movie",
  rating: "Rate the movie, 1 star being close to worst and 5 star being great",
  comments: "Comments on the movie",
};

const { Search } = Input;

function PosterUpload(props) {
  const {} = props;
  const { formObject, onChangeFormObject } = useAppContext();

  return (
    <div
      style={{
        ...styles.flex("column"),
      }}
    >
      <Upload
        accept=".jpg, .jpeg, .png"
        showUploadList={false}
        onChange={(e) => {
          onChangeFormObject(
            "poster",
            URL.createObjectURL(e.file.originFileObj)
          );
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
  );
}

function AddReview(props) {
  const {
    formObject,
    modalVisible,
    isEdit,
    buttonLoading,
    setModalVisible,
    onSearchMovie,
    onChangeFormObject,
    onChangeCastDetails,
    onAddReview,
    onEditReview,
  } = useAppContext();

  console.log(useAppContext());

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
        onOk={isEdit ? onEditReview : onAddReview}
        okButtonProps={{ loading: buttonLoading }}
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
            rightLabel={<FieldTip tip={tips.name} />}
            value={formObject["name"]}
            onChange={(e) => onChangeFormObject("name", e.target.value)}
          />

          <FormInput
            label={"Poster"}
            rightLabel={<FieldTip tip={tips.poster} />}
            customRender={<PosterUpload />}
          />

          <FormInput
            label={"Screening Date"}
            rightLabel={<FieldTip tip={tips.screeningDate} />}
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
            rightLabel={<FieldTip tip={tips.cast} />}
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
            rightLabel={<FieldTip tip={tips.rating} />}
            customRender={
              <Rate
                allowHalf
                allowClear
                value={formObject["rating"]}
                onChange={(e) => onChangeFormObject("rating", e)}
              />
            }
          />

          <FormInput
            label={"Comment"}
            rightLabel={<FieldTip tip={tips.comments} />}
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
