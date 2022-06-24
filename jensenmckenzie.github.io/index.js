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
    "You can also type in commands that are not supported by this terminal.",
    "The commands are:",
    "help - displays this help",
]

document.addEventListener('keydown', key);

document.onload = setTimeout(function () {
    entry.innerHTML="visitor:~$ ";
    loopLines(help, "", 100);
});

function key(e) {
    if(e.keyCode > 46 && e.keyCode < 91) {
        entry.innerHTML = entry.innerHTML + e.key;
    }
    else if(e.keyCode == 8 && entry.innerHTML.charAt(entry.innerHTML.length - 1) != " ") {
        entry.innerHTML = entry.innerHTML.slice(0, -1);
    }
    else if(e.keyCode == 13){
        console.log(entry.innerHTML.slice(entry.innerHTML.indexOf(" ") + 1));
        if (entry.innerHTML.slice(entry.innerHTML.indexOf(" ") + 1) == "help") {
            loopLines(help, "", 100);
        }
        if (entry.innerHTML.slice(entry.innerHTML.indexOf(" ") + 1) == "xx") {
            loopLines(help, "", 100);
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

  dragElement(document.getElementById("window"));

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById("header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }