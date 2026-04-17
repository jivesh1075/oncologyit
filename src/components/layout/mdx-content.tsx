/**
 * MDX Content Renderer — Server Component
 * Renders markdown content with proper prose styling.
 * Uses a simple markdown-to-HTML approach for SSG compatibility.
 */

interface Props {
  content: string;
}

/**
 * Renders markdown content as HTML.
 * For full MDX component support, integrate next-mdx-remote/rsc.
 * This lightweight version handles standard markdown and then scrubs the
 * resulting HTML for common XSS vectors before rendering.
 *
 * Security note (2026-04-17): before this scrub, the original implementation
 * passed the regex-converted HTML straight into dangerouslySetInnerHTML with
 * no sanitation. A bot-generated article or malicious editor could ship stored
 * XSS to every reader (<script>, event handlers, javascript: URIs). The
 * sanitizeHtml() pass below closes those vectors without pulling in a new
 * dependency. For a fuller solution, migrate to a remark/rehype pipeline with
 * rehype-sanitize.
 */
export function MDXContent({ content }: Props) {
  const html = sanitizeHtml(markdownToHtml(content));

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function markdownToHtml(md: string): string {
  let html = md;

  // Headers
  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Code blocks
  html = html.replace(/```[\w]*\n([\s\S]*?)```/g, "<pre><code>$1</code></pre>");

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>");

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Unordered lists
  html = html.replace(/^[-*] (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Paragraphs — wrap remaining text lines
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<table")
      ) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  return html;
}

/**
 * Strip the XSS vectors we know about before handing to dangerouslySetInnerHTML.
 * This is a defense-in-depth regex-scrub, not a full HTML parser. It closes
 * the specific attack surface the renderer creates:
 *   - <script>, <iframe>, <object>, <embed> blocks
 *   - on* event-handler attributes (onclick, onerror, onload, ...)
 *   - javascript: / vbscript: / data: URIs in href/src/action/formaction
 *   - <base> / <meta> tags that can hijack the document
 *   - srcdoc / formaction attributes
 *
 * Safe by default. If a piece of legitimate markdown needs behavior this
 * strips, prefer moving to a full remark/rehype pipeline with an explicit
 * allowlist rather than loosening this scrub.
 */
function sanitizeHtml(html: string): string {
  let out = html;

  // Remove dangerous element blocks entirely
  out = out.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "");
  out = out.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe\s*>/gi, "");
  out = out.replace(/<object\b[^>]*>[\s\S]*?<\/object\s*>/gi, "");
  out = out.replace(/<embed\b[^>]*\/?>(?:[\s\S]*?<\/embed\s*>)?/gi, "");
  out = out.replace(/<base\b[^>]*\/?>/gi, "");
  out = out.replace(/<meta\b[^>]*\/?>/gi, "");

  // Self-closing variants
  out = out.replace(/<script\b[^>]*\/>/gi, "");
  out = out.replace(/<iframe\b[^>]*\/>/gi, "");

  // Strip event-handler attributes and a few other dangerous attrs
  out = out.replace(
    /\s(on[a-z]+|formaction|srcdoc)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,
    "",
  );

  // Neutralize javascript:/vbscript:/data: URIs (keep data:image/ which is
  // legitimate for inline images). Handles double-quoted, single-quoted,
  // and unquoted attribute values.
  out = out.replace(
    /(\s(?:href|src|action|formaction|xlink:href)\s*=\s*")\s*(?:javascript|vbscript):[^"]*"/gi,
    '$1#"',
  );
  out = out.replace(
    /(\s(?:href|src|action|formaction|xlink:href)\s*=\s*')\s*(?:javascript|vbscript):[^']*'/gi,
    "$1#'",
  );
  out = out.replace(
    /(\s(?:href|src|action|formaction|xlink:href)\s*=\s*)(?:javascript|vbscript):[^\s>]+/gi,
    "$1#",
  );
  // data: URIs that are NOT data:image/ — neutralize
  out = out.replace(
    /(\s(?:href|src|action|formaction)\s*=\s*")\s*data:(?!image\/)[^"]*"/gi,
    '$1#"',
  );
  out = out.replace(
    /(\s(?:href|src|action|formaction)\s*=\s*')\s*data:(?!image\/)[^']*'/gi,
    "$1#'",
  );

  return out;
}
