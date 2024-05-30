export const isValidUrl = (urlString: string) => {
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    return false;
  }
  return url.protocol === "https:";
};

export const isImageLink = (link: string) => {
  const imageExtensions = [
    ".jpeg",
    ".jpg",
    ".gif",
    ".png",
    ".ico",
    ".svg",
    ".webp",
    ".ico",
  ];
  const fileExtension = link.substring(link.lastIndexOf("."));
  return imageExtensions.includes(fileExtension);
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

export const isValidImage = (url: string) => {
  return url.match(/\.(jpeg|jpg|gif|png|ico|svg)$/) != null;
};

export async function isWebpageAvailable(url: string) {
  try {
    const response = await fetch(url);
    return response.status === 200;
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    return false;
  }
}

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

type ModalSettings = {
  scrollBehavior: "inside" | "normal" | "outside" | undefined;
  motionProps: {
    variants: {
      enter: {
        y: number;
        opacity: number;
        transition: {
          duration: number;
          ease: string;
        };
      };
      exit: {
        y: number;
        opacity: number;
        transition: {
          duration: number;
          ease: string;
        };
      };
    };
  };
};

export const modalSettings: ModalSettings = {
  scrollBehavior: "inside",
  motionProps: {
    variants: {
      enter: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
      exit: {
        y: -20,
        opacity: 0,
        transition: {
          duration: 0.2,
          ease: "easeIn",
        },
      },
    },
  },
};
