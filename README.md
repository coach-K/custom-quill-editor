# Custom Quill Editor

This project is written in Typescript and it extended the Quill Open Source Library.
It is a customized WYSIWYG Editor and it's easily customizable and flexible for extension.

See project [Demo here](https://coach-k.github.io/custom-quill-editor/demo/)

## Development

**NPM version:** 10.2.0

**Node version:** v21.1.0

## Run the project on your machine

_Paste this in your command line._

```sh
git clone https://github.com/coach-K/custom-quill-editor.git
cd custom-quill-editor
npm install
npm run dev
```

## Setup

````javascript
// Configure with CustomQuillOptions to customize the editor.
let options: CustomQuillOptions = {
    placeholder: "Add Content",
    scrollingContainer: "#editor",
    theme: "snow",
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link", "image"],
            [{ align: [] }],
            ["bold", "italic"],
            [{ list: "bullet" }, { list: "ordered" }],
            [{ indent: "+1" }],
        ],
        counter: {
            max: 1000,
            container: "#word-count",
            unit: "word",
        },
        moreButton: {
            container: "#editor",
            icon: "bi-plus-lg",
        },
    },
};

// Start CustomQuillEditor
let customQuill = new CustomQuill(
  document.querySelector<HTMLDivElement>("#editor")!,
  options
);

// You can get the content from Editor the following ways.
let titleInput = document.querySelector<HTMLInputElement>("#editor-title")!;
let title = titleInput.value;
// Number 1.
let text = customQuill.getEditor().getText();
// Number 2.
var delta = customQuill.getEditor().getContents();
let jsonContent = JSON.stringify(delta);
// Number 3.
var htmlContent = customQuill.getEditor().root.innerHTML;
// The choice is yours.

````

## To test the Video and Social Embed Section

You can use the following URL for ease:

## Social Embed

**Instagram:**
https://www.instagram.com/reel/CqLFAjKjZeE/embed

**Tiktok:**
https://www.tiktok.com/embed/v2/7307233162759867649

## Video Embed

**Youtube:**
https://www.youtube.com/embed/8Q_8WLQg46Q

**Vimeo:**
https://player.vimeo.com/video/647293768?h=6b90701171

## Having Issues running the project

Don't hesitate to raise a git issue or send an email to codekenn@gmail.com
