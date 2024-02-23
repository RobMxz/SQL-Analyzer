function compileSQL(query) {
  const words = query.split(" ");

  const queryType = words[0].toLowerCase();

  let index = 0;

  switch (queryType) {
    case "select":
      index++;
      switch (words[index].toLowerCase()) {
        case "top":
          index++;
          if (!isNaN(parseInt(words[index]))) {
            index++;
            selectVerifier(words, index);
          } else {
            console.log("Invalid query type");
          }
          break;
        case "distinct":
          index++;
          console.log(words[index]);
          selectVerifier(words, index);
          break;
        default:
          selectVerifier(words, index);
          break;
      }

      break;
    case "insert":
      index++;
      if (words[index].toLowerCase() === "into") {
        index = index + 2;
        let numberColumns = 0;
        if (insertVerifier(words, index, numberColumns)) {
          console.log("Pass", words);
        } else {
          console.log("Invalid query type");
        }
      } else {
        console.log("Invalid query type");
      }
      break;
    case "update":
      break;
    case "delete":
      break;
    case "create":
      break;
    case "drop":
      break;
    case "alter":
      break;
    case "truncate":
      break;
    case "use":
      break;
    default:
      console.log("Invalid query type");
      break;
  }
}

function selectVerifier(words, index) {
  while (words[index].slice(-1) === ",") {
    index++;
  }
  if (words[index + 1].toLowerCase() === "from") {
    if (words[index + 3] === undefined) {
      console.log("Pass", words);
    } else {
      index = index + 3;
      switch (words[index].toLowerCase()) {
        case "where":
          index = index + 2;
          condition(words, index);
          break;
        case "group":
          selectBys(words, index);
          break;
        case "order":
          selectBys(words, index);
          break;
        default:
          console.log("Invalid query type");
          break;
      }
    }
  } else {
    console.log("Invalid query type");
  }
}

function selectBys(words, index) {
  if (words[index + 1].toLowerCase() === "by") {
    index = index + 2;
    while (words[index].slice(-1) === ",") {
      index++;
    }
    if (words[index + 1] === undefined) {
      console.log("Pass", words);
    } else {
      console.log("Invalid query type");
    }
  }
}

function condition(words, index) {
  if (
    ["=", ">", "<", ">=", "<=", "<>", "!="].includes(words[index]) &&
    words[index + 2] === undefined &&
    words[index + 1] !== undefined
  ) {
    console.log("Pass", words);
  } else {
    console.log("Invalid query type");
  }
}

function insertVerifier(words, index, numberColumns) {
  let validator = false;
  if (words[index][0] === "(") {
    if (words[index].slice(-1) === ")") {
      index++;
      numberColumns++;
    } else {
      if (words[index].slice(-1) === ",") {
        index++;
        numberColumns++;
        while (words[index].slice(-1) !== ")") {
          index++;
          numberColumns++;
        }
        index++;
        numberColumns++;
      }
    }
    if (words[index].toLowerCase() === "values") {
      index++;
      if (words[index][0] === "(") {
        let numberValues = 0;
        while (
          words[index].slice(-1) !== ")" &&
          words[index + 1] !== undefined
        ) {
          numberValues++;
          index++;
        }
        numberValues++;
        if (numberColumns === numberValues) {
          validator = true;
        }
      }
    }
  } else if (words[index].toLowerCase() === "values") {
    index++;
    if (words[index][0] === "(") {
      index++;
      while (
        words[index] !== undefined &&
        words[index].slice(-1) !== ")" &&
        words[index].slice(-1) !== ";" &&
        words[index + 1] !== undefined
      ) {
        index++;
      }
      if (index === words.length - 1) {
        validator = true;
      }
    }
  }
  return validator;
}

const sqlQuery =
  "INSERT INTO dwdwdw VALUES (value1, value2, value3, value4, ...);";
compileSQL(sqlQuery);
compileSQL(
  "INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);"
);
