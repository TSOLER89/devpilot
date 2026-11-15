export const sqlQuestions = [
  {
    id: "sql-select",
    question: "Which SQL statement retrieves data from a table?",
    answers: ["DELETE", "INSERT INTO", "SELECT", "UPDATE"],
    correctAnswer: "SELECT",
    explanation: "SELECT retrieves data. For example, SELECT name FROM Students; returns the name column from the Students table.",
  },
  {
    id: "sql-where",
    question: "Which clause filters rows based on a condition in a SELECT query?",
    answers: ["WHERE", "ORDER BY", "FROM", "GROUP BY"],
    correctAnswer: "WHERE",
    explanation: "WHERE filters rows using a condition. For example, SELECT name FROM Students WHERE age >= 18; returns names only for students aged 18 or older.",
  },
  {
    id: "sql-insert-into",
    question: "Which SQL statement adds a new row to a table?",
    answers: ["ALTER TABLE", "UPDATE", "SELECT", "INSERT INTO"],
    correctAnswer: "INSERT INTO",
    explanation: "INSERT INTO adds rows. For example, INSERT INTO Students (name, age) VALUES ('Alex', 20); adds a student. UPDATE changes existing rows instead.",
  },
  {
    id: "sql-join",
    question: "Which SQL keyword combines rows from related tables using a matching condition?",
    answers: ["ORDER BY", "JOIN", "DELETE", "LIMIT"],
    correctAnswer: "JOIN",
    explanation: "JOIN combines rows from tables, commonly using an ON condition to match related columns. An INNER JOIN returns only rows that satisfy the matching condition.",
  },
  {
    id: "sql-order-by",
    question: "Which clause sorts the rows returned by a SELECT query?",
    answers: ["GROUP BY", "WHERE", "ORDER BY", "JOIN"],
    correctAnswer: "ORDER BY",
    explanation: "ORDER BY sorts query results by one or more columns. ASC sorts ascending and DESC sorts descending. For example, ORDER BY age DESC puts higher ages first.",
  },
];
