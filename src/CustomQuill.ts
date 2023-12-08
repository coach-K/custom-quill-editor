import Quill from "quill";
import Counter from "./modules/Counter";
import MoreButton from "./modules/MoreButton";

export type CustomQuillOptions = {
  debug?: string;
  placeholder?: string;
  scrollingContainer?: string;
  theme: string;
  modules: {};
};

export class CustomQuill {
  private editor: Quill;
  private element: HTMLDivElement;
  private toolbarElement: HTMLDivElement;
  private innerEditor: HTMLDivElement;
  private defaultOptions: CustomQuillOptions;

  constructor(element: HTMLDivElement, options?: CustomQuillOptions) {
    Quill.register("modules/counter", Counter);
    Quill.register("modules/moreButton", MoreButton);
    this.defaultOptions = options || this.getDefaultOptions();
    this.editor = new Quill(element, this.defaultOptions);
    this.element = element;
    this.toolbarElement = document.querySelector(".ql-toolbar")!;
    this.innerEditor = document.querySelector(".ql-editor")!;

    this.update();
    this.setOnEditorClick();
    this.setOnEditorFocus();
    this.setOnEditorBlur();
  }

  update() {
    this.element.style.border = "none";
    this.toolbarElement.style.display = "none";
  }

  setOnEditorClick() {
    this.element.onclick = () => {
      this.editor.focus();
    };
  }

  setOnEditorFocus() {
    this.innerEditor.onfocus = () => {
      if (this.toolbarElement.style.display !== "block") {
        this.toolbarElement.style.display = "block";
      }
    };
  }

  setOnEditorBlur() {
    this.innerEditor.onblur = () => {
      let text = this.editor.getText();
      text = text.trim();
      if (text.length <= 0 && this.toolbarElement.style.display !== "none") {
        this.toolbarElement.style.display = "none";
      }
    };
  }

  getDefaultOptions() {
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
    return options;
  }

  getEditor(): Quill {
    return this.editor;
  }
}
