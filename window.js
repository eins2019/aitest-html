// グラフ描画関数
// drawGraph関数は、キャンバスにグラフを描画します。
// 入力されたa, b, cの値に基づいて二次関数のグラフを描画します。

window.onload = function() {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');

    const aInput = document.getElementById('aValue');
    const bInput = document.getElementById('bValue');
    const cInput = document.getElementById('cValue');
    const equation = document.getElementById('equation');
    const canvasSizeInput = document.getElementById('canvasSize');

    function updateEquation() {
        const a = parseFloat(aInput.value);
        const b = parseFloat(bInput.value);
        const c = parseFloat(cInput.value);
        equation.textContent = `y = ${a}x² + ${b}x + ${c}`;
    }

    function drawGraph() {
        const a = parseFloat(aInput.value);
        const b = parseFloat(bInput.value);
        const c = parseFloat(cInput.value);
        const canvasSize = parseFloat(canvasSizeInput.value) / 100;

        const size = Math.min(window.innerWidth, window.innerHeight) * canvasSize; // キャンバスサイズをスピンボタンの値に基づいて設定
        canvas.width = size;
        canvas.height = size;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 軸の描画
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        // 目盛とラベルの描画
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let i = -canvas.width / 2; i <= canvas.width / 2; i += 50) {
            ctx.moveTo(canvas.width / 2 + i, canvas.height / 2 - 5);
            ctx.lineTo(canvas.width / 2 + i, canvas.height / 2 + 5);
            if (i !== 0) {
                ctx.fillText((i / 50).toFixed(0), canvas.width / 2 + i, canvas.height / 2 + 15); // 目盛を整数値で表示
            }
        }
        for (let i = -canvas.height / 2; i <= canvas.height / 2; i += 50) {
            ctx.moveTo(canvas.width / 2 - 5, canvas.height / 2 - i);
            ctx.lineTo(canvas.width / 2 + 5, canvas.height / 2 - i);
            if (i !== 0) {
                ctx.fillText((i / 50).toFixed(0), canvas.width / 2 - 15, canvas.height / 2 - i); // 目盛を整数値で表示
            }
        }
        ctx.stroke();

        // グラフの描画
        ctx.beginPath();
        for (let x = -canvas.width / 2; x <= canvas.width / 2; x++) {
            const y = a * Math.pow(x / 100, 2) + b * (x / 100) + c;
            if (x === -canvas.width / 2) {
                ctx.moveTo(x + canvas.width / 2, canvas.height / 2 - y * 100);
            } else {
                ctx.lineTo(x + canvas.width / 2, canvas.height / 2 - y * 100);
            }
        }
        ctx.stroke();
    }

    aInput.addEventListener('input', () => {
        updateEquation();
        drawGraph();
    });
    bInput.addEventListener('input', () => {
        updateEquation();
        drawGraph();
    });
    cInput.addEventListener('input', () => {
        updateEquation();
        drawGraph();
    });
    canvasSizeInput.addEventListener('input', drawGraph);

    updateEquation();
    drawGraph();
    window.addEventListener('resize', drawGraph); // ウィンドウサイズ変更時に再描画
}
