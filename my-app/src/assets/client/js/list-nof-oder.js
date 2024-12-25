function toggleList(listId) {
  var element = document.getElementById(listId);
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}
