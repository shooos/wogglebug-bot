(() => {
  Bsky.detectFacets = (text: Bluesky.UnicodeString) => {
    let match;
    const facets: Bluesky.Facet[] = [];

    {
      // links
      const re =
        /(^|\s|\()(https?:\/\/[\S]+)/gim
      while ((match = re.exec(text.utf16))) {
        let uri = match[2]
        const start = text.utf16.indexOf(match[2], match.index)
        const index = { start, end: start + match[2].length }
        // strip ending puncuation
        if (/[.,;!?]$/.test(uri)) {
          uri = uri.slice(0, -1)
          index.end--
        }
        if (/[)]$/.test(uri) && !uri.includes('(')) {
          uri = uri.slice(0, -1)
          index.end--
        }
        facets.push({
          index: {
            byteStart: text.utf16IndexToUtf8Index(index.start),
            byteEnd: text.utf16IndexToUtf8Index(index.end),
          },
          features: [
            {
              $type: 'app.bsky.richtext.facet#link',
              uri,
            },
          ],
        })
      }
    }
    {
      const re = /(?:^|\s)(#[^\d\s]\S*)(?=\s)?/g
      while ((match = re.exec(text.utf16))) {
        let [tag] = match
        const hasLeadingSpace = /^\s/.test(tag)

        tag = tag.trim().replace(/[!\"#\$%&\'\(\)\*\+,-\./:;<=>\?@\[\\\]\^_`{\|}~]$/g, '') // strip ending punctuation

        // inclusive of #, max of 64 chars
        if (tag.length > 66) continue

        const index = match.index + (hasLeadingSpace ? 1 : 0)

        facets.push({
          index: {
            byteStart: text.utf16IndexToUtf8Index(index),
            byteEnd: text.utf16IndexToUtf8Index(index + tag.length), // inclusive of last char
          },
          features: [
            {
              $type: 'app.bsky.richtext.facet#tag',
              tag: tag.replace(/^#/, ''),
            },
          ],
        })
      }
    }
    return facets.length > 0 ? facets : [];
  }

})();
