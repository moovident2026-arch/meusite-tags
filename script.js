<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".btn-comprar").forEach((btn) => {

    btn.addEventListener("click", () => {

      const produto = btn.getAttribute("data-produto");

      window.location.href = `/checkout/${produto}`;

    });

  });

=======
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".btn-comprar").forEach((btn) => {

    btn.addEventListener("click", () => {

      const produto = btn.getAttribute("data-produto");

      window.location.href = `/checkout/${produto}`;

    });

  });

>>>>>>> e89eb6421e468d50ea3f326b51dc1eb7e3768805
});