import * as React from "react";
import { CurrencyContext } from "./currency";


export function setValue(Component) {
  return function CurrencyComponent(props) {
    return (
      <CurrencyContext.Consumer>
        {contexts => <Component {...props} {...contexts} />}
      </CurrencyContext.Consumer>
    );
  };
}


export function setRates(Component) {
  return function CurrencyComponent(props) {
    return (
      <CurrencyContext.Consumer>
        {contexts => <Component {...props} {...contexts} />}
      </CurrencyContext.Consumer>
    );
  };
}
