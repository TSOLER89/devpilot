export function getBotResponse(message) {
  const question = message.toLowerCase();

  if (question.includes("react")) {
    return "React is a JavaScript library for building user interfaces with reusable components.";
  }

  if (question.includes("c#")) {
    return "C# is a programming language commonly used with .NET to build APIs, web applications, desktop applications and more.";
  }

  if (question.includes("javascript")) {
    return "JavaScript is a programming language used to make web pages interactive.";
  }
  if (question.includes("html")) {
    return "HTML is the standard markup language used to create web pages.";
  }

  if (question.includes("css")) {
    return "CSS is a stylesheet language used to describe the presentation of a document written in HTML or XML.";
  }

  if (question.includes("java")) {
    return "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.";
  }

  if (question.includes("git")) {
    return "Git is a version control system that keeps track of changes in your project.";
  }

  if (question.includes(".net")) {
    return ".NET is a development platform from Microsoft used to build web applications, APIs, desktop applications and more.";
  }
  
  if (question.includes("usestate")) {
  return "useState is a React Hook used to store and update data inside a component. When the state changes, React updates the user interface.";
}

if (question.includes("rest api")) {
  return "A REST API allows applications to communicate over HTTP using methods such as GET, POST, PUT and DELETE.";
}

if (question.includes("dependency injection")) {
  return "Dependency injection is a design pattern where a class receives the dependencies it needs instead of creating them itself. It is commonly used in ASP.NET Core.";
}

  return "I don't know that yet, but I'm still learning!";
}