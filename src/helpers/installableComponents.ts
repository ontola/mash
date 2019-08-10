import { NS } from "../LRS";

export const generatePackageDownloadUrl = (lrs, component) => {
  if (!component) {
    return undefined;
  }
  const npmLabel = lrs.getResourceProperty(component, NS.ll("npmLabel"));
  const npmVersion = lrs.getResourceProperty(component, NS.ll("npmVersion"));
  return `https://unpkg.com/${npmLabel}@${npmVersion}`;
};

export const generatePackageInfoUrl = (lrs, component) => {
  if (!component) {
    return undefined;
  }
  const npmLabel = lrs.getResourceProperty(component, NS.ll("npmLabel"));
  return `https://npmjs.com/package/${npmLabel}`;
};

export const installComponent = (lrs, component) => {
  const packageUrl = generatePackageDownloadUrl(lrs, component);
  const scriptTag = document.createElement("script");
  scriptTag.setAttribute("src", packageUrl);
  document.head.appendChild(scriptTag);
};
