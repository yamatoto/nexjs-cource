import React, { useRef } from "react";
import classes from "./events-search.module.css";
import Button from "../ui/button";

const YEAR_LIST = [2021, 2022];
const MONTH_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const EventsSearch = ({
  onSearch,
}: {
  onSearch: (year?: string, month?: string) => void;
}) => {
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedYear = yearInputRef.current?.value;
    const selectedMonth = monthInputRef.current?.value;

    onSearch(selectedYear, selectedMonth);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            {YEAR_LIST.map((y) => (
              <option key={y} value={`${y}`}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            {MONTH_LIST.map((m) => (
              <option key={m} value={`${m}`}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <Button>Submit</Button>
      </div>
    </form>
  );
};

export default EventsSearch;
