import React from "react";
import { useEffect, useState } from "react";

import {
  Carousel,
  Layout,
  Menu,
  Card,
  Tooltip,
  Col,
  Row,
  Button,
  Drawer,
} from "antd";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

const contentStyle = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

function getTooltip(tooltipText, icon) {
  return <Tooltip title={tooltipText}>{icon}</Tooltip>;
}

export const Commerce = () => {
  const [dataCommerce, setDataCommerce] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch("api/v1/commerces")
      .then((response) => response.json())
      .then((data) => setDataCommerce(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          />
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
              {dataCommerce.map((item) => (
                <>
                  <Col span={3}>
                    <Card
                      hoverable
                      style={{ width: 300 }}
                      cover={<img alt={item.image} src={item.image} />}
                      actions={[
                        getTooltip("Anadir a favoritos", <HeartOutlined />),
                        getTooltip(
                          "Anadir al carrito",
                          <ShoppingCartOutlined onClick={showDrawer} />
                        ),
                      ]}
                    >
                      <Meta
                        title={item.product}
                        description={item.description}
                      />
                    </Card>
                  </Col>
                  <Drawer
                    title="Terminar Compra"
                    placement="right"
                    onClose={closeDrawer}
                    open={open}
                  >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                  </Drawer>
                </>
              ))}
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
      </Layout>
    </>
  );
};
