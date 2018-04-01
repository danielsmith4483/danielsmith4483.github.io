import "./style";
import App from "./components/app";

if (typeof window !== "undefined") {
  var WebFont = require("webfontloader");

  WebFont.load({
    google: {
      families: ["Space Mono", "Open Sans"]
    }
  });
}

export default App;
