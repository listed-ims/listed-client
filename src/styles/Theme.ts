import { extendTheme } from "native-base";
import { inter } from "./FontFamily";
import { offWhite, primary } from "./Colors";

export const theme = extendTheme({
  fontConfig: {
    Inter: inter,
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  colors: {
    primary: primary,
    offWhite: offWhite,
  },
});
