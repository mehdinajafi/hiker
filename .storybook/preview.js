import { LazyMotion, domAnimation } from "framer-motion";
import "../public/globals.css";

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <LazyMotion features={domAnimation}>
      <Story />
    </LazyMotion>
  ),
];
