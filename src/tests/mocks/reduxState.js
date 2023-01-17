export const playerStateC = {
  player: {
    name: 'O Grande Testador',
    assertions: 5,
    score: 500,
    gravatarEmail: 'teste@teste.com'
  },
}

export const playerStateE = {
  player: {
    name: 'O Grande Testador',
    assertions: 1,
    score: 100,
    gravatarEmail: 'teste@teste.com'
  },
}

export const test = {
  questionsReducer: {
    questions: {
      response_code: 0,
      results: [
        {
          category: 'Entertainment: Music',
          type: 'multiple',
          difficulty: 'medium',
          question: 'Who had hits in the 70s with the songs &quot;Lonely Boy&quot; and &quot;Never Let Her Slip Away&quot;?',
          correct_answer: 'Andrew Gold',
          incorrect_answers: [
            'Elton John',
            'Leo Sayer',
            'Barry White '
          ]
        },
        {
          category: 'Entertainment: Film',
          type: 'multiple',
          difficulty: 'easy',
          question: 'What was the first monster to appear alongside Godzilla?',
          correct_answer: 'Anguirus',
          incorrect_answers: [
            'King Kong',
            'Mothra',
            'King Ghidora'
          ]
        },
        {
          category: 'Geography',
          type: 'multiple',
          difficulty: 'medium',
          question: 'The land mass of modern day Turkey is called what?',
          correct_answer: 'Anatolia',
          incorrect_answers: [
            'Ismuth of Ottoma',
            'Ottoma',
            'Ismuth of Anatolia'
          ]
        },
        {
          category: 'Entertainment: Film',
          type: 'boolean',
          difficulty: 'hard',
          question: 'The weapon Clint Eastwood uses in &quot;Dirty Harry&quot; was a .44 Automag.',
          correct_answer: 'False',
          incorrect_answers: [
            'True'
          ]
        },
        {
          category: 'Entertainment: Video Games',
          type: 'multiple',
          difficulty: 'easy',
          question: 'In the video game &quot;Postal 2&quot;, what is the name of Postal Dude&#039;s dog?',
          correct_answer: 'Champ',
          incorrect_answers: [
            'Snoopy',
            'Krotchy',
            'Duke'
          ]
        }
      ]
    },
    currentQuestion: 3,
    answers: [
      [
        {
          text: 'Andrew Gold',
          type: 'correct'
        },
        {
          text: 'Elton John',
          type: 'incorrect'
        },
        {
          text: 'Barry White ',
          type: 'incorrect'
        },
        {
          text: 'Leo Sayer',
          type: 'incorrect'
        }
      ],
      [
        {
          text: 'King Ghidora',
          type: 'incorrect'
        },
        {
          text: 'Anguirus',
          type: 'correct'
        },
        {
          text: 'Mothra',
          type: 'incorrect'
        },
        {
          text: 'King Kong',
          type: 'incorrect'
        }
      ],
      [
        {
          text: 'Ismuth of Anatolia',
          type: 'incorrect'
        },
        {
          text: 'Anatolia',
          type: 'correct'
        },
        {
          text: 'Ottoma',
          type: 'incorrect'
        },
        {
          text: 'Ismuth of Ottoma',
          type: 'incorrect'
        }
      ],
      [
        {
          text: 'False',
          type: 'correct'
        },
        {
          text: 'True',
          type: 'incorrect'
        }
      ],
      [
        {
          text: 'Duke',
          type: 'incorrect'
        },
        {
          text: 'Snoopy',
          type: 'incorrect'
        },
        {
          text: 'Champ',
          type: 'correct'
        },
        {
          text: 'Krotchy',
          type: 'incorrect'
        }
      ]
    ],
    isFetching: false,
    isBtnDisabled: true
  },
  timerReducer: {
    timerStopped: 30,
    timer: 29
  },
  player: {
    name: 'fasdfas',
    assertions: 1,
    score: 97,
    gravatarEmail: 'asdfas@fasdfas.com'
  }
}