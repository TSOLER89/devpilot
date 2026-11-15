export const reactQuestions = [
  {
    id: "react-components",
    question: "What is a React function component?",
    answers: [
      "A CSS rule that styles the entire page",
      "A reusable UI building block defined by a JavaScript function",
      "A database table used to store user data",
      "A command that installs JavaScript packages",
    ],
    correctAnswer: "A reusable UI building block defined by a JavaScript function",
    explanation: "A function component is a JavaScript function that describes part of the UI, usually by returning JSX. Components can be reused and combined to build a page.",
  },
  {
    id: "react-jsx",
    question: "What does JSX let you write inside JavaScript?",
    answers: [
      "SQL queries that run automatically",
      "CSS that replaces all JavaScript logic",
      "HTML-like markup that describes the UI",
      "Backend code that runs in the browser",
    ],
    correctAnswer: "HTML-like markup that describes the UI",
    explanation: "JSX is a syntax extension for JavaScript that lets you describe the UI with HTML-like markup. It is transformed into JavaScript before the browser runs it.",
  },
  {
    id: "react-props",
    question: "What are props used for in React?",
    answers: [
      "Passing information from a parent component to a child component",
      "Changing a component's source file while it runs",
      "Saving all component data permanently in the browser",
      "Automatically fetching data from a database",
    ],
    correctAnswer: "Passing information from a parent component to a child component",
    explanation: "Props carry information such as strings, objects, and functions from parent to child. A component should treat its props as read-only rather than modifying them.",
  },
  {
    id: "react-use-state",
    question: "What does useState return?",
    answers: [
      "Only a function that reloads the page",
      "A reference to the component's HTML element",
      "A list of every component in the application",
      "The current state value and a function to update it",
    ],
    correctAnswer: "The current state value and a function to update it",
    explanation: "useState returns a pair: the current value and a setter function. Calling the setter requests a render with the new state so the UI can update.",
  },
  {
    id: "react-use-effect",
    question: "What is the main purpose of useEffect?",
    answers: [
      "Declaring CSS animations inside a component",
      "Synchronizing a component with an external system",
      "Replacing props with global variables",
      "Rendering JSX without a component",
    ],
    correctAnswer: "Synchronizing a component with an external system",
    explanation: "useEffect can synchronize a component with browser APIs, subscriptions, or other external systems after a render is committed. Dependencies control when it runs again, and cleanup can undo its work.",
  },
];
