import classes from "./error-alert.module.css";

function ErrorAlert({ children }: JSX.ElementChildrenAttribute) {
  return <div className={classes.alert}>{children}</div>;
}

export default ErrorAlert;
