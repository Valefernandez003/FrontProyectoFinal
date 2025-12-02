export const selectDarkStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "#121212",
    borderColor: "#565656",
    borderRadius: "1rem",
    minHeight: "38px",
    height: "38px",
    padding: "0 4px",
    boxShadow: "none",
    display: "flex",
    alignItems: "center",
    "&:hover": { borderColor: "#777" }
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0 6px",
    height: "100%",
    display: "flex",
    alignItems: "center",
  }),
  input: (base: any) => ({
    ...base,
    color: "#fff",
    margin: 0,
    padding: 0,
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#fff",
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "#1b1b1b",
    borderRadius: "0.5rem",
    border: "1px solid #898989"
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? "#333" : "#1b1b1b",
    color: "#fff",
    cursor: "pointer",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#999",
  }),
};