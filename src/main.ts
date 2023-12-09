import { CustomQuill } from "./CustomQuill";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div class="main-container">
      <div class="header"></div>
      <div class="content">
        <input
          id="editor-title"
          class="editor-title"
          type="text"
          placeholder="Add Content"
          tabindex="0"
          autocomplete="off"
        >
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
new CustomQuill(document.querySelector<HTMLDivElement>("#editor")!);
