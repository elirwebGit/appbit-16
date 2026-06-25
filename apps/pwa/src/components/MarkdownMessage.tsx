import ReactMarkdown from "react-markdown";

interface MarkdownMessageProps {
  texto: string;
  useTailwind?: boolean; // Permite alternar se preferir usar apenas Tailwind ou inline styles como fallback
}

export default function MarkdownMessage({
  texto,
  useTailwind = false, // Habilitamos false por padrão já que o app atualmente usa estilos em linha, mas fornecemos o suporte completo a Tailwind!
}: MarkdownMessageProps) {
  // Configurações de estilos inline de alta fidelidade visual (UX Premium)
  const inlineStyles = {
    h3: {
      fontSize: "1.1rem",
      fontWeight: "700",
      color: "#38bdf8", // Cor de destaque (Sky 400)
      marginTop: "14px",
      marginBottom: "8px",
      letterSpacing: "0.5px",
    },
    strong: {
      fontWeight: "700",
      color: "#ffffff", // Branco puro para máximo contraste e legibilidade em fundos escuros
    },
    p: {
      marginBottom: "12px",
      lineHeight: "1.6",
      color: "#e2e8f0", // Slate-200 para suavidade na leitura
    },
    ul: {
      listStyleType: "disc",
      paddingLeft: "20px",
      marginBottom: "12px",
      marginTop: "4px",
    },
    ol: {
      listStyleType: "decimal",
      paddingLeft: "20px",
      marginBottom: "12px",
      marginTop: "4px",
    },
    li: {
      marginBottom: "6px",
      lineHeight: "1.5",
      color: "#e2e8f0",
    },
    code: {
      backgroundColor: "#0f172a",
      color: "#38bdf8",
      padding: "2px 6px",
      borderRadius: "4px",
      fontFamily: "ui-monospace, Consolas, monospace",
      fontSize: "0.85em",
    },
  };

  if (useTailwind) {
    return (
      <ReactMarkdown
        components={{
          // Títulos (###)
          h3: ({ node, ...props }) => (
            <h3
              className="text-[17px] font-bold text-sky-400 mt-4 mb-2 first:mt-0 tracking-wide"
              {...props}
            />
          ),
          // Negrito (** text **)
          strong: ({ node, ...props }) => (
            <strong
              className="font-bold text-white saturate-150"
              {...props}
            />
          ),
          // Parágrafos
          p: ({ node, ...props }) => (
            <p
              className="mb-3 last:mb-0 leading-relaxed text-slate-200"
              {...props}
            />
          ),
          // Listas não-ordenadas
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc pl-5 mb-3 space-y-1 text-slate-200"
              {...props}
            />
          ),
          // Listas ordenadas
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal pl-5 mb-3 space-y-1 text-slate-200"
              {...props}
            />
          ),
          // Itens de lista
          li: ({ node, ...props }) => (
            <li
              className="mb-1 leading-normal"
              {...props}
            />
          ),
          // Códigos inline
          code: ({ node, ...props }) => (
            <code
              className="bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded text-xs font-mono"
              {...props}
            />
          ),
        }}
      >
        {texto}
      </ReactMarkdown>
    );
  }

  // Versão de fallback em estilos em linha (inline-style) de altíssima qualidade
  return (
    <ReactMarkdown
      components={{
        h3: ({ node, ...props }) => <h3 style={inlineStyles.h3} {...props} />,
        strong: ({ node, ...props }) => <strong style={inlineStyles.strong} {...props} />,
        p: ({ node, ...props }) => <p style={inlineStyles.p} {...props} />,
        ul: ({ node, ...props }) => <ul style={inlineStyles.ul} {...props} />,
        ol: ({ node, ...props }) => <ol style={inlineStyles.ol} {...props} />,
        li: ({ node, ...props }) => <li style={inlineStyles.li} {...props} />,
        code: ({ node, ...props }) => <code style={inlineStyles.code} {...props} />,
      }}
    >
      {texto}
    </ReactMarkdown>
  );
}
