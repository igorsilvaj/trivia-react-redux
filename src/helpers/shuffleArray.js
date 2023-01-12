const magicNumber = 0.5;

const shuffle = (array) => {
  array.sort(() => Math.random() - magicNumber);
};

export default shuffle;
