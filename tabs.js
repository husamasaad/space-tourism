


const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

let tabFocus = 0;

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
})





function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);
  }

  if (e.keyCode === keydownRight) {
    tabFocus = tabFocus++ < tabs.length - 1 ? tabFocus++ : 0;
  }
  else if (e.keyCode === keydownLeft) {
    tabFocus = tabFocus-- > 0 ? tabFocus-- : tabs.length - 1;
  }
  tabs[tabFocus].setAttribute("tabindex", 0);
  tabs[tabFocus].focus();
}


function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute('aria-controls');
  const targetName = targetPanel.split('-')[0];
  const tabContainer = targetTab.parentNode;
  const mainContaienr = tabContainer.parentNode;

  tabs.forEach((tab) => {
    tab.setAttribute('aria-selected', false);
  })

  targetTab.setAttribute('aria-selected', true);

  hideContent(mainContaienr, 'article');
  hideContent(mainContaienr, 'picture');

  showContent(mainContaienr, [`#${targetPanel}`]);
  showContent(mainContaienr, [`#${targetName}-image`]);

}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
  parent
    .querySelector(content)
    .removeAttribute('hidden');
}