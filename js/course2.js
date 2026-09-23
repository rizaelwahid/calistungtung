import { loadJSON } from "./utils.js";

export class Course2 {
  constructor() {
    this.levelIndex = 0;
    this.syllableIndex = 0;
    this.data = null;
    this.mode = "levels";
  }

  async init() {
    const container = document.getElementById("app");

    container.innerHTML = `
      <div id="course2-container" class="relative w-full h-[80vh]">
      </div>
    `;

    this.data = await loadJSON("data/course2.json");

    if (!this.data || !this.data.levels || this.data.levels.length === 0) {
      container.innerHTML = `
        <div class="w-full h-[80vh] flex items-center justify-center">
          <p class="text-xl font-semibold">
            Materi course belum tersedia.
          </p>
        </div>
      `;

      return;
    }

    this.renderLevels();
  }

  destroy() {
    const container = document.getElementById("app");

    if (container) {
      container.innerHTML = "";
    }

    this.data = null;
  }

  getContainer() {
    return document.getElementById("course2-container");
  }

  getRandomColor() {
    const colorList = [
      "#FFADAD",
      "#FFD6A5",
      "#FDFFB6",
      "#CAFFBF",
      "#9BF6FF",
      "#A0C4FF",
      "#BDB2FF",
      "#FFC6FF",
      "#FFB6C1",
      "#FF99CC",
      "#FFC0CB",
      "#EEF1DA",
      "#D5E5D5",
      "#AAB99A",
      "#A7727D",
      "#D1D1D1",
    ];

    return colorList[Math.floor(Math.random() * colorList.length)];
  }

  // =========================================================
  // PEMILIHAN LEVEL
  // =========================================================

  renderLevels() {
    this.mode = "levels";

    const wrapper = this.getContainer();

    if (!wrapper) return;

    wrapper.innerHTML = `
      <div class="relative w-full h-[80vh] flex items-center justify-center">

        <div class="w-[90%] max-w-5xl h-[90%] flex flex-col">

          <!-- Header -->

          <div class="text-center mb-5 shrink-0">

            <h1 class="text-3xl md:text-4xl font-bold text-black">
              ${this.data.course.title}
            </h1>

            <p class="mt-2 text-base md:text-lg text-gray-600">
              ${this.data.course.description}
            </p>

          </div>


          <!-- Daftar Level -->

          <div
            id="levelList"
            class="flex-1 overflow-y-auto
                   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                   gap-4 p-2"
          >

            ${this.data.levels
              .map((level, index) => {
                const color = this.getRandomColor();

                return `
                  <button
                    class="level-item
                           w-full min-h-[130px]
                           rounded-2xl
                           shadow-lg
                           flex flex-col
                           items-center justify-center
                           transition duration-200
                           hover:scale-[1.02]
                           active:scale-95"
                    data-level="${index}"
                    style="background-color: ${color}"
                  >

                    <span class="text-2xl font-bold text-black mt-1">
                      ${level.title}
                    </span>

                    <span class="text-sm text-gray-700 mt-1">
                      ${level.syllables.length} suku kata
                    </span>

                  </button>
                `;
              })
              .join("")}

          </div>

        </div>

      </div>
    `;

    wrapper.querySelectorAll(".level-item").forEach((button) => {
      button.onclick = () => {
        const level = Number(button.dataset.level);

        this.openLevel(level);
      };
    });
  }

  // =========================================================
  // MEMBUKA LEVEL
  // =========================================================

  openLevel(levelIndex) {
    if (!this.data || !this.data.levels || !this.data.levels[levelIndex]) {
      return;
    }

    this.levelIndex = levelIndex;
    this.syllableIndex = 0;
    this.mode = "syllables";

    this.renderSyllable();
  }

  // =========================================================
  // TAMPILKAN SUKU KATA
  // =========================================================

  renderSyllable() {
    const level = this.data.levels[this.levelIndex];

    if (!level || !level.syllables || level.syllables.length === 0) {
      return;
    }

    const syllable = level.syllables[this.syllableIndex];

    const wrapper = this.getContainer();

    if (!wrapper) return;

    const randomColor = this.getRandomColor();

    wrapper.innerHTML = `
      <div
        class="relative w-full h-[80vh]
               flex items-center justify-center"
      >

        <!-- =================================================
             KONTEN UTAMA
             ================================================= -->

        <div
          class="relative
                 w-[80%]
                 max-w-4xl
                 h-[70%]
                 p-5 md:p-8
                 rounded-2xl
                 shadow-lg
                 flex flex-col
                 items-center
                 justify-center"
          style="background-color: ${randomColor}"
        >

          <!-- Judul Level -->

          <div class="text-center mb-4 shrink-0">

            <h2 class="text-xl md:text-2xl font-bold text-black">
              ${level.title}
            </h2>

          </div>

          <!-- Kembali ke Level -->

          <div class="w-full mb-3 shrink-0 flex justify-start">

            <button
              id="levelBtn"
              class="shadow-md
                    rounded-full
                    px-5 h-10
                    text-sm md:text-base
                    font-bold
                    hover:opacity-80
                    flex items-center
                    justify-center
                    gap-2"
              style="background-color: white"
            >
              <i class="fa-solid fa-list"></i>

              <span>
                Suku Kata Lain
              </span>
            </button>

          </div>


          <!-- =================================================
               SUKU KATA
               ================================================= -->

          <div
            class="w-full
                   flex-1
                   min-h-0
                   flex items-center justify-center
                   bg-white bg-opacity-70
                   rounded-2xl"
          >

            <span
              class="text-7xl
                     sm:text-8xl
                     md:text-[9rem]
                     font-bold
                     text-black
                     select-none"
            >
              ${syllable}
            </span>

          </div>


          <!-- =================================================
               PROGRESS
               ================================================= -->

          <div
            class="mt-3
                   text-base md:text-lg
                   font-semibold
                   text-gray-700
                   shrink-0"
          >
            ${this.syllableIndex + 1}
            /
            ${level.syllables.length}
          </div>

        </div>


        <!-- =================================================
             TOMBOL NEXT
             ================================================= -->

        <button
          id="nextBtn"
          class="absolute right-4 z-10
                 shadow-md
                 rounded-full
                 w-12 h-12
                 text-xl
                 hover:opacity-80
                 flex items-center justify-center"
          style="background-color: ${randomColor}"
          aria-label="Suku kata berikutnya"
        >
          <i class="fa-solid fa-forward"></i>
        </button>
      
        <!-- =================================================
             BACK NEXT
             ================================================= -->

        <button
          id="backBtn"
          class="absolute left-4 z-10
                 shadow-md
                 rounded-full
                 w-12 h-12
                 text-xl
                 hover:opacity-80
                 flex items-center justify-center"
          style="background-color: ${randomColor}"
          aria-label="Suku kata sebelumnya"
        >
          <i class="fa-solid fa-backward"></i>
        </button>

           <!-- =================================================
               RANDOM
               ================================================= -->

          <!-- Tombol Random -->
      <button id="randomBtn" class="absolute bottom-4 z-10 shadow-md rounded-full w-32 h-12 text-xl font-bold hover:opacity-80 flex items-center justify-center"
        style="background-color: ${randomColor}">
        <i class="fa-solid fa-random"></i>
      </button>

      </div>
    `;

    // =======================================================
    // EVENT
    // =======================================================

    wrapper.querySelector("#backBtn").onclick = () => {
      this.back();
    };

    wrapper.querySelector("#nextBtn").onclick = () => {
      this.next();
    };

    wrapper.querySelector("#levelBtn").onclick = () => {
      this.renderLevels();
    };

    wrapper.querySelector("#randomBtn").onclick = () => {
      this.random();
    };
  }

  // =========================================================
  // NEXT
  // =========================================================

  next() {
    const level = this.data?.levels?.[this.levelIndex];

    if (!level || !level.syllables || level.syllables.length === 0) {
      return;
    }

    this.syllableIndex++;

    if (this.syllableIndex >= level.syllables.length) {
      this.syllableIndex = 0;
    }

    this.renderSyllable();
  }

  // =========================================================
  // BACK SUKU KATA
  // =========================================================

  back() {
    const level = this.data?.levels?.[this.levelIndex];

    if (!level || !level.syllables || level.syllables.length === 0) {
      return;
    }

    this.syllableIndex--;

    if (this.syllableIndex < 0) {
      this.syllableIndex = level.syllables.length - 1;
    }

    this.renderSyllable();
  }

  // =========================================================
  // RANDOM
  // =========================================================

  random() {
    const level = this.data?.levels?.[this.levelIndex];

    if (!level || !level.syllables || level.syllables.length === 0) {
      return;
    }

    this.syllableIndex = Math.floor(Math.random() * level.syllables.length);

    this.renderSyllable();
  }
}
