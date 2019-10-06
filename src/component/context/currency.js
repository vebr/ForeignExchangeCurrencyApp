import * as React from "react";

export const CurrencyContext = React.createContext(
  // default values used by a Consumer when it does not have a
  // matching Provider above it in the tree, useful for testing.
  {
    currencyContext: {
      base: "USD",
    }
  }
);
