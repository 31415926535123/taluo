function  showStartCard() {
        const cardFront = document.getElementById('card-front');
        const cardBack = document.getElementById('card-back');
        if (cardFront) cardFront.classList.remove('hidden');
        if (cardBack) cardBack.classList.remove('hidden');
    }
// 牌阵定义
        const spreads = {
            single: {
                name: "单张牌占卜",
                positions: ["你的现状"]
            },
            three: {
                name: "三张牌占卜",
                positions: ["过去", "现在", "未来"]
            }
        };
        
        // 游戏类
        class TarotGame {
            constructor() {
                this.deck = [...tarotDeck];
                this.currentReading = [];
                this.selectedSpread = null;
                this.setupEventListeners();
            }
            
            setupEventListeners() {
                // 牌阵选择按钮
                document.getElementById('single-spread').addEventListener('click', () => this.showNewButtons());
                document.getElementById('three-spread').addEventListener('click', () => this.startReading('three'));
                document.getElementById('fortune').addEventListener('click', () => this.startSingleReading('财运'));
                document.getElementById('love').addEventListener('click', () => this.startSingleReading('爱情'));
                document.getElementById('friendship').addEventListener('click', () => this.startSingleReading('友情'));
                document.getElementById('family').addEventListener('click', () => this.startSingleReading('亲情'));
                document.getElementById('difficulty').addEventListener('click', () => this.startSingleReading('困难'));
                // 关闭模态框按钮
                document.getElementById('close-modal').addEventListener('click', () => {
                    document.getElementById('interpretation-modal').classList.remove('active');
                });
                
                // 点击模态框背景关闭
                document.getElementById('interpretation-modal').addEventListener('click', (e) => {
                    if (e.target === document.getElementById('interpretation-modal')) {
                        document.getElementById('interpretation-modal').classList.remove('active');
                    }
                });
            }
            showNewButtons() {
                // 隐藏原有按钮
                document.getElementById('single-spread').classList.add('hidden');
                document.getElementById('three-spread').classList.add('hidden');
                // 显示新按钮
                document.getElementById('new-buttons').classList.remove('hidden');
            }
            startSingleReading(category) {
                this.selectedSpread = 'single';
                this.currentReading = [];
                
                // 清空结果区域
                document.getElementById('reading-area').innerHTML = '';
                // 显示洗牌动画
                        
        const cardBack = document.getElementById('carba');
        cardBack.classList.add('hidden');
        const car= document.getElementById('main-card');
        car.classList.add('hidden');
        const carra= document.getElementById('deck');
        carra.classList.add('hidden');
       
                // 洗牌动画结束后抽牌
                setTimeout(() => {
                    
                    this.drawCards('single', category);
                }, 1);
            }
            startReading(spreadType) {
                this.selectedSpread = spreadType;
                this.currentReading = [];
                
                // 清空结果区域
                document.getElementById('reading-area').innerHTML = '';               
                // 洗牌动画结束后抽牌
                setTimeout(() => {
                    this.drawCards(spreadType);
                }, 3000);
            }
            
            drawCards(spreadType) {
                // 复制牌组并洗牌
                const shuffledDeck = [...this.deck].sort(() => Math.random() - 0.5);
                const spread = spreads[spreadType];
                const cardCount = spread.positions.length;
                
                // 抽取所需数量的牌
                for (let i = 0; i < cardCount; i++) {
                    const card = shuffledDeck[i];
                    const orientation = Math.random() > 0.5 ? 'upright' : 'reversed';
                    
                    this.currentReading.push({
                        ...card,
                        orientation
                    });
                    
                    // 延迟显示每张牌，创造抽牌效果
                    setTimeout(() => {
                        this.displayCard(card, i, spreadType);
                    }, i * 500);
                }
            }
            
            displayCard(card, positionIndex, spreadType) {
                const readingArea = document.getElementById('reading-area');
                const spread = spreads[spreadType];
                const position = spread.positions[positionIndex];
                
                // 创建牌元素
                const cardElement = document.createElement('div');
                cardElement.className = 'deck';
                cardElement.dataset.id = card.id;
                cardElement.dataset.position = positionIndex;
                
                const cardInner = document.createElement('div');
                cardInner.className = 'card';
                
                const cardFront = document.createElement('div');
                cardFront.className = 'card-face card-front';
                
                // 牌面内容
                const cardImage = document.createElement('img');
                cardImage.src = card.image;
                cardImage.alt = `${card.name}塔罗牌`;
                cardImage.className = 'card-image';
                
                const cardName = document.createElement('div');
                cardName.className = 'card-name';
                cardName.textContent = card.name;
                
                const cardPosition = document.createElement('div');
                cardPosition.className = 'card-position';
                cardPosition.textContent = position;
                
                cardFront.appendChild(cardImage);
                cardFront.appendChild(cardName);
                cardFront.appendChild(cardPosition);
                
                const cardBack = document.createElement('div');
                cardBack.className = 'card-face card-back';
                
                cardInner.appendChild(cardFront);
                cardInner.appendChild(cardBack);
                cardElement.appendChild(cardInner);
                
                // 添加点击事件显示解释
                cardElement.addEventListener('click', () => {
                    this.showInterpretation(card, position, positionIndex);
                });
                
                // 添加到结果区域
                readingArea.appendChild(cardElement);
                
                // 触发翻转动画
                setTimeout(() => {
                    cardInner.classList.add('flipped');
                }, 100);
            }
            
            showInterpretation(card, position, positionIndex) {
                const modal = document.getElementById('interpretation-modal');
                const title = document.getElementById('modal-title');
                const content = document.getElementById('interpretation');
                
                // 获取牌的正逆位
                const cardData = this.currentReading.find(c => c.id === card.id && 
                    this.currentReading.indexOf(c) === positionIndex);
                const orientation = cardData.orientation;
                
                // 设置模态框内容
                title.textContent = `${card.name} (${orientation === 'upright' ? '正位' : '逆位'}) - ${position}`;
                
                content.innerHTML = `
                    <div class="card-details">
                        <h3>牌面含义</h3>
                        <p>${orientation === 'upright' ? card.upright : card.reversed}</p>
                    </div>
                    <div class="interpretation">
                        <h3>解读</h3>
                        <p>${card.description}</p>
                        <p><strong>${position}的启示：</strong>这张${orientation === 'upright' ? '正位' : '逆位'}的${card.name}表明，在${position.toLowerCase()}方面，${orientation === 'upright' ? '积极的能量正在流动，你可能会体验到' : '挑战或阻碍可能存在，���要注意'}${orientation === 'upright' ? card.upright : card.reversed.toLowerCase()}。</p>
                    </div>
                `;
                
                // 显示模态框
                modal.classList.add('active');
            }
        }
        
        // 初始化游戏
        document.addEventListener('DOMContentLoaded', () => {
            const game = new TarotGame();
        });

