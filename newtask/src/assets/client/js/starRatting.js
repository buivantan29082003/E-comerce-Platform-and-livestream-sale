const averageRating = 4.2; // Rating trung bình, ví dụ 4.2
const maxRating = 5;
const starInner = document.querySelector(".star-inner");
starInner.style.width = `${(averageRating / maxRating) * 100}%`;
