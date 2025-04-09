const GLOBAL_LINKS = [
  {
    text: "TWU.ca",
    href: "https://twu.ca"
  },
  {
    text: "Moodle",
    href: "https://learn.twu.ca/"
  },
  {
    text: "Campus Portal",
    href: "https://trinitywestern.teamdynamix.com/TDClient/1904"
  },
  {
    text: "My Email",
    href: "https://outlook.office.com/"
  },
  {
    text: "Service Hub",
    href: "https://servicehub.twu.ca"
  },
  {
    text: "Library",
    href: "https://www.twu.ca/academics/library"
  }
];

const createElement = (el, classes, attributes = {}, content) => {
  const newEl = document.createElement(el);
  if (classes) {
    newEl.className = classes;
  }
  Object.keys(attributes).forEach(key => {
    newEl.setAttribute(key, attributes[key]);
  });
  if (content) {
    newEl.innerHTML = content;
  }
  return newEl;
};

const createNavLink = (link) => {
  return createElement('li', null, {}, `<a href="${link.href}" title="${link.text}">${link.text}</a>`);
};

const createGlobalHeader = () => {
  const twuGlobalHeader = createElement('div', 'twu-global-header');
  const header = createElement('header', 'd-flex flex-wrap justify-content-center py-1 px-4 mb-0');
  
  const logoLink = createElement('a', 'd-flex align-items-center mb-md-0 me-md-auto text-dark text-decoration-none', { href: '/' });
  const logo = createElement('img', null, {
    src: 'https://twuonline.github.io/course-materials/quarto/header-assets/TWU_HorizontalLogo_Grey.png',
    width: '180',
    title: 'Trinity Western University',
    alt: 'Trinity Western University Logo'
  });
  const label = createElement('label', 'twu-global-header-label', {}, '<strong>TWU</strong> Online');
  
  logoLink.append(logo);
  
  const nav = createElement('ul', 'nav');
  GLOBAL_LINKS.forEach((link) => {
    const li = createNavLink(link);
    nav.append(li);
  });
  
  header.append(logoLink, nav);
  twuGlobalHeader.append(header);
  
  return twuGlobalHeader;
};

// TWU Global Header
document.addEventListener("DOMContentLoaded", function () {
  document.body.insertBefore(createGlobalHeader(), document.body.firstChild);
});


document.head.appendChild(style);
