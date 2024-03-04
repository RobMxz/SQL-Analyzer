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
const query = "SELECT LOWER(Simbolo, *, Codigo,Nombre) FROM MONEDAS";

data.forEach((element) => {
  switch (element[0]) {
    case "01":
      data[data.indexOf(element)] = [
        element[0],
        element[1],
        element.slice(2).join(" "),
      ];
      break;
    case "02":
      let newData = [element[0], element[1]];
      if (element[3].length > 3) {
        newData.push(element.slice(2, 4).join(" ").trim());
        newData.push(element.slice(4).join(" ").trim());
      } else {
        newData.push(element[2]);
        newData.push(element.slice(3).join(" ").trim());
      }
      data[data.indexOf(element)] = newData;
      break;
    case "03":
      data[data.indexOf(element)] = [
        element[0],
        element[1],
        element.slice(2, element.length - 3).join(" "),
        element[element.length - 3],
        element[element.length - 2],
        element[element.length - 1],
      ];
      break;
    case "04":
      data[data.indexOf(element)] = [
        element[0],
        element[1],
        element.slice(2, 4).join(" "),
        element.slice(4, element.length - 7).join(" "),
        element[element.length - 7],
        element[element.length - 6],
        element[element.length - 5],
        element[element.length - 4],
        element[element.length - 3],
        element[element.length - 2],
        element[element.length - 1],
      ];
      break;
    case "05":
      data[data.indexOf(element)] = [
        element[0],
        element[1],
        element.slice(2, 4).join(" "),
        element.slice(4, element.length - 7).join(" "),
        element[element.length - 7],
        element[element.length - 6],
        element[element.length - 5],
        element[element.length - 4],
        element[element.length - 3],
        element[element.length - 2],
        element[element.length - 1],
      ];
      break;
    case "06":
      break;
    case "07":
      data[data.indexOf(element)] = [
        element[0],
        element[1],
        element.slice(2).join(" "),
      ];
      break;
    case "08":
      data[data.indexOf(element)] = [
        element[0],
        element[1],
        element.slice(2).join(" "),
      ];
      break;
    default:
      console.log("Invalid query type");
      break;
  }
});
//console.log(data);

function selectSQL(query) {
  query = query.toUpperCase();
  query = query.replace(", ", ",").replace(", ", ",");
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
      //ESTE SI VA
      //console.log(query.slice(1, indexFrom).join("").split(","));
      let columns;
      columns = query.slice(1, indexFrom).join("").split(",");
      let up = false;
      let low = false;
      if (query[1].slice(0, 5) == "UPPER") {
        columns = query[1].slice(6, query[1].length - 1).split(",");
        up = true;
      }
      if (query[1].slice(0, 5) == "LOWER") {
        columns = query[1].slice(6, query[1].length - 1).split(",");
        low = true;
      }
      for (const column of columns) {
        let indexColumn = -1;
        //ESTE TAMBIEN
        console.log("\n", column, "\n");
        if (column === "*") {
          data.forEach((element) => {
            if (element[0] === tableNames[indexFromQuery][0]) {
              if (up) {
                console.log(element.slice(1).join(" ").toUpperCase());
              } else {
                if (low) {
                  console.log(element.slice(1).join(" ").toLowerCase());
                } else {
                  console.log(element.slice(1).join(" "));
                }
              }
            }
          });
        } else {
          tables.forEach((element) => {
            if (element[1] === query[indexFrom + 1]) {
              indexColumn = tables.indexOf(element) * -1;
            }

            if (
              element[0].slice(0, 2) === tableNames[indexFromQuery][0] &&
              element[1].toUpperCase() === column
            ) {
              indexColumn += tables.indexOf(element);
              //console.log(indexColumn);
            }
          });
          if (indexColumn != -1) {
            //console.log(indexColumn);
            data.forEach((element) => {
              if (element[0] === tableNames[indexFromQuery][0]) {
                if (up) {
                  console.log(element[indexColumn].toUpperCase());
                } else {
                  if (low) {
                    console.log(element[indexColumn].toLowerCase());
                  } else {
                    console.log(element[indexColumn]);
                  }
                }
              }
            });
          } else {
            console.log("Invalid query type");
          }
        }
      }
    }
    //console.log(tableNames[indexFromQuery][0]);
  }
}
selectSQL(query);
//console.log(tables);
