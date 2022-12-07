export const randomQuesFromDB = (data, length) => {
  let count = 0;
  let currentIndex = data.length;
  let randomIndex;
  while (count <= length - 1 && currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Transfer
    let temp = data[currentIndex];
    data[currentIndex] = data[randomIndex];
    data[randomIndex] = temp;
    count++;
  }
  let dataMix = [];
  for (let i = 0; i < count; i++) dataMix[i] = data[i];
  return dataMix;
};
