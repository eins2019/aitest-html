document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.buttons button');
    let isResultDisplayed = false;
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            
            // Cボタンの場合は全体クリア
            if (value === 'C') {
                display.value = '';
                isResultDisplayed = false;
                return;
            }
            
            // 削除（←）ボタンの場合は最後の1文字を削除
            if (value === '←') {
                display.value = display.value.slice(0, -1);
                return;
            }
            
            // 結果表示後の入力処理
            if (isResultDisplayed) {
                // 演算子 ( +, -, ×, ÷ ) を押した場合は、表示された結果をそのまま保持する
                // それ以外（数字や小数点）なら、ディスプレイをクリアして新たに入力
                if (!['+', '-', '×', '÷'].includes(value)) {
                    display.value = '';
                }
                isResultDisplayed = false;
            }
            
            if (value === '=') {
                try {
                    const expression = display.value.replace(/÷/g, '/').replace(/×/g, '*');
                    display.value = eval(expression);
                    isResultDisplayed = true;
                } catch (error) {
                    display.value = 'Error';
                    isResultDisplayed = true;
                }
            } else {
                display.value += value;
            }
        });
    });
});

function sum(a, b) {
    return a + b;
}

module.exports = sum;
