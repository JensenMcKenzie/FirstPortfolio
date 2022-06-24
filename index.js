var entry = document.getElementById("typer");
var line = document.getElementById("liner");
var cursor = document.getElementById("cursor");
var i = 0;


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
        console.log(entry.innerHTML.slice(entry.innerHTML.indexOf(" ")));
        if (entry.innerHTML.slice(entry.innerHTML.indexOf(" ")) == " help") {
            console.log("helpXXX");
            var info = document.createElement("div");
            info.innerHTML = "<p>This is a simple terminal. You can type in commands and they will be executed.</p><p>You can also type in commands that are not supported by this terminal. The commands are:</p>";
            info.id = "response" + ++i;
            line.appendChild(info);
        }
        if (entry.innerHTML.slice(entry.innerHTML.indexOf(" ")) == " xx") {
            loopLines(help, "", 100);
        }
        addNewLine();
    }
    console.log(entry.innerHTML.slice(entry.innerHTML.indexOf(" ")));
}

function addNewLine () {
    var newLine = entry.cloneNode(true);
    newLine.id = "line" + ++i;
    newLine.innerHTML = "<br>visitor:~$ ";
    line.appendChild(newLine);
    newLine.parentElement.appendChild(cursor);
    entry = newLine;
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
      line.appendChild(next);
  
      window.scrollTo(0, document.body.offsetHeight);
    }, time);
  }
  

function loopLines(name, style, time) {
    name.forEach(function(item, index) {
      addLine(item, style, index * time);
    });
  }