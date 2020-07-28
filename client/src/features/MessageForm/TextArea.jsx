import React, {useState} from "react";
import PropTypes from "prop-types";

// Component that displays textarea
// props are:
// @param {string} state State of textarea
// @param {func} setState Function to set state
// @param {func} submit Function to submit the state
const TextArea = ({ state, setState, submit }) => {
  const [rows, setRows] = useState(1);

  const handleChange = (e) => {
    setState(e.target.value);
    // calculate amount of rows depending on lines of text in textarea
    // this does not account for long line wrapping to the next line
    const lines = e.target.value.split("\n").length;
    // expand textarea only if it's less than 7 rows
    if (lines < 7) setRows(lines);
  };
  const handleKeyPress = (e) => {
    // Enter press sends message
    // Shift+Enter results in a newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(e);
    }
  };
  return (
    <textarea
      rows={rows}
      value={state}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};
TextArea.propTypes = {
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
};

export default TextArea;
