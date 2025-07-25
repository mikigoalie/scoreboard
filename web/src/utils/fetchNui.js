import { isEnvBrowser } from "./misc";

export const fetchNui = async (eventName, data, mockData) => {
  const options = {
    method: "post",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data),
  };

  if (isEnvBrowser()) return mockData;
  
  const resourceName = window.GetParentResourceName ? window.GetParentResourceName() : "nui-frame-app";
  const resp = await fetch(`https://${resourceName}/${eventName}`, options);
  const respFormatted = await resp.json();
  return respFormatted;
}