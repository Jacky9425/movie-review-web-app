import React from "react";
import { Input, Typography } from "antd";

const { Text } = Typography;

function FormInput(props) {
  const { label, type, customLabel, customRender, rightLabel } = props;

  const RenderForm = () => {
    return <Input {...props} />;
  };

  return (
    <div style={styles.container}>
      <div style={styles.labelContainer}>
        {customLabel || <Text>{label}</Text>}

        {rightLabel}
      </div>

      {customRender || RenderForm()}
    </div>
  );
}

export default FormInput;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 15,
  },
  labelContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};
