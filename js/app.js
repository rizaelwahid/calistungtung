import { Level1 } from "./level1.js";

class App {
  constructor() {
    // console.log("App constructor init");
    this.currentLevel = null;
  }

  start(level = 1) {
    // console.log("Start level", level);
    switch (level) {
      case 1:
        this.currentLevel = new Level1();
        break;
    }

    this.currentLevel.init();
  }
}

new App().start(1);
