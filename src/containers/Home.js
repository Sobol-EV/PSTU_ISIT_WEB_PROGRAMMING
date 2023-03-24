import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

import ferm from "../image/ferm1.jpg"
import avatar from "../image/avatar.PNG"

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Майнинг-фермы для майнинга криптовалюты
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              У нас вы можите преобрести готовые майнинг-фермы "под ключ."
            </p>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Видеокарты для майнинга
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              У нас вы можите преобрести видеокарты NVIDIA 10-й, 20-й, 30-й серии
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              bordered
              rounded
              size="large"
              src={ferm}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: "0em" }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              "Почему именно наша компания?"
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Цена, качество, гарантии!
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              "Конкурентов в Перми нет!"
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              <Image avatar src={avatar} />
              <b>Евгений Соболь</b> (Основатель компании)
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "2em" }}>
          История основания компании
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Мы прошли долгий путь от идеи до открытия целой сети магазинов.
          Наша команда создала уникальную  платформу, позволившую купить
          самое иновационная оборудование для майнинга по отличной цене!
        </p>
        <Button as="a" size="large">
          Читать дальше
        </Button>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        >
          <a>И всё же первые!</a>
        </Divider>
        <Header as="h3" style={{ fontSize: "2em" }}>
          Сколько времени заняло завоевание лидера рынка?
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Для этого длительное время велась совместная работа
          с майнерами и представителями индустрии по совершенствованию логистики,
          удобства покупок, в итоге поменявшей парадигму магазинов майнинга в России.
        </p>
        <Button as="a" size="large">
          Невероятно, хочу сотрудничать!
        </Button>
      </Container>
    </Segment>
  </ResponsiveContainer>
);
export default HomepageLayout;
