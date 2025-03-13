const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

function drawGraph() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const xMin = parseFloat(document.getElementById('xMin').value);
    const xMax = parseFloat(document.getElementById('xMax').value);
    const yMin = parseFloat(document.getElementById('yMin').value);
    const yMax = parseFloat(document.getElementById('yMax').value);

    // キャンバスをクリア
    ctx.clearRect(0, 0, width, height);
    
    // 座標系の中心を移動
    const centerX = width / 2;
    const centerY = height / 2;
    ctx.translate(centerX, centerY);
    
    // 軸の描画
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    
    // X軸
    ctx.moveTo(-centerX, 0);
    ctx.lineTo(centerX, 0);
    // Y軸
    ctx.moveTo(0, -centerY);
    ctx.lineTo(0, centerY);
    ctx.stroke();
    
    // メモリの描画
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '12px Arial';  // フォントサイズとフォントファミリーを設定
    ctx.fillStyle = '#000000';  // テキストの色を設定
    
    // X軸のメモリ
    for (let x = -10; x <= 10; x++) {
        const xPos = x * 30;
        ctx.beginPath();
        ctx.moveTo(xPos, -5);
        ctx.lineTo(xPos, 5);
        ctx.stroke();
        if (x !== 0) {
            ctx.fillText(x.toString(), xPos, 20);
        }
    }
    
    // Y軸のメモリ
    for (let y = -6; y <= 6; y++) {
        const yPos = -y * 30;
        ctx.beginPath();
        ctx.moveTo(-5, yPos);
        ctx.lineTo(5, yPos);
        ctx.stroke();
        if (y !== 0) {
            ctx.fillText(y.toString(), -20, yPos);
        }
    }
    
    // 軸ラベル
    ctx.fillStyle = '#000000';
    ctx.font = '16px Arial';  // ラベル用に少し大きめのフォント
    ctx.fillText('x', width/2 - 20, 15);
    ctx.fillText('y', -15, -height/2 + 20);
    
    // 二次関数の描画
    ctx.beginPath();
    ctx.strokeStyle = '#ff0000';
    for (let x = xMin; x <= xMax; x += 0.1) {
        const y = a * x * x + b * x + c;
        const canvasX = (x - xMin) / (xMax - xMin) * canvas.width;
        const canvasY = canvas.height - (y - yMin) / (yMax - yMin) * canvas.height;
        if (x === xMin) {
            ctx.moveTo(canvasX, canvasY);
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    ctx.stroke();
    
    // 座標系を元に戻す
    ctx.translate(-centerX, -centerY);
}

// イベントリスナーの設定
document.getElementById('a').addEventListener('input', drawGraph);
document.getElementById('b').addEventListener('input', drawGraph);
document.getElementById('c').addEventListener('input', drawGraph);
document.getElementById('xMin').addEventListener('input', drawGraph);
document.getElementById('xMax').addEventListener('input', drawGraph);
document.getElementById('yMin').addEventListener('input', drawGraph);
document.getElementById('yMax').addEventListener('input', drawGraph);

// 初期描画
drawGraph();
