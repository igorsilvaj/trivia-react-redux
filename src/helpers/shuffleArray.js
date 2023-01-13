const magicNumber = 0.6;

const shuffle = (array) => {
  array.sort(() => Math.random() - magicNumber);
};

export default shuffle;
