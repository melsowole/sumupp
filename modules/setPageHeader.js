import Button from "./Button";

export default function setPageHeader(title, backRoute, actions) {
  const header = document.getElementById("page-header");

  const pageTitle = document.createElement("h1");
  pageTitle.textContent = title;
  header.append(pageTitle);

  if (backRoute) {
    const backButton = createBackButton();

    header.prepend(backButton);

    backButton.addEventListener("click", () => {
      window.location.assign(backRoute);
    });
  }

  if (actions) {
    const actionContainer = document.createElement("span");
    actionContainer.id = "page-actions";
    header.append(actionContainer);

    actions.forEach((action) => {
      actionContainer.append(action);
    });
  }
}

function createBackButton() {
  const backButton = new Button("icon", "back", "arrow_back");
  backButton.id = "back-nav";

  return backButton;
}
