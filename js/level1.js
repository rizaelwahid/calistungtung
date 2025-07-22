import { loadJSON, playAudio } from "./utils.js";

export class Level1 {
  constructor() {
    this.index = 0;
    this.data = [];
  }

  async init() {
    const container = document.getElementById("app");
    container.innerHTML = '<div id="level1-container" class="relative"></div>';

    this.data = await loadJSON("data/level1.json");
    this.renderHuruf(this.index);
  }

  renderHuruf(index) {
    const item = this.data[index];
    const wrapper = document.getElementById("level1-container");

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
    const randomColor = colorList[Math.floor(Math.random() * colorList.length)];

    const randomImage = Array.isArray(item.gambar)
      ? item.gambar[Math.floor(Math.random() * item.gambar.length)]
      : item.gambar;

    wrapper.innerHTML = `
    <div class="relative w-full h-[80vh] flex items-center justify-center" style="background-color: bg-white">

     <!-- Tombol Back -->
      <button id="backBtn" class="absolute left-4 z-10 shadow-md rounded-full w-12 h-12 text-xl hover:opacity-80 flex items-center justify-center"
        style="background-color: ${randomColor}">
        <i class="fa-solid fa-backward"></i>
      </button>

      <!-- Konten -->
      <div class="grid grid-cols-2 grid-rows-2 gap-4 w-[80%] h-[70%] p-4 rounded-lg shadow-lg" 
        style="background-color: ${randomColor}">

        <!-- Huruf besar -->
        <div class="play-audio flex items-center justify-center text-8xl font-bold text-black bg-white bg-opacity-60 rounded-md cursor-pointer">
          ${item.huruf.toUpperCase()}
        </div>

        <!-- Gambar -->
        <div class="row-span-2 flex items-center justify-center bg-white bg-opacity-60 rounded-md">
          <img src="${randomImage}" alt="${
      item.huruf
    }" class="w-48 h-48 object-contain" />
        </div>

        <!-- Huruf kecil -->
        <div class="play-audio flex items-center justify-center text-7xl font-semibold text-black bg-white bg-opacity-60 rounded-md cursor-pointer">
          ${item.huruf.toLowerCase()}
        </div>
      </div>

      <!-- Tombol Next -->
      <button id="nextBtn" class="absolute right-4 z-10 shadow-md rounded-full w-12 h-12 text-xl hover:opacity-80 flex items-center justify-center"
        style="background-color: ${randomColor}">
        <i class="fa-solid fa-forward"></i>
      </button>
    </div>
  `;

    // Event
    wrapper.querySelector("#nextBtn").onclick = () => this.next();
    wrapper.querySelector("#backBtn").onclick = () => this.back();
    wrapper.querySelectorAll(".play-audio").forEach((el) => {
      el.onclick = () => playAudio(item.audio);
    });
  }

  next() {
    if (!this.data || this.data.length === 0) return;
    this.index++;
    if (this.index >= this.data.length) {
      this.index = 0;
    }
    this.renderHuruf(this.index);
  }

  back() {
    if (!this.data || this.data.length === 0) return;
    this.index--;
    if (this.index < 0) {
      this.index = this.data.length - 1;
    }
    this.renderHuruf(this.index);
  }
}
