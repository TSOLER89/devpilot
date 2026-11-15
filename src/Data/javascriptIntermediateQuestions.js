export const javascriptIntermediateQuestions = [
  {
    id: "js-intermediate-closure",
    question: "makeCounter creates a local variable count = 0 and returns () => ++count. After const next = makeCounter(), what does the second call to next() return?",
    answers: ["1", "2", "undefined", "A ReferenceError"],
    correctAnswer: "2",
    explanation: "The returned function forms a closure over count in its lexical scope. That variable remains accessible after makeCounter returns. Both calls update the same variable, so the first returns 1 and the second returns 2.",
  },
  {
    id: "js-intermediate-async-rejection",
    question: "An async function load() throws new Error('Failed'). What happens when a caller executes await load() inside a try block with a catch block?",
    answers: [
      "load returns undefined and the catch block is skipped",
      "The error is ignored because load is async",
      "The promise rejects, and await throws the rejection into the caller's catch block",
      "await returns the Error object as a successful result",
    ],
    correctAnswer: "The promise rejects, and await throws the rejection into the caller's catch block",
    explanation: "An async function always returns a promise. Throwing inside it rejects that promise. Awaiting a rejected promise throws its rejection reason at the await expression, where try/catch can handle it.",
  },
  {
    id: "js-intermediate-array-chain",
    question: "What is the result of [1, 2, 3, 4].filter(n => n % 2 === 0).map(n => n * 3).reduce((sum, n) => sum + n, 0)?",
    answers: ["6", "12", "30", "18"],
    correctAnswer: "18",
    explanation: "filter keeps [2, 4], map produces [6, 12], and reduce adds them using an initial sum of 0. The result is 18. These operations do not change the original array in this example.",
  },
  {
    id: "js-intermediate-event-loop",
    question: "In a browser, code logs 'A', schedules setTimeout(() => console.log('B'), 0), calls Promise.resolve().then(() => console.log('C')), then logs 'D'. In what order are the letters logged?",
    answers: ["A, D, C, B", "A, B, C, D", "A, C, D, B", "A, D, B, C"],
    correctAnswer: "A, D, C, B",
    explanation: "The synchronous logs A and D run first. The promise callback runs as a microtask after the current synchronous work finishes. The timer callback runs in a later task, so C comes before B even with a zero-millisecond timeout.",
  },
  {
    id: "js-intermediate-destructuring-spread",
    question: "Given original = { profile: { name: 'Ada' }, level: 1 }, you run const { level, ...rest } = original; const copy = { ...rest }; copy.profile.name = 'Grace'; What are original.profile.name and level?",
    answers: ["'Ada' and 1", "'Grace' and undefined", "'Grace' and 1", "'Ada' and undefined"],
    correctAnswer: "'Grace' and 1",
    explanation: "Destructuring assigns 1 to level and collects the remaining properties in rest. Object rest and spread make shallow copies: profile still refers to the same nested object. Changing copy.profile.name therefore also changes original.profile.name.",
  },
];
