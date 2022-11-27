import React, { useEffect } from "react";
import Parser from "html-react-parser";

const Highlight = ({ text = "", highlight = "", handeInputChange }) => {
  const [value, setValue] = React.useState(text);

  useEffect(() => {
    if (!highlight) return;
    var sentences = highlight.split(".").map((sentence) => sentence.trim());
    sentences.pop();
    var regex = new RegExp(sentences.join("|"), "gi");
    if (regex.test(text)) {
      setValue(text.replace(regex, (match) => `<span class="highlight">${match}</span>`));
    }
  }, [highlight, text]);

  if (!highlight.trim()) {
    return (
      <div
        id="input"
        role="textbox"
        contentEditable={true}
        data-gramm_editor={false}
        wt-ignore-input={value.toString()}
        suppressContentEditableWarning={true}
        placeholder="Paste or write about your topic then click the Summarize button."
        onInput={handeInputChange}
      >
        {""}
      </div>
    );
  }

  return (
    <div
      id="input"
      role="textbox"
      contentEditable={true}
      data-gramm_editor={false}
      wt-ignore-input={value.toString()}
      suppressContentEditableWarning={true}
      placeholder="Paste or write about your topic then click the Summarize button."
      onInput={handeInputChange}
    >
      {Parser(value)}
    </div>
  );
};
export default Highlight;
