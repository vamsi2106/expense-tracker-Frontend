// src/utilscookieUtils.ts
import Cookies from "js-cookie";

export const setCookie = (name: string, value: string, days?: number) => {
  Cookies.set(name, value, { expires: days });
};

export const getCookie = (name: string) => {
  return Cookies.get(name) || "";
};

export const removeCookie = (name: string) => {
  document.cookie =
    name + "=; Max-Age=0; path=/; domain=" + window.location.hostname;
  Cookies.remove(name);
};
