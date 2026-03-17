# 📑 ポートフォリオ 最終データ定義

## ■ データ構造例（JSON）
### data/profile.json
{
  "name": "OR1215",
  "title": "Node.js & AWS Explorer",
  "sns": { "github": "https://github.com/OR1215" }
}

## ■ 表示ロジックの方針（JavaScript）
1. fetch API を使用して /data/ 配下の各ファイルを非同期取得。
2. 取得したデータを、特定のID（#about-text など）を持つHTML要素へ代入。
3. Projects などのリスト形式は、ループ処理でHTML要素を生成。

## ■ デザイン方針
- 768pxを境にしたレスポンシブ対応。
- 余白を十分に取ったプロフェッショナルなレイアウト。