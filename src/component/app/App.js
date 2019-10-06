import React, { Component } from "react";
// import Currencies from "../currency/currency";
import "./App.scss";
import { Container } from "@material-ui/core";
import Wrapper from "../utils/wrapper";
import CurrencyProvider from "../context/provider";
import CurrencyList from "../currency/currencyList";

class App extends Component {
  render() {
    return (
      <CurrencyProvider>
        <Container maxWidth="lg">
          <Wrapper>
            <CurrencyList />
          </Wrapper>
        </Container>
      </CurrencyProvider>
    );
  }
}

export default App;
