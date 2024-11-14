# CORS問題を解決するプロキシサーバー

このプロキシサーバーは、ローカルアプリケーションからリモートサーバーにアクセスする際のCORS（クロスオリジンリソース共有）問題を解決するために設計されている。Node.js、Express、Axiosを使用して実装されている。

## 機能

- リモートサーバーへのリクエストを転送する。
- SSL証明書の検証をスキップする（開発目的）。
- 必要なCORSヘッダーをレスポンスに追加する。
- `GET`、`POST`、`PUT`、`DELETE`、`OPTIONS`などのHTTPメソッドを処理する。

## 前提条件

- Node.js（LTSバージョン推奨）

## インストール

1. リポジトリをクローンする。
   ```bash
   git clone https://github.com/ya-yamamoto-gladcube/proxy-server.git
   ```

2. 依存関係をインストールする。
   ```bash
   npm install
   ```
## 使用方法

1. サーバーを起動する。
   ```bash
   node server.js
   ```

2. ローカルアプリケーションからプロキシサーバーにアクセスする。
   ```
   http://localhost:3000/<path-to-target-resource>
   ```
   `<path-to-target-resource>`を、アクセスしたいAPIエンドポイントの実際のパスに置き換える。

## 担当者
- 山本康斗
- 柴田天斗
