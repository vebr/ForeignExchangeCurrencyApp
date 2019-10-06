import * as React from "react";
import { CurrencyContext } from "./currency";

export default class CurrencyProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      setRates: this.setRates.bind(this),
      setValue: this.setValue.bind(this),
      addCurrency: this.addCurrency.bind(this),
      removeCurrency: this.removeCurrency.bind(this),
      rates: [],
      defaultValue: 10,
      isFetching: false,
      base: "USD",
      currencyData: {},
      currencySelected: ["IDR", "GBP", "CAD", "EUR"],
    };
  }

  fetchData() {
    fetch(
      "https://api.exchangeratesapi.io/latest?base=" +
        this.state.base +
        "&symbols=" +
        this.state.currencySelected.join()
    )
      .then(this.setState({ isFetching: true }))
      .then(res => res.json())
      .then(data => {
        let { rates, base } = data;
        this.setState({ base: base, rates: rates, isFetching: false });
      })
      .catch(console.log);
  }

  fetchNewData(updateBase) {
    fetch(
      "https://api.exchangeratesapi.io/latest?base=" +
        updateBase +
        "&symbols=" +
        this.state.currencySelected.join()
    )
      .then(this.setState({ isFetching: true }))
      .then(res => res.json())
      .then(data => {
        let { rates, base } = data;
        this.setState({ base: base, rates: rates, isFetching: false });
      })
      .catch(console.log);
  }

  fetchCurrency() {
    fetch("https://openexchangerates.org/api/currencies.json")
      .then(this.setState({ isFetching: true }))
      .then(res => res.json())
      .then(data => {
        let labelCurrency = [];
        this.setState({ currencyData: data, isFetching: false });
        Object.keys(data).map((key, index) =>
          labelCurrency.push({
            label: key,
          })
        );
        this.setState({ labelCurrency: labelCurrency });
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.fetchData();
    this.fetchCurrency();
  }

  setRates(updateBase) {
    this.setState({ updateBase });
    this.fetchNewData(updateBase);
  }

  setValue(updateValue) {
    this.setState({ ...updateValue });
  }

  removeCurrency(removedCurrency) {
    let index = this.state.currencySelected.indexOf(removedCurrency);
    if (index > -1) {
      this.state.currencySelected.splice(index, 1);
    }
  }
  addCurrency(addCurrency) {
    this.state.currencySelected.push(addCurrency);
    this.fetchNewData(this.state.base);
  }

  render() {
    return (
      <CurrencyContext.Provider
        value={{
          currencyContext: {
            ...this.state,
          },
        }}
      >
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}
