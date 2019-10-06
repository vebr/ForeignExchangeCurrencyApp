import React from "react";
// import axios from "axios";
import { setRates } from "../context/consumer";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Paper, Grid, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Currency from "react-currency-formatter";
import SwipeToDelete from "react-swipe-to-delete-component";
import DefaultCurrency from "./defaultCurrency";
import AddMoreCurrency from "./addCurrency";
import ChangeBaseCurrency from "./changeBaseCurrency";
import Loading from "../utils/loading";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
  grid: {
    flexGrow: 1,
    margin: theme.spacing(1, 0),
  },
  avatar: {
    backgroundPosition: "center",
    margin: theme.spacing(1),
    float: "left",
    border: "1px solid #C4C4C4",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function CurrencyListItem(props) {
  const classes = useStyles();
  const flag = " currency-flag currency-flag-".concat(props.item).toLowerCase();
  return (
    <div className={classes.grid}>
      <Paper elevation={3}>
        <SwipeToDelete
          key={props.id}
          item={props}
          onDelete={event => props.removeCurrency(event.item.item)}
        >
          <Paper className={classes.root}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={6}>
                <Avatar className={classes.avatar + flag} />
                <Typography variant="h6" component="h3">
                  {props.item}
                </Typography>
                <Typography noWrap variant="caption" component="p" gutterBottom>
                  {props.name[props.item]}
                </Typography>
              </Grid>
              <Grid item xs={6} zeroMinWidth>
                <Box textAlign="right">
                  <Typography variant="subtitle1" gutterBottom>
                    <Currency
                      quantity={
                        props.quantity * parseFloat(props.value).toFixed(5)
                      } // Required
                      currency={props.item} // Optional
                      // pattern="##,###!" // Optional
                      decimal="," // Optional
                      group="." // Optional
                    />
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    1 {props.base} = {parseFloat(props.value).toFixed(5)}{" "}
                    {props.item}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </SwipeToDelete>
      </Paper>
    </div>
  );
}

class CurrencyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rates: [] };
  }

  render() {
    let {
      defaultValue,
      base,
      rates,
      isFetching,
      currencyData,
      setValue,
      removeCurrency,
      value,
      labelCurrency,
    } = this.props.currencyContext;
    let val;
    if (value) {
      val = value;
    } else {
      val = defaultValue;
    }
    let items = Object.keys(rates).map((key, index) => (
      <CurrencyListItem
        key={index}
        item={key}
        index={index}
        name={currencyData}
        quantity={val}
        base={base}
        removeCurrency={removeCurrency}
        value={rates[key]}
      />
    ));

    return (
      <div className="list-group">
        <DefaultCurrency
          item={base}
          name={currencyData[base]}
          quantity={defaultValue}
          setVal={setValue}
        />
        {isFetching ? <Loading /> : items}
        <AddMoreCurrency suggestions={labelCurrency} />
        <ChangeBaseCurrency suggestions={labelCurrency} />
      </div>
    );
  }
}

export default setRates(CurrencyList);
