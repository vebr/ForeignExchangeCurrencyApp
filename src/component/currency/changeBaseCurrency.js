import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { setValue } from "../context/consumer";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import suggestions from "../utils/sugesstions";

import {
  Paper,
  Grid,
  MenuItem,
  Button,
  ButtonGroup,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
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
    margin: theme.spacing(0, 1),
    marginBottom: "20px",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem,
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

function getSuggestions(value, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function ChangeBaseCurrency(props) {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState({
    name: "USD",
    showInput: false,
  });

  const handleShowInput = event => {
    setCurrency(prevState => ({
      showInput: !prevState.showInput,
    }));
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      {currency.showInput ? (
        <Paper className={classes.root} elevation={3}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={6}>
              <Downshift id="downshift-simple">
                {({
                  getInputProps,
                  getItemProps,
                  getLabelProps,
                  getMenuProps,
                  highlightedIndex,
                  inputValue,
                  isOpen,
                  selectedItem,
                }) => {
                  const {
                    onBlur,
                    onFocus,
                    onChange,
                    ...inputProps
                  } = getInputProps({
                    placeholder: "Search currency",
                    onBlur: event => {
                      if (event.target.value !== "") {
                        setCurrency(oldValues => ({
                          name: event.target.value,
                          showInput: oldValues.showInput,
                        }));
                      }
                    },
                  });

                  return (
                    <div className={classes.container}>
                      {renderInput({
                        fullWidth: true,
                        classes,
                        label: "Currency",
                        InputLabelProps: getLabelProps({ shrink: true }),
                        InputProps: { onBlur, onFocus, onChange },
                        inputProps,
                      })}

                      <div {...getMenuProps()}>
                        {isOpen ? (
                          <Paper className={classes.paper} square>
                            {getSuggestions(inputValue).map(
                              (suggestion, index) =>
                                renderSuggestion({
                                  suggestion,
                                  index,
                                  itemProps: getItemProps({
                                    item: suggestion.label,
                                  }),
                                  highlightedIndex,
                                  selectedItem,
                                })
                            )}
                          </Paper>
                        ) : null}
                      </div>
                    </div>
                  );
                }}
              </Downshift>
            </Grid>
            <Grid item xs={6}>
              <ButtonGroup
                size="small"
                aria-label="small outlined button group"
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    if (currency.name) {
                      props.currencyContext.setRates(currency.name);
                      handleShowInput();
                    } else {
                      console.log("ss");
                    }
                  }}
                >
                  Change
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleShowInput}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <div>
          <Button
            variant="outlined"
            onClick={handleShowInput}
            className={classes.button}
          >
            Change Base Currency
          </Button>
        </div>
      )}
    </form>
  );
}

export default setValue(ChangeBaseCurrency);