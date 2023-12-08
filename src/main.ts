import { CustomQuill } from "./CustomQuill";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Quill Demo</h1>
    <br /><br />

    <div class="main-container">
      <div class="header"></div>
      <div class="content">
        <input id="editor-title" class="editor-title" type="text" placeholder="Add post title" tabindex="0">
        <div
          id="editor"
          tabindex="1"
          style="overflow: auto"
        ></div>
      </div>
      <p id="word-count" class="word-count">0/1000 words</p>
      <div class="btn-container">
        <button class="btn btn-success">Post</button>
      </div>
    </div>
  </div>
`;

// See CustomQuillOptions for customizing the editor.
let customQuill = new CustomQuill(
  document.querySelector<HTMLDivElement>("#editor")!
);
// You can get the content from Editor the following ways.
let titleInput = document.querySelector<HTMLInputElement>("#editor-title")!;
let title = titleInput.value;
// Number 1.
let text = customQuill.getEditor().getText();
// Number 2.
var delta = customQuill.getEditor().getContents();
JSON.stringify(delta);
// Number 3.
var htmlContent = customQuill.getEditor().root.innerHTML;
// The choice is yours.
