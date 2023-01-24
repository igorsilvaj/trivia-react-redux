const mockFetch = {
  response_code: 0,
  results: [
    {
      category: 'Entertainment: Japanese Anime & Manga',
      type: 'multiple',
      difficulty: 'easy',
      question: 'In the 9th Pokemon movie, who is the Prince of the Sea?',
      correct_answer: 'Manaphy',
      incorrect_answers: [
        'Ash',
        'May',
        'Phantom',
      ],
    },
    {
      category: 'Entertainment: Television',
      type: 'boolean',
      difficulty: 'medium',
      question: `Like his character in Parks and Recreation,
Aziz Ansari was born in South Carolina.`,
      correct_answer: 'True',
      incorrect_answers: [
        'False',
      ],
    },
    {
      category: 'History',
      type: 'multiple',
      difficulty: 'medium',
      question: `What is the name of the ship which was only a few 
miles away from the RMS Titanic when it struck an iceberg on April 14, 1912?`,
      correct_answer: 'Californian',
      incorrect_answers: [
        'Carpathia',
        'Cristol',
        'Commerce',
      ],
    },
    {
      category: 'Science & Nature',
      type: 'multiple',
      difficulty: 'hard',
      question: 'How many protons are in an oxygen atom?',
      correct_answer: 'Eight',
      incorrect_answers: [
        'Four',
        'Two',
        'Six',
      ],
    },
    {
      category: 'Politics',
      type: 'multiple',
      difficulty: 'medium',
      question: 'Which of the following Argentinian presidents was elected in 2015?',
      correct_answer: 'Mauricio Macri',
      incorrect_answers: [
        'Cristina Fernandez de Kirchner',
        'Nestor Kirchner',
        'Juan Domingo Peron',
      ],
    },
  ],
};

export default mockFetch;
