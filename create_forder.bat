@echo off
setlocal
echo Portfolio Project Scaffolding Start...

:: 1. フォルダの作成 (共通と画面別)
mkdir projects
mkdir img
mkdir assets\css
mkdir assets\js\common
mkdir assets\js\pages\home
mkdir assets\js\pages\project

:: 2. 基本HTMLファイルの作成
type nul > index.html
type nul > projects\detail.html

:: 3. CSSファイルの作成
type nul > assets\css\style.css

:: 4. 共通JSファイルの作成
type nul > assets\js\common\components.js
type nul > assets\js\common\utils.js
type nul > assets\js\common\store.js

:: 5. 画面別JSファイルの作成
type nul > assets\js\pages\home\main.js
type nul > assets\js\pages\project\main.js

echo.
echo --------------------------------------------------
echo  Structure created successfully!
echo --------------------------------------------------
pause