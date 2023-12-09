import Quill from "quill";

type MoreOptions = {
  container: string;
  icon: string;
  action: Function;
};

class MoreButton {
  private quill: Quill;
  private options: MoreOptions;
  private container: HTMLElement;
  private moreButtonId: string = "more-button-id";
  private embedImageModalId: string = "embedImageDialogId";
  private embedVideoModalId: string = "embedVideoDialogId";
  private embedSocialModalId: string = "embedSocialDialogId";

  constructor(quill: Quill, options: MoreOptions) {
    this.quill = quill;
    this.options = options;
    this.container = document.querySelector(options.container)!;
    quill.on("text-change", this.update.bind(this));
    this.update();
    this.container.parentElement?.appendChild(this.createEmbedImageDialog());
    this.container.parentElement?.appendChild(this.createEmbedVideoDialog());
    this.container.parentElement?.appendChild(this.createEmbedSocialDialog());
  }

  createMoreButton() {
    let moreBtn = document.createElement("button");
    moreBtn.classList.add("btn", "btn-light", "btn-more");
    let icon = document.createElement("i");
    icon.classList.add("bi", this.options.icon);
    moreBtn.appendChild(icon);
    return moreBtn;
  }

  createDropdown() {
    let dropDown = document.createElement("div");
    dropDown.id = this.moreButtonId;
    dropDown.classList.add("dropdown");
    let moreBtn = this.createMoreButton();
    moreBtn.setAttribute("data-bs-toggle", "dropdown");
    moreBtn.setAttribute("aria-expanded", "false");
    dropDown.appendChild(moreBtn);

    let ulElement = document.createElement("ul");
    ulElement.classList.add("dropdown-menu", "dropdown-more");
    let liHeadElement = document.createElement("li");
    liHeadElement.classList.add("li-item-head", "dropdown-item-text");
    liHeadElement.textContent = "EMBEDS";
    let li1Element = this.createLi(
      "bi-card-image",
      "Picture",
      "Jpeg, png",
      `#${this.embedImageModalId}`
    );
    let li2Element = this.createLi(
      "bi-camera-video-fill",
      "Video",
      "Embed a Youtube video",
      `#${this.embedVideoModalId}`
    );
    let li3Element = this.createLi(
      "bi-wechat",
      "Social",
      "Embed a Facebook link",
      `#${this.embedSocialModalId}`
    );
    ulElement.appendChild(liHeadElement);
    ulElement.appendChild(li1Element);
    ulElement.appendChild(li2Element);
    ulElement.appendChild(li3Element);
    dropDown.appendChild(ulElement);
    return dropDown;
  }

  createLi(icon: string, title: string, subTitle: string, targetModal: string) {
    let liElement = document.createElement("li");
    liElement.classList.add("li-item");
    let buttonElement = document.createElement("button");
    buttonElement.classList.add("dropdown-item", "btn", "li-item-btn");
    buttonElement.setAttribute("data-bs-toggle", "modal");
    buttonElement.setAttribute("data-bs-target", targetModal);
    let iconElement = document.createElement("i");
    iconElement.classList.add("bi", icon);
    let divElement = document.createElement("div");
    let p1Element = document.createElement("p");
    p1Element.classList.add("li-item-title");
    p1Element.textContent = title;
    let p2Element = document.createElement("p");
    p2Element.classList.add("li-item-sub-title");
    p2Element.textContent = subTitle;
    divElement.appendChild(p1Element);
    divElement.appendChild(p2Element);
    buttonElement.appendChild(iconElement);
    buttonElement.appendChild(divElement);
    liElement.appendChild(buttonElement);
    return liElement;
  }

  createEmbedDialog(
    embedDialogId: string,
    title: string,
    bodyElement: HTMLDivElement,
    buttonOkText: string,
    buttonCancelText: string,
    onOkClick: () => void,
    onCancelClick: () => void
  ) {
    let modalContainer = document.createElement("div");
    modalContainer.id = embedDialogId;
    modalContainer.classList.add("modal", "fade");
    modalContainer.setAttribute("data-bs-backdrop", "static");
    modalContainer.setAttribute("data-bs-keyboard", "false");
    modalContainer.setAttribute("tabindex", "-1");
    modalContainer.setAttribute("aria-labelledby", `${embedDialogId}Label`);
    modalContainer.setAttribute("aria-hidden", "true");
    let modalDialog = document.createElement("div");
    modalDialog.classList.add(
      "modal-dialog",
      "modal-dialog-centered",
      "modal-lg",
      "custom-modal-dialog"
    );
    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content", "custom-modal-content");
    let modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header", "custom-modal-header");
    let modalTitle = document.createElement("h1");
    modalTitle.classList.add("modal-title", "fs-5", "custom-modal-title");
    modalTitle.textContent = title;
    let modalButtonClose = document.createElement("button");
    modalButtonClose.classList.add("btn-close", "custom-btn-close");
    modalButtonClose.setAttribute("type", "button");
    modalButtonClose.setAttribute("data-bs-dismiss", "modal");
    modalButtonClose.setAttribute("aria-label", "Close");
    modalButtonClose.onclick = onCancelClick;
    bodyElement.classList.add("modal-body", "custom-modal-body");
    let modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer", "custom-modal-footer");
    let modalButtonOk = document.createElement("button");
    modalButtonOk.classList.add("btn", "btn-success", "custom-btn-ok");
    modalButtonOk.setAttribute("type", "button");
    modalButtonOk.setAttribute("data-bs-dismiss", "modal");
    modalButtonOk.innerHTML = buttonOkText;
    modalButtonOk.onclick = onOkClick;
    let modalButtonCancel = document.createElement("button");
    modalButtonCancel.classList.add(
      "btn",
      "btn-outline-success",
      "custom-btn-cancel"
    );
    modalButtonCancel.setAttribute("type", "button");
    modalButtonCancel.setAttribute("data-bs-dismiss", "modal");
    modalButtonCancel.innerHTML = buttonCancelText;
    modalButtonCancel.onclick = onCancelClick;

    // Organize Modal
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalButtonClose);
    modalFooter.appendChild(modalButtonOk);
    modalFooter.appendChild(modalButtonCancel);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(bodyElement);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modalContainer.appendChild(modalDialog);
    return modalContainer;
  }

  createEmbedImageDialog() {
    let bodyElement = document.createElement("div");
    let titleElement = document.createElement("p");
    titleElement.textContent = "Upload Image";
    let labelElement = document.createElement("p");
    labelElement.classList.add("custom-modal-label");
    labelElement.textContent = "FILE UPLOAD";
    let uploadContainer = document.createElement("div");
    uploadContainer.classList.add("upload-container");
    let uploadButton = document.createElement("button");
    uploadButton.id = "embedImageUploadButton";
    uploadButton.classList.add(
      "btn",
      "btn-outline-success",
      "custom-btn-upload"
    );
    uploadButton.innerHTML = "Import Image from Device";
    let fileInput = document.createElement("input");
    fileInput.id = "embedImageFileInput";
    fileInput.classList.add("custom-file-input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("tabindex", "-1");
    fileInput.setAttribute("accept", "image/png, image/jpg, image/jpeg");

    let file: string | ArrayBuffer | null;
    fileInput.onchange = () => {
      if (fileInput.files != null) {
        let fileData = fileInput.files[0];
        if (fileData.name.length > 30) {
          let startName = fileData.name.substring(0, 11);
          let endName = fileData.name.substring(
            fileData.name.length - 16,
            fileData.name.length
          );
          uploadButton.innerHTML = `${startName}...${endName}`;
        } else {
          uploadButton.innerHTML = fileData.name;
        }
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileData);
        fileReader.onloadend = function (ev) {
          file = ev.target!.result;
        };
      }
    };
    uploadContainer.onclick = () => {
      fileInput.click();
    };

    // Organize body
    uploadContainer.appendChild(fileInput);
    uploadContainer.appendChild(uploadButton);
    bodyElement.appendChild(titleElement);
    bodyElement.appendChild(labelElement);
    bodyElement.appendChild(uploadContainer);

    // Create Dialog
    let embedImageDialog = this.createEmbedDialog(
      this.embedImageModalId,
      "Embed",
      bodyElement,
      "Embed",
      "Cancel",
      () => {
        // this.quill.focus();
        if (file != null) {
          const range = this.quill.getSelection(true)!;
          this.quill.insertEmbed(range.index, "image", file);
          //   Reset Files Upload
          fileInput.value = "";
          file = null;
          uploadButton.innerHTML = "Import Image from Device";
        }
      },
      () => {
        // this.quill.focus();
        //   Reset Files Upload
        fileInput.value = "";
        file = null;
        uploadButton.innerHTML = "Import Image from Device";
      }
    );
    return embedImageDialog;
  }

  createEmbedVideoDialog() {
    let bodyElement = document.createElement("div");
    let label1Element = document.createElement("p");
    label1Element.classList.add("custom-modal-label");
    label1Element.textContent = "VIDEO PROVIDER";
    let label2Element = document.createElement("p");
    label2Element.classList.add("custom-modal-label");
    label2Element.textContent = "URL";
    let selectElement = document.createElement("select");
    selectElement.classList.add("custom-modal-select");
    let option1Element = document.createElement("option");
    option1Element.classList.add("custom-modal-option");
    option1Element.value = "Youtube";
    option1Element.innerHTML = "Youtube";
    let option2Element = document.createElement("option");
    option2Element.classList.add("custom-modal-option");
    option2Element.value = "Vimeo";
    option2Element.innerHTML = "Vimeo";

    let inputElement = document.createElement("input");
    inputElement.id = "modalUrlInputId";
    inputElement.classList.add("custom-modal-input");
    inputElement.type = "text";
    inputElement.placeholder = "Enter URL...";

    // Organize body
    selectElement.appendChild(option1Element);
    selectElement.appendChild(option2Element);
    bodyElement.appendChild(label1Element);
    bodyElement.appendChild(selectElement);
    bodyElement.appendChild(label2Element);
    bodyElement.appendChild(inputElement);

    // Create Dialog
    let embedVideoDialog = this.createEmbedDialog(
      this.embedVideoModalId,
      "Embed",
      bodyElement,
      "Embed",
      "Cancel",
      () => {
        // this.quill.focus();
        let inputValue = inputElement.value;
        if (inputValue !== null && inputValue !== "") {
          const range = this.quill.getSelection(true)!;
          //   sanitize url  - inputValue
          this.quill.insertEmbed(range.index, "video", inputValue);
          //   Reset Files Upload
          inputElement.value = "";
          selectElement.selectedIndex = 0;
        }
      },
      () => {
        // this.quill.focus();
        //   Reset Files Upload
        inputElement.value = "";
        selectElement.selectedIndex = 0;
      }
    );
    return embedVideoDialog;
  }

  createEmbedSocialDialog() {
    let bodyElement = document.createElement("div");
    let label1Element = document.createElement("p");
    label1Element.classList.add("custom-modal-label");
    label1Element.textContent = "SOCIAL MEDIA PLATFORM";
    let label2Element = document.createElement("p");
    label2Element.classList.add("custom-modal-label");
    label2Element.textContent = "URL";
    let label3Element = document.createElement("p");
    label3Element.classList.add("custom-modal-label");
    label3Element.textContent = "CODE";
    let selectElement = document.createElement("select");
    selectElement.classList.add("custom-modal-select");
    let option1Element = document.createElement("option");
    option1Element.classList.add("custom-modal-option");
    option1Element.value = "Facebook";
    option1Element.innerHTML = "Facebook";
    let option2Element = document.createElement("option");
    option2Element.classList.add("custom-modal-option");
    option2Element.value = "Instagram";
    option2Element.innerHTML = "Instagram";
    let option3Element = document.createElement("option");
    option3Element.classList.add("custom-modal-option");
    option3Element.value = "Tiktok";
    option3Element.innerHTML = "Tiktok";

    let input1Element = document.createElement("input");
    input1Element.id = "modalSocialUrlInputId";
    input1Element.classList.add("custom-modal-input");
    input1Element.type = "text";
    input1Element.placeholder = "Enter URL...";

    let input2Element = document.createElement("input");
    input2Element.id = "modalSocialCodeInputId";
    input2Element.classList.add("custom-modal-input");
    input2Element.type = "text";
    input2Element.placeholder = "Enter Code...";

    let switchContainer = document.createElement("div");
    switchContainer.classList.add(
      "form-check",
      "form-switch",
      "custom-modal-switch-container"
    );
    let switchLabel = document.createElement("label");
    switchLabel.classList.add(
      "form-check-label",
      "custom-modal-label",
      "custom-modal-switch-label"
    );
    switchLabel.setAttribute("for", "modalSocialCodeSwitchId");
    switchLabel.textContent = "Disable caption";
    let switchInput = document.createElement("input");
    switchInput.id = "modalSocialCodeSwitchId";
    switchInput.classList.add("form-check-input", "custom-modal-switch-input");
    switchInput.type = "checkbox";
    switchInput.checked = true;

    // Organize body
    switchContainer.appendChild(switchLabel);
    switchContainer.appendChild(switchInput);
    selectElement.appendChild(option1Element);
    selectElement.appendChild(option2Element);
    selectElement.appendChild(option3Element);
    bodyElement.appendChild(label1Element);
    bodyElement.appendChild(selectElement);
    bodyElement.appendChild(label2Element);
    bodyElement.appendChild(input1Element);
    bodyElement.appendChild(label3Element);
    bodyElement.appendChild(input2Element);
    bodyElement.appendChild(switchContainer);

    // Create Dialog
    let embedSocialDialog = this.createEmbedDialog(
      this.embedSocialModalId,
      "Embed",
      bodyElement,
      "Embed",
      "Cancel",
      () => {
        // this.quill.focus();
        let inputValue = input1Element.value;
        if (inputValue !== null && inputValue !== "") {
          const range = this.quill.getSelection(true)!;
          //   sanitize url  - inputValue
          this.quill.insertEmbed(range.index, "video", inputValue);
          //   Reset Files Upload
          input1Element.value = "";
          input2Element.value = "";
          selectElement.selectedIndex = 0;
          switchInput.checked = true;
        }
      },
      () => {
        // this.quill.focus();
        //   Reset Files Upload
        input1Element.value = "";
        input2Element.value = "";
        selectElement.selectedIndex = 0;
        switchInput.checked = true;
      }
    );
    return embedSocialDialog;
  }

  update() {
    let text = this.quill.getText();
    text = text.trim();
    let elementMoreButton = document.querySelector<HTMLElement>(
      `#${this.moreButtonId}`
    );
    if (text.length > 0) {
      if (elementMoreButton == null) {
        let dropDown = this.createDropdown();
        this.container.appendChild(dropDown);
      }
    } else {
      if (elementMoreButton != null) {
        this.container.removeChild(elementMoreButton);
      }
    }
  }
}

export default MoreButton;
