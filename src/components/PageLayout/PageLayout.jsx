export default function PageLayout({ children, className = "" }) {
  return <main id="top" className={className || undefined}>{children}</main>;
}
