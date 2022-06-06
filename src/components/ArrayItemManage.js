import React from "react";
import { Button, Input, Typography } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

function ArrayItemManage(props) {
  const { array, onAddItem, onRemoveItem, onChangeCast } = props;

  return (
    <div style={styles.container}>
      {array.map((item, index) => {
        return (
          <div style={styles.itemDisplay} key={index}>
            <div style={{ ...styles.flex("column"), marginRight: 10 }}>
              <Text>Actor:</Text>
              <Input
                value={item.actor}
                onChange={(e) => onChangeCast(index, "actor", e.target.value)}
              />
            </div>

            <div style={{ ...styles.flex("column") }}>
              <Text>Character:</Text>
              <Input
                value={item.character}
                onChange={(e) =>
                  onChangeCast(index, "character", e.target.value)
                }
              />
            </div>

            {index !== 0 && (
              <Button
                style={{ marginTop: 15, marginLeft: 10 }}
                type={"link"}
                icon={<MinusCircleOutlined />}
                danger
                onClick={() => onRemoveItem(index)}
              />
            )}
          </div>
        );
      })}

      <Button style={{ marginTop: 15 }} onClick={onAddItem}>
        Add new cast
      </Button>
    </div>
  );
}

export default ArrayItemManage;

const styles = {
  flex: (flex) => ({
    display: "flex",
    flexDirection: flex,
  }),
  container: {
    display: "flex",
    padding: "0px 6px",
    flexDirection: "column",
  },
  itemDisplay: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};
