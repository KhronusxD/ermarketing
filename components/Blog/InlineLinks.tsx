import React from 'react';

// Markdown-lite inline link parser. Authors write `[texto](/url)` inside
// any `p` / `callout` / `quote` text and this function returns a node
// list with the links as real <a> elements (no dangerouslySetInnerHTML).
// Plain text fragments pass through unchanged.

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

export const renderInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let key = 0;
    let match: RegExpExecArray | null;

    LINK_RE.lastIndex = 0;
    while ((match = LINK_RE.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        const isExternal = /^https?:\/\//.test(match[2]);
        parts.push(
            <a
                key={`l-${key++}`}
                href={match[2]}
                {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                className="text-er-red underline underline-offset-4 decoration-er-red/40 hover:decoration-er-red transition-colors"
            >
                {match[1]}
            </a>,
        );
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }
    return parts;
};
