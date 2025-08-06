document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title");
  const banner = document.getElementById("banner");

  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btn3 = document.getElementById("btn3");

  let btn1Timeout = null;
  let btn2Timeout = null;
  let btn3Timeout = null;

  const showButtonsSequentially = () => {
    if (banner.classList.contains("show")) {
      // Show button 1
      clearTimeout(btn1Timeout);
      btn1Timeout = setTimeout(() => {
        btn1.classList.add("visible");

        // Then show button 2
        clearTimeout(btn2Timeout);
        btn2Timeout = setTimeout(() => {
          btn2.classList.add("visible");

          // Then show button 3
          clearTimeout(btn3Timeout);
          btn3Timeout = setTimeout(() => {
            btn3.classList.add("visible");
          }, 150);
        }, 150);
      }, 100);
    }
  };

  const hideAllButtons = () => {
    clearTimeout(btn1Timeout);
    clearTimeout(btn2Timeout);
    clearTimeout(btn3Timeout);
    btn1.classList.remove("visible");
    btn2.classList.remove("visible");
    btn3.classList.remove("visible");
  };

  // Observer for title visibility
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        banner.classList.remove("show");
        banner.classList.add("hide");
        hideAllButtons();
      } else {
        banner.classList.remove("hide");
        banner.classList.add("show");
        showButtonsSequentially();
      }
    },
    { threshold: [0, 0.5, 1] }
  );
  observer.observe(title);

  // Also show buttons if returning to page and title is already hidden
  window.addEventListener("load", () => {
    const titleRect = title.getBoundingClientRect();
    if (titleRect.bottom < 0 || titleRect.top < 0) {
      banner.classList.add("show");
      banner.classList.remove("hide");
      showButtonsSequentially();
    }
  });
});
