import React from "react";
import { useEffect, useState } from "react";

// Design System
import {
  Carousel,
  Layout,
  Card,
  Tooltip,
  Col,
  Row,
  Button,
  Drawer,
  InputNumber,
  Image,
  Typography,
  PageHeader,
  Input,
} from "antd";

import {
  HeartOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";

// Uitls
import { Link } from "react-router-dom";
import axios from "axios";

const { Content, Footer } = Layout;
const { Meta } = Card;
const { Title } = Typography;

const contentStyle = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

function getTooltip(tooltipText, icon) {
  return <Tooltip title={tooltipText}>{icon}</Tooltip>;
}

export const Commerce = ({ userDataSession, handleLogout }) => {
  const [dataCommerce, setDataCommerce] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [open, setOpen] = useState(false);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    fetch("api/v1/commerces")
      .then((response) => response.json())
      .then((data) => setDataCommerce(data))
      .catch((error) => console.error(error));
  }, []);

  const showDrawer = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const onChange = (value) => {
    console.log("changed", value);
  };

  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then((response) => {
        handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };

  const searchItems = dataCommerce
    .map((item) => item)
    .filter((item) =>
      item.product
        .toString()
        .toLowerCase()
        .includes(searchData.toLocaleLowerCase())
    );
  console.log("hola soy searchItems", !searchItems.length);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <PageHeader
        className="site-page-header-responsive"
        title="Shopify"
        subTitle="By Roman De La Torre"
        extra={[
          <Input
            size="large"
            placeholder="Que Buscas?"
            prefix={<SearchOutlined />}
            value={searchData}
            autoComplete="off"
            onChange={(event) => setSearchData(event.target.value)}
          />,
          <>
            <h3>
              {userDataSession.logged_in
                ? `Hola  ${userDataSession?.user?.username}`
                : null}
            </h3>
            <Button key="3">
              <Link to="/login">Login</Link>
            </Button>
            <Button key="2">
              <Link to="/signup">Signup</Link>
            </Button>
            {userDataSession.logged_in ? (
              <Button key="1" type="primary" onClick={handleLogoutClick}>
                Logout
              </Button>
            ) : null}
          </>,
        ]}
      />

      <Layout className="site-layout">
        <Content>
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
          <Row align="middle" justify="space-evenly">
            {!!searchItems.length ? (
              searchItems.map((item, index) => (
                <Col span={3} key={index}>
                  <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={<img alt={item.image} src={item.image} />}
                    actions={[
                      getTooltip("Anadir a favoritos", <HeartOutlined />),
                      getTooltip(
                        "Anadir al carrito",
                        <ShoppingCartOutlined
                          onClick={() => showDrawer(item)}
                        />
                      ),
                    ]}
                  >
                    <Meta title={item.product} description={item.description} />
                  </Card>
                </Col>
              ))
            ) : (
              <Title level={3}>Ups Este Producto No Existe</Title>
            )}
          </Row>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Footer App
        </Footer>
      </Layout>
      <Drawer
        title="Terminar Compra"
        placement="right"
        onClose={closeDrawer}
        open={open}
      >
        <Image width={300} src={selectedItem.image} />
        <Row justify="center" align="middle">
          <Col span={24}>
            <Title level={3}>{selectedItem.product}</Title>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Title level={4}>Price: $ {selectedItem.price} USD</Title>
          </Col>
          <Row>
            <Col span={12}>
              <Title level={4}>Quantity: </Title>
            </Col>
            <Col span={12}>
              <InputNumber
                min={1}
                max={5}
                defaultValue={1}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Row>
        <Button type="primary">Finalizar Compra</Button>
      </Drawer>
    </Layout>
  );
};
