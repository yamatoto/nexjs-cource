import Link from "next/Link";
import { UrlObject } from "url";
import { ParsedUrlQueryInput } from "querystring";
import classes from "./button.module.css";

const Button = ({
  pathname,
  query,
  children,
}: {
  pathname: string;
  query?: ParsedUrlQueryInput;
} & JSX.ElementChildrenAttribute) => {
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
