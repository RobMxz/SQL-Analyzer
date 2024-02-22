function compileSQL(query) {
  const words = query.split(" ");

  const queryType = words[0].toLowerCase();

  let index = 0;

  switch (queryType) {
    case "select":
      index++;
      switch (words[index].toLowerCase()) {
        case "top":
          break;
        case "distinct":
          break;
        case "order":
          break;
        case "group":
          break;
        case "having":
          break;
        case "into":
          break;
        default:
          while (words[index].slice(-1) === ",") {
            index++;
          }
          if (
            words[index + 1].toLowerCase() === "from" &&
            words[index + 3] === undefined
          ) {
            console.log("Pass", words);
          } else {
            console.log("Invalid query type");
          }
          break;
      }

      break;
    case "insert":
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
const sqlQuery =
  "SELECT Column1, Column2, Column3, Column4, Column5, Column6 FROM TableName;";
compileSQL(sqlQuery);
