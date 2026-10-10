import "./FormField.css";

export default function FormField({ label, multiline = false, fullWidth = false, ...props }) {
  const Control = multiline ? "textarea" : "input";
  return (
    <label className={`form-field${fullWidth ? " form-field--full" : ""}`}>
      <span>{label}</span>
      <Control {...props} />
    </label>
  );
}
