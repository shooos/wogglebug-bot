(() => {
  Bsky.detectCustomFacet = (text, regex, uri) => {
    const match = regex.exec(text.utf16);

    if (!match) {
      throw new Error(`No target for detect facet | Text=${text}, Regexp=${regex}`);
    }

    const target = match[1];
    const start = text.utf16.indexOf(target, match.index);
    const end = start + target.length
    const index = { start, end }

    return {
      index: {
        byteStart: text.utf16IndexToUtf8Index(index.start),
        byteEnd: text.utf16IndexToUtf8Index(index.end),
      },
      features: [
        {
          $type: 'app.bsky.richtext.facet#link',
          uri,
        }
      ]
    };
  }

  Bsky.detectCustomFacets = (text, inputs) => {
    inputs.map((regex, uri) => { });
    return [];
  }
})();
