export const isValidUrl = (urlString: string) => {
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://usetuls.com";

  return base_url;
};

const base_url = checkEnvironment();

export const usetulsTitleDivider = " - ";

export const usetulsTitleSuffix = "Usetuls";

/**
 * @param {string} url
 */
export function isSVGFormatImage(url: string) {
  return url.endsWith(".svg");
}
