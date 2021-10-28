import classes from "./event-content.module.css";

function EventContent({ children }: JSX.ElementChildrenAttribute) {
  return <section className={classes.content}>{children}</section>;
}

export default EventContent;
