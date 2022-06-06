import { Button, Modal, Input } from "antd";
import React from "react";
import { useAppContext } from "../contexts/appContext";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

function AddReview(props) {
  const { setModalVisible, modalVisible, onSearchMovie } = useAppContext();
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
        <div>New movie</div>
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
