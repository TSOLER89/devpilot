export const quizQuestions = [
  {
    id: "integer-type",
    question: "Which C# type is an integer type for whole numbers such as 42?",
    answers: ["string", "bool", "int", "double"],
    correctAnswer: "int",
    explanation: "int stores 32-bit signed integers. double is a floating-point type, even though it can also represent values such as 42.",
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
    correctAnswer: 'string name = "DevPilot";',
    explanation: "Declare the type first, then the variable name and value. A regular string literal uses double quotes; single quotes are for character literals.",
  },
  {
    id: "boolean-values",
    question: "Which values can a bool variable hold in C#?",
    answers: ["yes and no", "0 and 1", "on and off", "true and false"],
    correctAnswer: "true and false",
    explanation: "bool represents a Boolean value: true or false. C# does not implicitly treat numbers such as 0 and 1 as Boolean values.",
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
    correctAnswer: "Console.WriteLine()",
    explanation: "Console.WriteLine writes the supplied text followed by a line terminator. Console.ReadLine reads input instead.",
  },
  {
    id: "conditional-statement",
    question: "Which keyword runs a block of code only when a condition is true?",
    answers: ["for", "return", "if", "using"],
    correctAnswer: "if",
    explanation: "An if statement executes its body only when its Boolean condition evaluates to true.",
  },
];
