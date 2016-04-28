var canvas = document.getElementById("first-picture"),
    context = canvas.getContext("2d");

for (var x = 0.75; x < 500; x += 10) {
    context.moveTo(x, 0);
    context.lineTo(x, 375);
}

for (var y = 0.75; y < 375; y += 10) {
    context.moveTo(0, y);
    context.lineTo(500, y);
}

context.strokeStyle = "#eee";
context.stroke();


context.beginPath();
context.moveTo(0, 40);
context.lineTo(240, 40);
context.moveTo(260, 40);
context.lineTo(500, 40);
context.moveTo(495, 35);
context.lineTo(500, 40);
context.lineTo(495, 45);


context.moveTo(60, 0);
context.lineTo(60, 153);
context.moveTo(60, 173);
context.lineTo(60, 375);
context.moveTo(65, 370);
context.lineTo(60, 375);
context.lineTo(55, 370);

context.strokeStyle = "#000";
context.stroke();

context.font = "bold 12px sans-serif";
context.fillText("x", 248, 43);
context.fillText("y", 58, 165);

context.textBaseline = "top";
context.fillText("( 0 , 0 )", 8, 5);

context.textAlign = "right";
context.textBaseline = "bottom";
context.fillText("( 500 , 375 )", 492, 370);

context.fillRect(0, 0, 3, 3);
context.fillRect(497, 372, 3, 3);