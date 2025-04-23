import React from "react";
import { Layout, Typography, Row } from "antd";
import { Menu } from "./Menu";

const { Header } = Layout;
const { Title } = Typography;

export const HeaderLayout = () => {
  return (
    <Header
      style={{
        backgroundColor: "hsl(223.41deg 62.44% 38.63%)",
        padding: "0 24px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Row align="middle" style={{ height: "100%" }}>
        <Title
          level={3}
          style={{
            margin: 0,
            color: "#fff",
            fontWeight: 900,
          }}
        >
          ROSE
        </Title>
        <Menu />
      </Row>
    </Header>
  );
};
