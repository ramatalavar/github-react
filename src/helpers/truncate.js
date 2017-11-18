import React from 'react';

function TextTruncate(props) {
  debugger;
  const MAX_CHARS = 150;
  let charLimit = props.charLimit || MAX_CHARS;
  let string = props.text;
  if (string) {
    let _length = string.length;

    string = string.substring(0, Math.min(_length, charLimit));
    string = _length > charLimit ? string + "..." : string;

    return <p className={props.className}>{string}</p>
  }

  return null;
};

export default TextTruncate;
