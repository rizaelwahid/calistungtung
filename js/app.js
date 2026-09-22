// app.js

import { Course1 } from "./course1.js";
// import { Course2 } from "./course2.js";

// Daftar course yang tersedia
const courses = {
  1: Course1,
  // 2: Course2,
};

class App {
  constructor() {
    this.currentCourse = null;
  }

  start(course = 0) {
    // Simpan course aktif
    localStorage.setItem("currentCourse", course);

    // Bersihkan course sebelumnya
    this.currentCourse?.destroy?.();
    this.currentCourse = null;

    // Bersihkan container
    const app = document.getElementById("app");
    app.innerHTML = "";

    // Beranda
    if (course === 0) {
      app.innerHTML = `
      <div class="flex items-center justify-center h-screen">
        <h1 class="text-4xl font-bold">
          Selamat Datang 👋
        </h1>
      </div>
    `;
      return;
    }

    const Course = courses[course];

    if (!Course) {
      console.warn(`Course ${course} belum tersedia.`);
      return;
    }

    this.currentCourse = new Course();
    this.currentCourse.init();
  }
}

const app = new App();
window.app = app;

// Course pertama saat aplikasi dibuka
const lastCourse = Number(localStorage.getItem("currentCourse") ?? 0);
app.start(lastCourse);

window.addEventListener("load", () => {
  const fabButton = document.getElementById("fabButton");
  const fabMenu = document.getElementById("fabMenu");

  let menuOpen = false;

  function openMenu() {
    fabMenu.classList.remove(
      "opacity-0",
      "pointer-events-none",
      "-translate-x-4",
    );

    fabMenu.classList.add("opacity-100", "translate-x-0");

    fabButton.innerHTML = '<i class="fas fa-xmark text-xl"></i>';

    menuOpen = true;
  }

  function closeMenu() {
    fabMenu.classList.add("opacity-0", "pointer-events-none", "-translate-x-4");

    fabMenu.classList.remove("opacity-100", "translate-x-0");

    fabButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';

    menuOpen = false;
  }

  fabButton.addEventListener("click", () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.querySelectorAll(".menu-item").forEach((button) => {
    button.addEventListener("click", () => {
      const course = Number(button.dataset.course);

      app.start(course);

      closeMenu();
    });
  });
});
