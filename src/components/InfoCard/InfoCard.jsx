import ArrowUpRight from "../ArrowUpRight/ArrowUpRight";

export default function InfoCard({ as = "article", href, number, kicker, kickerClassName, title, text, arrow = false, className = "", children, ...props }) {
  const Element = href ? "a" : as;
  return (
    <Element className={className || undefined} {...(href ? { href } : {})} {...props}>
      {(kicker || number) && <span className={kickerClassName}>{kicker || number}</span>}
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
      {arrow && <ArrowUpRight />}
    </Element>
  );
}
