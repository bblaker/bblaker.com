# Project images

Drop image files here, then reference them from a project's frontmatter or body.
Paths are relative to the `.mdx` file, so from `content/projects/ferry.mdx` an image
in this folder is `./images/whatever.jpg`.

## Hero

One wide image, shown at the top of the project page only — never on cards or the
index, which stay text-dense on purpose.

```yaml
cover: ./images/voron-teardown.jpg
coverAlt: The 2.4 with the gantry removed, parts laid out on the bench
```

## In the body

```mdx
import gantry from './images/gantry-square.jpg';

<Figure src={gantry} alt="A square held against the gantry" caption="Second attempt. Still out." />
<Figure src={gantry} alt="..." caption="..." wide />
```

`wide` lets the image break out past the text column on desktop.

Plain markdown works too and gets the same border, just without a caption:

```md
![The rack, mid-assembly](./images/rack-wip.jpg)
```

## Galleries

```mdx
import a from './images/a.jpg';
import b from './images/b.jpg';

<Gallery items={[
  { src: a, alt: 'Toolhead, disassembled' },
  { src: b, alt: 'Worn bearing', caption: 'This is what 3 years looks like' },
]} />
```

## Notes

- **Import images, don't use string paths.** Imported images get WebP conversion,
  responsive `srcset`, and `width`/`height` attributes that stop the page shifting as
  they load. A string path skips all of that.
- Alt text is required by the types. Write it for someone who can't see the photo, not
  as a keyword dump.
- Don't pre-resize or pre-compress. Drop the original in; the build handles it.
- JPEG or PNG in, WebP out. HEIC won't work — convert first.
