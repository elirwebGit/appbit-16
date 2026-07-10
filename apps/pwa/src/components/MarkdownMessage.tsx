import ReactMarkdown from "react-markdown";

interface MarkdownMessageProps {
  texto: string;
}

/**
 * Renders markdown text with inline styles optimized for light backgrounds.
 * Used inside ChatPopover (light yellow bubble) and ConsultaIA.
 */
export default function MarkdownMessage({ texto }: MarkdownMessageProps) {
  // Inline styles for light backgrounds (chat bubbles, cards)
  const styles = {
    h3: {
      fontSize: "1.1rem",
      fontWeight: "700" as const,
      color: "#0284c7",         // Sky-600 for readability on light bg
      marginTop: "14px",
      marginBottom: "8px",
      letterSpacing: "0.5px",
    },
    strong: {
      fontWeight: "700" as const,
      color: "#0f172a",         // Slate-900 — maximum contrast on light bg
    },
    p: {
      marginBottom: "12px",
      lineHeight: "1.6",
      color: "#1e293b",         // Slate-800 — high readability
    },
    ul: {
      listStyleType: "disc" as const,
      paddingLeft: "20px",
      marginBottom: "12px",
      marginTop: "4px",
    },
    ol: {
      listStyleType: "decimal" as const,
      paddingLeft: "20px",
      marginBottom: "12px",
      marginTop: "4px",
    },
    li: {
      marginBottom: "6px",
      lineHeight: "1.5",
      color: "#1e293b",         // Same as paragraphs
    },
    code: {
      backgroundColor: "#f1f5f9",   // Slate-100 — subtle bg on light
      color: "#0284c7",             // Sky-600
      padding: "2px 6px",
      borderRadius: "4px",
      fontFamily: "ui-monospace, Consolas, monospace",
      fontSize: "0.85em",
    },
  };

  return (
    <ReactMarkdown
      components={{
        h3: ({ node, ...props }) => <h3 style={styles.h3} {...props} />,
        strong: ({ node, ...props }) => <strong style={styles.strong} {...props} />,
        p: ({ node, ...props }) => <p style={styles.p} {...props} />,
        ul: ({ node, ...props }) => <ul style={styles.ul} {...props} />,
        ol: ({ node, ...props }) => <ol style={styles.ol} {...props} />,
        li: ({ node, ...props }) => <li style={styles.li} {...props} />,
        code: ({ node, ...props }) => <code style={styles.code} {...props} />,
      }}
    >
      {texto}
    </ReactMarkdown>
  );
}
