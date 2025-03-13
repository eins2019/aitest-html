import streamlit as st

def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        return "エラー！ゼロによる除算。"
    return x / y

st.title('Webベースの電卓アプリケーション')

num1 = st.number_input('最初の数字を入力してください', format="%f")
operator = st.selectbox('演算子を選択してください', ('+', '-', '*', '/'))
num2 = st.number_input('次の数字を入力してください', format="%f")

if st.button('計算'):
    if operator == '+':
        result = add(num1, num2)
    elif operator == '-':
        result = subtract(num1, num2)
    elif operator == '*':
        result = multiply(num1, num2)
    elif operator == '/':
        result = divide(num1, num2)
    else:
        result = "無効な演算子です。"
    
    st.write(f"結果: {result}")