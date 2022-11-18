import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import FormikLogin from "./FormikLogin";
import { Card, CardContent, Typography, makeStyles, Grid, IconButton } from "@material-ui/core";
import { MdClose } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  card: {
    overflow: "visible",
    display: "flex",
    position: "relative",
    "& > *": {
      flexGrow: 1,
      flexBasis: "50%",
      width: "50%"
    },
    maxWidth: "475px",
    margin: "0 auto"
  },
  content: {
    padding: theme.spacing(4, 4, 3, 4)
  },
  close: {
    position: "absolute",
    top: "25px",
    right: "20px",
    zIndex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Login = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  return (
    <Dialog open={isOpen} TransitionComponent={Transition} keepMounted>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Grid container direction="column" spacing={4} justifyContent="center">
            <Grid item xs={12}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    Đăng nhập
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Đăng nhập vào hệ thống
                  </Typography>
                  <IconButton className={classes.close} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <MdClose />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormikLogin />
          </Grid>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default Login;
