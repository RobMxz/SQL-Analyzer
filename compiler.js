const fs = require("fs");

const filePath = "SM.DAT";
let tables = [];

fs.readFile(filePath, "utf8", (err, data) => {
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
});
