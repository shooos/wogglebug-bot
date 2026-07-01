(() => {
  const buildFacet = (text: Bluesky.UnicodeString, start: number, end: number, uri: string) => ({
    index: {
      byteStart: text.utf16IndexToUtf8Index(start),
      byteEnd: text.utf16IndexToUtf8Index(end),
    },
    features: [
      {
        $type: 'app.bsky.richtext.facet#link',
        uri,
      },
    ],
  });

  Bsky.detectCustomFacet = (text, regex, uri) => {
    const normalizedRegex = new RegExp(regex.source, regex.flags);
    normalizedRegex.lastIndex = 0;
    const match = normalizedRegex.exec(text.utf16);

    if (!match) {
      throw new Error(`No target for detect facet | Text=${text}, Regexp=${regex}`);
    }

    const target = match[1] ?? match[0];
    const start = text.utf16.indexOf(target, match.index);
    const end = start + target.length;

    return buildFacet(text, start, end, uri);
  };

  Bsky.detectCustomFacets = (text, inputs) => {
    const facets: Bluesky.Facet[] = [];
    const coveredRanges: Array<{ start: number; end: number }> = [];

    for (const input of inputs) {
      const normalizedRegex = new RegExp(input.regex.source, input.regex.flags.includes('g') ? input.regex.flags : `${input.regex.flags}g`);
      normalizedRegex.lastIndex = 0;

      let match: RegExpExecArray | null;
      while ((match = normalizedRegex.exec(text.utf16)) !== null) {
        const target = match[1] ?? match[0];
        const start = text.utf16.indexOf(target, match.index);
        const end = start + target.length;
        const overlaps = coveredRanges.some((range) => start < range.end && end > range.start);

        if (overlaps) {
          continue;
        }

        facets.push(buildFacet(text, start, end, input.uri));
        coveredRanges.push({ start, end });
      }
    }

    return facets.sort((left, right) => left.index.byteStart - right.index.byteStart);
  };
})();
