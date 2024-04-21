import {
  EditOutlined,
  EllipsisOutlined,
  EnvironmentOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Flex } from "antd";
import React from "react";
import { baseUrl } from "../Services/Axios";

const { Meta } = Card;

const CommonCard = ({ item, calling }) => {
  return (
    // <Card
    //   style={{
    //     width: 300,
    //     background: "#f5f5f5",
    //   }}
    //   hoverable
    // >
    //   <Flex>
    //     <Meta title={item?.name} description={item?.location} />
    //     {item?.hotelImages[0] ? (
    //       <img
    //         size={"large"}
    //         shape="square"
    //         src={`${baseUrl}/image/hotel/${item.hotelImages[0]}`}
    //         style={{ height: "5rem" }}
    //       />
    //     ) : null}
    //   </Flex>
    // </Card>
    <Card
      style={{
        width: calling === "suggested" ? 430 : 300,
      }}
      cover={
        <img
          alt="example"
          src={`${baseUrl}/image/hotel/${item.hotelImages[0]}`}
          style={{
            objectFit: "cover",
            height: "15rem",
          }}
        />
      }
      actions={[
        <Flex justify="center">
          <EnvironmentOutlined className="mx-2" />
          {item?.location}
        </Flex>,
        <> Rs.{item.averageCost ? item.averageCost.toFixed(0) : 0} </>,
      ]}
    >
      <Meta
        title={item?.name}
        description={
          <Flex>
            <small className="mr-2">{item.totalReviews} reviews</small>
            {Array.from(Array(5)).map((el, index) => (
              <i
                className={` fa-star   ${
                  index < item.averageRating
                    ? "fa-solid text-primary "
                    : "fa-regular text-black"
                }`}
              ></i>
            ))}
          </Flex>
        }
      />
    </Card>
  );
};

export default CommonCard;
