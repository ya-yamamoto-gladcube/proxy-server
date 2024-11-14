const express = require("express");
const axios = require("axios"); // Axiosを使用してリクエストを中継
const https = require("https");
const app = express();
const port = 3000;

// HTTPSエージェントを作成し、SSL証明書の検証を無効化
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// リクエストを受け取るルートを設定
app.all("*", async (req, res) => {
  const targetUrl = "https://staging-beta.spaia-keiba.com" + req.originalUrl;

  // 必要なヘッダーを追加
  res.set({
    "Access-Control-Allow-Origin": "*", // 必要に応じてオリジンを制限
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  // プリフライトリクエストへの対応
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Axiosを使用してターゲットURLにリクエストを中継
    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: req.headers,
      data: req.body,
      httpsAgent, // SSL証明書の検証をスキップ
    });

    // ターゲットサーバーからのレスポンスをそのままクライアントに返す
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Proxy error:", error.message);
    res
      .status(error.response ? error.response.status : 500)
      .send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
