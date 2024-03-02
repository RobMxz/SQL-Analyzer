const fs = require("fs");

const filePath = "CATALOG.DAT";
let tables = [];
let data = [];
let tableNames = [];
/*fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");

  lines.forEach((line) => {
    line = line.trim();
    line = line.replace(/\s+/g, " ");
    line = line.split(" ");
    line.splice(2, 3, line.slice(2).join(" "));
    if (line[0][0] != "#" && line[0] != "") {
      tables.push(line);
    }
  });
  tables.forEach((element) => {
    if (element[0] == "01") {
      console.log(element);
    }
  });
  function select() {}
  console.log(tables);
});*/

const dataTables = fs.readFileSync(filePath, "utf8").split("\n");
dataTables.forEach((line) => {
  line = line.trim();
  line = line.replace(/\s+/g, " ");
  line = line.split(" ");
  line.splice(2, 3, line.slice(2).join(" "));
  if (line[0][0] != "#" && line[0] != "") {
    tables.push(line);
  }
});

const dataInfo = fs.readFileSync("SM.DAT", "utf8").split("\n");
dataInfo.forEach((line) => {
  line = line.trim();
  line = line.replace(/\s+/g, " ");
  line = line.split(" ");
  //line.splice(2, 3, line.slice(2).join(" "));
  if (line[0][0] != "#" && line[0] != "") {
    data.push(line);
  }
});

tables.forEach((element) => {
  if (element[0][3] === "0") {
    tableNames.push([element[0].slice(0, 2), element[1]]);
  }
});
const query = "SELECT * FROM UBIGEO";

function selectSQL(query) {
  query = query.toUpperCase();
  query = query.split(" ");
  let indexFrom = query.indexOf("FROM");
  if (indexFrom === -1) {
    console.log("Invalid query type");
    return;
  } else {
    let indexFromQuery = tableNames.findIndex(
      (table) => table[1] === query[indexFrom + 1]
    );
    if (indexFromQuery === -1) {
      console.log("Invalid query type");
      return;
    } else {
      if (query[1] === "*") {
        //console.log(tableNames[indexFromQuery][0]);
        const filteredData = data.filter(
          (line) => line[0] === tableNames[indexFromQuery][0]
        );
        console.log(filteredData);
      }
    }
    //console.log(tableNames[indexFromQuery][0]);
  }
}
selectSQL(query);
