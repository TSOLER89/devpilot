import { useEffect, useRef, useState } from "react";

function CodeBlock({ node, children }) {
  const codeRef = useRef(null);
  const resetTimerRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState("");
  const languageClass = node?.children?.[0]?.properties?.className ?? [];
  const language = languageClass
    .find((name) => name.startsWith("language-"))
    ?.slice("language-".length);

  useEffect(() => () => clearTimeout(resetTimerRef.current), []);

  const handleCopy = async () => {
    clearTimeout(resetTimerRef.current);

    try {
      await navigator.clipboard.writeText(codeRef.current?.textContent ?? "");
      setCopyStatus("Copied!");
    } catch {
      setCopyStatus("Could not copy. Select and copy the code manually.");
    }

    resetTimerRef.current = setTimeout(() => setCopyStatus(""), 4000);
  };

  return (
    <div className="code-block">
      <div className="code-block-toolbar">
        <span className="code-block-language">{language || "Code"}</span>
        <button
          type="button"
          className="code-copy-button"
          onClick={handleCopy}
          aria-label={`Copy ${language || "code"} code block`}
        >
          {copyStatus === "Copied!" ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre ref={codeRef} tabIndex={0} aria-label={`${language || "Code"} code block`}>
        {children}
      </pre>
      <span className={copyStatus && copyStatus !== "Copied!" ? "code-copy-error" : "sr-only"} role="status">
        {copyStatus}
      </span>
    </div>
  );
}

export default CodeBlock;
