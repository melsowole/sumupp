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
  constructor(formElInfoArray, submitText, submitAction, redirect) {
    this.editor;
    this.currentSection;
    this.form;

    const form = document.createElement("form");
    this.form = form;
    this.currentSection = this.form;

    formElInfoArray.forEach((elInfo) => {
      const el = this._createFormEl(elInfo);
      this.currentSection.append(el);

      if (elInfo.type == "section") {
        this.currentSection = el;
      }
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
        if (redirect) {
          console.log("wants to redirect to:", redirect);
        } else {
          window.location.reload();
        }
      });
    });

    return form;
  }

  _createFormEl(elInfo) {
    if (elInfo.type == "editor") {
      return this._createEditor();
    } else if (elInfo.type == "section") {
      const fieldset = document.createElement("fieldset");
      const legend = document.createElement("legend");
      legend.textContent = elInfo.text;
      fieldset.append(legend);

      return fieldset;
    } else {
      return this._createLabelInputWrapper(elInfo);
    }
  }

  _createLabelInputWrapper({ type, text, id, name, required, value }) {
    id = id ? id : text;
    name = name ? name : text;

    if (type == "input/hidden") {
      return this._createInput(type, id, name, required, value);
    }

    const wrapper = document.createElement("div");
    wrapper.classList.add("input-wrapper");

    wrapper.append(
      this._createLabel(text, id),
      this._createInput(type, id, name, required, value)
    );

    return wrapper;
  }

  _createLabel(text, id) {
    const label = document.createElement("label");
    label.textContent = text;
    label.htmlFor = id;

    return label;
  }

  _createInput(type, id, name, required, value) {
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
    input.value = value ? value : "";

    return input;
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
