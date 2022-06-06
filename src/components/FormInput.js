import React from "react";
import { Input, Typography } from "antd";

const { Text } = Typography;

function FormInput(props) {
  const { label, type, customLabel, customRender, inputProps } = props;

  const RenderForm = () => {
    switch (type) {
      case "input":
        return <Input {...inputProps} />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {customLabel || <Text>{label}</Text>}

      {customRender || RenderForm()}
    </div>
  );
}

export default FormInput;

const styles = {
  display: "flex",
  flexDirection: "column",
};
