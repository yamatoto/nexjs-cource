import Button from "../ui/button";
import classes from "./results-title.module.css";
import { toLocalYM } from "../../helpers/date";

function ResultsTitle({ date }: { date: Date }) {
  return (
    <section className={classes.title}>
      <h1>Events in {toLocalYM(date)}</h1>
      <Button pathname="/events">Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
