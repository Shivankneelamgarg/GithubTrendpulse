/**
 * TrendPulse Engine v1.0
 * Logic for detecting high-velocity breakout repositories on GitHub.
 */

const STATE = {
    token: localStorage.getItem('tp_gh_token') || '',
    repos: [],
    isFetching: false,
    lastSync: null,
    lang: '',
    topic: ''
};

// UI Elements
const els = {
    radarBody: document.getElementById('radar-body'),
    signalsList: document.getElementById('signals-list'),
    currentTime: document.getElementById('current-time'),
    rateLimit: document.getElementById('rate-limit'),
    engineStatus: document.getElementById('engine-status'),
    settingsModal: document.getElementById('settings-modal'),
    ghTokenInput: document.getElementById('gh-token'),
    saveSettings: document.getElementById('save-settings'),
    closeModal: document.getElementById('close-modal'),
    settingsBtn: document.getElementById('settings-btn'),
    langFilter: document.getElementById('lang-filter'),
    topicFilter: document.getElementById('topic-filter')
};

/**
 * INITIALIZATION
 */
function init() {
    setupEventListeners();
    startClock();
    
    if (!STATE.token) {
        showModal();
    } else {
        runRadar();
        setInterval(runRadar, 60000); // Pulse every minute
    }
}

/**
 * CORE LOGIC: THE VELOCITY ALGORITHM
 */
async function runRadar() {
    if (STATE.isFetching) return;
    updateEngineStatus('SCANNING');
    STATE.isFetching = true;

    try {
        const queryDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        let url = `https://api.github.com/search/repositories?q=created:>${queryDate}`;
        if (STATE.lang) url += `+language:${STATE.lang}`;
        if (STATE.topic) url += `+topic:${STATE.topic}`;
        url += `&sort=stars&order=desc&per_page=30`;
        
        const response = await fetch(url, {
            headers: STATE.token ? { 'Authorization': `token ${STATE.token}` } : {}
        });

        // Update Rate Limit info from headers
        const limit = response.headers.get('x-ratelimit-remaining');
        const total = response.headers.get('x-ratelimit-limit');
        if (limit) els.rateLimit.textContent = `${limit}/${total}`;

        if (!response.ok) throw new Error(`GH_API_ERROR: ${response.status}`);

        const data = await response.json();
        processRepos(data.items);
        
    } catch (error) {
        console.error(error);
        updateEngineStatus('ERROR');
    } finally {
        STATE.isFetching = false;
        setTimeout(() => updateEngineStatus('IDLE'), 2000);
    }
}

function processRepos(items) {
    const processed = items.map(repo => {
        const ageHours = (Date.now() - new Date(repo.created_at).getTime()) / (1000 * 60 * 60);
        const velocity = repo.stargazers_count / ageHours;
        const pulseScore = velocity * Math.log10(repo.stargazers_count + 1) * 10;
        
        return {
            ...repo,
            velocity: velocity.toFixed(2),
            pulseScore: pulseScore.toFixed(0),
            ageHours
        };
    });

    // Sort by Pulse Score (The Zero-Day Signal)
    STATE.repos = processed.sort((a, b) => b.pulseScore - a.pulseScore);
    renderRadar();
    renderSignals();
}

/**
 * RENDERING
 */
function renderRadar() {
    els.radarBody.innerHTML = STATE.repos.map((repo, index) => {
        let rankBadge = index + 1;
        if (index === 0) rankBadge = '👑 1';
        else if (index === 1) rankBadge = '🔥 2';
        else if (index === 2) rankBadge = '🚀 3';

        return `
        <tr class="fade-in">
            <td class="v-rank">${rankBadge}</td>
            <td class="v-repo">
                <a href="${repo.html_url}" target="_blank">${repo.full_name}</a>
                <div class="repo-desc">${repo.description || 'NO_DESCRIPTION_PROVIDED'}</div>
            </td>
            <td>${repo.stargazers_count}</td>
            <td class="v-velocity">+${repo.velocity}</td>
            <td class="v-pulse">${repo.pulseScore}</td>
            <td><span class="up">▲ ASCENDING</span></td>
        </tr>
        `;
    }).join('');
}

function renderSignals() {
    // Top 5 "Breakout" signals
    const topSignals = STATE.repos.slice(0, 5);
    els.signalsList.innerHTML = topSignals.map(repo => `
        <div class="signal-item">
            <div class="sig-header">[!] BREAKOUT_DETECTED</div>
            <div class="sig-body">${repo.name.toUpperCase()} >> PULSE: ${repo.pulseScore}</div>
        </div>
    `).join('');
}

/**
 * HELPERS
 */
function setupEventListeners() {
    els.settingsBtn.onclick = showModal;
    els.closeModal.onclick = hideModal;
    els.saveSettings.onclick = () => {
        const token = els.ghTokenInput.value.trim();
        if (token) {
            localStorage.setItem('tp_gh_token', token);
            STATE.token = token;
            hideModal();
            runRadar();
        }
    };
    els.langFilter.onchange = (e) => {
        STATE.lang = e.target.value;
        triggerScan();
    };
    els.topicFilter.onchange = (e) => {
        STATE.topic = e.target.value;
        triggerScan();
    };
}

function triggerScan() {
    els.radarBody.innerHTML = `<tr><td colspan="6" class="loading-state">ADJUSTING_FREQUENCIES...</td></tr>`;
    runRadar();
}

function startClock() {
    setInterval(() => {
        els.currentTime.textContent = new Date().toUTCString().split(' ')[4] + ' UTC';
    }, 1000);
}

function updateEngineStatus(status) {
    els.engineStatus.textContent = status;
}

function showModal() { els.settingsModal.classList.remove('hidden'); }
function hideModal() { els.settingsModal.classList.add('hidden'); }

// Run
init();
