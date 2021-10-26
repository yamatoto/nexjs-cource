import Link from "next/Link";
import { UrlObject } from "url";
import { ParsedUrlQueryInput } from "querystring";
import classes from "./button.module.css";

const Button = ({
  pathname,
  query,
  onClick,
  children,
}: {
  pathname?: string;
  query?: ParsedUrlQueryInput;
  onClick?: () => {};
} & JSX.ElementChildrenAttribute) => {
  if (!pathname) {
    return (
      <button className={classes.btn} onClick={onClick}>
        {children}
      </button>
    );
  }

  const href: UrlObject = { pathname };
  if (query) {
    href.query = query;
  }
  return (
    <Link href={href}>
      <a className={classes.btn}>{children}</a>
    </Link>
  );
};

export default Button;
