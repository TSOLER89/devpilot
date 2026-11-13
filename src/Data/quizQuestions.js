export const quizQuestions = [
  {
    id: "integer-type",
    question: "Which C# type stores whole numbers such as 42?",
    answers: ["string", "bool", "int", "double"],
  },
  {
    id: "string-value",
    question: "Which line correctly declares a string variable in C#?",
    answers: [
      'string name = "DevPilot";',
      "string name = 'DevPilot';",
      'int name = "DevPilot";',
      'name string = "DevPilot";',
    ],
  },
  {
    id: "boolean-values",
    question: "Which values can a bool variable hold in C#?",
    answers: ["yes and no", "0 and 1", "on and off", "true and false"],
  },
  {
    id: "console-output",
    question: "Which method writes a line of text to the console in C#?",
    answers: [
      "Console.ReadLine()",
      "Console.WriteLine()",
      "Console.Print()",
      "Console.Log()",
    ],
  },
  {
    id: "conditional-statement",
    question: "Which keyword runs a block of code only when a condition is true?",
    answers: ["for", "return", "if", "using"],
  },
];
