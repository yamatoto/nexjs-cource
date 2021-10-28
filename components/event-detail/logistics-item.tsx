import React from "react";
import classes from "./logistics-item.module.css";

function LogisticsItem({
  icon,
  children,
}: {
  icon: React.ComponentFactory<any, any>;
} & JSX.ElementChildrenAttribute) {
  const Icon = icon;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
