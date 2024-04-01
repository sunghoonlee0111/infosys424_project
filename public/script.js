function showModal(modalId) {
  // 모든 모달을 숨깁니다.
  var modals = document.querySelectorAll(".modal");
  for (var i = 0; i < modals.length; i++) {
    modals[i].classList.add("hidden");
  }

  // 지정된 모달을 표시합니다.
  var modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden");
  }
}
