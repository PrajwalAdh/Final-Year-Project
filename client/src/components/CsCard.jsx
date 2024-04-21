import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Flex } from "antd";
import React from "react";

const { Meta } = Card;

const CsCard = ({ image, title, description }) => {
  return (
    <Card
      style={{
        width: 300,
        background: "#f5f5f5",
      }}
      hoverable
    >
      <Flex>
        <Meta title={title} description={description} />
        {image ? (
          <img
            size={"large"}
            shape="square"
            src={image}
            style={{ height: "5rem" }}
          />
        ) : null}
      </Flex>
    </Card>
  );
};

export default CsCard;
