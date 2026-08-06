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

    <div class="slot-machine-container">

        <div class="grid" id="reelsContainer"></div>

    </div>

    <div class="controls">

        <button class="slot-spin">
            开始转动
        </button>

    </div>

    `;

    initSlotGame();

}
