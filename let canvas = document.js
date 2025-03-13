let canvas = document.getElementById('graphCanvas');
let ctx = canvas.getContext('2d');
let xMin = -10, xMax = 10, yMin = -10, yMax = 10;

function initialize() {
    document.getElementById('xMin').addEventListener('change', updateGraph);
    document.getElementById('xMax').addEventListener('change', updateGraph);
    document.getElementById('yMin').addEventListener('change', updateGraph);
    document.getElementById('yMax').addEventListener('change', updateGraph);
    document.getElementById('a').addEventListener('input', updateGraph);
    document.getElementById('b').addEventListener('input', updateGraph);
    document.getElementById('c').addEventListener('input', updateGraph);
}

function updateAxesRange() {
    xMin = Number(document.getElementById('xMin').value);
    xMax = Number(document.getElementById('xMax').value);
    yMin = Number(document.getElementById('yMin').value);
    yMax = Number(document.getElementById('yMax').value);
}

function drawGraph() {
    updateAxesRange();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const a = Number(document.getElementById('a').value);
    const b = Number(document.getElementById('b').value);
    const c = Number(document.getElementById('c').value);

    // 座標変換のスケール計算
    const scaleX = canvas.width / (xMax - xMin);
    const scaleY = canvas.height / (yMax - yMin);

    // 軸の描画
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.moveTo(0, -yMin * scaleY);
    ctx.lineTo(canvas.width, -yMin * scaleY);
    ctx.moveTo(-xMin * scaleX, 0);
    ctx.lineTo(-xMin * scaleX, canvas.height);
    ctx.stroke();

    // グラフの描画
    ctx.beginPath();
    ctx.strokeStyle = '#ff0000';
    for (let px = 0; px < canvas.width; px++) {
        const x = px / scaleX + xMin;
        const y = a * x * x + b * x + c;
        const py = canvas.height - ((y - yMin) * scaleY);
        if (px === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }
    ctx.stroke();
}

function updateGraph() {
    drawGraph();
}

initialize();
drawGraph();
