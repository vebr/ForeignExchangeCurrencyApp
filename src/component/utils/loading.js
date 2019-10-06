import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Grid } from "@material-ui/core";

export default function Loading() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Skeleton variant="rect" height={70} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Skeleton variant="rect" height={70} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Skeleton variant="rect" height={70} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Skeleton variant="rect" height={70} />
          </Grid>
        </Grid>
      </div>
    );
  }