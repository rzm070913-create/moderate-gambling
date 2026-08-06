// 图标池
const ANIMALS = ['peach', 'cat', 'dog', 'panda', 'mouse', 'rabbit'];
const TOTAL_COLS = 5;
const CARDS_PER_REEL = 6;

let reels = [];
let isSpinning = false;

// 获取计算尺寸
function getReelParams() {
    const container = document.querySelector('.slot-machine-container');
    if (!container) return { cardHeight: 110, stepDistance: 122 };
    const innerHeight = container.clientHeight - 60; // 减去 padding
    const gap = 12;
    const cardHeight = (innerHeight - gap * 2) / 3;
    return { cardHeight, stepDistance: cardHeight + gap };
}

// 初始化 5 卷轴网格
export function buildGrid() {
    const reelsContainer = document.getElementById('reelsContainer');
    if (!reelsContainer) return;

    reelsContainer.innerHTML = '';
    reels = [];
    const { cardHeight } = getReelParams();

    for (let i = 0; i < TOTAL_COLS; i++) {
        const reelCol = document.createElement('div');
        reelCol.className = 'reel';

        const reelInner = document.createElement('div');
        reelInner.className = 'reel-inner';
        reelInner.dataset.colIndex = i;

        for (let j = 0; j < CARDS_PER_REEL; j++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.height = cardHeight + 'px';

            const wrapper = document.createElement('div');
            wrapper.className = 'icon-wrapper';

            const icon = document.createElement('div');
            const randomAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
            icon.className = `icon icon-${randomAnimal}`;
            card.dataset.animal = randomAnimal;

            wrapper.appendChild(icon);
            card.appendChild(wrapper);
            reelInner.appendChild(card);
        }

        reelCol.appendChild(reelInner);
        reelsContainer.appendChild(reelCol);
        reels.push(reelInner);
    }

    requestAnimationFrame(() => {
        const { stepDistance } = getReelParams();
        reels.forEach(reel => {
            reel.style.transition = 'none';
            reel.style.transform = `translateY(${-2 * stepDistance}px)`;
        });
    });
}

// 触发转动动画
export function startSpin() {
    const spinBtn = document.getElementById('spinBtn');
    if (isSpinning) return;
    
    isSpinning = true;
    if (spinBtn) spinBtn.disabled = true;

    const { stepDistance } = getReelParams();

    // 抽签决定最终停下的结果
    const finalResults = [];
    for (let i = 0; i < TOTAL_COLS; i++) {
        const colResults = [];
        for (let j = 0; j < 3; j++) {
            colResults.push(ANIMALS[Math.floor(Math.random() * ANIMALS.length)]);
        }
        finalResults.push(colResults);
    }

    const durations = [2800, 3100, 2900, 3200, 3000];
    let elapsed = 0;
    let lastTimestamp = 0;
    let yOffsets = Array(TOTAL_COLS).fill(-2 * stepDistance);
    let isFinished = Array(TOTAL_COLS).fill(false);

    // 预填最终结果到中间展示位置
    for (let i = 0; i < TOTAL_COLS; i++) {
        const reel = reels[i];
        const cards = reel.querySelectorAll('.card');
        const targetIcons = finalResults[i];
        [2, 3, 4].forEach((idx, dataIdx) => {
            const wrapper = cards[idx].querySelector('.icon-wrapper');
            const icon = wrapper.querySelector('.icon');
            cards[idx].dataset.animal = targetIcons[dataIdx];
            icon.className = `icon icon-${targetIcons[dataIdx]}`;
        });
    }

    function animate(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const delta = Math.min(timestamp - lastTimestamp, 32);
        lastTimestamp = timestamp;
        elapsed += delta;

        let allDone = true;

        for (let i = 0; i < TOTAL_COLS; i++) {
            const reel = reels[i];
            if (isFinished[i]) continue;
            allDone = false;

            const progress = Math.min(1, elapsed / durations[i]);
            let speed = Math.max(1 - Math.pow(progress, 2), 0);

            yOffsets[i] -= stepDistance * (delta / 16.67) * speed * 1.1;

            if (yOffsets[i] < -5 * stepDistance) {
                yOffsets[i] += 6 * stepDistance;
                const firstCard = reel.removeChild(reel.firstElementChild);
                reel.appendChild(firstCard);

                const cards = reel.querySelectorAll('.card');
                cards.forEach((card) => {
                    const wrapper = card.querySelector('.icon-wrapper');
                    const icon = wrapper.querySelector('.icon');
                    icon.className = `icon icon-${card.dataset.animal}`;
                });
            }

            reel.style.transform = `translateY(${yOffsets[i]}px)`;

            if (progress >= 1) {
                yOffsets[i] = -2 * stepDistance;
                reel.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
                reel.style.transform = `translateY(${-2 * stepDistance}px)`;
                isFinished[i] = true;
            }
        }

        if (!allDone) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            if (spinBtn) spinBtn.disabled = false;
            reels.forEach(reel => {
                reel.style.transition = 'none';
            });
        }
    }

    requestAnimationFrame(animate);
}

// 绑定按钮点击事件与初始化
export function initSlotGame() {
    buildGrid();
   const spinBtn = document.querySelector('.slot-spin');
    if (spinBtn) {
        spinBtn.onclick = startSpin;
    }
}
export function open(root){
    root.innerHTML = `
    <div class="slot-game-layout">
        <!-- ================= 左侧区域：老虎机视口 + 下注控制 ================= -->
        <div class="slot-left-section">
            <!-- 老虎机卷轴视口 -->
            <div class="slot-machine-container">
                <div class="grid" id="reelsContainer">
                    <!-- JS 动态生成 5 列 -->
                </div>
            </div>

            <!-- 下方控制面板 -->
            <div class="slot-controls-panel">
                <!-- 下注倍数 & 单注 & 总下注 -->
                <div class="bet-info-row">
                    <div class="bet-item">
                        <span class="bet-label">下注倍数</span>
                        <div class="stepper">
                            <button class="step-btn" data-action="decrease">-</button>
                            <span class="step-num" id="betMultiplier">1</span>
                            <button class="step-btn" data-action="increase">+</button>
                        </div>
                    </div>
                    <div class="bet-item">
                        <span class="bet-label">单注</span>
                        <div class="bet-badge">🪙 <span id="singleBet">10.00</span></div>
                    </div>
                    <div class="bet-item">
                        <span class="bet-label">总下注</span>
                        <div class="bet-badge highlight">🪙 <span id="totalBet">10.00</span></div>
                    </div>
                </div>

                <!-- 倍数快捷选择 -->
                <div class="bet-preset-row">
                    <button class="preset-btn active" data-multiplier="1">1x</button>
                    <button class="preset-btn" data-multiplier="2">2x</button>
                    <button class="preset-btn" data-multiplier="5">5x</button>
                    <button class="preset-btn" data-multiplier="10">10x</button>
                    <button class="preset-btn" data-multiplier="20">20x</button>
                    <button class="preset-btn" data-multiplier="50">50x</button>
                    <button class="preset-btn" data-multiplier="100">100x</button>
                </div>

                <!-- 操作按钮 -->
                <div class="action-btn-row">
                    <button id="spinBtn" class="btn-start"> 开始</button>
                    <button id="autoSpinBtn" class="btn-auto"> 自动旋转</button>
                </div>
            </div>
        </div>

        <!-- ================= 右侧区域：游戏规则说明 ================= -->
        <div class="slot-rules-panel">
            <h3 class="rules-title">✦ 游戏规则 ✦</h3>
            <p class="rules-subtitle">3x5 匹配相同图标获得奖励。</p>

            <div class="rules-section-title">中奖规则</div>
            <div class="payout-list">
                <div class="payout-item">
                    <div class="mini-icon-wrapper"><div class="icon icon-peach"></div></div>
                    <span class="payout-text">5 个: 250x</span>
                    <span class="payout-text">4 个: 100x</span>
                    <span class="payout-text">3 个: 25x</span>
                </div>
                <div class="payout-item">
                    <div class="mini-icon-wrapper"><div class="icon icon-cat"></div></div>
                    <span class="payout-text">5 个: 200x</span>
                    <span class="payout-text">4 个: 80x</span>
                    <span class="payout-text">3 个: 20x</span>
                </div>
                <div class="payout-item">
                    <div class="mini-icon-wrapper"><div class="icon icon-dog"></div></div>
                    <span class="payout-text">5 个: 150x</span>
                    <span class="payout-text">4 个: 60x</span>
                    <span class="payout-text">3 个: 15x</span>
                </div>
                <div class="payout-item">
                    <div class="mini-icon-wrapper"><div class="icon icon-panda"></div></div>
                    <span class="payout-text">5 个: 120x</span>
                    <span class="payout-text">4 个: 50x</span>
                    <span class="payout-text">3 个: 12x</span>
                </div>
                <div class="payout-item">
                    <div class="mini-icon-wrapper"><div class="icon icon-mouse"></div></div>
                    <span class="payout-text">5 个: 100x</span>
                    <span class="payout-text">4 个: 40x</span>
                    <span class="payout-text">3 个: 10x</span>
                </div>
                <div class="payout-item">
                    <div class="mini-icon-wrapper"><div class="icon icon-rabbit"></div></div>
                    <span class="payout-text">5 个: 80x</span>
                    <span class="payout-text">4 个: 30x</span>
                    <span class="payout-text">3 个: 8x</span>
                </div>
            </div>

            <div class="rules-section-title">其他说明</div>
            <ul class="rules-bullets">
                <li>匹配从左到右任意相邻格子。</li>
                <li>同一行内相同图标越多，奖励越高。</li>
                <li>自动旋转可连续进行多次游戏。</li>
            </ul>
        </div>
    </div>
    `;

    initSlotGame();
    bindSlotControls();
}

function bindSlotControls() {
    const spinBtn = document.getElementById('spinBtn');
    if (spinBtn) {
        spinBtn.onclick = startSpin;
    }

    const autoSpinBtn = document.getElementById('autoSpinBtn');
    if (autoSpinBtn) {
        autoSpinBtn.onclick = () => startAutoSpin();
    }

    document.querySelectorAll('.step-btn').forEach(btn => {
        btn.onclick = (e) => {
            const action = btn.dataset.action;
            const multiplierSpan = document.getElementById('betMultiplier');
            let current = parseInt(multiplierSpan.textContent) || 1;
            if (action === 'increase') {
                current = Math.min(current + 1, 100);
            } else {
                current = Math.max(current - 1, 1);
            }
            multiplierSpan.textContent = current;
            updateBetDisplay(current);
        };
    });

    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.onclick = (e) => {
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const multiplier = parseInt(btn.dataset.multiplier);
            document.getElementById('betMultiplier').textContent = multiplier;
            updateBetDisplay(multiplier);
        };
    });
}

function updateBetDisplay(multiplier) {
    const baseBet = 10.00;
    const singleBet = baseBet * multiplier;
    document.getElementById('singleBet').textContent = singleBet.toFixed(2);
    document.getElementById('totalBet').textContent = singleBet.toFixed(2);
}

function startAutoSpin() {
    let spins = 0;
    const maxSpins = 10;
    
    function doSpin() {
        if (spins >= maxSpins || isSpinning) return;
        spins++;
        startSpin();
        setTimeout(doSpin, 500);
    }
    
    doSpin();
}
