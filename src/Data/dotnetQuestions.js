export const dotnetQuestions = [
  {
    id: "dotnet-platform",
    question: "What is .NET?",
    answers: [
      "A database engine used only for storing tables",
      "A browser extension for styling web pages",
      "A cross-platform developer platform for building applications",
      "A programming language that replaces C#",
    ],
    correctAnswer: "A cross-platform developer platform for building applications",
    explanation: ".NET provides a runtime, libraries, and tools for building applications. It supports languages such as C# and can run on Windows, Linux, and macOS.",
  },
  {
    id: "dotnet-aspnet-core",
    question: "What is ASP.NET Core mainly used for?",
    answers: [
      "Building web applications and APIs with .NET",
      "Editing images and creating animations",
      "Replacing the operating system",
      "Managing browser bookmarks",
    ],
    correctAnswer: "Building web applications and APIs with .NET",
    explanation: "ASP.NET Core is a cross-platform framework for building web applications and services with .NET. It includes features for routing HTTP requests, configuration, and dependency injection.",
  },
  {
    id: "dotnet-web-api",
    question: "What does an HTTP-based Web API let a client application do?",
    answers: [
      "Directly access the server's private memory",
      "Skip all network communication",
      "Automatically turn every response into a web page",
      "Send HTTP requests to access server data or operations",
    ],
    correctAnswer: "Send HTTP requests to access server data or operations",
    explanation: "A Web API exposes endpoints that clients call over HTTP. For example, a frontend can request a list of products and receive data, commonly as JSON, rather than a complete HTML page.",
  },
  {
    id: "dotnet-dependency-injection",
    question: "What is the main idea behind dependency injection?",
    answers: [
      "Putting every service into one large class",
      "Providing a class with the services it needs from outside the class",
      "Creating every dependency inside each method with new",
      "Copying the same service code into every class",
    ],
    correctAnswer: "Providing a class with the services it needs from outside the class",
    explanation: "Dependency injection supplies dependencies instead of making a class create them itself. In ASP.NET Core, registered services can be provided through constructor parameters, helping keep code easier to test and maintain.",
  },
  {
    id: "dotnet-ef-core",
    question: "What is Entity Framework Core used for?",
    answers: [
      "Working with databases using .NET objects",
      "Creating CSS layouts in the browser",
      "Compiling JSX into JavaScript",
      "Replacing HTTP with a new network protocol",
    ],
    correctAnswer: "Working with databases using .NET objects",
    explanation: "Entity Framework Core is an object-relational mapper (ORM). It lets .NET applications query and save database data using entity classes and a DbContext, reducing the amount of data-access code needed.",
  },
];
