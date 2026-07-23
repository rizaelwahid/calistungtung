import { course1 } from "./course1.js";

class App {
  constructor() {
    this.currentcourse = null;
  }

  start(course = 1) {
    // Bersihkan course sebelumnya jika ada
    if (this.currentcourse?.destroy) {
      this.currentcourse.destroy();
    }

    switch (course) {
      case 1:
        this.currentcourse = new course1();
        break;
      case 2:
        this.currentcourse = new course2();
        break;
    }

    this.currentcourse.init();
  }
}

const app = new App();
app.start(1);

window.app = app;

window.addEventListener("load", () => {
  const fabButton = document.getElementById("fabButton");
  const fabMenu = document.getElementById("fabMenu");

  let menuOpen = false;

  fabButton.onclick = () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
      fabMenu.classList.remove(
        "opacity-0",
        "pointer-events-none",
        "-translate-x-4",
      );
      fabMenu.classList.add("opacity-100", "translate-x-0");
      fabButton.innerHTML = '<i class="fas fa-xmark text-xl"></i>';
    } else {
      fabMenu.classList.add(
        "opacity-0",
        "pointer-events-none",
        "-translate-x-4",
      );
      fabMenu.classList.remove("opacity-100", "translate-x-0");
      fabButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    }
  };

  document.querySelectorAll(".menu-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const level = Number(btn.dataset.level);

      window.app.start(level);

      fabButton.click(); // tutup menu
    });
  });
});
