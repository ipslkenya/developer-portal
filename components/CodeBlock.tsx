'use client';

import { ReactNode, useCallback, useMemo, useState } from "react";

type CodeBlockProps = {
  language?: string;
  children: ReactNode;
};

export function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const codeText = useMemo(() => {
    if (typeof children === "string") {
      return children.trimEnd();
    }

    return "";
  }, [children]);

  const handleCopy = useCallback(async () => {
    if (!codeText) return;
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [codeText]);

  return (
    <div className="code-block">
      <div className="code-block__top">
        <span className="code-block__language">{language ?? "code"}</span>
        <button
          type="button"
          className="code-block__copy"
          onClick={handleCopy}
          aria-label="Copy code snippet"
          disabled={!codeText}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="code-block__body">
        <code data-language={language}>{children}</code>
      </pre>
    </div>
  );
}
