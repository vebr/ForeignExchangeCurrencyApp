import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Paper,
  Grid,
  Box,
  InputLabel,
  FormControl,
  Input,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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

export default function DefaultCurrency(props) {
  const classes = useStyles();
  const flag = " currency-flag currency-flag-".concat(props.item).toLowerCase();
  const [values, setValues] = React.useState({
    value: props.quantity,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    props.setVal({ ...values, [name]: event.target.value });
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Paper className={classes.root} elevation={3}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={7}>
            <Avatar className={classes.avatar + flag} />
            <Typography variant="h6" component="h3">
              {props.item}
            </Typography>
            <Typography noWrap variant="caption" component="p" gutterBottom>
              {props.name}
            </Typography>
          </Grid>
          <Grid item xs={5} zeroMinWidth>
            <Box textAlign="right">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">Value</InputLabel>
                <Input
                  id="component-simple"
                  label="Value"
                  value={values.value}
                  onChange={handleChange("value")}
                />
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}
