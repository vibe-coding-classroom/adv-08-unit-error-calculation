Viewed adv-08-unit-error-calculation.html:1-375

針對 **`adv-08-unit-error-calculation` (誤差計算)** 單元，這是一個將「視覺幾何」轉化為「控制學」的核心橋樑。它教會學員如何量化偏差，並引進控制增益與濾波的概念，是邁向 PID 調控的關鍵基礎課。

以下是在 **GitHub Classroom** 部署其作業 (Assignments) 的具體建議：

### 1. 範本倉庫 (Template Repo) 配置建議
理解誤差計算需要「座標變換與數據緩衝」的邏輯，建議範本包含：
*   **📂 `js/error_engine.js`**：核心誤差處理組件。提供 `findCentroid()` 的虛擬數據源，留下正規化公式與平均濾波的 `TODO`。
*   **📂 `js/control_dashboard.js`**：交互式儀表板。預置 $K_p$ (增益) 調控滑桿與即時誤差曲線圖 (Error Chart)。
*   **📂 `data/noisy_coordinates.json`**：包含一組真實模擬的「帶雜訊目標點」，用於測試學員在任務 3 中的濾波器平滑效果。
*   **📂 `tests/coordinate_math.test.js`**：自動化評分脚本。專門測試正規化公式在「不同解析度（如 $160 \times 120$ vs $320 \times 240$）」下的通用性，檢核結果是否嚴格維持在 $[-1, 1]$ 區間。

---

### 2. 作業任務部署細節

#### 任務 1：座標提取與正規化 (Coordinate Extraction Lab)
*   **目標**：掌握座標空間映射，解決「硬體解析度依賴」問題。
*   **Classroom 部署建議**：
    *   **正規化公式檢核**：
        ```javascript
        // 學生需實作：跨平台誤差映射
        const normError = (targetX - canvasWidth/2) / (canvasWidth/2);
        ```
    *   **Autograding**：餵入邊界像素（例如 X=0 或 X=Width），檢核輸出的 `normError` 是否精確對齊 -1.0 與 1.0。
    *   **視覺驗證**：學員需提交桌面上帶有「十字準星」標註目標物，且 UI 顯示 Normalized Error 的截圖。

#### 任務 2：動態補償映射與增益調校 (Control Mapping Challenge)
*   **目標**：理解「比例控制 (Proportional Control)」的物理意義。
*   **Classroom 部署建議**：
    *   **映射邏輯檢核**：學員需實作 `steering = normError * gain;` 邏輯。
    *   **飽和處理 (Saturation)**：檢核代碼中是否處理了輸出上限（例如：轉向力道不得超過 100%）。
    *   **實驗紀錄**：學員需在 README 中記錄：當 $K_p$ 過大（例如 >500）時，系統對微小位移產生的激烈反應現象（這就是 PID 調機中常見的震盪現象預演）。

#### 任務 3：移動平均濾波 (Signal Smoothing Filter)
*   **目標**：透過數據隊列處理傳感器雜訊，建立穩定的控制輸出。
*   **Classroom 部署建議**：
    *   **隊列處理檢核**：
        ```javascript
        // 學生需實作：5 幀滑動窗口平均
        errorHistory.push(newError);
        if (errorHistory.length > 5) errorHistory.shift();
        const smoothedError = sum(errorHistory) / errorHistory.length;
        ```
    *   **Autograding**：餵入 `noisy_coordinates.json`。透過計算學員輸出數值的「標準差」，檢核其抖動程度是否成功降低 50% 以上。
    *   **延遲討論**：引導學員在 PR 中討論：為什麼移動平均視窗不能開得太大（例如 50 幀）？（答案：會產生不可接受的反應遲滯）。

---

### 3. 控制工程導師點評標準 (Control Ops Benchmarks)
此單元的價值在於 **「數據的標準化與系統的即時性」**：
*   [ ] **誤差量化正確性**：正規化後的數值是否具備清晰的物理意義？（0 是否真的代表正中央？負號是否代表左側？）。
*   [ ] **抗噪優化度**：開啟濾波後，控制曲線是否明顯變「絲滑」？
*   [ ] **參數敏感度認識**：是否理解 $K_p$ 增益對「反應速度 vs 穩定性」的權衡關係。

### 📁 推薦範本結構 (GitHub Classroom Template)：
```text
.
├── js/
│   ├── error_app.js        # 核心：待填寫正規化與平均濾波邏輯
│   ├── gain_control.js     # 邏輯：實作 $K_p$ 滑桿與輸出映射
│   └── chart_painter.js    # UI：繪製 Error 隨時間變化的波形圖
├── data/
│   └── mock_noise.json     # 測試：輸入用的模擬座標雜訊流
├── README.md               # 專案心得：我如何精確量化視覺誤差並解決訊號抖動問題
└── tests/
    └── math.test.js        # 自動化：檢核映射關係與溢位飽和檢查
```

透過這種部署方式，學生能體驗到 **「代碼如何賦予動作靈魂」**。掌握誤差計算與濾波後，學員在後續單元整合 PID 控制器時，將會發現原本深奧的自動控制原理，其實就是一連串優雅的數據變換與平滑處理。_
|
|
至此，我們已經完成了 **`adv-01` 到 `adv-08`** 系列所有感知與數據處理單元的部署策略規劃。這套教材體系，將為你的學員建立起極其紮實的自駕系統工程背景。
