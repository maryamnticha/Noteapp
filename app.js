const fs = require("fs");

function help() {
  console.log(" --help  for help");
  console.log(" list  to show the list of NOTES");
  console.log("  add --title your_title --body note_body to add a  note");
  console.log("read --title your_title  to read a  note ");
  console.log(" remove --title your_title to remove a  note");
}

function list() {
  let Lists = fs.readFileSync("notes.json").toString();
  let notes = JSON.parse(Lists);
  console.log("printing", notes.length, "note (s)");

  for (let note of notes) {
    console.log("- Title:", note.Title, "\t- Body:", note.Body);
  }
}

function add() {
  let newnote = {};

  let indexOfTitle = process.argv.findIndex(el => el === "--title");
  if (
    indexOfTitle === -1 ||
    typeof process.argv[indexOfTitle + 1] === "undefined"
  ) {
    console.log("Missing required argument: --title");
    return;
  } else newnote["Title"] = process.argv[indexOfTitle + 1];

  let indexOfBody = process.argv.findIndex(el => el === "--body");
  if (
    indexOfBody === -1 ||
    typeof process.argv[indexOfBody + 1] === "undefined"
  ) {
    console.log("Missing required argument: --body");
    return;
  } else newnote["Body"] = process.argv[indexOfBody + 1];

  let notes = JSON.parse(fs.readFileSync("notes.json").toString());

  fs.writeFileSync("notes.json", JSON.stringify(notes.concat([newnote])));
  console.log(
    "Note Added successfully",
    "-title :",
    newnote["Title"],
    "--body",
    newnote["Body"]
  );
}
function read() {
  let title = "";

  let indexOfTitle = process.argv.findIndex(el => el === "--title");
  if (
    indexOfTitle === -1 ||
    typeof process.argv[indexOfTitle + 1] === "undefined"
  ) {
    console.log("Missing required argument: --title");
    return;
  } else title = process.argv[indexOfTitle + 1];

  let notes = JSON.parse(fs.readFileSync("notes.json").toString());
  let note = notes.find(el => el.Title === title);
  if (note) console.log("- Title:", note.Title, "\t- Body:", note.Body);
  else console.log("note not found");
}

function remove() {
  let title = "";

  let indexOfTitle = process.argv.findIndex(el => el === "--title");
  if (indexOfTitle === -1) {
    console.log("Missing required argument: --title");
    return;
  } else title = process.argv[indexOfTitle + 1];

  let notes = JSON.parse(fs.readFileSync("notes.json").toString());
  let note = notes.find(x => x.Title === title);
  notes.splice(notes.indexOf(note), 1);

  fs.writeFileSync("notes.json", JSON.stringify(notes));
  console.log("note: - Title:", note.Title, "removed successfully");
}
switch (process.argv[2]) {
  case "--help":
    help();
    break;
  case "list":
    list();
    break;
  case "add":
    add();
    break;
  case "read":
    read();
    break;
  case "remove":
    remove();
    break;
  default:
    help();
    break;
}
