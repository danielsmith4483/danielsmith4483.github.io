import "./style";
import App from "./components/app";

if (typeof window !== "undefined") {
  var WebFont = require("webfontloader");

  WebFont.load({
    google: {
      families: ["Raleway", "Open Sans"]
    }
  });
}

export default App;
