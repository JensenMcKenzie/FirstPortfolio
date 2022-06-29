
async function windowAwait(){
    await uiWindow.render(0, 100, "2048");
    var window = document.getElementById("2048");
    console.log(window.innerHTML);
    window.style = "height: 305px; width: 288px;";
    var board = document.createElement("div");
    board.id = "board";
    window.appendChild(board);
    for (i = 0; i < 4; i++){
        for (j = 0; j < 4; j++){
            var tile = document.createElement("div");
            tile.id = "tile" + i + j;
            tile.className = "tile";
            tile.style = "height: 90%; width: 90%; background-color: green;";
            board.appendChild(tile);
        }
    }
}
windowAwait();