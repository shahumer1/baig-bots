import ArrowUpRight from "../ArrowUpRight/ArrowUpRight";
import "./Button.css";

export default function Button({ href, variant = "primary", arrow = false, arrowClassName = "", className = "", children, type = "button", ...props }) {
  const Element = href ? "a" : "button";
  const classes = `${variant === "unstyled" ? "" : "button "}button--${variant} ${className}`.trim();
  return (
    <Element className={classes} {...(href ? { href } : { type })} {...props}>
      {children}
      {arrow && <ArrowUpRight className={`button__arrow ${arrowClassName}`.trim()} />}
    </Element>
  );
}
