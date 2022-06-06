import { Button, Modal, Input, Tooltip, DatePicker, Rate } from "antd";
import React, { useEffect } from "react";
import { useAppContext } from "../contexts/appContext";
import {
  PlusCircleOutlined,
  SearchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import FormInput from "./FormInput";
import ArrayItemManage from "./ArrayItemManage";
import TextArea from "antd/lib/input/TextArea";

const { Search } = Input;

const form_fields = [
  {
    name: "Name",
    tip: "Movie title",
    key: "name",
    type: "input",
  },
  {
    name: "Poster",
    tip: "Movie poster",
    key: "poster",
    type: "upload",
  },
  {
    name: "Screening date",
    tip: "The date the movie is released",
    key: "screening_date",
    type: "date_picker",
  },
  {
    name: "Cast",
    tip: "Casting of the movie",
    key: "cast",
    type: "custom",
  },
  {
    name: "Rating",
    tip: "Rate the movie, 1 star being close to worst and 5 star being great",
    key: "rating",
    type: "rating",
  },
  {
    name: "Comments",
    tip: "Comments on the movie",
    key: "description",
    type: "textarea",
  },
];

function AddReview(props) {
  const {
    formObject,
    setModalVisible,
    modalVisible,
    onSearchMovie,
    onChangeFormObject,
    onChangeCastDetails,
  } = useAppContext();

  useEffect(() => console.log(formObject), [JSON.stringify(formObject)]);

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
        maskClosable={false}
        visible={modalVisible}
        centered
        onCancel={() => setModalVisible(false)}
      >
        <div style={styles.flex("column")}>
          <FormInput
            label={"Name"}
            rightLabel={<FieldTip tip={"Movie title"} />}
            value={formObject["name"]}
            onChange={(e) => onChangeFormObject("name", e.target.value)}
          />

          <FormInput
            label={"Poster"}
            rightLabel={<FieldTip tip={"Movie Poster"} />}
            customRender={<div>custom</div>}
          />

          <FormInput
            label={"Screening Date"}
            rightLabel={<FieldTip tip={"The date the movie is released"} />}
            customRender={<DatePicker {...props} />}
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
                  console.log(i);
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
};
