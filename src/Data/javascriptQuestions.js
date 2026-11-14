export const javascriptQuestions = [
  {
    id: "js-let-variable",
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    answers: ["const", "var", "let", "static"],
    correctAnswer: "let",
    explanation: "let declares a block-scoped variable that can be reassigned. const prevents reassignment, while var is function-scoped rather than block-scoped.",
  },
  {
    id: "js-string-type",
    question: 'What does typeof "DevPilot" return?',
    answers: ['"text"', '"string"', '"char"', '"object"'],
    correctAnswer: '"string"',
    explanation: 'typeof returns a string describing a value\'s type. "DevPilot" is a string, so the result is "string".',
  },
  {
    id: "js-first-array-item",
    question: "Which expression gets the first item in an array named colors?",
    answers: ["colors[1]", "colors.first()", "colors(0)", "colors[0]"],
    correctAnswer: "colors[0]",
    explanation: "JavaScript arrays use zero-based indexing. The first item is at index 0, the second at index 1, and so on.",
  },
  {
    id: "js-strict-equality",
    question: 'What is the result of 5 === "5"?',
    answers: ["false", "true", "undefined", "5"],
    correctAnswer: "false",
    explanation: "Strict equality (===) does not convert types. The number 5 and the string containing 5 have different types, so the result is false.",
  },
  {
    id: "js-console-output",
    question: "Which statement writes a message to the browser developer console?",
    answers: [
      'Console.WriteLine("Hello");',
      'console.read("Hello");',
      'console.log("Hello");',
      'print.console("Hello");',
    ],
    correctAnswer: 'console.log("Hello");',
    explanation: "console.log writes a message to the developer console. JavaScript is case-sensitive, so the lowercase spelling matters.",
  },
];
