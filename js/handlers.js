// No button interaction handlers
function handleNoHover() {
    const now = Date.now();
    const HOVER_COOLDOWN = 500;
    
    if (now - state.noInteraction.lastMoveTime < HOVER_COOLDOWN) {
        return;
    }
    
    state.noInteraction.lastMoveTime = now;
    state.noInteraction.hovers++;
    
    const noBtn = document.getElementById('noBtn');
    const screen1 = document.getElementById('screen1');
    
    // Phase 1: Small dodges (hovers 1-2)
    if (state.noInteraction.hovers <= 2) {
        executePhase1Dodge(noBtn, state.noInteraction.hovers);
        return;
    }
    
    // Phase 2: Card shake + shrink (hovers 3-5)
    if (state.noInteraction.hovers <= 5) {
        executePhase2Shrink(noBtn, state.noInteraction.hovers);
        return;
    }
    
    // Phase 3: Screen shake + move button
    shakeScreen();
    moveButtonWithinCard(noBtn, screen1);
}

function executePhase1Dodge(btn, hoverCount) {
    const direction = hoverCount % 2 === 0 ? -1 : 1;
    btn.style.transform = `translateX(${direction * 46}px) rotate(${direction * 8}deg)`;
    
    setTimeout(() => {
        btn.style.transform = '';
    }, 260);
}

function executePhase2Shrink(btn, hoverCount) {
    shakeCard('screen1');
    
    const scale = Math.max(0.48, 1 - (hoverCount - 2) * 0.15);
    btn.style.fontSize = (scale * 1.6) + 'rem';
    btn.style.padding = (scale * 0.55) + 'rem ' + (scale * 1.7) + 'rem';
    btn.style.opacity = scale;
    btn.textContent = state.phrases[Math.min(hoverCount, state.phrases.length - 1)];
}

function handleNoClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    state.noInteraction.clicks++;
    const noBtn = document.getElementById('noBtn');
    const screen1 = document.getElementById('screen1');
    
    shakeCard('screen1');
    
    // Disappear after 5 clicks
    if (state.noInteraction.clicks >= 5) {
        makeButtonDisappear(noBtn);
        return;
    }
    
    // Special flip animation on first click
    if (state.noInteraction.clicks === 1) {
        flipButton(noBtn);
        return;
    }
    
    // Continue phase 3
    state.noInteraction.hovers = 6;
    shakeScreen();
    moveButtonWithinCard(noBtn, screen1);
}

function flipButton(btn) {
    btn.style.transform = 'rotate(180deg)';
    btn.textContent = 'still no? 😤';
    
    setTimeout(() => {
        btn.style.transform = '';
        btn.textContent = state.phrases[Math.min(state.noInteraction.hovers, state.phrases.length - 1)];
    }, 600);
}

function makeButtonDisappear(btn) {
    btn.style.opacity = '0';
    btn.style.transform = 'scale(0)';
    
    setTimeout(() => {
        btn.style.display = 'none';
    }, 300);
}

function moveButtonWithinCard(btn, container) {
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    
    const padding = 40;
    const maxX = containerRect.width - btnRect.width - padding * 2;
    const maxY = containerRect.height - btnRect.height - padding * 2;
    
    const newX = padding + Math.random() * Math.max(0, maxX);
    const newY = padding + Math.random() * Math.max(0, maxY);
    
    btn.style.position = 'absolute';
    btn.style.left = newX + 'px';
    btn.style.top = newY + 'px';
    btn.textContent = state.phrases[Math.min(state.noInteraction.hovers, state.phrases.length - 1)];
}

// Yes button handler
function handleYes() {
    transitionToPlanner();
}
