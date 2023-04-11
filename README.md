記帳網頁
====
使用node.js + express並使用MongoDB作為資料庫的記帳網站

專案畫面
---
![image](https://github.com/CHUCHUDAN/restaurant_list_refactor/blob/main/public/img/index.png)
-------
![image](https://github.com/CHUCHUDAN/restaurant_list_refactor/blob/main/public/img/index2.png)
-------
![image](https://github.com/CHUCHUDAN/restaurant_list_refactor/blob/main/public/img/detail.png)
-------
![image](https://github.com/CHUCHUDAN/restaurant_list_refactor/blob/main/public/img/edit.png)
-------
![image](https://github.com/CHUCHUDAN/restaurant_list_refactor/blob/main/public/img/new.png)
-------
![image](https://github.com/CHUCHUDAN/restaurant_list_refactor/blob/main/public/img/sort.png)
-------
Features - 產品功能
-----
1.使用者可以註冊帳號。

2.使用者可以登入/登出，並且只有登入狀態下能夠看到清單否則會自動導回登入頁面。

3.使用者可以在個人的首頁瀏覽個人的清單。

4.使用者可以在首頁看到帳務支出總金額。

5.使用者可以建立一筆新的支出。

6.使用者可以編輯任何一筆支出。

7.使用者可刪除任何一筆支出。

8.使用者可以在首頁根據類別篩選出支出，並且篩選後的總金額會是該類別的總金額。

9.使用者可以使用第三方facebook登入。

Environment SetUp - 環境建置
-----
1. [Node.js](https://nodejs.org/en/)
2. [MongoDB](https://www.mongodb.com/)

Installing - 專案安裝流程
----
1.打開你的 terminal，Clone 此專案至本機電腦

    git clone https://github.com/CHUCHUDAN/restaurant_list_refactor.git
    
2.開啟終端機(Terminal)，進入存放此專案的資料夾

    cd restaurant_list_refactor
    
3.安裝 express 套件

    在 Terminal 輸入 npm i express 指令
    
4.安裝nodemon套件
    
    在 Terminal 輸入 npm install nodemon 指令
    
5.請自行新增.env檔案放置與資料庫MongoDB連線相關資料

    MONGODB_URI= "您的MongoDB連線資訊"
    
6.啟動伺服器
  
    在 Terminal 輸入 npm run dev 指令
    
7.當 terminal 出現以下字樣，表示伺服器啟動成功並與資料庫連線成功

    The web is Listen on http://localhost:3000
    Mongodb connected!
    
8.如需使用種子資料請輸入指令

    在 Terminal 輸入 npm run seed 指令
    
Contributor - 專案開發人員
-----
[Daniel Chu](https://github.com/CHUCHUDAN)
