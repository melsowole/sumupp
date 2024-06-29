import Button from "./Button";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";

/**
 * createForm - Generates a form element based on provided input information.
 *
 * @param {Array} inputInfoArray - Array of objects representing input elements.
 *        Each object should have the following properties:
 *        - type (string, required): The HTML input element type. Can be 'input/text', 'input/number', etc, 'textarea', or 'editor'.
 *        - text (string, required): The label text for the input element.
 *        - id (string, optional): The id attribute for the input element. Defaults to the value of 'text' if not provided.
 *        - name (string, optional): The name attribute for the input element. Defaults to the value of 'text' if not provided.
 *        - required (boolean): Whether the input element is required. Defaults to false if not provided.
 * @param {Function} submitAction - Callback function to be executed on form submission.
 *        The page will reload after the callback is triggered.
 * @returns {HTMLElement} - The generated form element.
 */

export default class Form {
  constructor(inputInfoArray, submitText, submitAction) {
    this.editor;

    const form = document.createElement("form");

    inputInfoArray.forEach((inputInfo) => {
      form.append(this._createFormInput(inputInfo));
    });

    const submitBtn = new Button("text", submitText);
    form.append(submitBtn);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = Object.fromEntries(new FormData(e.target).entries());

      if (this.editor) {
        formData.data = await this.editor.save();
      }

      submitAction(formData).then((r) => {
        window.location.reload();
      });
    });

    return form;
  }

  _createFormInput(inputInfo) {
    if (inputInfo.type == "editor") {
      return this._createEditor();
    } else {
      return this._createLabelInputWrapper(inputInfo);
    }
  }

  _createLabelInputWrapper({ type, text, id, name, required }) {
    id = id ? id : text;
    name = name ? name : text;

    const wrapper = document.createElement("div");
    wrapper.classList.add("input-wrapper");

    const label = document.createElement("label");
    label.textContent = text;
    label.htmlFor = id;

    let input;
    if (type == "textarea") {
      input = document.createElement(type);
    } else {
      const inputType = type.split("/");
      input = document.createElement("input");
      input.type = inputType[1];
    }
    input.id = id;
    input.name = name;
    input.required = required;

    wrapper.append(label, input);

    return wrapper;
  }

  _createEditor() {
    this.editor = new EditorJS({
      minHeight: 50,
      tools: {
        header: {
          class: Header,
          config: {
            levels: [1, 2],
            defaultLevel: 1,
          },
        },
      },
    });

    const editorContainer = document.createElement("div");
    editorContainer.id = "editorjs";

    return editorContainer;
  }
}
