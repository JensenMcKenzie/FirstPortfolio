
async function windowAwait(){
    await uiWindow.render(0, 100, "2048");
    var window = document.getElementById("2048");
    console.log(window.innerHTML);
    window.style = "height: 60%; width: 75%;";
    var board = document.createElement("div");
    board.id = "board";
    window.appendChild(board);
}
windowAwait();