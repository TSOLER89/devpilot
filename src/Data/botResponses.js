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

  return "I don't know that yet, but I'm still learning!";
}