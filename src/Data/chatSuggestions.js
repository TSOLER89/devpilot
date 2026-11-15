const questionsByMode = {
  explain: ["What is dependency injection?", "What is a REST API?", "Explain useEffect in React"],
  debug: ["Why is my API returning 500?", "Why is this React component not updating?", "Help me debug a null reference error"],
  improve: ["How can I improve this C# method?", "Can you simplify this React component?", "How can I make this API cleaner?"],
  error: ["Explain NullReferenceException", "What does CORS error mean?", "Explain this build error"],
  quiz: ["Quiz me on C#", "Quiz me on React", "Quiz me on REST APIs"],
  teach: ["Teach me about dependency injection", "Teach me React hooks", "Teach me how REST APIs work"],
  plan: ["Help me plan a .NET API", "Help me plan a React app", "Help me plan a debugging strategy"],
};

const topics = {
  ".NET": {
    concepts: ["the runtime and SDK", "dependency injection", "application configuration"],
    problems: ["missing SDK errors", "services that cannot be resolved", "configuration values that are missing"],
    improvements: ["service registration", "configuration management", "application logging"],
    project: "a small .NET console application",
  },
  React: {
    concepts: ["components and props", "useState", "useEffect and its dependencies"],
    problems: ["state updates that do not appear in the UI", "missing list key warnings", "Effects that run repeatedly"],
    improvements: ["component structure", "state management", "list rendering"],
    project: "a React task tracker",
  },
  JavaScript: {
    concepts: ["let and const", "arrays and objects", "promises and async/await"],
    problems: ["ReferenceError messages", "unexpected undefined values", "unhandled promise rejections"],
    improvements: ["function readability", "array processing", "async error handling"],
    project: "a JavaScript browser calculator",
  },
  "C#": {
    concepts: ["variables and types", "classes and objects", "collections and loops"],
    problems: ["NullReferenceException errors", "type conversion errors", "off-by-one loop bugs"],
    improvements: ["method readability", "null handling", "collection processing"],
    project: "a C# console task manager",
  },
  API: {
    concepts: ["HTTP methods", "request and response bodies", "HTTP status codes"],
    problems: ["unexpected 404 responses", "unexpected 500 responses", "CORS errors in the browser"],
    improvements: ["endpoint naming", "request validation", "error responses"],
    project: "a small REST API for a book collection",
  },
  HTML: {
    concepts: ["semantic elements", "forms and labels", "links and images"],
    problems: ["broken image paths", "form fields that are not submitted", "incorrectly nested elements"],
    improvements: ["semantic structure", "form accessibility", "heading organization"],
    project: "an HTML personal portfolio page",
  },
  CSS: {
    concepts: ["the box model", "Flexbox", "media queries"],
    problems: ["unexpected horizontal overflow", "styles overridden by other rules", "elements that do not align"],
    improvements: ["responsive layouts", "selector organization", "spacing consistency"],
    project: "a responsive CSS layout for a portfolio",
  },
  Git: {
    concepts: ["commits and the staging area", "branches", "merges"],
    problems: ["merge conflicts", "push rejections", "an unexpected detached HEAD state"],
    improvements: ["commit messages", "branch organization", "the review workflow"],
    project: "a Git workflow for a small team project",
  },
};

const promptsByMode = {
  explain: (topic, data) => data.concepts.map((concept) => `Explain ${concept} in ${topic} with a simple example.`),
  debug: (topic, data) => data.problems.map((problem) => `Help me debug ${problem} in my ${topic} project.`),
  improve: (topic, data) => data.improvements.map((focus) => `How can I improve ${focus} in my ${topic} project?`),
  error: (topic, data) => data.problems.map((problem) => `Explain common causes of ${problem} in ${topic}.`),
  quiz: (topic, data) => data.concepts.map((concept) => `Ask me a beginner ${topic} quiz question about ${concept}.`),
  teach: (topic, data) => data.concepts.map((concept) => `Teach me ${concept} in ${topic}, step by step.`),
  plan: (topic, data) => [
    `Help me plan ${data.project}.`,
    `What should I learn first before building ${data.project}?`,
    `Break ${data.project} into small beginner-friendly milestones for learning ${topic}.`,
  ],
};

export function getSuggestedQuestions(selectedTopic, selectedMode) {
  const mode = Object.hasOwn(questionsByMode, selectedMode) ? selectedMode : "explain";
  if (!Object.hasOwn(topics, selectedTopic)) return questionsByMode[mode];
  return promptsByMode[mode](selectedTopic, topics[selectedTopic]);
}
