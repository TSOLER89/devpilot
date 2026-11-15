export const cSharpIntermediateQuestions = [
  {
    id: "csharp-intermediate-await",
    question: "What happens when an async method awaits an incomplete Task?",
    answers: [
      "The current thread blocks until the Task completes",
      "The method pauses without blocking the current thread, then resumes when the Task completes",
      "The Task always moves to a newly created thread",
      "The method continues past await before the Task completes",
    ],
    correctAnswer: "The method pauses without blocking the current thread, then resumes when the Task completes",
    explanation: "await suspends the async method while the Task is incomplete, allowing control to return to its caller. It does not block the thread or automatically create a new one. A faulted Task throws its exception when awaited.",
  },
  {
    id: "csharp-intermediate-interface-di",
    question: "OrderService receives IEmailSender through its constructor. Why does this help when testing OrderService?",
    answers: [
      "Interfaces automatically catch all email exceptions",
      "Dependency injection removes the need for any implementation of IEmailSender",
      "Tests can supply a fake IEmailSender without changing OrderService",
      "Constructor parameters make every service a singleton",
    ],
    correctAnswer: "Tests can supply a fake IEmailSender without changing OrderService",
    explanation: "The interface defines a contract, and constructor injection supplies an implementation from outside the class. A test can inject a fake that implements the contract, avoiding real email delivery. Production code can use the real implementation.",
  },
  {
    id: "csharp-intermediate-linq",
    question: "A List<int> named numbers contains 1, 2, 3. You create evens = numbers.Where(n => n % 2 == 0), then add 4 to numbers before enumerating evens. Which values are returned?",
    answers: ["2 and 4", "Only 2", "1, 2, 3 and 4", "An exception is always thrown"],
    correctAnswer: "2 and 4",
    explanation: "Enumerable.Where uses deferred execution: it filters the source when enumerated, not when the query is created. Because 4 was added before enumeration begins, it is included. Calling ToList before adding 4 would instead create a snapshot containing only 2.",
  },
  {
    id: "csharp-intermediate-rethrow",
    question: "Inside catch (Exception ex), which statement rethrows the caught exception while preserving its original stack trace?",
    answers: ["throw ex;", "return;", "throw new Exception(ex.Message);", "throw;"],
    correctAnswer: "throw;",
    explanation: "A bare throw inside a catch block rethrows the caught exception and preserves its original stack trace. throw ex resets the stack trace at the rethrow location. Creating a new exception also creates a different exception object.",
  },
  {
    id: "csharp-intermediate-generics",
    question: "What advantage does List<int> have over ArrayList when adding and storing integer elements?",
    answers: [
      "It permits any type of object without checking",
      "It checks element types at compile time and avoids boxing the stored integers",
      "It automatically sorts every added integer",
      "It prevents all changes to the collection after creation",
    ],
    correctAnswer: "It checks element types at compile time and avoids boxing the stored integers",
    explanation: "List<T> is generic: List<int> accepts int elements and stores them without boxing them as objects. ArrayList stores objects, so adding an int boxes it, and retrieving it as an int requires unboxing. Generics improve type safety and can avoid this overhead.",
  },
];
