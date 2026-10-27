const startBtn = document.querySelector(".start");
const symbols = [
  { selector: ".first", text: "Ты" },
  { selector: ".second", text: "всё" },
  { selector: ".third", text: "сможешь" },
];

let isScanning = false;

startBtn.addEventListener("click", async () => {
  if (isScanning) return;
  isScanning = true;

  startBtn.classList.add("hidden");

  for (const symbol of symbols) {
    await scanSymbol(symbol.selector);
  }

  setTimeout(() => {
    document.querySelectorAll(".icon-btn").forEach((btn) => {
      btn.classList.remove("scanning");
    });
  }, 300);
});

function scanSymbol(selector) {
  return new Promise((resolve) => {
    const btn = document.querySelector(selector);
    const wrapper = btn.querySelector(".glyph-wrapper");
    const hint = btn.querySelector(".hint");

    btn.classList.add("scanning");

    wrapper.classList.add("active");

    wrapper.addEventListener(
      "animationend",
      () => {
        btn.classList.remove("light");
        wrapper.style.transform = "scale(1)";
        hint.classList.add("visible");
        setTimeout(resolve, 500);
      },
      { once: true },
    );
  });
}
