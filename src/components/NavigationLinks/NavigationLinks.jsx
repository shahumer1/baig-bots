import { navigationLinks } from "../../content/navigationLinks";

export default function NavigationLinks({ as = "nav", currentPage, onNavigate, ...props }) {
  const Element = as;
  return (
    <Element {...props}>
      {navigationLinks.map(({ label, href, page }) => {
        const link = <a key={href} href={href} aria-current={currentPage === page ? "page" : undefined} onClick={onNavigate}>{label}</a>;
        return as === "ul" ? <li key={href}>{link}</li> : link;
      })}
    </Element>
  );
}
