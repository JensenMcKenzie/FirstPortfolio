var entry = document.getElementById("typer");
var line = document.getElementById("liner");
var cursor = document.getElementById("cursor");
var terminal = document.getElementById("console");
var entries = [];

var i = 0;
var pastEntriesPointer = -1;
help = [
    "This is a simple terminal.",
    "You can type in commands and they will be executed.",
    "The commands are:",
    "help - displays this help",
    "window - opens a new window",
    "jensen - displays Jensen's bio"
]
error = [
    "This command is not supported.",
    "Try typing in 'help' to see what commands are supported."
]
jensen = [
    "Jensen McKenzie is a software engineer.",
    "He studies Computer Science at University Of California, San Diego.",
    "He loves the outdoors, and goes hiking or camping any chance he gets."
]

document.addEventListener('keydown', key);

document.onload = setTimeout(function () {
    entry.innerHTML="visitor:~$ ";
    loopLines(help, "", 100);
});

function key(e) {
    if(e.keyCode > 46 && e.keyCode < 91 || e.keyCode == 32) {
        entry.innerHTML = entry.innerHTML + e.key;
    }
    else if(e.keyCode == 8 && entry.innerHTML.charAt(entry.innerHTML.length - 2) != "$") {
        entry.innerHTML = entry.innerHTML.slice(0, -1);
    }
    else if(e.keyCode == 13){
        console.log(entry.innerHTML.slice(entry.innerHTML.indexOf(" ") + 1));
        if (entry.innerHTML.slice(entry.innerHTML.indexOf(" ") + 1) == "help") {
            loopLines(help, "", 100);
        }
        else if (entry.innerHTML.slice(entry.innerHTML.indexOf(" ") + 1) == "xx") {
            loopLines(help, "", 100);
        }
        else if (entry.innerHTML.slice(entry.innerHTML.indexOf(" ") + 1).slice(0, 6) == "window"){
            const location = entry.innerHTML.slice(entry.innerHTML.indexOf(" ") + 1).slice(7).split(" ");
            if (location.length == 2 && location[0] > 0 && location[1] > 0){
              var newWin = uiWindow.render(location[0], location[1], window);
            }else{
              loopLines(error, "", 100);
            }
        }
        else if (entry.innerHTML.slice(entry.innerHTML.indexOf(" ") + 1) == "jensen") {
            loopLines(jensen, "", 100);
        }else{
          loopLines(error, "", 100);
        }
        addNewLine();
    }
    else if(e.keyCode == 38){
        if (pastEntriesPointer >= 0) {
          pastEntriesPointer--;
          entry.innerHTML = "visitor:~$" + entries[pastEntriesPointer];
        }
    }
    else if(e.keyCode == 40){
      if (pastEntriesPointer < entries.length) {
        pastEntriesPointer++;
        entry.innerHTML = "visitor:~$" + entries[pastEntriesPointer];
      }
  }
}

function addNewLine () {
    var newLine = document.createElement("p");
    newLine.id = "line" + ++i;
    newLine.innerHTML = entry.innerHTML + "<br>";
    newLine.className = "no-animation";
    entries.push(entry.innerHTML.slice(entry.innerHTML.indexOf(" ")));
    pastEntriesPointer = entries.length - 1;
    entry.innerHTML = "visitor:~$ ";
    terminal.appendChild(newLine);
}

function addLine(text, style, time) {
    var t = "";
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
        t += "&nbsp;&nbsp;";
        i++;
      } else {
        t += text.charAt(i);
      }
    }
    setTimeout(function() {
      var next = document.createElement("p");
      next.innerHTML = t;
      next.className = style;
      terminal.appendChild(next);
  
      window.scrollTo(0, document.body.offsetHeight);
    }, time);
  }
  

function loopLines(name, style, time) {
    name.forEach(function(item, index) {
      addLine(item, style, index * time);
    });
}