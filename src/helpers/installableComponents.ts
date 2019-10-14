import ll from "../ontology/ll";

export const generatePackageDownloadUrl = (lrs, component) => {
  if (!component) {
    return undefined;
  }
  const npmLabel = lrs.getResourceProperty(component, ll.ns("npmLabel"));
  const npmVersion = lrs.getResourceProperty(component, ll.ns("npmVersion"));
  return `https://unpkg.com/${npmLabel}@${npmVersion}`;
};

export const generatePackageInfoUrl = (lrs, component) => {
  if (!component) {
    return undefined;
  }
  const npmLabel = lrs.getResourceProperty(component, ll.ns("npmLabel"));
  return `https://npmjs.com/package/${npmLabel}`;
};

export const installComponent = (lrs, component) => {
  const packageUrl = generatePackageDownloadUrl(lrs, component);
  const scriptTag = document.createElement("script");
  scriptTag.setAttribute("src", packageUrl);
  document.head.appendChild(scriptTag);
};
