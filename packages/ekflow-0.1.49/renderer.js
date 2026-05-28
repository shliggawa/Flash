const DEFAULT_PRESETS = [
  { id: 'linear', name: 'Linear', locked: true, linear: true, x1: 1 / 3, y1: 1 / 3, x2: 2 / 3, y2: 2 / 3 },
  { id: 'easeInOut', name: 'Ease In Out', locked: true, x1: 0.36, y1: 0, x2: 0.64, y2: 1 },
  { id: 'easeOut', name: 'Ease Out', locked: true, x1: 0, y1: 0, x2: 0.45, y2: 1 },
  { id: 'easeIn', name: 'Ease In', locked: true, x1: 0.55, y1: 0, x2: 1, y2: 1 },
  { id: 'smooth', name: 'Smooth', locked: true, x1: 0.22, y1: 0.1, x2: 0.78, y2: 0.9 },
  { id: 'snappy', name: 'Snappy', locked: true, x1: 0.12, y1: 0.72, x2: 0.24, y2: 1 },
  { id: 'hardStop', name: 'Hard Stop', locked: true, x1: 0.08, y1: 1, x2: 0.22, y2: 1 },
  { id: 'softStart', name: 'Soft Start', locked: true, x1: 0.78, y1: 0, x2: 0.92, y2: 0.28 },
  { id: 'back', name: 'Back', locked: true, x1: 0.22, y1: -0.26, x2: 0.68, y2: 1.22 }
];

const SETTINGS_KEY = 'flowSplineSettings';
const CUSTOM_KEY = 'flowSplinePresets';
const HISTORY_KEY = 'flowSplineHistory';
const ASSIGNED_KEY = 'flowSplineAssigned';
const LAYOUT_RESIZE_DELAY = 70;
const BUILD_LABEL = 'Flash 0.2.13 module host split build 2026-05-29';
const FLASH_CATALOG_URL = 'https://raw.githubusercontent.com/shliggawa/Flash/main/catalog.json';
const FLASH_UPDATE_URL = 'https://raw.githubusercontent.com/shliggawa/Flash/main/flash-update.json';
const FLASH_VERSION = '0.2.13';

const MODULE_ICONS = {
  ekflow: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 17.8h15"></path>
      <path d="M5.2 16.6C8 16.2 8.5 7 12.2 7c3.1 0 2.9 7.7 6.6 7.9"></path>
      <circle cx="9.8" cy="10" r="1.5"></circle>
      <circle cx="14.6" cy="8.7" r="1.5"></circle>
    </svg>`,
  configure: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10.4 4.7 11.1 3h1.8l.7 1.7 1.5.6 1.7-.7 1.3 1.3-.7 1.7.6 1.5 1.8.7v1.8l-1.8.7-.6 1.5.7 1.7-1.3 1.3-1.7-.7-1.5.6-.7 1.8h-1.8l-.7-1.8-1.5-.6-1.7.7-1.3-1.3.7-1.7-.6-1.5-1.8-.7V9.8l1.8-.7.6-1.5-.7-1.7 1.3-1.3 1.7.7z"></path>
      <circle cx="12" cy="11" r="2.5"></circle>
    </svg>`,
  power: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v8"></path>
      <path d="M7.4 5.8a7 7 0 1 0 9.2 0"></path>
    </svg>`,
  store: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 8.5h11l1 11h-13z"></path>
      <path d="M9 8.5a3 3 0 0 1 6 0"></path>
    </svg>`
};

const FLASH_MODULES = [
  {
    id: 'ekflow',
    name: 'ekFlow',
    shortName: 'ekFlow',
    description: 'Spline presets and graph editing for Fusion.',
    latestVersion: '0.1.46',
    installedVersion: '',
    railStatus: 'Active',
    bannerClass: 'spline-banner',
    icon: 'ekflow',
    owned: false,
    installed: false,
    enabled: false,
    configurable: true,
    storePage: true,
    entryPage: 'ekflow',
    manifestPath: 'modules/ekflow/module.json',
    catalogUrl: 'https://example.com/flash/catalog.json',
    packageUrl: '',
    packageSha256: '',
    actions: {
      configure: 'Configure module',
      enable: 'Enable or disable',
      store: 'View store page'
    }
  }
];

const state = {
  galleries: [{ id: 'gallery-0', name: 'ekFlow', presets: [...DEFAULT_PRESETS] }],
  galleryIndex: 0,
  flashPage: 'ekflow',
  activeModuleId: 'ekflow',
  hostedModule: null,
  configModuleId: 'ekflow',
  moduleStates: {},
  moduleCatalog: null,
  catalogStatus: 'Local catalog',
  flashUpdateManifest: null,
  downloadedFlashUpdate: null,
  presets: [...DEFAULT_PRESETS],
  active: { ...DEFAULT_PRESETS[1] },
  mode: 'playhead',
  behavior: 'click',
  applyKey: 'R',
  lockKey: '',
  smoothKey: 'S',
  linearKey: 'D',
  deleteKey: 'X',
  editorOpen: true,
  historyOpen: false,
  modifiersOpen: false,
  compactMode: false,
  compactReturnState: null,
  compactPage: 0,
  editorZoom: 1,
  editorScaleX: 1,
  editorScaleY: 1,
  galleryWidth: 258,
  historyWidth: 240,
  editorPan: { x: 0, y: 0 },
  flowFloat: { x: 12, y: 92 },
  flowCollapsed: false,
  layoutOrder: ['gallery', 'editor', 'history'],
  desktopNotify: false,
  soundEnabled: true,
  autoResizeFusion: false,
  autoLaunch: false,
  debugLogging: false,
  closeBehavior: 'close',
  globalApplyHotkey: false,
  theme: 'default',
  customTheme: {
    accent: '#7be8ff',
    font: 'aptos',
    radius: '9',
    background: '',
    backgroundName: '',
    backgroundFit: 'cover',
    backgroundPosition: '50% 50%',
    backgroundZoom: 1,
    backgroundOpacity: 0.48,
    backgroundColorInfluence: 0,
    backgroundPalette: null,
    blur: 8,
    header: '',
    headerName: '',
    headerFit: 'cover',
    headerPosition: '50% 50%',
    headerZoom: 1,
    headerOpacity: 0.55,
    headerBlur: 0
  },
  activeEdit: false,
  instantApply: false,
  advancedEdit: false,
  activeEditTarget: null,
  activeEditSignature: null,
  lastResolveSignature: null,
  activeEditLocalOwner: false,
  activeEditLastLocalSignature: null,
  activeEditPendingApplySignature: null,
  activeEditPendingApplyAt: 0,
  activeEditDirtySource: 'none',
  activeEditTargets: [],
  activeEditTargetKey: '',
  activeEditSuspended: false,
  activeEditSuspendReason: '',
  activeEditModeToken: 0,
  activeEditLastAppliedSignature: null,
  activeEditRejectedSignature: null,
  activeEditAcceptedGraph: null,
  activeEditResolveGraph: null,
  activeEditPendingResolveGraph: null,
  activeEditPendingResolveSignature: null,
  normalCurveSnapshot: null,
  galleryActiveId: 'easeInOut',
  selectedModifier: null,
  modifierBase: null,
  graphAfterimages: [],
  deletedKeyBursts: [],
  graphContext: null,
  graphContextActions: new Map(),
  graphContextMarker: null,
  lastGraphRightClick: null,
  editValueIndex: null,
  selectionAction: null,
  selectionActionSnapshot: null,
  selectionActionInstantApply: null,
  selectedKeyframes: [],
  editLockKeyframes: [],
  editLockRangeHint: null,
  preserveEditLockOnNextPreset: false,
  selectedKeyIndex: null,
  hoverKeyIndex: null,
  hoverKeySince: 0,
  cursorPos: null,
  selectionBox: null,
  undoStack: [],
  redoStack: [],
  assignedIds: [],
  wheelOpen: false,
  wheelMode: 'playhead',
  wheelSelectionInFlight: false,
  keyHoldTriggered: false,
  suppressTapUntil: 0,
  collapsedDrawerOpen: false,
  collapsedPickerOpen: false,
  history: [],
  dragging: null,
  applying: false,
  instantApplyQueued: false,
  lastShortcutAt: 0,
  localEditUntil: 0,
  localGraphDirty: false,
  resolveRefreshInFlight: false,
  nativeState: null,
  lastApplyKeyEvent: 'idle'
};

const els = {};

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function flashModules() {
  return FLASH_MODULES.map((module) => ({
    ...module,
    ...(catalogModule(module.id) || {}),
    ...getModuleState(module.id)
  }));
}

function getFlashModule(moduleId = state.activeModuleId) {
  return FLASH_MODULES.find((module) => module.id === moduleId) || FLASH_MODULES[0];
}

function catalogModules() {
  const raw = state.moduleCatalog?.modules;
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === 'object') return Object.values(raw);
  return [];
}

function catalogModule(moduleId) {
  return catalogModules().find((module) => module.id === moduleId) || null;
}

function getModuleState(moduleId) {
  const source = getFlashModule(moduleId);
  const saved = state.moduleStates?.[moduleId] || {};
  return {
    installed: saved.installed ?? source?.installed ?? false,
    enabled: saved.enabled ?? source?.enabled ?? false,
    owned: saved.owned ?? source?.owned ?? false,
    installedVersion: saved.installedVersion ?? source?.installedVersion ?? '',
    installedPath: saved.installedPath ?? source?.installedPath ?? ''
  };
}

function setModuleState(moduleId, patch) {
  const current = getModuleState(moduleId);
  state.moduleStates[moduleId] = { ...current, ...patch };
}

function moduleStatusLabel(module) {
  if (!module.owned) return 'Store';
  if (!module.installed) return 'Not installed';
  if (!module.enabled) return 'Disabled';
  if (moduleUpdateAvailable(module)) return 'Update';
  return module.railStatus || 'Active';
}

function compareVersions(a, b) {
  const left = String(a || '').split(/[.-]/).map((part) => Number.parseInt(part, 10)).map((part) => Number.isFinite(part) ? part : 0);
  const right = String(b || '').split(/[.-]/).map((part) => Number.parseInt(part, 10)).map((part) => Number.isFinite(part) ? part : 0);
  const len = Math.max(left.length, right.length);
  for (let i = 0; i < len; i += 1) {
    const diff = (left[i] || 0) - (right[i] || 0);
    if (diff !== 0) return diff > 0 ? 1 : -1;
  }
  return 0;
}

function moduleNeedsNewerFlash(module) {
  return module.minFlashVersion && compareVersions(FLASH_VERSION, module.minFlashVersion) < 0;
}

function moduleUpdateAvailable(module) {
  return Boolean(module.installed && module.latestVersion && module.installedVersion && compareVersions(module.latestVersion, module.installedVersion) > 0);
}

function renderModuleIcon(module) {
  return MODULE_ICONS[module.icon] || MODULE_ICONS.ekflow;
}

function renderFlashModules() {
  const modules = flashModules();
  const ownedModules = modules.filter((module) => module.owned);
  if (els.flashModuleList) {
    const installedModules = modules.filter((module) => module.owned && module.installed);
    els.flashModuleList.innerHTML = installedModules.length ? installedModules.map((module) => `
      <button class="module-tile ${state.flashPage !== 'home' && state.activeModuleId === module.id ? 'active' : ''} ${module.enabled ? '' : 'disabled'}" type="button" title="${escapeHtml(module.name)}" data-module-open="${escapeHtml(module.id)}">
        <span class="module-icon">${renderModuleIcon(module)}</span>
        <strong>${escapeHtml(module.shortName || module.name)}</strong>
        <small>${escapeHtml(moduleStatusLabel(module))}</small>
      </button>
    `).join('') : '<div class="module-empty">Install modules from Store.</div>';
  }
  if (els.homeModulesList) {
    els.homeModulesList.innerHTML = ownedModules.length ? ownedModules.map((module) => `
      <article class="owned-module-card ${module.enabled ? '' : 'disabled'}" data-module-id="${escapeHtml(module.id)}">
        <span class="module-banner ${escapeHtml(module.bannerClass || '')}" aria-hidden="true"></span>
        <span class="owned-module-body">
          <span class="owned-module-icon">${renderModuleIcon(module)}</span>
          <span>
            <strong>${escapeHtml(module.name)}</strong>
            <small>${escapeHtml(module.description)}</small>
          </span>
          <span class="module-action-strip" aria-label="${escapeHtml(module.name)} actions">
            <button class="module-action configure-action" type="button" title="Configure ${escapeHtml(module.name)}" data-module-configure="${escapeHtml(module.id)}">
              ${MODULE_ICONS.configure}
              <span>${escapeHtml(module.actions?.configure || 'Configure')}</span>
            </button>
            <button class="module-action enable-action" type="button" title="Enable or disable ${escapeHtml(module.name)}" data-module-toggle="${escapeHtml(module.id)}">
              ${MODULE_ICONS.power}
              <span>${module.enabled ? 'Disable module' : 'Enable module'}</span>
            </button>
            <button class="module-action store-action" type="button" title="View ${escapeHtml(module.name)} store page" data-module-store="${escapeHtml(module.id)}">
              ${MODULE_ICONS.store}
              <span>${escapeHtml(module.actions?.store || 'View store page')}</span>
            </button>
          </span>
        </span>
      </article>
    `).join('') : `
      <div class="home-empty-state">
        <strong>No modules installed yet.</strong>
        <span>Open Store, add ekFlow to your account, then install it through Flash.</span>
      </div>
    `;
  }
  if (els.homeModuleCount) {
    els.homeModuleCount.textContent = `${ownedModules.length} module${ownedModules.length === 1 ? '' : 's'}`;
  }
  updateModuleConfigModal();
  renderStoreModules();
}

function renderStoreModules() {
  if (!els.storeModulesList) return;
  const modules = flashModules();
  if (els.storeCatalogStatus) {
    els.storeCatalogStatus.textContent = `${state.catalogStatus || 'Local catalog'} | Flash ${FLASH_VERSION} | Source: ${FLASH_CATALOG_URL}`;
  }
  els.storeModulesList.innerHTML = modules.map((module) => {
    const needsFlash = moduleNeedsNewerFlash(module);
    const hasUpdate = moduleUpdateAvailable(module);
    const installedLabel = module.installed ? `Installed ${module.installedVersion || 'unknown'}` : module.owned ? 'In your account' : 'Available';
    const latestLabel = module.latestVersion ? `Latest ${module.latestVersion}` : 'Latest unknown';
    const stateLabel = needsFlash ? `Needs Flash ${module.minFlashVersion}` : hasUpdate ? `${installedLabel} - Update available` : `${installedLabel} - ${latestLabel}`;
    const primaryAction = needsFlash ? 'Needs Flash update' : hasUpdate ? 'Update' : module.installed ? 'Open' : module.owned ? 'Install' : 'Add to account';
    const primaryAttr = needsFlash ? 'data-store-blocked' : module.installed && !hasUpdate ? 'data-store-open' : module.owned || hasUpdate ? 'data-store-install' : 'data-store-add';
    return `
      <article class="store-module-card ${hasUpdate ? 'update-available' : ''} ${needsFlash ? 'blocked' : ''}">
        <span class="module-banner ${escapeHtml(module.bannerClass || '')}" aria-hidden="true"></span>
        <div class="store-module-body">
          <span class="owned-module-icon">${renderModuleIcon(module)}</span>
          <span class="store-module-copy">
            <strong>${escapeHtml(module.name)}</strong>
            <small>${escapeHtml(module.description)}</small>
            <em>${escapeHtml(stateLabel)}${module.latestVersion ? ` - Latest ${escapeHtml(module.latestVersion)}` : ''}</em>
            ${module.changelog ? `<b>${escapeHtml(module.changelog)}</b>` : ''}
          </span>
          <button class="store-install-button" type="button" ${primaryAttr}="${escapeHtml(module.id)}" ${needsFlash ? 'disabled' : ''}>${escapeHtml(primaryAction)}</button>
        </div>
      </article>
    `;
  }).join('');
}

function updateFlashModuleSelection() {
  for (const button of document.querySelectorAll('[data-module-open]')) {
    const active = state.flashPage !== 'home' && button.dataset.moduleOpen === state.activeModuleId;
    button.classList.toggle('active', active);
  }
}

function updateModuleConfigModal() {
  const module = flashModules().find((entry) => entry.id === state.configModuleId) || flashModules()[0];
  if (!module) return;
  if (els.moduleConfigTitle) els.moduleConfigTitle.textContent = module.name;
  if (els.moduleConfigSubtitle) els.moduleConfigSubtitle.textContent = module.description;
  if (els.moduleInstallTitle) els.moduleInstallTitle.textContent = module.installed ? 'Uninstall module' : 'Install module';
  if (els.moduleInstallSubtitle) {
    els.moduleInstallSubtitle.textContent = module.installed
      ? `Remove ${module.name} from this Flash install.`
      : module.owned
        ? `Download ${module.name} ${module.latestVersion || ''} into this Flash workspace.`
        : `Add ${module.name} to your account from Store first.`;
  }
}

function openModuleConfig(moduleId) {
  state.configModuleId = moduleId || state.activeModuleId || 'ekflow';
  updateModuleConfigModal();
  els.moduleConfigModal?.classList.remove('hidden');
}

function openFlashModule(moduleId) {
  const module = flashModules().find((entry) => entry.id === moduleId);
  if (!module) return;
  if (!module.installed) {
    openModuleConfig(module.id);
    showToast(`${module.name} is not installed`);
    return;
  }
  if (!module.enabled) {
    showToast(`${module.name} is disabled`);
    return;
  }
  state.activeModuleId = module.id;
  openHostedModule(module);
}

function pathToFileUrl(filePath) {
  const normalized = String(filePath || '').replace(/\\/g, '/');
  const withSlash = normalized.startsWith('/') ? normalized : `/${normalized}`;
  return `file://${encodeURI(withSlash)}`;
}

function openHostedModule(module) {
  const entry = module.entry || 'entry.html';
  const basePath = module.installedPath || '';
  const entryPath = basePath ? `${basePath.replace(/[\\/]$/, '')}\\${entry}` : '';
  state.hostedModule = { ...module, entryPath };
  state.flashPage = 'module';
  if (els.moduleHostTitle) els.moduleHostTitle.textContent = module.name || 'Module';
  if (els.moduleHostFrame && entryPath) {
    els.moduleHostFrame.src = pathToFileUrl(entryPath);
    els.moduleHostFallback?.classList.add('hidden');
  } else {
    if (els.moduleHostFrame) els.moduleHostFrame.removeAttribute('src');
    els.moduleHostFallback?.classList.remove('hidden');
  }
  applyUiState();
  scheduleLayoutResize();
}

function addModuleToAccount(moduleId) {
  const module = flashModules().find((entry) => entry.id === moduleId);
  if (!module) return;
  setModuleState(moduleId, { owned: true });
  saveSettings();
  renderFlashModules();
  showToast(`${module.name} added to account`);
}

async function installFlashModule(moduleId) {
  const module = flashModules().find((entry) => entry.id === moduleId);
  if (!module) return;
  if (moduleNeedsNewerFlash(module)) {
    showToast(`Needs Flash ${module.minFlashVersion}`);
    return;
  }
  if (!module.owned) {
    addModuleToAccount(moduleId);
    return;
  }
  if (!module.downloadUrl) {
    showToast('Download URL missing');
    return;
  }
  showToast(`Downloading ${module.name}...`);
  const result = await window.flowAPI?.installModule?.(module);
  if (!result?.ok) {
    showToast(result?.message || 'Install failed');
    return;
  }
  setModuleState(moduleId, {
    owned: true,
    installed: true,
    enabled: true,
    installedVersion: result.version || module.latestVersion || module.installedVersion || '',
    installedPath: result.installedPath || ''
  });
  saveSettings();
  renderFlashModules();
  applyUiState();
  showToast(result.message || `${module.name} installed`);
}

function toggleFlashModule(moduleId) {
  const module = flashModules().find((entry) => entry.id === moduleId);
  if (!module) return;
  const enabled = !module.enabled;
  setModuleState(moduleId, { enabled, installed: module.installed || enabled });
  saveSettings();
  renderFlashModules();
  applyUiState();
  showToast(`${module.name} ${enabled ? 'enabled' : 'disabled'}`);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeHotkeyValue(key) {
  const raw = String(key ?? '').trim();
  if (!raw) return '';
  if (raw === ' ') return 'SPACE';
  const upper = raw.toUpperCase();
  if (upper === 'ESCAPE' || upper === 'ESC') return '';
  if (upper === 'SPACE' || upper === 'TAB' || upper === 'ENTER' || upper === 'BACKSPACE' || upper === 'DELETE') return upper;
  if (/^F([1-9]|1[0-9]|2[0-4])$/.test(upper)) return upper;
  if (/^ARROW(UP|DOWN|LEFT|RIGHT)$/.test(upper)) return upper;
  if (raw.length === 1) return upper;
  return upper;
}

function keyLabel(key) {
  return normalizeHotkeyValue(key);
}

function getRect(canvas, compact = false) {
  if (compact) {
    const padX = Math.max(8, canvas.width * 0.11);
    const padY = Math.max(7, canvas.height * 0.13);
    return { x: padX, y: padY, w: canvas.width - padX * 2, h: canvas.height - padY * 2 };
  }
  const padX = Math.max(26, canvas.width * 0.08);
  const padTop = Math.max(22, canvas.height * 0.075);
  const padBottom = Math.max(30, canvas.height * 0.1);
  const zoom = state.editorZoom || 1;
  const base = { x: padX, y: padTop, w: canvas.width - padX * 2, h: canvas.height - padTop - padBottom };
  const w = base.w * zoom * (state.editorScaleX || 1);
  const h = base.h * zoom * (state.editorScaleY || 1);
  return { x: base.x + (base.w - w) / 2 + state.editorPan.x, y: base.y + (base.h - h) / 2 + state.editorPan.y, w, h };
}

function pointFor(canvas, x, y, compact = false) {
  const r = getRect(canvas, compact);
  return { x: r.x + x * r.w, y: r.y + (1 - y) * r.h };
}

function hasRawValueScale(preset = state.active) {
  return Number.isFinite(Number(preset?.valueStart)) && Number.isFinite(Number(preset?.valueEnd));
}

function displayValueFromNormalized(preset, value) {
  return hasRawValueScale(preset) ? valueFromNormalized(preset, value) : value;
}

function displayValueForSample(preset, sample) {
  if (Number.isFinite(Number(sample?.rawValue))) return Number(sample.rawValue);
  return displayValueFromNormalized(preset, Number(sample?.v) || 0);
}

function displayValueForNormalizedField(preset, value) {
  return hasRawValueScale(preset) ? valueFromNormalized(preset, Number(value) || 0) : Number(value || 0);
}

function advancedValueRange(preset = state.active) {
  const samples = curveSamples(preset) || [];
  const rawScale = hasRawValueScale(preset);
  let min = rawScale ? Infinity : 0;
  let max = rawScale ? -Infinity : 1;
  if (samples.length) {
    const values = [];
    for (const sample of samples) {
      values.push(displayValueForSample(preset, sample));
      if (Number.isFinite(Number(sample.hInV))) values.push(displayValueForNormalizedField(preset, sample.hInV));
      if (Number.isFinite(Number(sample.hOutV))) values.push(displayValueForNormalizedField(preset, sample.hOutV));
    }
    min = rawScale ? Math.min(...values) : Math.min(0, ...values);
    max = rawScale ? Math.max(...values) : Math.max(1, ...values);
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    min = 0;
    max = 1;
  }
  if (Number.isFinite(Number(state.dragging?.graphDisplayValue))) {
    const dragValue = Number(state.dragging.graphDisplayValue);
    if (dragValue < min) min += (dragValue - min) * 0.06;
    if (dragValue > max) max += (dragValue - max) * 0.06;
  }
  const span = Math.max(0.0001, max - min);
  const pad = rawScale ? Math.max(span * 0.12, 0.0001) : Math.max(0.12, span * 0.12);
  return { min: min - pad, max: max + pad };
}

function sampledPoint(canvas, sample, compact = false) {
  const r = getRect(canvas, compact);
  const range = !compact && curveSamples(state.active) ? advancedValueRange(state.active) : { min: 0, max: 1 };
  const value = compact ? (Number(sample.v) || 0) : displayValueForSample(state.active, sample);
  const span = Math.max(0.0001, range.max - range.min);
  return { x: r.x + sample.t * r.w, y: r.y + ((range.max - value) / span) * r.h };
}

function curveSamples(preset) {
  if (Array.isArray(preset?.samples) && preset.samples.length > 1) return preset.samples;
  if (Array.isArray(preset?.applySamples) && preset.applySamples.length > 1) return preset.applySamples;
  return null;
}

function clonePreset(preset) {
  return preset ? JSON.parse(JSON.stringify(preset)) : null;
}

function stripResolveValuesFromGraph(graph) {
  const next = clonePreset(graph);
  if (!next) return next;
  for (const key of [
    'timeStart', 'timeEnd', 'keyStart', 'keyEnd', 'valueStart', 'valueEnd',
    'activeEditTarget', 'activeEditSignature', 'activeEditTargetKey', 'activeEditOwnerName',
    'activeEditInputName', 'activeEditKeyCount', 'activeEditNearestDistance',
    'activeEditIsPathDisplacement', 'activeEditTargets'
  ]) {
    delete next[key];
  }
  for (const listName of ['samples', 'applySamples']) {
    if (Array.isArray(next[listName])) {
      next[listName] = next[listName].map((sample) => {
        const clean = { ...sample };
        for (const key of ['rawTime', 'rawValue', 'hInRawTime', 'hInRawValue', 'hOutRawTime', 'hOutRawValue']) delete clean[key];
        return clean;
      });
    }
  }
  return next;
}

function isModifierGraph(graph = state.active) {
  return Boolean(graph?.modifierType || graph?.modifierDraft || state.selectedModifier);
}

function simpleShapeGraphFromPreset(preset) {
  const next = stripResolveValuesFromGraph(preset);
  if (!next) return next;
  const samples = sortedCurveSamples(next);
  if (samples && samples.length >= 2 && !isModifierGraph(next)) {
    const first = samples[0];
    const last = samples[samples.length - 1];
    const outSlope = Number(first.mOut ?? first.m ?? 1);
    const inSlope = Number(last.mIn ?? last.m ?? 1);
    const x1 = Number.isFinite(Number(first.hOutT)) ? Number(first.hOutT) : 1 / 3;
    const y1 = Number.isFinite(Number(first.hOutV)) ? Number(first.hOutV) : Number((outSlope * x1).toFixed(5));
    const x2 = Number.isFinite(Number(last.hInT)) ? Number(last.hInT) : 2 / 3;
    const y2 = Number.isFinite(Number(last.hInV)) ? Number(last.hInV) : Number((1 - inSlope * (1 - x2)).toFixed(5));
    delete next.samples;
    delete next.applySamples;
    delete next.sampled;
    delete next.sampleCount;
    delete next.overrideGraph;
    delete next.generatedFromBezier;
    next.x1 = Number.isFinite(x1) ? x1 : 1 / 3;
    next.y1 = Number.isFinite(y1) ? y1 : 1 / 3;
    next.x2 = Number.isFinite(x2) ? x2 : 2 / 3;
    next.y2 = Number.isFinite(y2) ? y2 : 2 / 3;
    next.linear = false;
  }
  if (!state.activeEdit && next.id?.startsWith?.('resolve-')) {
    next.name = 'Editor';
  }
  return next;
}

function displayNameForActive(graph = state.active) {
  if (!state.activeEdit && (graph?.id?.startsWith?.('resolve-') || graph?.activeEditTargetKey || graph?.activeEditOwnerName)) return 'Editor';
  return graph?.name || 'Editor';
}

function sortedCurveSamples(preset) {
  const samples = curveSamples(preset);
  return Array.isArray(samples) ? samples.map((sample) => ({ ...sample })).sort((a, b) => Number(a.t) - Number(b.t)) : null;
}

function slopeForSample(samples, index) {
  const slope = Number(samples[index]?.m);
  if (Number.isFinite(slope)) return slope;
  const previous = samples[index - 1];
  const current = samples[index];
  const next = samples[index + 1];
  if (previous && next && next.t !== previous.t) return (next.v - previous.v) / (next.t - previous.t);
  if (next && current && next.t !== current.t) return (next.v - current.v) / (next.t - current.t);
  if (previous && current && current.t !== previous.t) return (current.v - previous.v) / (current.t - previous.t);
  return 0;
}

function slopeForSampleSide(samples, index, side = 'out') {
  const sample = samples[index];
  const explicit = side === 'in' ? Number(sample?.mIn) : Number(sample?.mOut);
  if (Number.isFinite(explicit)) return explicit;
  return slopeForSample(samples, index);
}

function sampleValueBetween(previous, next, t, m0, m1) {
  const span = Math.max(0.0001, next.t - previous.t);
  const mix = clamp((t - previous.t) / span, 0, 1);
  if (
    Number.isFinite(Number(previous.hOutT)) &&
    Number.isFinite(Number(previous.hOutV)) &&
    Number.isFinite(Number(next.hInT)) &&
    Number.isFinite(Number(next.hInV))
  ) {
    const localX1 = clamp((Number(previous.hOutT) - previous.t) / span, -10, 10);
    const localX2 = clamp((Number(next.hInT) - previous.t) / span, -10, 10);
    const bezierT = solveBezierForX(mix, localX1, localX2);
    const u = 1 - bezierT;
    return u ** 3 * previous.v + 3 * u ** 2 * bezierT * Number(previous.hOutV) + 3 * u * bezierT ** 2 * Number(next.hInV) + bezierT ** 3 * next.v;
  }
  if (Number.isFinite(m0) && Number.isFinite(m1)) {
    const u2 = mix * mix;
    const u3 = u2 * mix;
    const h00 = 2 * u3 - 3 * u2 + 1;
    const h10 = u3 - 2 * u2 + mix;
    const h01 = -2 * u3 + 3 * u2;
    const h11 = u3 - u2;
    return h00 * previous.v + h10 * span * m0 + h01 * next.v + h11 * span * m1;
  }
  return previous.v + (next.v - previous.v) * mix;
}

function curvePoint(canvas, preset, t, compact = false) {
  const samples = curveSamples(preset);
  if (samples) {
    for (let index = 0; index < samples.length - 1; index += 1) {
      const current = samples[index];
      const next = samples[index + 1];
      if (next.t < t) continue;
      const span = Math.max(0.0001, next.t - current.t);
      const mix = clamp((t - current.t) / span, 0, 1);
      const out = sampleHandlePoint(canvas, current, 'out', compact);
      const incoming = sampleHandlePoint(canvas, next, 'in', compact);
      const start = sampledPoint(canvas, current, compact);
      const end = sampledPoint(canvas, next, compact);
      if (out && incoming) {
        const u = 1 - mix;
        return {
          x: u ** 3 * start.x + 3 * u ** 2 * mix * out.x + 3 * u * mix ** 2 * incoming.x + mix ** 3 * end.x,
          y: u ** 3 * start.y + 3 * u ** 2 * mix * out.y + 3 * u * mix ** 2 * incoming.y + mix ** 3 * end.y
        };
      }
      const v = sampleValueBetween(current, next, t, slopeForSampleSide(samples, index, 'out'), slopeForSampleSide(samples, index + 1, 'in'));
      return sampledPoint(canvas, { t, v }, compact);
    }
    return sampledPoint(canvas, samples[samples.length - 1], compact);
  }
  const p0 = pointFor(canvas, 0, 0, compact);
  const p1 = pointFor(canvas, preset.x1, preset.y1, compact);
  const p2 = pointFor(canvas, preset.x2, preset.y2, compact);
  const p3 = pointFor(canvas, 1, 1, compact);
  const u = 1 - t;
  return {
    x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
    y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y
  };
}

function bezierUnit(value, a, b) {
  const u = 1 - value;
  return 3 * u * u * value * a + 3 * u * value * value * b + value * value * value;
}

function bezierDerivative(value, a, b) {
  const u = 1 - value;
  return 3 * u * u * a + 6 * u * value * (b - a) + 3 * value * value * (1 - b);
}

function solveBezierForX(x, x1, x2) {
  let t = clamp(x, 0, 1);
  for (let i = 0; i < 8; i += 1) {
    const current = bezierUnit(t, x1, x2) - x;
    const slope = bezierDerivative(t, x1, x2);
    if (Math.abs(current) < 0.00001 || Math.abs(slope) < 0.00001) break;
    t = clamp(t - current / slope, 0, 1);
  }
  return t;
}

function bezierPresetPointAtTime(canvas, preset, time, compact = false) {
  const x1 = Number.isFinite(Number(preset.x1)) ? Number(preset.x1) : 1 / 3;
  const y1 = Number.isFinite(Number(preset.y1)) ? Number(preset.y1) : 1 / 3;
  const x2 = Number.isFinite(Number(preset.x2)) ? Number(preset.x2) : 2 / 3;
  const y2 = Number.isFinite(Number(preset.y2)) ? Number(preset.y2) : 2 / 3;
  const bezierT = solveBezierForX(time, x1, x2);
  const x = bezierUnit(bezierT, x1, x2);
  const y = bezierUnit(bezierT, y1, y2);
  return pointFor(canvas, x, y, compact);
}

function curveValueAtTime(preset, time) {
  const samples = curveSamples(preset);
  if (samples) {
    let previous = samples[0];
    for (let index = 0; index < samples.length; index += 1) {
      const sample = samples[index];
      if (sample.t >= time) {
        const previousIndex = Math.max(0, index - 1);
        return sampleValueBetween(previous, sample, time, slopeForSampleSide(samples, previousIndex, 'out'), slopeForSampleSide(samples, index, 'in'));
      }
      previous = sample;
    }
    return samples[samples.length - 1].v;
  }
  const bezierT = solveBezierForX(time, Number(preset.x1) || 0, Number(preset.x2) || 1);
  return bezierUnit(bezierT, Number(preset.y1) || 0, Number(preset.y2) || 1);
}

function curveSampleAtTime(preset, time) {
  const samples = curveSamples(preset);
  if (!samples) return { t: time, v: curveValueAtTime(preset, time) };
  let previous = samples[0];
  for (let index = 0; index < samples.length; index += 1) {
    const sample = samples[index];
    if (sample.t >= time) {
      const previousIndex = Math.max(0, index - 1);
      const v = sampleValueBetween(previous, sample, time, slopeForSampleSide(samples, previousIndex, 'out'), slopeForSampleSide(samples, index, 'in'));
      const hasRaw = Number.isFinite(Number(previous.rawValue)) || Number.isFinite(Number(sample.rawValue));
      if (!hasRaw) return { t: time, v };
      const rawPrevious = {
        ...previous,
        v: Number.isFinite(Number(previous.rawValue)) ? Number(previous.rawValue) : valueFromNormalized(preset, previous.v),
        hOutV: Number.isFinite(Number(previous.hOutRawValue)) ? Number(previous.hOutRawValue) : undefined
      };
      const rawSample = {
        ...sample,
        v: Number.isFinite(Number(sample.rawValue)) ? Number(sample.rawValue) : valueFromNormalized(preset, sample.v),
        hInV: Number.isFinite(Number(sample.hInRawValue)) ? Number(sample.hInRawValue) : undefined
      };
      const rawValue = sampleValueBetween(rawPrevious, rawSample, time, undefined, undefined);
      return { t: time, v, rawValue };
    }
    previous = sample;
  }
  return { ...samples[samples.length - 1], t: time };
}

function curvePointAtTime(canvas, preset, time, compact = false) {
  if (!curveSamples(preset)) return bezierPresetPointAtTime(canvas, preset, time, compact);
  return sampledPoint(canvas, curveSampleAtTime(preset, time), compact);
}

function sampleHandlePoint(canvas, sample, side, compact = false) {
  const tKey = side === 'in' ? 'hInT' : 'hOutT';
  const vKey = side === 'in' ? 'hInV' : 'hOutV';
  if (Number.isFinite(Number(sample?.[tKey])) && Number.isFinite(Number(sample?.[vKey]))) {
    return sampledPoint(canvas, { t: Number(sample[tKey]), v: Number(sample[vKey]) }, compact);
  }
  return null;
}

function strokeSampledCurvePath(ctx, canvas, samples, compact = false) {
  if (!Array.isArray(samples) || samples.length < 2) return false;
  const sorted = samples.map((sample) => ({ ...sample })).sort((a, b) => Number(a.t) - Number(b.t));
  const first = sampledPoint(canvas, sorted[0], compact);
  ctx.beginPath();
  ctx.moveTo(first.x, first.y);
  for (let index = 0; index < sorted.length - 1; index += 1) {
    const current = sorted[index];
    const next = sorted[index + 1];
    const start = sampledPoint(canvas, current, compact);
    const end = sampledPoint(canvas, next, compact);
    const out = sampleHandlePoint(canvas, current, 'out', compact);
    const incoming = sampleHandlePoint(canvas, next, 'in', compact);
    if (out && incoming) {
      ctx.bezierCurveTo(out.x, out.y, incoming.x, incoming.y, end.x, end.y);
    } else {
      const span = Math.max(0.0001, Number(next.t) - Number(current.t));
      const leftSlope = slopeForSampleSide(sorted, index, 'out');
      const rightSlope = slopeForSampleSide(sorted, index + 1, 'in');
      const c1 = sampledPoint(canvas, { t: Number(current.t) + span / 3, v: Number(current.v) + leftSlope * span / 3 }, compact);
      const c2 = sampledPoint(canvas, { t: Number(next.t) - span / 3, v: Number(next.v) - rightSlope * span / 3 }, compact);
      if (Number.isFinite(leftSlope) && Number.isFinite(rightSlope)) ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, end.x, end.y);
      else ctx.lineTo(end.x, end.y);
    }
    if (!Number.isFinite(start.x)) return false;
  }
  return true;
}

function renderedCurvePoints(canvas, preset, compact = false) {
  const samples = curveSamples(preset);
  const points = [];
  const push = (point) => {
    if (point && Number.isFinite(point.x) && Number.isFinite(point.y)) points.push(point);
  };
  const cubicPoint = (p0, p1, p2, p3, t) => {
    const u = 1 - t;
    return {
      x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
      y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y
    };
  };
  if (samples && samples.length > 1) {
    const sorted = samples.map((sample) => ({ ...sample })).sort((a, b) => Number(a.t) - Number(b.t));
    for (let index = 0; index < sorted.length - 1; index += 1) {
      const current = sorted[index];
      const next = sorted[index + 1];
      const p0 = sampledPoint(canvas, current, compact);
      const p3 = sampledPoint(canvas, next, compact);
      let p1 = sampleHandlePoint(canvas, current, 'out', compact);
      let p2 = sampleHandlePoint(canvas, next, 'in', compact);
      if (!p1 || !p2) {
        const span = Math.max(0.0001, Number(next.t) - Number(current.t));
        const leftSlope = slopeForSampleSide(sorted, index, 'out');
        const rightSlope = slopeForSampleSide(sorted, index + 1, 'in');
        if (Number.isFinite(leftSlope) && Number.isFinite(rightSlope)) {
          p1 = sampledPoint(canvas, { t: Number(current.t) + span / 3, v: Number(current.v) + leftSlope * span / 3 }, compact);
          p2 = sampledPoint(canvas, { t: Number(next.t) - span / 3, v: Number(next.v) - rightSlope * span / 3 }, compact);
        }
      }
      const steps = p1 && p2 ? 18 : 2;
      for (let step = 0; step <= steps; step += 1) {
        if (index > 0 && step === 0) continue;
        const t = step / steps;
        push(p1 && p2 ? cubicPoint(p0, p1, p2, p3, t) : {
          x: p0.x + (p3.x - p0.x) * t,
          y: p0.y + (p3.y - p0.y) * t
        });
      }
    }
    return points;
  }
  const p0 = pointFor(canvas, 0, 0, compact);
  const p1 = pointFor(canvas, preset.x1, preset.y1, compact);
  const p2 = pointFor(canvas, preset.x2, preset.y2, compact);
  const p3 = pointFor(canvas, 1, 1, compact);
  for (let step = 0; step <= 96; step += 1) push(cubicPoint(p0, p1, p2, p3, step / 96));
  return points;
}

function pointAlongPolyline(points, phase) {
  if (!Array.isArray(points) || points.length === 0) return null;
  if (points.length === 1) return points[0];
  let length = 0;
  const spans = [];
  for (let index = 0; index < points.length - 1; index += 1) {
    const a = points[index];
    const b = points[index + 1];
    const distance = Math.hypot(b.x - a.x, b.y - a.y);
    spans.push(distance);
    length += distance;
  }
  if (length <= 0.0001) return points[0];
  let target = ((phase % 1) + 1) % 1 * length;
  for (let index = 0; index < spans.length; index += 1) {
    const distance = spans[index];
    if (target <= distance || index === spans.length - 1) {
      const mix = distance <= 0.0001 ? 0 : target / distance;
      const a = points[index];
      const b = points[index + 1];
      return { x: a.x + (b.x - a.x) * mix, y: a.y + (b.y - a.y) * mix };
    }
    target -= distance;
  }
  return points[points.length - 1];
}

function pointAtXPhase(points, phase, rect) {
  if (!Array.isArray(points) || points.length === 0 || !rect) return null;
  if (points.length === 1) return points[0];
  const mix = clamp(phase, 0, 1);
  const targetX = rect.x + rect.w * mix;
  let best = null;
  let bestDistance = Infinity;
  for (let index = 0; index < points.length - 1; index += 1) {
    const a = points[index];
    const b = points[index + 1];
    if (!Number.isFinite(a.x) || !Number.isFinite(a.y) || !Number.isFinite(b.x) || !Number.isFinite(b.y)) continue;
    const minX = Math.min(a.x, b.x);
    const maxX = Math.max(a.x, b.x);
    if (targetX >= minX - 0.001 && targetX <= maxX + 0.001 && Math.abs(b.x - a.x) > 0.0001) {
      const local = clamp((targetX - a.x) / (b.x - a.x), 0, 1);
      const y = a.y + (b.y - a.y) * local;
      const distance = Math.abs((a.x + b.x) * 0.5 - targetX);
      if (distance < bestDistance) {
        best = { x: targetX, y };
        bestDistance = distance;
      }
    }
  }
  if (best) return best;

  const sorted = points
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y))
    .map((point) => ({ ...point }))
    .sort((a, b) => a.x - b.x);
  if (!sorted.length) return null;
  if (targetX <= sorted[0].x) return { x: targetX, y: sorted[0].y };
  for (let index = 0; index < sorted.length - 1; index += 1) {
    const a = sorted[index];
    const b = sorted[index + 1];
    if (targetX <= b.x && Math.abs(b.x - a.x) > 0.0001) {
      const local = clamp((targetX - a.x) / (b.x - a.x), 0, 1);
      return { x: targetX, y: a.y + (b.y - a.y) * local };
    }
  }
  return { x: targetX, y: sorted[sorted.length - 1].y };
}

function advancedMode() {
  return freeformEditingEnabled() && state.selectionAction?.type !== 'graph';
}

function freeformEditingEnabled() {
  return Boolean(state.activeEdit && !state.activeEditSuspended);
}

function setFreeformSuspended(enabled, reason = '') {
  state.activeEditSuspended = Boolean(enabled);
  state.activeEditSuspendReason = enabled ? reason : '';
  document.body.classList.toggle('freeform-suspended', Boolean(enabled));
  if (els.freeformSuspendNotice) {
    els.freeformSuspendNotice.classList.toggle('hidden', !enabled);
  }
  if (els.advancedSuspendOverlay) {
    els.advancedSuspendOverlay.classList.toggle('hidden', !enabled);
  }
}

function activeFreeformSynced() {
  if (!state.activeEdit || !state.activeEditResolveGraph) return true;
  return graphEffectivelySame(state.active, state.activeEditResolveGraph);
}

function updateSyncUi() {
  const freeform = Boolean(state.activeEdit);
  const inAction = Boolean(state.selectionAction);
  const synced = activeFreeformSynced();
  if (els.freeformBadge) {
    els.freeformBadge.textContent = inAction && state.selectionAction?.type === 'graph' ? 'APPLY GRAPH' : 'FREEFORM MODE';
  }
  if (els.syncStatus) {
    els.syncStatus.classList.toggle('hidden', !freeform);
    els.syncStatus.classList.toggle('not-synced', freeform && !synced);
    els.syncStatus.querySelector('span').textContent = synced ? 'Synced' : 'Not synced';
  }
  if (els.resetEditorButton) {
    els.resetEditorButton.textContent = freeform ? (synced ? 'Synced' : 'Sync') : 'Reset';
    els.resetEditorButton.classList.toggle('sync-button', freeform);
    els.resetEditorButton.classList.toggle('not-synced', freeform && !synced);
  }
}

async function syncActiveFreeformGraph(statusText = 'Synced from Resolve.') {
  if (!state.activeEdit) return false;
  state.activeEditLocalOwner = false;
  state.activeEditPendingApplySignature = null;
  state.activeEditPendingApplyAt = 0;
  state.activeEditDirtySource = 'none';
  state.localGraphDirty = false;
  state.localEditUntil = 0;
  const graph = await readResolveGraphNoAccept();
  if (graph) {
    acceptResolveGraph(graph, graphSignature(graph));
    setStatus(statusText);
    return true;
  }
  setStatus('Active Freeform waiting for a selected animated spline.');
  return false;
}

function parseActiveEditTargets(raw) {
  return String(raw || '')
    .split('~~')
    .map((entry) => entry.split('@@'))
    .filter((parts) => parts.length >= 5 && parts[0])
    .map((parts) => ({
      key: parts[0],
      label: parts[1] || parts[0],
      ownerName: parts[2] || '',
      inputName: parts[3] || '',
      keyCount: Number(parts[4]) || 0,
      isPathDisplacement: parts[5] === '1'
    }));
}

function graphSignature(graph = state.active) {
  const samples = curveSamples(graph) || [];
  return samples.map((sample) => [
    Number.isFinite(Number(sample.rawTime)) ? Number(sample.rawTime).toFixed(3) : Number(sample.t || 0).toFixed(5),
    Number.isFinite(Number(sample.rawValue)) ? Number(sample.rawValue).toFixed(5) : Number(sample.v || 0).toFixed(5),
    sample.mIn ?? '',
    sample.mOut ?? '',
    sample.hInT ?? '',
    sample.hInV ?? '',
    sample.hOutT ?? '',
    sample.hOutV ?? ''
  ].join(':')).join('|');
}

function graphShapeSignature(graph = state.active) {
  const samples = curveSamples(graph) || [];
  return samples.map((sample) => [
    Number(sample.t || 0).toFixed(5),
    Number(sample.v || 0).toFixed(5),
    Number.isFinite(Number(sample.mIn)) ? Number(sample.mIn).toFixed(5) : '',
    Number.isFinite(Number(sample.mOut)) ? Number(sample.mOut).toFixed(5) : '',
    Number.isFinite(Number(sample.hInT)) ? Number(sample.hInT).toFixed(5) : '',
    Number.isFinite(Number(sample.hInV)) ? Number(sample.hInV).toFixed(5) : '',
    Number.isFinite(Number(sample.hOutT)) ? Number(sample.hOutT).toFixed(5) : '',
    Number.isFinite(Number(sample.hOutV)) ? Number(sample.hOutV).toFixed(5) : ''
  ].join(':')).join('|');
}

function markLocalGraphEdit(duration = 1800) {
  state.localEditUntil = Math.max(state.localEditUntil || 0, Date.now() + duration);
  state.localGraphDirty = true;
  if (state.activeEdit) {
    state.activeEditLocalOwner = true;
    state.activeEditDirtySource = 'app';
    state.activeEditLastLocalSignature = graphShapeSignature(state.active);
  }
  updateSyncUi();
}

function graphSnapshot() {
  return JSON.parse(JSON.stringify(state.active));
}

function captureGraphAfterimage(preset = state.active) {
  if (!preset || preset === state.graphAfterimages?.[state.graphAfterimages.length - 1]?.preset) return;
  state.graphAfterimages = (state.graphAfterimages || []).filter((item) => Date.now() - item.time < 900);
  state.graphAfterimages.push({ preset: clonePreset(preset), time: Date.now() });
  if (state.graphAfterimages.length > 5) state.graphAfterimages.shift();
}

function pushUndo() {
  captureGraphAfterimage();
  state.undoStack.push(graphSnapshot());
  if (state.undoStack.length > 80) state.undoStack.shift();
  state.redoStack = [];
}

function restoreGraphSnapshot(snapshot) {
  if (!snapshot) return;
  state.active = state.activeEdit ? JSON.parse(JSON.stringify(snapshot)) : simpleShapeGraphFromPreset(snapshot);
  state.selectedKeyframes = [];
  state.selectedKeyIndex = null;
  if (els.activeName) els.activeName.textContent = displayNameForActive(state.active);
  if (els.presetName) els.presetName.value = displayNameForActive(state.active);
  drawCurve(els.curveCanvas, state.active);
  renderGallery();
  updateCollapsedGraphPreview();
  applyUiState();
}

function undoGraph() {
  if (!state.undoStack.length) return;
  state.redoStack.push(graphSnapshot());
  restoreGraphSnapshot(state.undoStack.pop());
}

function redoGraph() {
  if (!state.redoStack.length) return;
  state.undoStack.push(graphSnapshot());
  restoreGraphSnapshot(state.redoStack.pop());
}

function handlePointsForSample(canvas, samples, index) {
  const sample = samples[index];
  if (!sample) return null;
  const previous = samples[index - 1];
  const next = samples[index + 1];
  const leftSpan = previous ? sample.t - previous.t : next ? next.t - sample.t : 0.12;
  const rightSpan = next ? next.t - sample.t : previous ? sample.t - previous.t : 0.12;
  const inSlope = slopeForSampleSide(samples, index, 'in');
  const outSlope = slopeForSampleSide(samples, index, 'out');
  const left = {
    t: Number.isFinite(Number(sample.hInT)) ? Number(sample.hInT) : sample.t - leftSpan / 3,
    v: Number.isFinite(Number(sample.hInV)) ? Number(sample.hInV) : sample.v - inSlope * leftSpan / 3
  };
  const right = {
    t: Number.isFinite(Number(sample.hOutT)) ? Number(sample.hOutT) : sample.t + rightSpan / 3,
    v: Number.isFinite(Number(sample.hOutV)) ? Number(sample.hOutV) : sample.v + outSlope * rightSpan / 3
  };
  return {
    center: sampledPoint(canvas, sample),
    left: sampledPoint(canvas, left),
    right: sampledPoint(canvas, right),
    leftData: left,
    rightData: right
  };
}

function drawRoundedRect(ctx, x, y, w, h, radius) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawEndpointHoldLines(ctx, canvas, samples, compact) {
  if (compact || !samples?.length) return;
  const first = samples[0];
  const last = samples[samples.length - 1];
  const r = getRect(canvas);
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.58)';
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 7]);
  if (Number(first.t) > 0.0001) {
    const p = sampledPoint(canvas, first);
    ctx.beginPath();
    ctx.moveTo(r.x, p.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }
  if (Number(last.t) < 0.9999) {
    const p = sampledPoint(canvas, last);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(r.x + r.w, p.y);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  ctx.restore();
}

function timeBoundaryForSample(samples, index) {
  const gap = 0.0008;
  if (!samples?.[index]) return { min: 0, max: 1 };
  const previous = samples[index - 1];
  const next = samples[index + 1];
  let min = previous ? Math.min(1, Number(previous.t) + gap) : 0;
  let max = next ? Math.max(0, Number(next.t) - gap) : 1;
  if (min > max) {
    const mid = (min + max) / 2;
    min = mid;
    max = mid;
  }
  return { min, max };
}

function lerp(a, b, t) {
  return a + (b - a) * clamp(t, 0, 1);
}

function colorMixRGB(from, to, t) {
  const mix = clamp(t, 0, 1);
  return `rgb(${Math.round(lerp(from[0], to[0], mix))}, ${Math.round(lerp(from[1], to[1], mix))}, ${Math.round(lerp(from[2], to[2], mix))})`;
}

function trianglePath(ctx, x, y, size) {
  const h = size * 0.9;
  ctx.beginPath();
  ctx.moveTo(x, y - h);
  ctx.lineTo(x + size * 0.86, y + h * 0.52);
  ctx.lineTo(x - size * 0.86, y + h * 0.52);
  ctx.closePath();
}

function drawLockIcon(ctx, x, y, size, color = '#ffd86b') {
  const w = size * 0.92;
  const h = size * 0.68;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(1, size * 0.12);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(x, y - h * 0.2, w * 0.36, Math.PI, Math.PI * 2);
  ctx.stroke();
  drawRoundedRect(ctx, x - w / 2, y - h * 0.12, w, h, Math.max(2, size * 0.14));
  ctx.fill();
  ctx.fillStyle = 'rgba(5, 8, 14, 0.78)';
  ctx.beginPath();
  ctx.arc(x, y + h * 0.14, Math.max(1.3, size * 0.12), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function strokePresetCurve(ctx, canvas, preset, compact = false) {
  const samples = curveSamples(preset);
  const steps = samples ? Math.max(96, samples.length * 12) : 96;
  if (samples && strokeSampledCurvePath(ctx, canvas, samples, compact)) return true;
  ctx.beginPath();
  for (let i = 0; i <= steps; i += 1) {
    const p = curvePoint(canvas, preset, i / steps, compact);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  return true;
}

function drawCurve(canvas, preset, compact = false) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || canvas.width;
  const cssH = canvas.clientHeight || canvas.height;
  if (canvas.width !== Math.floor(cssW * dpr) || canvas.height !== Math.floor(cssH * dpr)) {
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  const r = getRect(canvas, compact);
  ctx.fillStyle = compact ? '#071020' : '#070d18';
  if (compact) {
    drawRoundedRect(ctx, 0, 0, canvas.width, canvas.height, Math.max(14, Math.min(canvas.width, canvas.height) * 0.14));
    ctx.fill();
    ctx.clip();
  } else {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  const glow = ctx.createRadialGradient(canvas.width * 0.84, canvas.height * 0.06, 0, canvas.width * 0.84, canvas.height * 0.06, canvas.width * 0.92);
  glow.addColorStop(0, compact ? 'rgba(154, 104, 255, 0.24)' : 'rgba(154, 104, 255, 0.18)');
  glow.addColorStop(0.46, compact ? 'rgba(64, 144, 255, 0.1)' : 'rgba(64, 144, 255, 0.08)');
  glow.addColorStop(1, 'rgba(154, 104, 255, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const isAdvanced = !compact && advancedMode();
  ctx.strokeStyle = compact ? 'rgba(122, 177, 255, 0.14)' : (isAdvanced ? 'rgba(122, 177, 255, 0.12)' : 'rgba(122, 177, 255, 0.2)');
  ctx.lineWidth = compact ? 1 : 1.25;
  const gridSteps = compact ? 2 : (isAdvanced ? 16 : 4);
  for (let i = 0; i <= gridSteps; i += 1) {
    const x = r.x + (r.w * i) / gridSteps;
    const y = r.y + (r.h * i) / gridSteps;
    ctx.globalAlpha = isAdvanced && i % 4 !== 0 ? 0.46 : 1;
    ctx.beginPath();
    ctx.moveTo(x, r.y);
    ctx.lineTo(x, r.y + r.h);
    ctx.moveTo(r.x, y);
    ctx.lineTo(r.x + r.w, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  if (isAdvanced && state.activeEdit) {
    ctx.fillStyle = 'rgba(190, 213, 242, 0.62)';
    ctx.font = `${Math.max(9, canvas.width * 0.012)}px Aptos, Segoe UI, sans-serif`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const visibleRange = advancedValueRange(preset);
    for (let i = 0; i <= 4; i += 1) {
      const mix = i / 4;
      const y = r.y + r.h * mix;
      const normalized = visibleRange.max - mix * (visibleRange.max - visibleRange.min);
      ctx.fillText(Number(normalized.toFixed(3)).toString(), r.x - 7, y);
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const frameSteps = Math.max(4, Math.min(9, Math.floor(r.w / 56)));
    const seenFrameLabels = new Set();
    for (let i = 0; i <= frameSteps; i += 1) {
      const mix = i / frameSteps;
      const x = r.x + r.w * mix;
      const frame = Math.round(timeFromNormalized(preset, mix));
      if (!seenFrameLabels.has(frame)) {
        seenFrameLabels.add(frame);
        ctx.fillText(String(frame), x, r.y + r.h + 9);
      }
      ctx.strokeStyle = 'rgba(169, 207, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, r.y + r.h);
      ctx.lineTo(x, r.y + r.h + 5);
      ctx.stroke();
    }
  }

  if (isAdvanced && state.cursorPos) {
    ctx.strokeStyle = 'rgba(123, 232, 255, 0.34)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.moveTo(state.cursorPos.x, r.y);
    ctx.lineTo(state.cursorPos.x, r.y + r.h);
    ctx.moveTo(r.x, state.cursorPos.y);
    ctx.lineTo(r.x + r.w, state.cursorPos.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (isAdvanced && Number.isInteger(state.dragging?.sampleIndex) && !state.dragging.handle) {
    const samples = curveSamples(preset) || [];
    const bounds = timeBoundaryForSample(samples, state.dragging.sampleIndex);
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 212, 111, 0.48)';
    ctx.lineWidth = 1.15;
    ctx.setLineDash([5, 7]);
    for (const time of [bounds.min, bounds.max]) {
      const x = r.x + clamp(time, 0, 1) * r.w;
      ctx.beginPath();
      ctx.moveTo(x, r.y);
      ctx.lineTo(x, r.y + r.h);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.restore();
  }

  const displaySamples = curveSamples(preset);
  const isSampled = Boolean(displaySamples);
  const p0 = pointFor(canvas, 0, 0, compact);
  const p1 = pointFor(canvas, preset.x1, preset.y1, compact);
  const p2 = pointFor(canvas, preset.x2, preset.y2, compact);
  const p3 = pointFor(canvas, 1, 1, compact);

  if (!compact && !isSampled) {
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = 'rgba(123, 232, 255, 0.3)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.moveTo(p3.x, p3.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  drawEndpointHoldLines(ctx, canvas, displaySamples, compact);

  const modifierPending = !compact && canvas === els.curveCanvas && Boolean(state.selectedModifier);
  if (!compact && canvas === els.curveCanvas && els.modifierGraphNotice) {
    els.modifierGraphNotice.classList.toggle('hidden', !modifierPending);
  }
  if (!compact && canvas === els.curveCanvas && Array.isArray(state.graphAfterimages)) {
    const now = Date.now();
    state.graphAfterimages = state.graphAfterimages.filter((item) => now - item.time < 850);
    for (const item of state.graphAfterimages) {
      const age = now - item.time;
      const alpha = clamp(1 - age / 850, 0, 1);
      ctx.save();
      ctx.strokeStyle = `rgba(255, 70, 92, ${0.24 * alpha})`;
      ctx.lineWidth = isAdvanced ? 1.1 : 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = `rgba(255, 70, 92, ${0.18 * alpha})`;
      ctx.shadowBlur = 10 * alpha;
      if (strokePresetCurve(ctx, canvas, item.preset, false)) ctx.stroke();
      ctx.restore();
    }
  }
  if (!compact && canvas === els.curveCanvas && state.activeEditPendingResolveGraph) {
    ctx.save();
    ctx.strokeStyle = 'rgba(93, 190, 255, 0.45)';
    ctx.lineWidth = isAdvanced ? 1.15 : 1.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([6, 7]);
    ctx.shadowColor = 'rgba(75, 174, 255, 0.34)';
    ctx.shadowBlur = 12;
    if (strokePresetCurve(ctx, canvas, state.activeEditPendingResolveGraph, false)) ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }
  const resolveReference = !compact
    && canvas === els.curveCanvas
    && state.activeEdit
    && state.activeEditResolveGraph
    && !graphEffectivelySame(state.activeEditResolveGraph, preset)
    ? state.activeEditResolveGraph
    : null;
  if (resolveReference && !graphEffectivelySame(resolveReference, state.activeEditPendingResolveGraph)) {
    ctx.save();
    ctx.strokeStyle = 'rgba(93, 190, 255, 0.34)';
    ctx.lineWidth = isAdvanced ? 1 : 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([5, 8]);
    ctx.shadowColor = 'rgba(75, 174, 255, 0.24)';
    ctx.shadowBlur = 9;
    if (strokePresetCurve(ctx, canvas, resolveReference, false)) ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  const curveGradient = ctx.createLinearGradient(r.x, r.y + r.h, r.x + r.w, r.y);
  if (modifierPending) {
    curveGradient.addColorStop(0, '#ffd86b');
    curveGradient.addColorStop(0.52, '#ffe995');
    curveGradient.addColorStop(1, '#ffb84d');
  } else if (compact) {
    curveGradient.addColorStop(0, '#5be6d0');
    curveGradient.addColorStop(0.58, '#6fb8ff');
    curveGradient.addColorStop(1, '#9f8bff');
  } else if (isAdvanced) {
    curveGradient.addColorStop(0, '#56f59a');
    curveGradient.addColorStop(0.52, '#36d7c8');
    curveGradient.addColorStop(1, '#59bfff');
  } else {
    curveGradient.addColorStop(0, '#7be8ff');
    curveGradient.addColorStop(0.58, '#8e7cff');
    curveGradient.addColorStop(1, '#ff79bd');
  }
  ctx.strokeStyle = curveGradient;
  ctx.lineWidth = compact ? 1.45 : (isAdvanced ? 1.25 : 2.45);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = modifierPending ? 'rgba(255, 216, 107, 0.34)' : (compact ? 'rgba(91, 230, 208, 0.2)' : (isAdvanced ? 'rgba(54, 215, 200, 0.2)' : 'rgba(123, 232, 255, 0.3)'));
  ctx.shadowBlur = compact ? 3 : (isAdvanced ? 3 : 7);
  const steps = isSampled ? Math.max(96, displaySamples.length * 12) : 96;
  if (isSampled && strokeSampledCurvePath(ctx, canvas, displaySamples, compact)) {
    ctx.stroke();
  } else {
    ctx.beginPath();
    for (let i = 0; i <= steps; i += 1) {
      const p = curvePoint(canvas, preset, i / steps, compact);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }
  ctx.shadowBlur = 0;

  if (!compact || compact) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(r.x, r.y, r.w, r.h);
    ctx.clip();
    const phase = ((performance.now() % 2000) / 2000);
    const renderedPoints = renderedCurvePoints(canvas, preset, compact);
    const dot = pointAtXPhase(renderedPoints, phase, r);
    const tailPhase = phase - 0.035;
    const tail = tailPhase >= 0 ? pointAtXPhase(renderedPoints, tailPhase, r) : null;
    if (!dot) {
      ctx.restore();
      return;
    }
    if (tail && Math.hypot(dot.x - tail.x, dot.y - tail.y) < Math.max(26, r.w * 0.22)) {
      const dotGradient = ctx.createLinearGradient(tail.x, tail.y, dot.x, dot.y);
      dotGradient.addColorStop(0, 'rgba(123, 232, 255, 0)');
      dotGradient.addColorStop(1, modifierPending ? 'rgba(255, 216, 107, 0.76)' : (isAdvanced ? 'rgba(54, 215, 200, 0.62)' : 'rgba(123, 232, 255, 0.7)'));
      ctx.strokeStyle = dotGradient;
      ctx.lineWidth = compact ? 1 : (isAdvanced ? 1.15 : 1.8);
      ctx.beginPath();
      ctx.moveTo(tail.x, tail.y);
      ctx.lineTo(dot.x, dot.y);
      ctx.stroke();
    }
    ctx.fillStyle = modifierPending ? '#fff0a8' : (isAdvanced || compact ? '#9fffe4' : '#dff8ff');
    ctx.shadowColor = modifierPending ? 'rgba(255, 216, 107, 0.55)' : (isAdvanced || compact ? 'rgba(54, 215, 200, 0.5)' : 'rgba(123, 232, 255, 0.58)');
    ctx.shadowBlur = compact ? 5 : (isAdvanced ? 8 : 12);
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, compact ? 2.1 : (isAdvanced ? 3.1 : 4.2), 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  if (!compact && !isAdvanced) {
    ctx.fillStyle = '#dff8ff';
    for (const p of [p0, p3]) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (isSampled) {
    ctx.fillStyle = compact ? 'rgba(255, 212, 111, 0.9)' : '#ffd46f';
    const step = compact ? Math.max(1, Math.floor(displaySamples.length / 8)) : 1;
    const points = displaySamples.filter((_, index) => index > 0 && index < displaySamples.length - 1 && index % step === 0);
    if (!compact && isAdvanced) {
      for (let index = 0; index < displaySamples.length; index += 1) {
        if (index === state.selectedKeyIndex) continue;
        const handles = handlePointsForSample(canvas, displaySamples, index);
        if (!handles) continue;
        const near = state.cursorPos
          ? Math.max(
              0,
              1 - Math.min(
                Math.hypot(state.cursorPos.x - handles.center.x, state.cursorPos.y - handles.center.y),
                Math.hypot(state.cursorPos.x - handles.left.x, state.cursorPos.y - handles.left.y),
                Math.hypot(state.cursorPos.x - handles.right.x, state.cursorPos.y - handles.right.y)
              ) / Math.max(72, canvas.width * 0.11)
            )
          : 0;
        const alpha = 0.06 + near * 0.16;
        ctx.strokeStyle = `rgba(156, 169, 186, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(handles.left.x, handles.left.y);
        ctx.lineTo(handles.center.x, handles.center.y);
        ctx.lineTo(handles.right.x, handles.right.y);
        ctx.stroke();
        ctx.fillStyle = `rgba(156, 169, 186, ${alpha + 0.02})`;
        for (const point of [handles.left, handles.right]) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2.2 + near * 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    if (!compact && isAdvanced) {
      const handleIndexes = new Set(selectedSampleIndexes());
      if (Number.isInteger(state.selectedKeyIndex)) handleIndexes.add(state.selectedKeyIndex);
      for (const index of handleIndexes) {
        const handles = handlePointsForSample(canvas, displaySamples, index);
        if (handles) {
          const primary = index === state.selectedKeyIndex;
          ctx.strokeStyle = primary ? 'rgba(255, 62, 88, 0.56)' : 'rgba(255, 62, 88, 0.28)';
          ctx.lineWidth = 1.15;
          ctx.beginPath();
          ctx.moveTo(handles.left.x, handles.left.y);
          ctx.lineTo(handles.center.x, handles.center.y);
          ctx.lineTo(handles.right.x, handles.right.y);
          ctx.stroke();
          for (const point of [handles.left, handles.right]) {
            ctx.fillStyle = 'rgba(7, 14, 26, 0.88)';
            ctx.beginPath();
            ctx.arc(point.x, point.y, primary ? 4.0 : 3.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = primary ? 'rgba(255, 62, 88, 0.82)' : 'rgba(255, 62, 88, 0.5)';
            ctx.stroke();
          }
        }
      }
    }
    const visiblePointIndexes = new Set();
    if (isAdvanced) {
      displaySamples.forEach((_, index) => visiblePointIndexes.add(index));
    } else if (!compact) {
      visiblePointIndexes.add(0);
      visiblePointIndexes.add(displaySamples.length - 1);
    }
    const indexed = [...visiblePointIndexes].sort((a, b) => a - b).map((index) => ({ sample: displaySamples[index], index }));
    for (const { sample, index } of indexed) {
      const p = sampledPoint(canvas, sample, compact);
      const selected = !compact && state.selectedKeyframes.includes(index);
      const locked = modifierPending || (!compact && state.editLockKeyframes.includes(index));
      const hovered = !compact && state.hoverKeyIndex === index;
      const hoverMix = hovered ? clamp((Date.now() - state.hoverKeySince) / 220, 0, 1) : 0;
      if (modifierPending) {
        drawLockIcon(ctx, p.x, p.y, isAdvanced ? 9 : 8, '#ffd86b');
        continue;
      }
      if (isAdvanced) {
        const dist = state.cursorPos ? Math.hypot(p.x - state.cursorPos.x, p.y - state.cursorPos.y) : Infinity;
        const proximity = clamp(1 - dist / Math.max(54, canvas.width * 0.085), 0, 1);
        const endpoint = index === 0 || index === displaySamples.length - 1;
        const size = (endpoint ? 5.1 : 4.1) + proximity * 4.6 + hoverMix * 1.8;
        const strokeColor = locked
          ? 'rgb(255, 212, 111)'
          : selected
          ? 'rgb(255, 62, 88)'
          : endpoint
          ? colorMixRGB([255, 212, 111], [91, 214, 255], proximity)
          : colorMixRGB([86, 245, 154], [91, 214, 255], Math.max(proximity, selected ? 0.48 : 0));
        const fillMix = selected ? 0 : clamp(proximity * 0.78 + hoverMix * 0.35 + (locked ? 0.3 : 0), 0, 1);
        ctx.shadowColor = locked ? 'rgba(255,212,111,.46)' : selected ? 'rgba(255,62,88,.52)' : (proximity > 0.2 ? 'rgba(91,214,255,.34)' : 'transparent');
        ctx.shadowBlur = locked ? 13 : selected ? 12 : proximity * 9;
        if (endpoint) {
          ctx.beginPath();
          ctx.strokeStyle = selected ? 'rgba(255,62,88,.9)' : (index === 0 ? 'rgba(86,245,154,.78)' : 'rgba(91,214,255,.78)');
          ctx.lineWidth = 1.2;
          ctx.arc(p.x, p.y, size + 3.4, 0, Math.PI * 2);
          ctx.stroke();
        }
        trianglePath(ctx, p.x, p.y, size);
        ctx.fillStyle = selected ? 'rgba(7, 14, 26, 0.92)' : (locked ? `rgba(255, 212, 111, ${0.14 + fillMix * 0.54})` : `rgba(91, 214, 255, ${0.12 + fillMix * 0.56})`);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = selected || locked ? 2 : 1.35;
        ctx.fill();
        ctx.stroke();
        if (locked) {
          trianglePath(ctx, p.x, p.y, size + 3.2);
          ctx.strokeStyle = locked ? 'rgba(255, 212, 111, 0.96)' : 'rgba(255, 62, 88, 0.96)';
          ctx.lineWidth = 1.35;
          ctx.stroke();
        }
        if (fillMix > 0.08) {
          trianglePath(ctx, p.x, p.y, Math.max(1.2, size * (0.2 + fillMix * 0.38)));
          ctx.fillStyle = locked ? 'rgba(255, 212, 111, 0.88)' : selected ? 'rgba(255, 82, 104, 0.88)' : endpoint ? 'rgba(255, 212, 111, 0.78)' : `rgba(91, 214, 255, ${0.28 + fillMix * 0.62})`;
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.fillStyle = locked ? '#ffd46f' : selected ? '#ff3e58' : hovered ? '#ffffff' : (compact ? 'rgba(255, 212, 111, 0.9)' : '#ffd46f');
        ctx.shadowColor = locked ? 'rgba(255,212,111,.5)' : selected ? 'rgba(255,62,88,.5)' : hovered ? 'rgba(255,255,255,.45)' : 'transparent';
        ctx.shadowBlur = locked ? 12 : selected ? 12 : hovered ? 10 : 0;
        ctx.arc(p.x, p.y, compact ? 2.1 : 3.6 + hoverMix * 1.8, 0, Math.PI * 2);
        ctx.fill();
        if (selected || locked) {
          ctx.strokeStyle = locked ? 'rgba(255, 212, 111, 0.92)' : 'rgba(255, 62, 88, 0.92)';
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }
      ctx.shadowBlur = 0;
    }
  } else {
    if (modifierPending) {
      drawLockIcon(ctx, p1.x, p1.y, 12, '#ffd86b');
      drawLockIcon(ctx, p2.x, p2.y, 12, '#ffd86b');
      if (!compact && els.modifierGraphNotice) els.modifierGraphNotice.classList.remove('hidden');
    } else if (!compact && els.modifierGraphNotice) {
      els.modifierGraphNotice.classList.add('hidden');
    }
    if (!compact) {
      ctx.fillStyle = '#ffd46f';
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, 6.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.74)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#7be8ff';
      ctx.beginPath();
      ctx.arc(p2.x, p2.y, 6.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.74)';
      ctx.stroke();
    }
  }
  if (isAdvanced && state.selectionBox) {
    const { x1, y1, x2, y2 } = state.selectionBox;
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const w = Math.abs(x2 - x1);
    const h = Math.abs(y2 - y1);
    ctx.fillStyle = 'rgba(123, 232, 255, 0.09)';
    ctx.strokeStyle = 'rgba(123, 232, 255, 0.46)';
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, x, y, w, h, 6);
    ctx.fill();
    ctx.stroke();
  }
  if (isAdvanced && Number.isInteger(state.hoverKeyIndex) && Date.now() - state.hoverKeySince > 500) {
    const sample = displaySamples?.[state.hoverKeyIndex];
    if (sample) {
      const p = sampledPoint(canvas, sample, compact);
      const boxW = Math.min(218, canvas.width - 16);
      const boxH = 48;
      const x = clamp(p.x + 14, 8, canvas.width - boxW - 8);
      const y = clamp(p.y - 60, 8, canvas.height - boxH - 8);
      ctx.globalAlpha = clamp((Date.now() - state.hoverKeySince - 500) / 240, 0, 1);
      drawRoundedRect(ctx, x, y, boxW, boxH, 10);
      ctx.fillStyle = 'rgba(8, 14, 28, 0.94)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(123, 232, 255, 0.28)';
      ctx.stroke();
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = '#eef7ff';
      ctx.font = '700 10px Aptos, Segoe UI, sans-serif';
      ctx.fillText('Right click twice: delete', x + 10, y + 17);
      ctx.fillStyle = 'rgba(190, 213, 242, 0.78)';
      ctx.font = '650 9px Aptos, Segoe UI, sans-serif';
      ctx.fillText('Right click empty grid: add key', x + 10, y + 32);
      ctx.globalAlpha = 1;
    }
  }
  if (!compact && canvas === els.curveCanvas && Array.isArray(state.deletedKeyBursts)) {
    const now = Date.now();
    state.deletedKeyBursts = state.deletedKeyBursts.filter((burst) => now - burst.time < 520);
    for (const burst of state.deletedKeyBursts) {
      const age = now - burst.time;
      const mix = clamp(age / 520, 0, 1);
      ctx.save();
      ctx.globalAlpha = 1 - mix;
      ctx.strokeStyle = 'rgba(255, 94, 116, 0.9)';
      ctx.lineWidth = 1.4;
      ctx.setLineDash([4, 5]);
      ctx.beginPath();
      ctx.arc(burst.x, burst.y, 5 + mix * 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255, 94, 116, 0.75)';
      for (let i = 0; i < 4; i += 1) {
        const angle = Math.PI * 0.5 * i + mix * 1.8;
        ctx.beginPath();
        ctx.arc(burst.x + Math.cos(angle) * mix * 22, burst.y + Math.sin(angle) * mix * 22, 2.2 * (1 - mix), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }
  if (!compact && canvas === els.curveCanvas) updateAdvancedPanel();
  ctx.restore();
}

function startCurvePreviewAnimation() {
  if (startCurvePreviewAnimation.frame) return;
  const tick = () => {
    startCurvePreviewAnimation.frame = requestAnimationFrame(tick);
    if (!els.curveCanvas || state.flowCollapsed || !state.editorOpen) return;
    drawCurve(els.curveCanvas, state.active);
    for (const canvas of document.querySelectorAll('.preset canvas')) {
      const id = canvas.parentElement?.dataset?.id;
      const preset = state.presets.find((item) => item.id === id);
      if (preset) drawCurve(canvas, preset, true);
    }
  };
  startCurvePreviewAnimation.frame = requestAnimationFrame(tick);
}

function saveSettings() {
  const layoutState = state.compactMode && state.compactReturnState ? state.compactReturnState : state;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({
    mode: state.mode,
    behavior: state.behavior,
    applyKey: state.applyKey,
    smoothKey: state.smoothKey,
    linearKey: state.linearKey,
    deleteKey: state.deleteKey,
    editorOpen: layoutState.editorOpen,
    historyOpen: layoutState.historyOpen,
    modifiersOpen: layoutState.modifiersOpen,
    editorZoom: state.editorZoom,
    galleryWidth: state.galleryWidth,
    historyWidth: state.historyWidth,
    editorScaleX: state.editorScaleX,
    editorScaleY: state.editorScaleY,
    flowFloat: state.flowFloat,
    layoutOrder: state.layoutOrder,
    desktopNotify: state.desktopNotify,
    soundEnabled: state.soundEnabled,
    autoResizeFusion: state.autoResizeFusion,
    autoLaunch: state.autoLaunch,
    debugLogging: state.debugLogging,
    closeBehavior: state.closeBehavior,
    globalApplyHotkey: state.globalApplyHotkey,
    theme: state.theme,
    customTheme: state.customTheme,
    moduleStates: state.moduleStates,
    activeEdit: false,
    instantApply: state.instantApply,
    advancedEdit: layoutState.advancedEdit ?? state.advancedEdit,
    galleryIndex: state.galleryIndex
  }));
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    if (saved.mode === 'all' || saved.mode === 'playhead') state.mode = saved.mode;
    if (saved.behavior === 'click' || saved.behavior === 'key') state.behavior = saved.behavior;
    if (Object.prototype.hasOwnProperty.call(saved, 'applyKey')) state.applyKey = normalizeHotkeyValue(saved.applyKey);
    state.lockKey = '';
    if (Object.prototype.hasOwnProperty.call(saved, 'smoothKey')) state.smoothKey = normalizeHotkeyValue(saved.smoothKey);
    if (Object.prototype.hasOwnProperty.call(saved, 'linearKey')) state.linearKey = normalizeHotkeyValue(saved.linearKey);
    if (Object.prototype.hasOwnProperty.call(saved, 'deleteKey')) state.deleteKey = normalizeHotkeyValue(saved.deleteKey);
    state.editorOpen = true;
    if (typeof saved.historyOpen === 'boolean') state.historyOpen = saved.historyOpen;
    if (typeof saved.modifiersOpen === 'boolean') state.modifiersOpen = saved.modifiersOpen;
    if (Number.isFinite(saved.editorZoom)) state.editorZoom = clamp(saved.editorZoom, 0.2, 12);
    if (Number.isFinite(saved.galleryWidth)) state.galleryWidth = clamp(saved.galleryWidth, 176, 520);
    if (Number.isFinite(saved.historyWidth)) state.historyWidth = clamp(saved.historyWidth, 176, 420);
    if (Number.isFinite(saved.editorScaleX)) state.editorScaleX = clamp(saved.editorScaleX, 0.35, 8);
    if (Number.isFinite(saved.editorScaleY)) state.editorScaleY = clamp(saved.editorScaleY, 0.35, 8);
    if (saved.flowFloat && Number.isFinite(saved.flowFloat.x) && Number.isFinite(saved.flowFloat.y)) {
      state.flowFloat = { x: saved.flowFloat.x, y: saved.flowFloat.y };
    }
    if (Array.isArray(saved.layoutOrder) && saved.layoutOrder.length === 3) state.layoutOrder = saved.layoutOrder;
    if (typeof saved.desktopNotify === 'boolean') state.desktopNotify = saved.desktopNotify;
    if (typeof saved.soundEnabled === 'boolean') state.soundEnabled = saved.soundEnabled;
    if (typeof saved.autoResizeFusion === 'boolean') state.autoResizeFusion = saved.autoResizeFusion;
    if (typeof saved.autoLaunch === 'boolean') state.autoLaunch = saved.autoLaunch;
    if (typeof saved.debugLogging === 'boolean') state.debugLogging = saved.debugLogging;
    if (saved.closeBehavior === 'close' || saved.closeBehavior === 'taskbar') state.closeBehavior = saved.closeBehavior;
    if (typeof saved.globalApplyHotkey === 'boolean') state.globalApplyHotkey = saved.globalApplyHotkey;
    if (saved.moduleStates && typeof saved.moduleStates === 'object') {
      state.moduleStates = saved.moduleStates;
      if (state.moduleStates.ekflow?.installed && !state.moduleStates.ekflow.installedPath) {
        state.moduleStates.ekflow = {
          ...state.moduleStates.ekflow,
          installed: false,
          enabled: false,
          installedVersion: ''
        };
      }
    }
    state.theme = normalizeThemeName(saved.theme);
    if (saved.customTheme && typeof saved.customTheme === 'object') {
      state.customTheme = {
        accent: typeof saved.customTheme.accent === 'string' ? saved.customTheme.accent : state.customTheme.accent,
        font: Object.prototype.hasOwnProperty.call(CUSTOM_THEME_FONTS, saved.customTheme.font) ? saved.customTheme.font : state.customTheme.font,
        radius: ['5', '9', '16', '999'].includes(String(saved.customTheme.radius)) ? String(saved.customTheme.radius) : state.customTheme.radius,
        background: typeof saved.customTheme.background === 'string' ? saved.customTheme.background : '',
        backgroundName: typeof saved.customTheme.backgroundName === 'string' ? saved.customTheme.backgroundName : '',
        backgroundFit: normalizeThemeImageFit(saved.customTheme.backgroundFit),
        backgroundPosition: normalizeThemePosition(saved.customTheme.backgroundPosition),
        backgroundZoom: Number.isFinite(Number(saved.customTheme.backgroundZoom)) ? clamp(Number(saved.customTheme.backgroundZoom), 0.35, 4) : 1,
        backgroundOpacity: Number.isFinite(Number(saved.customTheme.backgroundOpacity)) ? clamp(Number(saved.customTheme.backgroundOpacity), 0, 1) : 0.48,
        backgroundColorInfluence: Number.isFinite(Number(saved.customTheme.backgroundColorInfluence)) ? clamp(Number(saved.customTheme.backgroundColorInfluence), 0, 1) : 0,
        backgroundPalette: saved.customTheme.backgroundPalette && typeof saved.customTheme.backgroundPalette === 'object' ? saved.customTheme.backgroundPalette : null,
        blur: Number.isFinite(Number(saved.customTheme.blur)) ? clamp(Number(saved.customTheme.blur), 0, 28) : 8,
        header: typeof saved.customTheme.header === 'string' ? saved.customTheme.header : '',
        headerName: typeof saved.customTheme.headerName === 'string' ? saved.customTheme.headerName : '',
        headerFit: normalizeThemeImageFit(saved.customTheme.headerFit),
        headerPosition: normalizeThemePosition(saved.customTheme.headerPosition),
        headerZoom: Number.isFinite(Number(saved.customTheme.headerZoom)) ? clamp(Number(saved.customTheme.headerZoom), 0.35, 4) : 1,
        headerOpacity: Number.isFinite(Number(saved.customTheme.headerOpacity)) ? clamp(Number(saved.customTheme.headerOpacity), 0, 1) : 0.55,
        headerBlur: Number.isFinite(Number(saved.customTheme.headerBlur)) ? clamp(Number(saved.customTheme.headerBlur), 0, 28) : 0
      };
    }
    state.activeEdit = false;
    if (typeof saved.instantApply === 'boolean') state.instantApply = saved.instantApply;
    if (typeof saved.advancedEdit === 'boolean') state.advancedEdit = saved.advancedEdit;
    if (Number.isFinite(saved.galleryIndex)) state.galleryIndex = Math.max(0, saved.galleryIndex);
  } catch {
    localStorage.removeItem(SETTINGS_KEY);
  }
}

function saveAssignedPresets() {
  localStorage.setItem(ASSIGNED_KEY, JSON.stringify(state.assignedIds.slice(0, 8)));
}

function loadAssignedPresets() {
  try {
    const saved = JSON.parse(localStorage.getItem(ASSIGNED_KEY) || '[]');
    if (Array.isArray(saved)) state.assignedIds = saved.filter(Boolean).slice(0, 8);
  } catch {
    localStorage.removeItem(ASSIGNED_KEY);
  }
}

function saveCustomPresets() {
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(state.galleries));
}

function loadCustomPresets() {
  try {
    const saved = JSON.parse(localStorage.getItem(CUSTOM_KEY) || 'null');
    if (Array.isArray(saved) && saved.length > 0 && saved[0].presets) {
      state.galleries = saved.map((gallery, index) => ({
        id: gallery.id || `gallery-${index}`,
        name: gallery.name || (index === 0 ? 'ekFlow' : `Gallery ${index + 1}`),
        presets: Array.isArray(gallery.presets) ? gallery.presets : []
      }));
      if (!state.galleries[0].presets.some((preset) => preset.locked)) {
        state.galleries[0].presets = [...DEFAULT_PRESETS, ...state.galleries[0].presets.filter((preset) => !preset.locked)];
      }
    } else if (Array.isArray(saved)) {
      state.galleries[0].presets.push(...saved.map((preset) => ({ ...preset, locked: false })));
    }
  } catch {
    localStorage.removeItem(CUSTOM_KEY);
  }
  if (!state.galleries.length) state.galleries = [{ id: 'gallery-0', name: 'ekFlow', presets: [...DEFAULT_PRESETS] }];
  if (!state.galleries[0].presets.some((preset) => preset.locked)) {
    state.galleries[0].presets = [...DEFAULT_PRESETS, ...state.galleries[0].presets.filter((preset) => !preset.locked)];
  }
  state.galleryIndex = clamp(state.galleryIndex, 0, state.galleries.length - 1);
  syncActiveGallery();
}

function saveHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(state.history.slice(0, 20)));
}

function loadHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    if (Array.isArray(saved)) state.history = saved.slice(0, 20);
  } catch {
    localStorage.removeItem(HISTORY_KEY);
  }
}

function syncActiveGallery() {
  const gallery = state.galleries[state.galleryIndex] || state.galleries[0];
  state.presets = gallery.presets;
}

function allPresets() {
  return state.galleries.flatMap((gallery) => gallery.presets || []);
}

function assignedPresets() {
  const presets = allPresets();
  return state.assignedIds
    .map((id) => presets.find((preset) => preset.id === id))
    .filter(Boolean)
    .slice(0, 8);
}

function wheelPayload() {
  return {
    mode: state.wheelMode,
    presets: assignedPresets(),
    active: simpleShapeGraphFromPreset(state.active)
  };
}

function setStatus(message) {
  els.status.textContent = message;
}

const THEME_NAMES = ['default', 'arctic', 'graphite', 'ember', 'mint', 'orchid', 'custom'];
const THEME_CLASSES = THEME_NAMES.map((name) => `theme-${name}`);
const CUSTOM_THEME_FONTS = {
  aptos: '"Aptos", "Segoe UI Variable Text", "Segoe UI", sans-serif',
  segoe: '"Segoe UI Variable Text", "Segoe UI", sans-serif',
  bahnschrift: '"Bahnschrift", "Aptos", "Segoe UI", sans-serif',
  consolas: '"Consolas", "Cascadia Mono", monospace'
};
const customSelectWidgets = new Map();
const THEME_IMAGE_FITS = ['cover', 'contain', 'stretch'];
let colorPicker = null;
let imageEditor = null;

function normalizeThemeName(name) {
  return THEME_NAMES.includes(name) ? name : 'default';
}

function normalizeThemeImageFit(value) {
  return THEME_IMAGE_FITS.includes(value) ? value : 'cover';
}

function normalizeThemePosition(value) {
  return typeof value === 'string' && /^\d+(?:\.\d+)?% \d+(?:\.\d+)?%$/.test(value) ? value : '50% 50%';
}

function cssUrl(value) {
  return `url("${String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")`;
}

function normalizePaletteColor(color, fallback) {
  if (!color || !Number.isFinite(Number(color.r)) || !Number.isFinite(Number(color.g)) || !Number.isFinite(Number(color.b))) return fallback;
  return {
    r: clamp(Math.round(Number(color.r)), 0, 255),
    g: clamp(Math.round(Number(color.g)), 0, 255),
    b: clamp(Math.round(Number(color.b)), 0, 255)
  };
}

function colorToRgbString(color) {
  return `${color.r}, ${color.g}, ${color.b}`;
}

function colorToHex(color) {
  const part = (value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0');
  return `#${part(color.r)}${part(color.g)}${part(color.b)}`;
}

function relativeLuma(color) {
  return (color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722) / 255;
}

function paletteFromImage(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = 72;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;
        const buckets = new Map();
        for (let i = 0; i < data.length; i += 16) {
          const alpha = data[i + 3] / 255;
          if (alpha < 0.35) continue;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          if (max < 24 || max - min < 10) continue;
          const key = `${Math.round(r / 28)},${Math.round(g / 28)},${Math.round(b / 28)}`;
          const existing = buckets.get(key) || { r: 0, g: 0, b: 0, count: 0, saturation: 0, luma: 0 };
          existing.r += r;
          existing.g += g;
          existing.b += b;
          existing.count += 1;
          existing.saturation += (max - min) / Math.max(max, 1);
          existing.luma += (r + g + b) / 3 / 255;
          buckets.set(key, existing);
        }
        const ranked = [...buckets.values()]
          .map((item) => ({
            r: Math.round(item.r / item.count),
            g: Math.round(item.g / item.count),
            b: Math.round(item.b / item.count),
            count: item.count,
            saturation: item.saturation / item.count,
            luma: item.luma / item.count
          }))
          .filter((item) => item.count > 1)
          .sort((a, b) => (b.count * (0.8 + b.saturation) * (0.7 + Math.abs(0.58 - b.luma))) - (a.count * (0.8 + a.saturation) * (0.7 + Math.abs(0.58 - a.luma))));
        const primary = ranked[0] || { r: 22, g: 88, b: 120 };
        const accent = ranked.find((item) => item.saturation > 0.18 && relativeLuma(item) > 0.28) || ranked[1] || primary;
        const secondary = ranked.find((item) => Math.abs(item.r - primary.r) + Math.abs(item.g - primary.g) + Math.abs(item.b - primary.b) > 80) || ranked[2] || accent;
        resolve({ primary, secondary, accent });
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

function applyTheme() {
  const theme = normalizeThemeName(state.theme);
  state.theme = theme;
  document.body.classList.remove(...THEME_CLASSES, 'custom-theme-has-bg', 'custom-header-has-bg');
  document.body.classList.add(`theme-${theme}`);
  const root = document.documentElement;
  const custom = state.customTheme || {};
  root.style.setProperty('--custom-accent', custom.accent || '#7be8ff');
  root.style.setProperty('--custom-button-radius', `${Number(custom.radius) || 9}px`);
  root.style.setProperty('--custom-font', CUSTOM_THEME_FONTS[custom.font] || CUSTOM_THEME_FONTS.aptos);
  const bgBlur = clamp(Number(custom.blur) || 0, 0, 28);
  root.style.setProperty('--custom-bg-blur', `${bgBlur}px`);
  root.style.setProperty('--custom-bg-empty-blur', `${Math.round(bgBlur * 0.38 * 100) / 100}px`);
  root.style.setProperty('--custom-bg-surface-blur', `${Math.round((12 + bgBlur * 0.82) * 100) / 100}px`);
  root.style.setProperty('--custom-bg-control-blur', `${Math.round((14 + bgBlur) * 100) / 100}px`);
  root.style.setProperty('--custom-bg-opacity', `${clamp(Number(custom.backgroundOpacity) || 0, 0, 1)}`);
  const influence = clamp(Number(custom.backgroundColorInfluence) || 0, 0, 1);
  const palette = custom.backgroundPalette || {};
  const primary = normalizePaletteColor(palette.primary, { r: 24, g: 76, b: 104 });
  const secondary = normalizePaletteColor(palette.secondary, { r: 98, g: 82, b: 150 });
  const accent = normalizePaletteColor(palette.accent, primary);
  root.style.setProperty('--custom-bg-color-strength', `${influence}`);
  root.style.setProperty('--custom-bg-primary', colorToHex(primary));
  root.style.setProperty('--custom-bg-secondary', colorToHex(secondary));
  root.style.setProperty('--custom-bg-accent', colorToHex(accent));
  root.style.setProperty('--custom-bg-primary-rgb', colorToRgbString(primary));
  root.style.setProperty('--custom-bg-secondary-rgb', colorToRgbString(secondary));
  root.style.setProperty('--custom-bg-accent-rgb', colorToRgbString(accent));
  root.style.setProperty('--custom-panel-tint', `rgba(${colorToRgbString(primary)}, ${0.04 + influence * 0.2})`);
  root.style.setProperty('--custom-panel-tint-strong', `rgba(${colorToRgbString(secondary)}, ${0.05 + influence * 0.24})`);
  root.style.setProperty('--custom-card-tint', `rgba(${colorToRgbString(accent)}, ${0.03 + influence * 0.16})`);
  root.style.setProperty('--custom-menu-tint', `rgba(${colorToRgbString(primary)}, ${0.07 + influence * 0.2})`);
  root.style.setProperty('--custom-bg-accent-glow', `rgba(${colorToRgbString(accent)}, ${0.10 + influence * 0.16})`);
  root.style.setProperty('--custom-bg-secondary-glow', `rgba(${colorToRgbString(secondary)}, ${0.08 + influence * 0.14})`);
  root.style.setProperty('--custom-bg-card-glow', `rgba(${colorToRgbString(accent)}, ${0.14 + influence * 0.18})`);
  root.style.setProperty('--custom-bg-panel-border', `rgba(${colorToRgbString(accent)}, ${0.16 + influence * 0.22})`);
  root.style.setProperty('--custom-bg-card-border', `rgba(${colorToRgbString(accent)}, ${0.12 + influence * 0.18})`);
  root.style.setProperty('--custom-bg-menu-border', `rgba(${colorToRgbString(accent)}, ${0.18 + influence * 0.24})`);
  root.style.setProperty('--custom-bg-fit', normalizeThemeImageFit(custom.backgroundFit) === 'stretch' ? '100% 100%' : normalizeThemeImageFit(custom.backgroundFit));
  root.style.setProperty('--custom-bg-position', normalizeThemePosition(custom.backgroundPosition));
  root.style.setProperty('--custom-header-blur', `${clamp(Number(custom.headerBlur) || 0, 0, 28)}px`);
  root.style.setProperty('--custom-header-opacity', `${clamp(Number(custom.headerOpacity) || 0, 0, 1)}`);
  root.style.setProperty('--custom-header-fit', normalizeThemeImageFit(custom.headerFit) === 'stretch' ? '100% 100%' : normalizeThemeImageFit(custom.headerFit));
  root.style.setProperty('--custom-header-position', normalizeThemePosition(custom.headerPosition));
  if (custom.background) {
    root.style.setProperty('--custom-bg-image', cssUrl(custom.background));
    if (theme === 'custom') document.body.classList.add('custom-theme-has-bg');
  } else {
    root.style.removeProperty('--custom-bg-image');
  }
  if (custom.header) {
    root.style.setProperty('--custom-header-image', cssUrl(custom.header));
    if (theme === 'custom') document.body.classList.add('custom-header-has-bg');
  } else {
    root.style.removeProperty('--custom-header-image');
  }
}

function customSelectIconClass(value = '') {
  return `select-icon select-icon-${String(value).replace(/[^a-z0-9_-]/gi, '') || 'default'}`;
}

function syncCustomSelectWidget(select) {
  const widget = customSelectWidgets.get(select);
  if (!widget) return;
  const selected = select.selectedOptions?.[0] || select.options?.[select.selectedIndex];
  widget.label.textContent = selected?.textContent || 'Select';
  widget.icon.className = customSelectIconClass(select.value);
  for (const optionButton of widget.menu.querySelectorAll('button')) {
    optionButton.classList.toggle('active', optionButton.dataset.value === select.value);
  }
}

function syncCustomSelectWidgets() {
  for (const select of customSelectWidgets.keys()) syncCustomSelectWidget(select);
}

function closeCustomSelectMenus(except = null) {
  for (const widget of customSelectWidgets.values()) {
    if (widget === except) continue;
    widget.menu.classList.add('hidden');
    widget.trigger.classList.remove('open');
  }
}

function positionCustomSelectMenu(widget) {
  const rect = widget.trigger.getBoundingClientRect();
  const menu = widget.menu;
  const width = Math.max(rect.width, 174);
  const maxHeight = Math.min(260, Math.max(128, window.innerHeight - 18));
  menu.style.width = `${width}px`;
  menu.style.maxHeight = `${maxHeight}px`;
  const left = clamp(rect.left, 8, Math.max(8, window.innerWidth - width - 8));
  const below = rect.bottom + 6;
  const estimatedHeight = Math.min(maxHeight, 8 + widget.select.options.length * 34);
  const top = below + estimatedHeight > window.innerHeight - 8
    ? clamp(rect.top - estimatedHeight - 6, 8, Math.max(8, window.innerHeight - estimatedHeight - 8))
    : below;
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

function buildCustomSelectOptions(select, widget) {
  widget.menu.innerHTML = '';
  for (const option of [...select.options]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.value = option.value;
    button.innerHTML = `<span class="${customSelectIconClass(option.value)}"></span><span>${option.textContent}</span>`;
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      select.value = option.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      closeCustomSelectMenus();
      syncCustomSelectWidget(select);
    });
    widget.menu.appendChild(button);
  }
}

function enhanceSettingsSelect(select) {
  if (!select || customSelectWidgets.has(select)) return;
  select.classList.add('native-select-hidden');
  select.tabIndex = -1;
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'custom-select-trigger';
  trigger.innerHTML = '<span class="select-icon"></span><span class="custom-select-label"></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 9 5 5 5-5"></path></svg>';
  select.insertAdjacentElement('afterend', trigger);
  const menu = document.createElement('div');
  menu.className = 'custom-select-menu hidden';
  document.body.appendChild(menu);
  const widget = {
    select,
    trigger,
    menu,
    icon: trigger.querySelector('.select-icon'),
    label: trigger.querySelector('.custom-select-label')
  };
  customSelectWidgets.set(select, widget);
  buildCustomSelectOptions(select, widget);
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const willOpen = menu.classList.contains('hidden');
    closeCustomSelectMenus(widget);
    if (willOpen) {
      positionCustomSelectMenu(widget);
      menu.classList.remove('hidden');
      trigger.classList.add('open');
    }
  });
  select.addEventListener('change', () => syncCustomSelectWidget(select));
  syncCustomSelectWidget(select);
}

function enhanceSettingsSelects() {
  document.querySelectorAll('.setting-row select').forEach(enhanceSettingsSelect);
}

function isHexColor(value) {
  return /^#[0-9a-f]{6}$/i.test(String(value || '').trim());
}

function setCustomThemeMode() {
  state.theme = 'custom';
  if (els.themeSelect) {
    els.themeSelect.value = 'custom';
    syncCustomSelectWidget(els.themeSelect);
  }
}

function syncAccentControl() {
  const color = isHexColor(state.customTheme.accent) ? state.customTheme.accent : '#7be8ff';
  if (els.customThemeAccent && document.activeElement !== els.customThemeAccent) {
    els.customThemeAccent.value = color.toUpperCase();
  }
  const button = els.customThemeAccentButton;
  if (!button) return;
  const swatch = button.querySelector('i');
  const label = button.querySelector('span');
  if (swatch) swatch.style.background = color;
  if (label) label.textContent = color.toUpperCase();
}

function setCustomAccent(value) {
  const color = String(value || '').trim();
  if (!isHexColor(color)) return false;
  state.customTheme.accent = color.toLowerCase();
  setCustomThemeMode();
  syncAccentControl();
  applyTheme();
  saveSettings();
  return true;
}

function closeColorPicker() {
  colorPicker?.classList.add('hidden');
}

function positionColorPicker(anchor) {
  if (!colorPicker || !anchor) return;
  const rect = anchor.getBoundingClientRect();
  const width = 216;
  const left = clamp(rect.right - width, 8, Math.max(8, window.innerWidth - width - 8));
  const top = clamp(rect.bottom + 7, 8, Math.max(8, window.innerHeight - colorPicker.offsetHeight - 8));
  colorPicker.style.left = `${left}px`;
  colorPicker.style.top = `${top}px`;
}

function ensureColorPicker() {
  if (colorPicker) return colorPicker;
  const swatches = [
    '#7be8ff', '#56f59a', '#ffd46f', '#ff7c94', '#9b6bff', '#eb8eff',
    '#a8f1ff', '#75ffcf', '#ffb06b', '#d2dae5', '#56b9ff', '#ffffff'
  ];
  colorPicker = document.createElement('div');
  colorPicker.className = 'custom-color-popover hidden';
  const grid = document.createElement('div');
  grid.className = 'custom-color-grid';
  for (const color of swatches) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'custom-color-swatch';
    button.title = color;
    button.style.background = color;
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setCustomAccent(color);
      closeColorPicker();
    });
    grid.appendChild(button);
  }
  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = 7;
  input.spellcheck = false;
  input.value = state.customTheme.accent || '#7be8ff';
  input.addEventListener('input', () => {
    if (setCustomAccent(input.value)) closeColorPicker();
  });
  colorPicker.append(grid, input);
  document.body.appendChild(colorPicker);
  return colorPicker;
}

function openColorPicker(anchor) {
  const picker = ensureColorPicker();
  const input = picker.querySelector('input');
  if (input) input.value = (state.customTheme.accent || '#7be8ff').toUpperCase();
  picker.classList.remove('hidden');
  requestAnimationFrame(() => positionColorPicker(anchor));
}

function themeImageKeys(target) {
  return target === 'header'
    ? { image: 'header', name: 'headerName', fit: 'headerFit', position: 'headerPosition', zoom: 'headerZoom', opacity: 'headerOpacity', blur: 'headerBlur' }
    : { image: 'background', name: 'backgroundName', fit: 'backgroundFit', position: 'backgroundPosition', zoom: 'backgroundZoom', opacity: 'backgroundOpacity', blur: 'blur' };
}

function setFitButtonState(fit) {
  for (const button of [els.imageFitCover, els.imageFitContain, els.imageFitStretch]) {
    button?.classList.toggle('active', button.dataset.fit === fit);
  }
}

function renderImageEditorPreview() {
  if (!imageEditor || !els.imageEditorStage || !els.imageEditorImage) return;
  const stage = els.imageEditorStage.getBoundingClientRect();
  if (!stage.width || !stage.height || !imageEditor.naturalWidth || !imageEditor.naturalHeight) return;
  const fit = normalizeThemeImageFit(imageEditor.fit);
  const baseScale = fit === 'cover'
    ? Math.max(stage.width / imageEditor.naturalWidth, stage.height / imageEditor.naturalHeight)
    : fit === 'contain'
      ? Math.min(stage.width / imageEditor.naturalWidth, stage.height / imageEditor.naturalHeight)
      : 1;
  const zoom = clamp(Number(imageEditor.zoom) || 1, 0.35, 4);
  const width = fit === 'stretch' ? stage.width * zoom : imageEditor.naturalWidth * baseScale * zoom;
  const height = fit === 'stretch' ? stage.height * zoom : imageEditor.naturalHeight * baseScale * zoom;
  els.imageEditorImage.style.width = `${width}px`;
  els.imageEditorImage.style.height = `${height}px`;
  els.imageEditorImage.style.transform = `translate(calc(-50% + ${imageEditor.offsetX}px), calc(-50% + ${imageEditor.offsetY}px))`;
  setFitButtonState(fit);
}

function cropThemeImageFromEditor() {
  if (!imageEditor?.imageElement) return imageEditor?.dataUrl || '';
  const stage = els.imageEditorStage.getBoundingClientRect();
  const width = imageEditor.target === 'header' ? 1200 : 1400;
  const height = imageEditor.target === 'header' ? 260 : 900;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  const sx = width / Math.max(stage.width, 1);
  const sy = height / Math.max(stage.height, 1);
  const img = imageEditor.imageElement;
  const fit = normalizeThemeImageFit(imageEditor.fit);
  if (fit === 'stretch') {
    const drawW = width * (Number(imageEditor.zoom) || 1);
    const drawH = height * (Number(imageEditor.zoom) || 1);
    ctx.drawImage(img, width / 2 - drawW / 2 + imageEditor.offsetX * sx, height / 2 - drawH / 2 + imageEditor.offsetY * sy, drawW, drawH);
  } else {
    const baseScale = fit === 'cover'
      ? Math.max(stage.width / img.naturalWidth, stage.height / img.naturalHeight)
      : Math.min(stage.width / img.naturalWidth, stage.height / img.naturalHeight);
    const scale = baseScale * (Number(imageEditor.zoom) || 1) * sx;
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    ctx.drawImage(img, width / 2 - drawW / 2 + imageEditor.offsetX * sx, height / 2 - drawH / 2 + imageEditor.offsetY * sy, drawW, drawH);
  }
  return canvas.toDataURL('image/jpeg', 0.9);
}

function closeImageEditor() {
  els.imageEditorModal?.classList.add('hidden');
  imageEditor = null;
}

function openThemeImageEditor(target, dataUrl, name) {
  const keys = themeImageKeys(target);
  const custom = state.customTheme;
  imageEditor = {
    target,
    dataUrl,
    name,
    fit: normalizeThemeImageFit(custom[keys.fit]),
    zoom: Number.isFinite(Number(custom[keys.zoom])) ? clamp(Number(custom[keys.zoom]), 0.35, 4) : 1,
    offsetX: 0,
    offsetY: 0,
    opacity: Number.isFinite(Number(custom[keys.opacity])) ? clamp(Number(custom[keys.opacity]), 0, 1) : (target === 'header' ? 0.55 : 0.48),
    blur: Number.isFinite(Number(custom[keys.blur])) ? clamp(Number(custom[keys.blur]), 0, 28) : (target === 'header' ? 0 : 8),
    imageElement: null,
    naturalWidth: 0,
    naturalHeight: 0
  };
  if (els.imageEditorTitle) els.imageEditorTitle.textContent = target === 'header' ? 'Header image' : 'App background';
  if (els.imageEditorZoom) els.imageEditorZoom.value = String(imageEditor.zoom);
  if (els.imageEditorOpacity) els.imageEditorOpacity.value = String(imageEditor.opacity);
  if (els.imageEditorBlur) els.imageEditorBlur.value = String(imageEditor.blur);
  if (els.imageEditorImage) {
    els.imageEditorImage.onload = () => {
      imageEditor.imageElement = els.imageEditorImage;
      imageEditor.naturalWidth = els.imageEditorImage.naturalWidth;
      imageEditor.naturalHeight = els.imageEditorImage.naturalHeight;
      renderImageEditorPreview();
    };
    els.imageEditorImage.src = dataUrl;
  }
  setFitButtonState(imageEditor.fit);
  els.imageEditorModal?.classList.remove('hidden');
}

async function applyImageEditor() {
  if (!imageEditor) return;
  const keys = themeImageKeys(imageEditor.target);
  const custom = state.customTheme;
  const croppedImage = cropThemeImageFromEditor();
  custom[keys.image] = croppedImage;
  custom[keys.name] = imageEditor.name || 'Custom image loaded';
  custom[keys.fit] = normalizeThemeImageFit(imageEditor.fit);
  custom[keys.position] = '50% 50%';
  custom[keys.zoom] = clamp(Number(imageEditor.zoom) || 1, 0.35, 4);
  custom[keys.opacity] = clamp(Number(imageEditor.opacity) || 0, 0, 1);
  custom[keys.blur] = clamp(Number(imageEditor.blur) || 0, 0, 28);
  if (imageEditor.target === 'background') {
    custom.backgroundPalette = await paletteFromImage(croppedImage);
  }
  setCustomThemeMode();
  syncThemeControls();
  applyTheme();
  saveSettings();
  showToast(imageEditor.target === 'header' ? 'Custom header set' : 'Custom background set');
  closeImageEditor();
}

function syncThemeControls() {
  syncAccentControl();
  if (els.customThemeFont) els.customThemeFont.value = state.customTheme.font || 'aptos';
  if (els.customThemeRadius) els.customThemeRadius.value = state.customTheme.radius || '9';
  if (els.customThemeBlur) els.customThemeBlur.value = Number.isFinite(Number(state.customTheme.blur)) ? String(state.customTheme.blur) : '8';
  if (els.customThemeBackgroundOpacity) els.customThemeBackgroundOpacity.value = Number.isFinite(Number(state.customTheme.backgroundOpacity)) ? String(state.customTheme.backgroundOpacity) : '0.48';
  if (els.customThemeBackgroundColors) els.customThemeBackgroundColors.value = Number.isFinite(Number(state.customTheme.backgroundColorInfluence)) ? String(state.customTheme.backgroundColorInfluence) : '0';
  if (els.customThemeHeaderBlur) els.customThemeHeaderBlur.value = Number.isFinite(Number(state.customTheme.headerBlur)) ? String(state.customTheme.headerBlur) : '0';
  if (els.customThemeHeaderOpacity) els.customThemeHeaderOpacity.value = Number.isFinite(Number(state.customTheme.headerOpacity)) ? String(state.customTheme.headerOpacity) : '0.55';
  if (els.customThemeBackgroundName) els.customThemeBackgroundName.textContent = state.customTheme.backgroundName || (state.customTheme.background ? 'Custom image loaded' : 'No image selected');
  if (els.customThemeHeaderName) els.customThemeHeaderName.textContent = state.customTheme.headerName || (state.customTheme.header ? 'Custom image loaded' : 'No image selected');
  syncCustomSelectWidgets();
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove('hidden');
  els.toast.classList.remove('show');
  requestAnimationFrame(() => els.toast.classList.add('show'));
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    els.toast.classList.remove('show');
    setTimeout(() => els.toast.classList.add('hidden'), 220);
  }, 1300);
}

function playSound(type) {
  if (!state.soundEnabled) return;
  try {
    const context = playSound.context || new (window.AudioContext || window.webkitAudioContext)();
    playSound.context = context;
    const now = context.currentTime;
    const master = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(type === 'error' ? 920 : 1650, now);
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(type === 'error' ? 0.07 : 0.055, now + 0.028);
    master.gain.exponentialRampToValueAtTime(0.0001, now + (type === 'error' ? 0.34 : 0.42));
    filter.connect(master).connect(context.destination);

    const notes = type === 'error'
      ? [
          { frequency: 360, end: 260, delay: 0, duration: 0.28, type: 'triangle' },
          { frequency: 220, end: 170, delay: 0.045, duration: 0.3, type: 'sine' }
        ]
      : [
          { frequency: 392, end: 523.25, delay: 0, duration: 0.26, type: 'sine' },
          { frequency: 659.25, end: 783.99, delay: 0.055, duration: 0.34, type: 'triangle' }
        ];

    for (const note of notes) {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start = now + note.delay;
      oscillator.type = note.type;
      oscillator.frequency.setValueAtTime(note.frequency, start);
      oscillator.frequency.exponentialRampToValueAtTime(note.end, start + note.duration);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.75, start + 0.026);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + note.duration);
      oscillator.connect(gain).connect(filter);
      oscillator.start(start);
      oscillator.stop(start + note.duration + 0.02);
    }
  } catch {}
}

function applyFailureMessage(message) {
  const text = String(message || '');
  if (/select|selected|node|tool/i.test(text)) return text || 'Select a node in Fusion first.';
  return `${text || 'Apply failed.'} Select a node in Fusion first.`;
}

function updateLayoutVars() {
  document.documentElement.style.setProperty('--gallery-width', `${Math.round(state.galleryWidth)}px`);
  document.documentElement.style.setProperty('--history-width', `${Math.round(state.historyWidth)}px`);
  document.documentElement.style.setProperty('--flow-float-x', `${Math.round(state.flowFloat.x)}px`);
  document.documentElement.style.setProperty('--flow-float-y', `${Math.round(state.flowFloat.y)}px`);
}

function updateCollapsedDetail() {
  if (!els.collapsedDetail) return;
  const count = assignedPresets().length;
  const applyLabel = state.applyKey ? `Press ${state.applyKey}` : 'Apply key unassigned';
  els.collapsedDetail.textContent = count > 0 ? `${count} assigned - ${applyLabel}` : `${applyLabel} to apply`;
}

function parseSelectedNodes(message) {
  const text = String(message || '');
  const match = text.match(/Nodes:\s*(.+)$/i);
  if (!match) return [];
  return match[1]
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)
    .slice(0, 5);
}

function updateCollapsedGraphPreview() {
  if (!els.collapsedGraphCanvas) return;
  const name = displayNameForActive(state.active);
  if (els.collapsedGraphName) els.collapsedGraphName.textContent = name;
  requestAnimationFrame(() => drawCurve(els.collapsedGraphCanvas, state.active, true));
}

function renderCollapsedPicker() {
  if (!els.collapsedPicker) return;
  syncActiveGallery();
  els.collapsedPicker.innerHTML = '';
  for (const preset of state.presets.slice(0, 12)) {
    const button = document.createElement('button');
    button.title = preset.name;
    if (preset.id === state.active.id) button.classList.add('active');
    const canvas = document.createElement('canvas');
    canvas.width = 72;
    canvas.height = 40;
    button.appendChild(canvas);
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      setActivePreset(preset);
      state.collapsedPickerOpen = false;
      document.body.classList.remove('collapsed-picker-open');
      els.collapsedPicker.classList.add('hidden');
      updateCollapsedGraphPreview();
    });
    els.collapsedPicker.appendChild(button);
    requestAnimationFrame(() => drawCurve(canvas, preset, true));
  }
}

async function refreshCollapsedDrawer() {
  updateCollapsedGraphPreview();
  renderCollapsedPicker();
  if (!els.collapsedSelectedNodes || !window.flowAPI?.getStatus) return;
  els.collapsedSelectedNodes.textContent = 'Reading Resolve selection...';
  const status = await window.flowAPI.getStatus();
  const nodes = parseSelectedNodes(status?.message);
  if (nodes.length > 0) {
    els.collapsedSelectedNodes.textContent = nodes.join(', ');
  } else {
    els.collapsedSelectedNodes.textContent = status?.ok ? 'No selected node names returned.' : 'Select a Fusion node.';
  }
}

async function setCollapsedDrawerOpen(open) {
  state.collapsedDrawerOpen = Boolean(open);
  if (!state.collapsedDrawerOpen) state.collapsedPickerOpen = false;
  document.body.classList.toggle('collapsed-drawer-open', state.collapsedDrawerOpen);
  document.body.classList.toggle('collapsed-picker-open', state.collapsedDrawerOpen && state.collapsedPickerOpen);
  els.collapsedDrawer?.classList.toggle('hidden', !state.collapsedDrawerOpen);
  els.collapsedPicker?.classList.toggle('hidden', !state.collapsedPickerOpen);
  await window.windowAPI.setCollapsedDrawer(state.collapsedDrawerOpen, state.collapsedPickerOpen);
  if (state.collapsedDrawerOpen) refreshCollapsedDrawer();
}

function flashCollapsedPanel(type) {
  document.body.classList.remove('collapsed-success', 'collapsed-error');
  void document.body.offsetWidth;
  document.body.classList.add(type === 'error' ? 'collapsed-error' : 'collapsed-success');
  clearTimeout(flashCollapsedPanel.timer);
  flashCollapsedPanel.timer = setTimeout(() => {
    document.body.classList.remove('collapsed-success', 'collapsed-error');
  }, 900);
}

function settingsOpen() {
  return els.settingsView && !els.settingsView.classList.contains('hidden');
}

function setFlashPage(page) {
  state.flashPage = page === 'module' ? 'module' : page === 'home' ? 'home' : 'ekflow';
  if (state.flashPage !== 'module') {
    state.hostedModule = null;
    if (els.moduleHostFrame) els.moduleHostFrame.removeAttribute('src');
  }
  if (state.flashPage === 'ekflow') state.activeModuleId = 'ekflow';
  if (state.flashPage === 'home') {
    state.historyOpen = false;
    state.modifiersOpen = false;
    els.settingsView?.classList.add('hidden');
  } else {
    state.editorOpen = true;
  }
  applyUiState();
  scheduleLayoutResize();
}

function targetLayoutSize() {
  if (state.compactMode) {
    const pages = compactPages();
    const page = pages[state.compactPage] || pages[0];
    return { width: page?.width || 300, height: page?.height || 540, titleWrapped: false, compact: true };
  }
  if (state.flashPage === 'home') {
    const width = Math.max(660, Math.min(820, window.innerWidth || 740));
    const height = Math.max(430, Math.min(560, window.innerHeight || 480));
    return { width, height, titleWrapped: width < 620 };
  }
  if (state.flashPage === 'module') {
    const width = Math.max(760, Math.min(1040, window.innerWidth || 900));
    const height = Math.max(520, Math.min(720, window.innerHeight || 620));
    return { width, height, titleWrapped: width < 620 };
  }
  const titleWrapped = !state.editorOpen || window.innerWidth < 620;
  const chrome = 34;
  const gap = 10;
  const handle = 8;
  const flashRail = 82;
  const galleryOnly = !state.editorOpen && !state.historyOpen;
  const gallery = galleryOnly ? clamp(state.galleryWidth, 300, 380) : clamp(state.galleryWidth, 206, 320);
  const overlayOpen = settingsOpen() || state.historyOpen;
  const editor = 430;
  const advanced = 218;
  const modifiers = 280;
  let width = chrome + flashRail + gallery;

  if (state.editorOpen) width += gap + handle + editor;
  if (state.activeEdit && state.editorOpen && !settingsOpen()) width += gap + advanced;
  if (state.modifiersOpen && state.editorOpen && !settingsOpen()) width += gap + modifiers;
  if (galleryOnly) width = Math.max(width, 392);
  if (overlayOpen) width = Math.max(width, window.innerWidth || 0, Math.min(760, chrome + gallery + gap + handle + editor));

  let height = overlayOpen ? 560 : 510;
  if (overlayOpen) height = Math.max(height, window.innerHeight || 0);
  if (titleWrapped || width < 620) height += 22;
  if (Date.now() < Number(state.preventLayoutShrinkUntil || 0)) {
    width = Math.max(width, window.innerWidth || 0);
    height = Math.max(height, window.innerHeight || 0);
  }
  return { width: Math.round(width), height: Math.round(height), titleWrapped: width < 620 };
}

function updateTitleLayout(width = window.innerWidth) {
  document.body.classList.toggle('title-actions-stacked', width < 620);
}

function scheduleLayoutResize() {
  if (state.flowCollapsed || !window.windowAPI?.resizeForLayout) return;
  clearTimeout(scheduleLayoutResize.timer);
  scheduleLayoutResize.timer = setTimeout(() => {
    const target = targetLayoutSize();
    updateTitleLayout(target.width);
    window.windowAPI.resizeForLayout(target);
  }, LAYOUT_RESIZE_DELAY);
}

function openCompactAdvancedEditor() {
  setCompactMode(true, 1);
}

function compactPages() {
  return [
    { id: 'galleryPanel', ids: ['galleryPanel'], label: 'Gallery', width: 248, height: 520 },
    { id: 'editorPanel', ids: ['editorPanel'], label: 'Editor', width: 386, height: 560 },
    { id: 'advancedPanel', ids: ['advancedPanel', 'modifiersPanel'], label: 'Advanced + modifiers', width: 388, height: 560 },
    { id: 'settingsHostPanel', ids: ['settingsHostPanel'], label: 'Settings', width: 316, height: 560 },
    { id: 'historyPanel', ids: ['historyPanel'], label: 'History', width: 260, height: 520 }
  ];
}

function scrollCompactToPage(index, behavior = 'smooth') {
  if (!els.app) return;
  const pages = compactPages();
  const safeIndex = clamp(index, 0, pages.length - 1);
  state.compactPage = safeIndex;
  const panel = els[pages[safeIndex].id];
  updateCompactPageClass();
  if (panel) els.app.scrollTo({ left: 0, behavior });
  renderCompactDots();
  scheduleLayoutResize();
}

function updateCompactPageClass() {
  for (let index = 0; index < compactPages().length; index += 1) {
    document.body.classList.toggle(`compact-page-${index}`, state.compactMode && state.compactPage === index);
  }
}

function renderCompactDots() {
  if (!els.compactDots) return;
  const pages = compactPages();
  els.compactDots.innerHTML = '';
  els.compactDots.classList.toggle('hidden', !state.compactMode);
  for (let index = 0; index < pages.length; index += 1) {
    const button = document.createElement('button');
    button.type = 'button';
    button.title = pages[index].label;
    button.className = index === state.compactPage ? 'active' : '';
    button.addEventListener('click', () => scrollCompactToPage(index));
    els.compactDots.appendChild(button);
  }
}

function updateCompactPageFromScroll() {
  if (!state.compactMode || !els.app) return;
  els.app.scrollLeft = 0;
  updateCompactPageClass();
  renderCompactDots();
}

function setCompactMode(enabled, page = 0) {
  const next = Boolean(enabled);
  if (next === state.compactMode) {
    if (next) scrollCompactToPage(page);
    return;
  }
  if (next) {
    state.compactReturnState = {
      editorOpen: state.editorOpen,
      historyOpen: state.historyOpen,
      modifiersOpen: state.modifiersOpen,
      advancedEdit: state.advancedEdit,
      activeEdit: state.activeEdit,
      settingsHidden: els.settingsView?.classList.contains('hidden') !== false
    };
    state.editorOpen = true;
    state.advancedEdit = true;
    state.activeEdit = false;
    state.modifiersOpen = true;
    state.historyOpen = true;
    state.compactMode = true;
    state.compactPage = page;
    els.settingsView?.classList.remove('hidden');
    els.editorView?.classList.remove('hidden');
  } else {
    const previous = state.compactReturnState;
    state.compactMode = false;
    if (previous) {
      state.editorOpen = previous.editorOpen;
      state.historyOpen = previous.historyOpen;
      state.modifiersOpen = previous.modifiersOpen;
      state.advancedEdit = previous.advancedEdit;
      state.activeEdit = previous.activeEdit;
      els.settingsView?.classList.toggle('hidden', previous.settingsHidden);
    }
    state.compactReturnState = null;
  }
  applyUiState();
  scheduleLayoutResize();
  requestAnimationFrame(() => {
    if (state.compactMode) scrollCompactToPage(state.compactPage, 'auto');
    drawCurve(els.curveCanvas, state.active);
  });
}

function applyUiState() {
  syncActiveGallery();
  applyTheme();
  state.editorOpen = true;
  const homePage = state.flashPage === 'home';
  const modulePage = state.flashPage === 'module';
  if (!state.editorOpen) {
    state.advancedEdit = false;
    state.activeEdit = false;
    state.modifiersOpen = false;
  }
  if (state.compactMode) {
    els.settingsView?.classList.remove('hidden');
    els.editorView?.classList.remove('hidden');
  } else if (state.historyOpen && settingsOpen()) {
    els.settingsView?.classList.add('hidden');
  }
  updateLayoutVars();
  els.modePlayhead.classList.toggle('active', state.mode === 'playhead');
  els.modeAll.classList.toggle('active', state.mode === 'all');
  els.collapsedModePlayhead?.classList.toggle('active', state.mode === 'playhead');
  els.collapsedModeAll?.classList.toggle('active', state.mode === 'all');
  els.compactEditorModePlayhead?.classList.toggle('active', state.mode === 'playhead');
  els.compactEditorModeAll?.classList.toggle('active', state.mode === 'all');
  els.modifiersPanel?.classList.toggle('hidden', !state.compactMode && (!state.modifiersOpen || !state.editorOpen));
  els.modifiersPanel?.classList.toggle('collapsed', !state.compactMode && (!state.modifiersOpen || !state.editorOpen));
  els.advancedPanel?.classList.toggle('hidden', !state.compactMode && (!state.activeEdit || !state.editorOpen));
  els.advancedPanel?.classList.toggle('collapsed', !state.compactMode && (!state.activeEdit || !state.editorOpen));
  els.modifiersButton?.classList.toggle('active', state.modifiersOpen);
  els.applyBehavior.value = state.behavior;
  if (!els.applyKey.classList.contains('listening')) els.applyKey.value = keyLabel(state.applyKey);
  if (els.hotkeyApplyInput && !els.hotkeyApplyInput.classList.contains('listening')) els.hotkeyApplyInput.value = keyLabel(state.applyKey);
  if (els.lockKeyInput && !els.lockKeyInput.classList.contains('listening')) els.lockKeyInput.value = '';
  if (els.smoothKeyInput && !els.smoothKeyInput.classList.contains('listening')) els.smoothKeyInput.value = keyLabel(state.smoothKey);
  if (els.linearKeyInput && !els.linearKeyInput.classList.contains('listening')) els.linearKeyInput.value = keyLabel(state.linearKey);
  if (els.deleteKeyInput && !els.deleteKeyInput.classList.contains('listening')) els.deleteKeyInput.value = keyLabel(state.deleteKey);
  els.desktopNotify.checked = state.desktopNotify;
  els.soundEnabled.checked = state.soundEnabled;
  if (els.autoResizeFusion) els.autoResizeFusion.checked = state.autoResizeFusion;
  if (els.autoLaunch) els.autoLaunch.checked = state.autoLaunch;
  if (els.debugLogging) els.debugLogging.checked = state.debugLogging;
  els.closeBehavior.value = state.closeBehavior;
  els.globalApplyHotkey.checked = state.globalApplyHotkey;
  if (els.themeSelect) els.themeSelect.value = state.theme;
  syncThemeControls();
  els.activeEditToggle.checked = state.activeEdit;
  els.instantApplyToggle.checked = state.instantApply;
  els.advancedEditButton.classList.toggle('active', state.activeEdit);
  els.advancedEditButton.classList.add('hidden');
  els.freeformBadge?.classList.toggle('hidden', !state.activeEdit);
  els.galleryNameInput.value = state.galleries[state.galleryIndex]?.name || 'ekFlow';
  els.galleryIndexLabel.textContent = `${state.galleryIndex + 1}/${state.galleries.length}`;
  els.prevGalleryButton.classList.toggle('hidden', state.galleryIndex === 0);
  els.deleteGalleryButton.disabled = state.galleryIndex === 0;
  els.flashHomePanel?.classList.toggle('collapsed', !homePage);
  els.moduleHostPanel?.classList.toggle('collapsed', !modulePage);
  els.flashHomeButton?.classList.toggle('active', homePage);
  updateFlashModuleSelection();
  els.editorPanel.classList.toggle('collapsed', !state.compactMode && !state.editorOpen);
  els.settingsHostPanel?.classList.toggle('collapsed', !state.compactMode && !settingsOpen());
  els.historyPanel.classList.toggle('collapsed', !state.compactMode && !state.historyOpen);
  els.editorToggle.classList.toggle('active', state.editorOpen);
  els.historyToggle.classList.toggle('active', state.historyOpen);
  els.compactToggle?.classList.toggle('active', state.compactMode);
  document.body.classList.toggle('editor-closed', !state.editorOpen);
  document.body.classList.toggle('flash-page-home', homePage);
  document.body.classList.toggle('flash-page-module', modulePage);
  document.body.classList.toggle('flash-page-ekflow', !homePage && !modulePage);
  document.body.classList.toggle('compact-mode', state.compactMode);
  updateCompactPageClass();
  document.body.classList.toggle('flow-collapsed', state.flowCollapsed);
  document.body.classList.toggle('active-edit', state.activeEdit);
  document.body.classList.toggle('freeform-suspended', state.activeEditSuspended);
  els.freeformSuspendNotice?.classList.toggle('hidden', !state.activeEditSuspended);
  els.selectionActionNotice?.classList.toggle('hidden', !state.selectionAction);
  els.advancedSuspendOverlay?.classList.toggle('hidden', !state.activeEditSuspended);
  document.body.classList.toggle('advanced-edit', true);
  document.body.classList.toggle('no-active-modifier', !state.selectedModifier);
  document.body.classList.toggle('modifier-pending', Boolean(state.selectedModifier));
  document.body.classList.toggle('history-open', state.historyOpen);
  document.body.classList.toggle('history-closed', !state.historyOpen);
  document.body.classList.toggle('overlay-open', !state.compactMode && (state.historyOpen || settingsOpen()));
  document.body.classList.toggle('settings-overlay-open', !state.compactMode && settingsOpen());
  els.flowCollapsedHandle.classList.toggle('hidden', !state.flowCollapsed);
  els.collapsedDrawerToggle.classList.toggle('hidden', !state.flowCollapsed);
  els.collapsedDrawer.classList.toggle('hidden', !state.flowCollapsed || !state.collapsedDrawerOpen);
  document.body.classList.toggle('collapsed-drawer-open', state.flowCollapsed && state.collapsedDrawerOpen);
  document.body.classList.toggle('collapsed-picker-open', state.flowCollapsed && state.collapsedDrawerOpen && state.collapsedPickerOpen);
  renderCompactDots();
  updateCollapsedGraphPreview();
  updateCollapsedDetail();
  updateModifierPendingUi();
  updateSyncUi();
  updateTitleLayout();
  updateAdvancedPanel();
  updateEditLockBanner();
  if (state.editorOpen) requestAnimationFrame(() => drawCurve(els.curveCanvas, state.active));
  syncCustomSelectWidgets();
  applyLayoutOrder();
  saveSettings();
}

function setApplyMode(mode) {
  state.mode = mode === 'all' ? 'all' : 'playhead';
  state.wheelMode = state.mode;
  applyUiState();
  renderWheel();
  saveSettings();
}

async function refreshAppShellStatus() {
  if (!window.flowAPI?.getShellStatus || !els.appShellStatus) return;
  const status = await window.flowAPI.getShellStatus();
  state.autoLaunch = Boolean(status.autoLaunch);
  state.debugLogging = Boolean(status.debugLogging);
  if (els.autoLaunch) els.autoLaunch.checked = state.autoLaunch;
  if (els.debugLogging) els.debugLogging.checked = state.debugLogging;
  const stub = status.resolveStub || {};
  const native = state.nativeState || {};
  const hotkeySummary = native.applyKey
    ? `${native.applyKey}: ${native.applyKeyEvent || 'idle'}${native.globalHotkeyRegistered ? ' | global ready' : ''}`
    : 'apply key unassigned';
  const windowSummary = native.collapsed
    ? 'collapsed'
    : native.minimized
      ? 'minimized'
      : native.visible
        ? 'visible'
        : 'hidden';
  els.appShellStatus.textContent = `${BUILD_LABEL} | Mode: ${status.packaged ? 'exe build' : 'dev/plugin'} | Resolve stub: ${stub.exists && stub.manifest ? 'found' : 'missing'} | Hotkey: ${hotkeySummary} | Window: ${windowSummary} | Logs: ${status.logPath || 'unavailable'}`;
}

function diagnosticRow(label, value, ok = true) {
  return `
    <div class="flash-diagnostic-row ${ok ? 'ok' : 'warn'}">
      <strong>${escapeHtml(label)}</strong>
      <span title="${escapeHtml(value)}">${escapeHtml(value)}</span>
    </div>
  `;
}

async function refreshFlashDiagnostics() {
  if (!els.flashDiagnosticsList || !window.flowAPI?.getDiagnostics) return null;
  const data = await window.flowAPI.getDiagnostics();
  const version = `${data.appName || 'Flash'} ${data.appVersion || ''}`.trim();
  els.flashDiagnosticsList.innerHTML = [
    diagnosticRow('Version', version, true),
    diagnosticRow('Mode', data.packaged ? 'exe build' : 'dev/plugin', Boolean(data.packaged)),
    diagnosticRow('Resolve plugin', data.resolvePluginDir || 'Unknown', Boolean(data.resolvePluginExists)),
    diagnosticRow('Manifest', data.manifestExists ? 'Found' : 'Missing', Boolean(data.manifestExists)),
    diagnosticRow('Workflow node', data.workflowNodeExists ? 'Found' : 'Missing', Boolean(data.workflowNodeExists)),
    diagnosticRow('Fusion scripts', data.fusionUtilityDir || 'Unknown', Boolean(data.fusionUtilityExists)),
    diagnosticRow('fuscript.exe', data.fuscriptExists ? 'Found' : 'Missing', Boolean(data.fuscriptExists)),
    diagnosticRow('Logs', data.logPath || 'Unavailable', Boolean(data.logPath))
  ].join('');
  if (els.flashSettingsStatus) {
    const ready = data.manifestExists && data.workflowNodeExists && data.fuscriptExists;
    els.flashSettingsStatus.textContent = ready ? 'Resolve integration looks ready.' : 'Some Resolve integration files are missing.';
  }
  return data;
}

async function openFlashSettings() {
  els.flashSettingsModal?.classList.remove('hidden');
  await refreshFlashDiagnostics();
  updateFlashUpdateUi();
}

function closeFlashSettings() {
  els.flashSettingsModal?.classList.add('hidden');
}

function updateFlashUpdateUi(message = '') {
  const manifest = state.flashUpdateManifest;
  const hasUpdate = manifest?.latestVersion && compareVersions(manifest.latestVersion, FLASH_VERSION) > 0;
  const downloaded = Boolean(state.downloadedFlashUpdate?.path);
  if (els.flashUpdateStatus) {
    const title = hasUpdate ? `Flash ${manifest.latestVersion} available` : `Flash ${FLASH_VERSION}`;
    const detail = message || (manifest
      ? hasUpdate
        ? (manifest.changelog || 'A newer Flash build is available.')
        : 'Flash is up to date.'
      : 'Not checked yet.');
    const strong = els.flashUpdateStatus.querySelector('strong');
    const span = els.flashUpdateStatus.querySelector('span');
    if (strong) strong.textContent = title;
    if (span) span.textContent = detail;
  }
  els.flashDownloadUpdateButton?.classList.toggle('hidden', !hasUpdate || downloaded);
  els.flashOpenUpdateButton?.classList.toggle('hidden', !downloaded);
}

async function checkFlashUpdate({ quiet = false } = {}) {
  if (!window.flowAPI?.getFlashUpdateManifest) return null;
  updateFlashUpdateUi('Checking for Flash updates...');
  const result = await window.flowAPI.getFlashUpdateManifest(FLASH_UPDATE_URL);
  if (!result?.ok) {
    updateFlashUpdateUi(`Update check failed: ${result?.message || 'unknown error'}`);
    if (!quiet) showToast('Update check failed');
    return null;
  }
  state.flashUpdateManifest = result.manifest;
  state.downloadedFlashUpdate = null;
  const hasUpdate = compareVersions(state.flashUpdateManifest?.latestVersion, FLASH_VERSION) > 0;
  updateFlashUpdateUi();
  if (hasUpdate && !quiet) showToast(`Flash ${state.flashUpdateManifest.latestVersion} available`);
  if (!hasUpdate && !quiet) showToast('Flash is up to date');
  return state.flashUpdateManifest;
}

async function downloadFlashUpdate() {
  const manifest = state.flashUpdateManifest || await checkFlashUpdate({ quiet: true });
  if (!manifest) return;
  if (compareVersions(manifest.latestVersion, FLASH_VERSION) <= 0) {
    showToast('Flash is up to date');
    updateFlashUpdateUi();
    return;
  }
  updateFlashUpdateUi(`Downloading Flash ${manifest.latestVersion}...`);
  const result = await window.flowAPI?.downloadFlashUpdate?.(manifest);
  if (!result?.ok) {
    updateFlashUpdateUi(result?.message || 'Download failed');
    showToast('Flash update failed');
    return;
  }
  state.downloadedFlashUpdate = result;
  updateFlashUpdateUi(result.message || 'Update downloaded.');
  showToast(result.message || 'Update downloaded');
}

async function openDownloadedFlashUpdate() {
  if (!state.downloadedFlashUpdate?.path) return;
  const result = await window.flowAPI?.openFlashUpdate?.(state.downloadedFlashUpdate.path);
  showToast(result?.message || (result?.ok ? 'Update opened' : 'Open update failed'));
}

async function refreshModuleCatalog() {
  if (!window.flowAPI?.getModuleCatalog) return false;
  const result = await window.flowAPI.getModuleCatalog(FLASH_CATALOG_URL);
  if (result?.ok && result.catalog) {
    state.moduleCatalog = result.catalog;
    state.catalogStatus = 'Online catalog';
    renderFlashModules();
    return true;
  }
  state.catalogStatus = result?.message ? `Local catalog - ${result.message}` : 'Local catalog';
  return false;
}

async function openStore() {
  if (els.storeModulesList) {
    els.storeModulesList.innerHTML = '<div class="home-empty-state"><strong>Checking catalog...</strong><span>Looking for latest module versions.</span></div>';
  }
  await refreshModuleCatalog();
  renderStoreModules();
  els.storeModal?.classList.remove('hidden');
}

function closeStore() {
  els.storeModal?.classList.add('hidden');
}

const MODIFIER_META = {
  bounce: {
    strength: ['Impact', 'Height of each rebound'],
    cycles: ['Bounces', 'Number of rebounds'],
    bias: ['Gravity', 'Positive falls later, negative earlier'],
    decay: ['Damping', 'How fast rebounds fade']
  },
  elastic: {
    strength: ['Amplitude', 'Wave height around the base curve'],
    cycles: ['Frequency', 'Number of oscillations'],
    bias: ['Phase bias', 'Push the wave earlier or later'],
    decay: ['Decay', 'How fast the oscillation settles']
  },
  overshoot: {
    strength: ['Overshoot', 'How far the curve passes the target'],
    cycles: ['Snap power', 'Return sharpness after the peak'],
    bias: ['Peak bias', 'Move the peak earlier or later'],
    decay: ['Settle', 'How quickly it returns to target']
  },
  anticipate: {
    strength: ['Pullback', 'How far it moves backward first'],
    cycles: ['Launch power', 'Acceleration after the pullback'],
    bias: ['Timing bias', 'Move the pullback earlier or later'],
    decay: ['Recovery', 'How quickly it catches up']
  },
  snap: {
    strength: ['Kick', 'Extra punch on the fast section'],
    cycles: ['Sharpness', 'Curve steepness'],
    bias: ['Break point', 'Where the snap begins'],
    decay: ['Tail soften', 'How much the ending relaxes']
  },
  soften: {
    strength: ['Blend', 'Amount of smoothing'],
    cycles: ['Weight', 'How strongly the S curve is held'],
    bias: ['Balance', 'Favor start or end softness'],
    decay: ['Roundness', 'Extra rounding at the ends']
  },
  sine: {
    strength: ['Amplitude', 'Wave height'],
    cycles: ['Cycles', 'Full sine cycles'],
    bias: ['Phase', 'Horizontal phase offset'],
    decay: ['Envelope', 'How much the wave fades at the ends']
  }
};

const MODIFIER_DEFAULTS = {
  bounce: { strength: 34, cycles: 2.4, bias: 0, decay: 72, keyframes: 12, override: true, clamp: true },
  elastic: { strength: 26, cycles: 3.2, bias: 0, decay: 78, keyframes: 14, override: true, clamp: true },
  overshoot: { strength: 28, cycles: 2.2, bias: -8, decay: 70, keyframes: 10, override: true, clamp: true },
  anticipate: { strength: 22, cycles: 1.8, bias: 5, decay: 64, keyframes: 10, override: true, clamp: true },
  snap: { strength: 18, cycles: 3.6, bias: 0, decay: 58, keyframes: 8, override: true, clamp: true },
  soften: { strength: 46, cycles: 1.2, bias: 0, decay: 60, keyframes: 8, override: false, clamp: true },
  sine: { strength: 18, cycles: 2, bias: 0, decay: 72, keyframes: 16, override: true, clamp: true }
};

function setModifierControls(type = state.selectedModifier || 'bounce') {
  const defaults = MODIFIER_DEFAULTS[type] || MODIFIER_DEFAULTS.bounce;
  if (els.modifierStrength) els.modifierStrength.value = defaults.strength;
  if (els.modifierCycles) els.modifierCycles.value = defaults.cycles;
  if (els.modifierBias) els.modifierBias.value = defaults.bias;
  if (els.modifierDecay) els.modifierDecay.value = defaults.decay;
  if (els.modifierKeyframes) els.modifierKeyframes.value = defaults.keyframes;
  if (els.modifierOverride) els.modifierOverride.checked = defaults.override;
  if (els.modifierClamp) els.modifierClamp.checked = defaults.clamp;
}

function updateModifierPendingUi() {
  const pending = Boolean(state.selectedModifier);
  els.modifierPendingBar?.classList.toggle('hidden', !pending);
  els.modifierGraphNotice?.classList.toggle('hidden', !pending);
  if (pending && els.modifierPendingName) {
    els.modifierPendingName.textContent = `${state.selectedModifier[0].toUpperCase()}${state.selectedModifier.slice(1)} modifier`;
  }
}

function updateModifierLabels(type) {
  const meta = MODIFIER_META[type] || MODIFIER_META.bounce;
  const pairs = [
    ['modifierStrengthLabel', 'modifierStrengthHint', meta.strength],
    ['modifierCyclesLabel', 'modifierCyclesHint', meta.cycles],
    ['modifierBiasLabel', 'modifierBiasHint', meta.bias],
    ['modifierDecayLabel', 'modifierDecayHint', meta.decay]
  ];
  for (const [labelId, hintId, values] of pairs) {
    if (els[labelId]) els[labelId].textContent = values[0];
    if (els[hintId]) els[hintId].textContent = values[1];
  }
}

function resetModifierControl(controlId) {
  const defaults = MODIFIER_DEFAULTS[state.selectedModifier || 'bounce'] || MODIFIER_DEFAULTS.bounce;
  const map = {
    modifierStrength: 'strength',
    modifierCycles: 'cycles',
    modifierBias: 'bias',
    modifierDecay: 'decay',
    modifierKeyframes: 'keyframes'
  };
  const key = map[controlId];
  if (!key || !els[controlId]) return;
  els[controlId].value = defaults[key];
  if (state.selectedModifier) {
    pushUndo();
    applyCurveModifier(state.selectedModifier);
    applyUiState();
    if (state.instantApply) applyActive({ silentSuccess: true });
  }
}

function buildModifierSamples(type, strength, cycles, bias, decay, shouldClamp) {
  const count = type === 'soften' || type === 'snap' ? 40 : 96;
  const samples = [];
  const seen = new Set();
  const damping = Math.max(0.05, decay);
  const clampValue = (value) => shouldClamp ? clamp(value, -2.5, 3.5) : value;
  const addSample = (t, v) => {
    const normalizedT = clamp(Number(t) || 0, 0, 1);
    const key = normalizedT.toFixed(5);
    if (seen.has(key)) return;
    seen.add(key);
    samples.push({
      t: Number(key),
      v: Number(clampValue(Number(v) || 0).toFixed(5))
    });
  };
  for (let index = 0; index <= count; index += 1) {
    const rawT = index / count;
    const t = clamp(rawT + bias * 0.16 * Math.sin(Math.PI * rawT), 0, 1);
    let v = rawT;
    if (type === 'bounce') {
      const fall = Math.pow(1 - rawT, 0.72 + damping * 2.4);
      const gravityT = clamp(rawT + bias * 0.08, 0, 1);
      const wave = Math.abs(Math.sin(rawT * Math.PI * Math.max(1.25, cycles + 0.65)));
      v = gravityT + wave * strength * 0.85 * fall;
    } else if (type === 'elastic') {
      const fall = Math.pow(1 - rawT, 0.5 + damping * 2.2);
      v = rawT + Math.sin((rawT + bias * 0.2) * Math.PI * 2 * cycles) * strength * 0.72 * fall;
    } else if (type === 'overshoot') {
      const power = 1.35 + cycles * 0.58;
      const ease = 1 - Math.pow(1 - rawT, power);
      const settle = Math.pow(1 - rawT, 0.3 + damping * 1.7);
      v = ease + Math.sin(clamp(rawT + bias * 0.08, 0, 1) * Math.PI) * strength * 0.72 * settle;
    } else if (type === 'anticipate') {
      const launch = Math.pow(rawT, 1.35 + cycles * 0.22);
      const ease = launch * launch * (3 - 2 * launch);
      v = ease - Math.sin(clamp(rawT - bias * 0.12, 0, 1) * Math.PI) * strength * 0.65 * Math.pow(1 - rawT, 0.45 + damping);
    } else if (type === 'snap') {
      const breakPoint = clamp(0.22 + bias * 0.24, 0.04, 0.8);
      v = rawT < breakPoint ? rawT * (0.05 + damping * 0.16) : 1 - Math.pow(1 - (rawT - breakPoint) / (1 - breakPoint), 2.2 + cycles * 0.55);
      v += Math.sin(rawT * Math.PI) * strength * 0.22 * (1 - damping * 0.35);
    } else if (type === 'soften') {
      v = rawT * rawT * (3 - 2 * rawT);
      const round = rawT * rawT * rawT * (rawT * (rawT * 6 - 15) + 10);
      v = v * (0.55 + strength * 0.22 + cycles * 0.03) + rawT * (0.45 - strength * 0.12) + (round - v) * damping * 0.5;
      v += bias * 0.18 * Math.sin(rawT * Math.PI);
    } else if (type === 'sine') {
      const wave = Math.sin((rawT + bias * 0.18) * Math.PI * 2 * cycles);
      const envelope = Math.pow(Math.sin(rawT * Math.PI), 0.35 + damping * 1.4);
      v = rawT + wave * envelope * strength * 0.5;
    }
    if (index === 0) {
      addSample(0, 0);
    } else if (index === count) {
      addSample(1, 1);
    } else {
      addSample(t, v);
    }
  }
  samples.sort((a, b) => a.t - b.t);
  return samples;
}

function endpointSpanForPreset(preset, lockOverride = null) {
  const samples = sortedCurveSamples(preset);
  const lock = lockOverride || (preset === state.active ? editLockRange(preset) : null);
  if (lock?.start && lock?.end) {
    return {
      start: {
        t: Number(lock.start.t) || 0,
        v: Number(lock.start.v) || 0,
        rawValue: Number.isFinite(Number(lock.start.rawValue)) ? Number(lock.start.rawValue) : null
      },
      end: {
        t: Number(lock.end.t) || 1,
        v: Number(lock.end.v) || 1,
        rawValue: Number.isFinite(Number(lock.end.rawValue)) ? Number(lock.end.rawValue) : null
      }
    };
  }
  if (samples?.length >= 2) {
    return {
      start: {
        t: Number(samples[0].t) || 0,
        v: Number(samples[0].v) || 0,
        rawValue: Number.isFinite(Number(samples[0].rawValue)) ? Number(samples[0].rawValue) : null
      },
      end: {
        t: Number(samples[samples.length - 1].t) || 1,
        v: Number(samples[samples.length - 1].v) || 1,
        rawValue: Number.isFinite(Number(samples[samples.length - 1].rawValue)) ? Number(samples[samples.length - 1].rawValue) : null
      }
    };
  }
  return { start: { t: 0, v: 0 }, end: { t: 1, v: 1 } };
}

function remapModifierSamplesToPreset(samples, basePreset, lockOverride = null) {
  const source = Array.isArray(samples) ? samples : [];
  const span = endpointSpanForPreset(basePreset, lockOverride);
  const startT = clamp(span.start.t, 0, 1);
  const endT = clamp(span.end.t, 0, 1);
  const timeSpan = Math.max(0.00001, endT - startT);
  const rawStart = Number(span.start.rawValue);
  const rawEnd = Number(span.end.rawValue);
  const hasRaw = Number.isFinite(rawStart) && Number.isFinite(rawEnd);
  const normalizedSpan = span.end.v - span.start.v;
  const valueSpan = Math.abs(normalizedSpan) > 0.000001 ? normalizedSpan : 0.35;
  const rawSpan = hasRaw
    ? (Math.abs(rawEnd - rawStart) > 0.000001
      ? rawEnd - rawStart
      : Math.max(Math.abs(rawStart) * 0.25, Math.abs(rawEnd) * 0.25, 0.25))
    : null;
  return source.map((sample, index) => {
    const localT = clamp(Number(sample.t) || 0, 0, 1);
    const localV = Number(sample.v) || 0;
    const mapped = {
      ...sample,
      t: Number((startT + localT * timeSpan).toFixed(5)),
      v: Number((span.start.v + localV * valueSpan).toFixed(5))
    };
    if (hasRaw) mapped.rawValue = Number((rawStart + localV * rawSpan).toFixed(5));
    if (index === 0) {
      mapped.t = Number(startT.toFixed(5));
      mapped.v = Number(span.start.v.toFixed(5));
      if (hasRaw) mapped.rawValue = Number(rawStart.toFixed(5));
    } else if (index === source.length - 1) {
      mapped.t = Number(endT.toFixed(5));
      mapped.v = Number(span.end.v.toFixed(5));
      if (hasRaw) mapped.rawValue = Number(rawEnd.toFixed(5));
    }
    return mapped;
  }).sort((a, b) => a.t - b.t);
}

function selectionActionLockForPreset(preset) {
  if (state.selectionAction?.type !== 'modifier') return null;
  const samples = sortedCurveSamples(preset);
  if (!samples || samples.length < 2) return null;
  const firstIndex = clamp(Math.round(Number(state.selectionAction.rangeStartIndex || 1)) - 1, 0, samples.length - 1);
  const lastIndex = clamp(Math.round(Number(state.selectionAction.rangeEndIndex || samples.length)) - 1, 0, samples.length - 1);
  let start = samples[Math.min(firstIndex, lastIndex)];
  let end = samples[Math.max(firstIndex, lastIndex)];
  if (!start || !end || start === end) {
    const startTime = Number(state.selectionAction.rangeStart);
    const endTime = Number(state.selectionAction.rangeEnd);
    if (Number.isFinite(startTime) && Number.isFinite(endTime)) {
      const low = Math.min(startTime, endTime);
      const high = Math.max(startTime, endTime);
      start = samples.find((sample) => Math.abs(Number(sample.rawTime) - low) < 0.01)
        || samples.find((sample) => Math.abs(timeFromNormalized(preset, Number(sample.t) || 0) - low) < 0.01)
        || start;
      end = samples.find((sample) => Math.abs(Number(sample.rawTime) - high) < 0.01)
        || samples.find((sample) => Math.abs(timeFromNormalized(preset, Number(sample.t) || 0) - high) < 0.01)
        || end;
    }
  }
  if (!start || !end || Number(start.t) >= Number(end.t)) return null;
  return { start: { ...start }, end: { ...end } };
}

function resampleSamples(samples, count) {
  const source = Array.isArray(samples) ? samples.map((sample) => ({ ...sample })).sort((a, b) => Number(a.t) - Number(b.t)) : [];
  const total = clamp(Math.round(Number(count) || 12), 3, 64);
  if (source.length < 2) return source;
  const firstT = Number(source[0].t) || 0;
  const lastT = Number(source[source.length - 1].t) || 1;
  const timeSpan = Math.max(0.00001, lastT - firstT);
  const valueAt = (t) => {
    let previous = source[0];
    for (const sample of source) {
      if (sample.t >= t) {
        const span = Math.max(0.00001, sample.t - previous.t);
        const mix = clamp((t - previous.t) / span, 0, 1);
        return previous.v + (sample.v - previous.v) * mix;
      }
      previous = sample;
    }
    return source[source.length - 1].v;
  };
  const rawValueAt = (t) => {
    if (!source.some((sample) => Number.isFinite(Number(sample.rawValue)))) return null;
    let previous = source[0];
    for (const sample of source) {
      if (sample.t >= t) {
        const span = Math.max(0.00001, sample.t - previous.t);
        const mix = clamp((t - previous.t) / span, 0, 1);
        const left = Number.isFinite(Number(previous.rawValue)) ? Number(previous.rawValue) : valueFromNormalized(state.active, previous.v);
        const right = Number.isFinite(Number(sample.rawValue)) ? Number(sample.rawValue) : valueFromNormalized(state.active, sample.v);
        return left + (right - left) * mix;
      }
      previous = sample;
    }
    const last = source[source.length - 1];
    return Number.isFinite(Number(last.rawValue)) ? Number(last.rawValue) : valueFromNormalized(state.active, last.v);
  };
  const slopeAt = (t) => {
    const epsilon = Math.max(0.001, 1 / Math.max(240, source.length * 6));
    const left = clamp(t - epsilon, firstT, lastT);
    const right = clamp(t + epsilon, firstT, lastT);
    if (right <= left) return 0;
    return (valueAt(right) - valueAt(left)) / (right - left);
  };
  const next = [];
  for (let index = 0; index < total; index += 1) {
    const t = firstT + (index / (total - 1)) * timeSpan;
    const rawValue = rawValueAt(t);
    next.push({
      t: Number(t.toFixed(5)),
      v: Number(valueAt(t).toFixed(5)),
      m: Number(slopeAt(t).toFixed(5)),
      ...(Number.isFinite(rawValue) ? { rawValue: Number(rawValue.toFixed(5)) } : {})
    });
  }
  next[0] = { ...next[0], t: Number(firstT.toFixed(5)), v: source[0].v, m: Number(slopeAt(firstT).toFixed(5)) };
  next[next.length - 1] = { ...next[next.length - 1], t: Number(lastT.toFixed(5)), v: source[source.length - 1].v, m: Number(slopeAt(lastT).toFixed(5)) };
  return next;
}

function applyCurveModifier(type) {
  const strength = clamp(Number(els.modifierStrength?.value || 42) / 100, 0, 3);
  const cycles = clamp(Number(els.modifierCycles?.value || 2), 0.05, 24);
  const bias = clamp(Number(els.modifierBias?.value || 0) / 100, -3, 3);
  const decay = clamp(Number(els.modifierDecay?.value || 65) / 100, -1, 3);
  const keyframes = clamp(Math.round(Number(els.modifierKeyframes?.value || 12)), 3, 64);
  const shouldClamp = els.modifierClamp?.checked !== false;
  const overrideGraph = els.modifierOverride?.checked !== false;
  const name = type ? `${type[0].toUpperCase()}${type.slice(1)}` : 'Modifier';
  updateModifierLabels(type);
  const basePreset = clonePreset(state.modifierBase || state.active);
  const lock = selectionActionLockForPreset(basePreset);
  const localModifierShape = buildModifierSamples(type, strength, cycles, bias, decay, shouldClamp);
  const localApplyShape = resampleSamples(localModifierShape, keyframes);
  const modifierShape = remapModifierSamplesToPreset(localApplyShape, basePreset, lock);
  updateRawValuesFromSamples(modifierShape, { preserveRaw: true });
  let previewSamples;
  const baseSamplesForPreview = sortedCurveSamples(basePreset);
  if (lock && Array.isArray(baseSamplesForPreview) && baseSamplesForPreview.length >= 2) {
    const baseSamples = baseSamplesForPreview.map((sample) => ({ ...sample }));
    const lockStartT = Number(lock.start.t);
    const lockEndT = Number(lock.end.t);
    const outside = baseSamples.filter((sample) => Number(sample.t) < lockStartT - 1e-6 || Number(sample.t) > lockEndT + 1e-6);
    const inside = modifierShape.filter((sample) => Number(sample.t) >= lockStartT - 1e-6 && Number(sample.t) <= lockEndT + 1e-6);
    previewSamples = [...outside, ...inside].sort((a, b) => Number(a.t) - Number(b.t));
  } else {
    previewSamples = modifierShape;
  }
  const applySamples = lock
    ? localApplyShape.map((sample) => {
        const clean = { ...sample };
        for (const key of ['rawTime', 'rawValue', 'hInRawTime', 'hInRawValue', 'hOutRawTime', 'hOutRawValue']) delete clean[key];
        return clean;
      })
    : resampleSamples(previewSamples, keyframes);
  if (!lock) updateRawValuesFromSamples(applySamples, { preserveRaw: true });
  const next = {
    ...basePreset,
    id: state.active.modifierDraft ? state.active.id : `modifier-${type}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    locked: false,
    linear: false,
    sampled: true,
    modifierDraft: true,
    modifierType: type,
    samples: previewSamples,
    applySamples,
    sampleCount: applySamples.length,
    overrideGraph,
    x1: 1 / 3,
    y1: 1 / 3,
    x2: 2 / 3,
    y2: 2 / 3
  };
  setActivePreset(next);
  state.modifierBase = clonePreset(basePreset);
  markLocalGraphEdit(2200);
  setStatus(`${next.name} modifier loaded. Press ${state.applyKey} or Apply.`);
}

function clearPendingModifier() {
  if (state.modifierBase) setActivePreset(state.modifierBase);
  state.selectedModifier = null;
  state.modifierBase = null;
  for (const button of document.querySelectorAll('[data-modifier]')) button.classList.remove('active');
  applyUiState();
  setStatus('Modifier removed.');
}

function applyLayoutOrder() {
  state.layoutOrder = ['gallery', 'editor', 'history'];
  els.galleryPanel.style.order = '0';
  els.editorResizeHandle.style.order = '1';
  els.editorPanel.style.order = '2';
  els.advancedPanel.style.order = '3';
  els.modifiersPanel.style.order = '4';
  els.settingsHostPanel.style.order = '5';
  els.historyResizeHandle.style.order = '6';
  els.historyPanel.style.order = '7';
}

function rotateLayout(name, direction) {
  const index = state.layoutOrder.indexOf(name);
  const next = index + direction;
  if (index < 0 || next < 0 || next >= state.layoutOrder.length) return;
  const copy = [...state.layoutOrder];
  [copy[index], copy[next]] = [copy[next], copy[index]];
  state.layoutOrder = copy;
  applyUiState();
}

function renderGallery() {
  syncActiveGallery();
  els.presetGrid.innerHTML = '';
  for (const preset of state.presets) {
    const button = document.createElement('button');
    button.className = `preset ${preset.locked ? 'locked' : ''} ${preset.id === state.active.id ? 'active' : ''} ${state.assignedIds.includes(preset.id) ? 'assigned' : ''}`;
    button.title = preset.locked ? `${preset.name} (locked)` : `${preset.name} (right-click to delete)`;
    button.dataset.id = preset.id;
    const canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 86;
    button.appendChild(canvas);
    const assignedIndex = state.assignedIds.indexOf(preset.id);
    if (assignedIndex >= 0) {
      const star = document.createElement('span');
      star.className = 'assigned-star';
      star.textContent = '\u2605';
      star.title = `Assigned to wheel slot ${assignedIndex + 1}`;
      button.appendChild(star);
    }
    button.addEventListener('mouseenter', () => {
      els.hoverInfo.textContent = `${preset.name}${preset.locked ? ' - locked default' : ' - right click twice to delete'}`;
      els.hoverInfo.classList.add('active');
    });
    button.addEventListener('mouseleave', () => {
      els.hoverInfo.textContent = 'Hover a graph to preview details.';
      els.hoverInfo.classList.remove('active');
    });
    button.addEventListener('click', async () => {
      const inSelectionAction = Boolean(state.selectionAction);
      if (state.activeEdit && !inSelectionAction) {
        deactivateActiveFreeform(false);
        els.activeEditToggle.checked = false;
      }
      state.galleryActiveId = preset.id;
      state.selectedKeyframes = [];
      state.selectedKeyIndex = null;
      state.editLockKeyframes = [];
      state.selectedModifier = null;
      state.modifierBase = null;
      setActivePreset(preset);
      if (inSelectionAction) {
        setStatus(`Apply graph: ${preset.name} loaded. Press Apply to use it on the selected keyframes.`);
      } else if (state.instantApply) await applyActive({ silentSuccess: true });
      else if (state.behavior === 'click') await applyActive();
      else setStatus(`Loaded ${preset.name}. Press ${state.applyKey} while this window is focused.`);
    });
    button.addEventListener('dblclick', (event) => {
      event.preventDefault();
      toggleAssignedPreset(preset, button);
    });
    button.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      if (preset.locked) {
        showToast('Default presets are locked');
        return;
      }
      const now = Date.now();
      if (button.dataset.pendingDelete === '1' && now - Number(button.dataset.deleteAt || 0) < 1600) {
        deletePreset(preset.id);
      } else {
        button.dataset.pendingDelete = '1';
        button.dataset.deleteAt = String(now);
        showToast('Right click again to delete');
        setTimeout(() => {
          button.dataset.pendingDelete = '0';
        }, 1700);
      }
    });
    els.presetGrid.appendChild(button);
    requestAnimationFrame(() => drawCurve(canvas, preset, true));
  }
}

function renderHistory() {
  els.historyList.innerHTML = '';
  if (state.history.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'history-empty';
    empty.textContent = 'No applies yet.';
    els.historyList.appendChild(empty);
    return;
  }

  for (const entry of state.history) {
    const item = document.createElement('div');
    item.className = 'history-item';
    const text = document.createElement('div');
    text.innerHTML = `<strong>${entry.name}</strong><span>${entry.modeLabel} - ${entry.time}</span>`;
    const revert = document.createElement('button');
    revert.textContent = 'Revert';
    revert.addEventListener('click', async () => {
      const result = await window.flowAPI.revertHistory(entry);
      setStatus(result.message || (result.ok ? 'Reverted.' : 'Revert failed.'));
      if (result.ok) showToast('Graph reverted');
    });
    item.append(text, revert);
    els.historyList.appendChild(item);
  }
}

function setActivePreset(preset) {
  state.active = state.activeEdit && state.selectionAction?.type !== 'graph'
    ? clonePreset(preset)
    : simpleShapeGraphFromPreset(preset);
  if (!state.selectionAction) {
    state.selectedKeyframes = [];
    state.selectedKeyIndex = null;
    state.hoverKeyIndex = null;
  }
  if (state.preserveEditLockOnNextPreset) {
    state.preserveEditLockOnNextPreset = false;
  } else {
    state.editLockKeyframes = [];
    state.editLockRangeHint = null;
  }
  els.activeName.textContent = displayNameForActive(state.active);
  els.presetName.value = displayNameForActive(state.active);
  drawCurve(els.curveCanvas, state.active);
  renderGallery();
  updateCollapsedGraphPreview();
  applyUiState();
}

function acceptResolveGraph(graph, signature) {
  clearResolveChangePrompt();
  setActivePreset(graph);
  state.advancedEdit = true;
  state.activeEditTarget = graph.name;
  state.activeEditTargetKey = graph.activeEditTargetKey || '';
  state.activeEditTargets = Array.isArray(graph.activeEditTargets) ? graph.activeEditTargets : [];
  state.activeEditSignature = signature;
  state.lastResolveSignature = signature;
  state.activeEditLocalOwner = false;
  state.activeEditPendingApplySignature = null;
  state.activeEditPendingApplyAt = 0;
  state.activeEditDirtySource = 'resolve';
  state.localGraphDirty = false;
  state.localEditUntil = 0;
  state.activeEditAcceptedGraph = clonePreset(graph);
  state.activeEditResolveGraph = clonePreset(graph);
  setFreeformSuspended(Boolean(graph.activeEditIsPathDisplacement), graph.activeEditIsPathDisplacement ? 'path' : '');
}

function rememberNormalCurve() {
  if (state.activeEdit) return;
  const snapshot = stripResolveValuesFromGraph(state.active);
  if (snapshot) state.normalCurveSnapshot = snapshot;
}

function restoreNormalCurveAfterFreeform() {
  const snapshot = state.normalCurveSnapshot
    || state.presets.find((preset) => preset.id === state.galleryActiveId)
    || DEFAULT_PRESETS[1];
  state.selectedModifier = null;
  state.modifierBase = null;
  setActivePreset(snapshot);
}

function clearActiveFreeformRuntime() {
  state.activeEditTarget = null;
  state.activeEditSignature = null;
  state.lastResolveSignature = null;
  state.activeEditLocalOwner = false;
  state.activeEditPendingApplySignature = null;
  state.activeEditPendingApplyAt = 0;
  state.activeEditLastLocalSignature = null;
  state.activeEditLastAppliedSignature = null;
  state.activeEditRejectedSignature = null;
  state.activeEditDirtySource = 'none';
  state.activeEditTargets = [];
  state.activeEditTargetKey = '';
  state.activeEditSuspended = false;
  state.activeEditSuspendReason = '';
  state.activeEditAcceptedGraph = null;
  state.activeEditResolveGraph = null;
  state.activeEditPendingResolveGraph = null;
  state.activeEditPendingResolveSignature = null;
  state.localEditUntil = 0;
  state.localGraphDirty = false;
  els.resolveChangePrompt?.classList.add('hidden');
  setFreeformSuspended(false);
}

function deactivateActiveFreeform(restoreCurve = true) {
  state.activeEditModeToken += 1;
  state.activeEdit = false;
  clearActiveFreeformRuntime();
  if (restoreCurve) restoreNormalCurveAfterFreeform();
}

function newLinearGraph() {
  const preset = {
    id: `custom-${Date.now()}`,
    name: 'New Linear',
    locked: false,
    linear: true,
    x1: 1 / 3,
    y1: 1 / 3,
    x2: 2 / 3,
    y2: 2 / 3
  };
  state.presets.push(preset);
  state.galleries[state.galleryIndex].presets = state.presets;
  saveCustomPresets();
  state.editorOpen = true;
  state.galleryActiveId = preset.id;
  applyUiState();
  setActivePreset(preset);
  setStatus('New linear graph loaded in the editor.');
}

async function resetEditor() {
  pushUndo();
  centerGraphView(false);
  setModifierControls(state.selectedModifier || 'bounce');
  state.selectedModifier = null;
  state.modifierBase = null;
  state.selectedKeyframes = [];
  state.editLockKeyframes = [];
  state.editLockRangeHint = null;
  state.selectedKeyIndex = null;
  if (state.activeEdit) {
    state.activeEditLocalOwner = false;
    state.activeEditPendingApplySignature = null;
    state.activeEditPendingApplyAt = 0;
    state.activeEditDirtySource = 'none';
    state.localGraphDirty = false;
    state.localEditUntil = 0;
    const graph = await readResolveGraphNoAccept();
    const loaded = Boolean(graph);
    if (graph) acceptResolveGraph(graph, graphSignature(graph));
    for (const button of document.querySelectorAll('[data-modifier]')) button.classList.remove('active');
    setStatus(loaded ? 'Updated from Resolve.' : 'Active Freeform waiting for a selected animated spline.');
    return;
  }
  const source = state.presets.find((preset) => preset.id === state.galleryActiveId) || state.presets.find((preset) => preset.id === state.active.id) || DEFAULT_PRESETS[1];
  setActivePreset(source);
  for (const button of document.querySelectorAll('[data-modifier]')) button.classList.remove('active');
  setStatus(`Reset to ${source.name}.`);
}

function centerGraphView(redraw = true) {
  state.editorZoom = 1;
  state.editorScaleX = 1;
  state.editorScaleY = 1;
  state.editorPan = { x: 0, y: 0 };
  if (redraw) {
    drawCurve(els.curveCanvas, state.active);
    saveSettings();
  }
}

function ensureAdvancedSamples(count = 2) {
  const existing = curveSamples(state.active);
  if (existing) {
    const samples = existing.map((sample) => ({
      t: clamp(Number(sample.t) || 0, 0, 1),
      v: Number(sample.v) || 0,
      m: sample.m,
      mIn: sample.mIn,
      mOut: sample.mOut,
      hInT: sample.hInT,
      hInV: sample.hInV,
      hOutT: sample.hOutT,
      hOutV: sample.hOutV,
      generatedFromBezier: sample.generatedFromBezier,
      rawTime: sample.rawTime,
      rawValue: sample.rawValue
    })).sort((a, b) => a.t - b.t);
    state.active.samples = samples;
    state.active.applySamples = samples.map((sample) => ({ ...sample }));
  } else {
    const x1 = Number.isFinite(Number(state.active.x1)) ? Number(state.active.x1) : 1 / 3;
    const y1 = Number.isFinite(Number(state.active.y1)) ? Number(state.active.y1) : 1 / 3;
    const x2 = Number.isFinite(Number(state.active.x2)) ? Number(state.active.x2) : 2 / 3;
    const y2 = Number.isFinite(Number(state.active.y2)) ? Number(state.active.y2) : 2 / 3;
    const outSlope = Math.abs(x1) > 0.0001 ? y1 / x1 : 0;
    const inSlope = Math.abs(1 - x2) > 0.0001 ? (1 - y2) / (1 - x2) : 0;
    const samples = [
      { t: 0, v: 0, hOutT: x1, hOutV: y1, mOut: Number(outSlope.toFixed(5)), generatedFromBezier: true },
      { t: 1, v: 1, hInT: x2, hInV: y2, mIn: Number(inSlope.toFixed(5)), generatedFromBezier: true }
    ];
    state.active.samples = samples;
    state.active.applySamples = samples.map((sample) => ({ ...sample }));
    state.active.generatedFromBezier = true;
  }
  state.active.sampled = true;
  state.active.linear = false;
  state.active.overrideGraph = true;
  commitActiveSamples(state.active.samples, { preserveRaw: state.activeEdit });
}

function isEndpointSample(samples, index) {
  return index === 0 || index === samples.length - 1;
}

function nearestAdvancedSample(pos, endpointsOnly = false) {
  const samples = curveSamples(state.active);
  if (!samples) return null;
  let best = null;
  const limit = (11 * (window.devicePixelRatio || 1)) ** 2;
  for (let index = 0; index < samples.length; index += 1) {
    if (endpointsOnly && !isEndpointSample(samples, index)) continue;
    if (!canEditSampleIndex(index)) continue;
    const point = sampledPoint(els.curveCanvas, samples[index]);
    const dist = (pos.x - point.x) ** 2 + (pos.y - point.y) ** 2;
    if (dist <= limit && (!best || dist < best.dist)) best = { index, sample: samples[index], dist };
  }
  return best;
}

function nearestAdvancedHandle(pos) {
  const samples = curveSamples(state.active);
  if (!samples) return null;
  const limit = (10 * (window.devicePixelRatio || 1)) ** 2;
  let best = null;
  const indexes = selectedSampleIndexes();
  if (!indexes.length && Number.isInteger(state.selectedKeyIndex)) indexes.push(state.selectedKeyIndex);
  for (const index of indexes) {
    if (!canEditSampleIndex(index)) continue;
    const handles = handlePointsForSample(els.curveCanvas, samples, index);
    if (!handles) continue;
    const leftDist = (pos.x - handles.left.x) ** 2 + (pos.y - handles.left.y) ** 2;
    const rightDist = (pos.x - handles.right.x) ** 2 + (pos.y - handles.right.y) ** 2;
    if (leftDist <= limit && (!best || leftDist < best.dist)) best = { side: 'left', index, handles, dist: leftDist };
    if (rightDist <= limit && (!best || rightDist < best.dist)) best = { side: 'right', index, handles, dist: rightDist };
  }
  return best;
}

function setAdvancedSlopeFromHandle(index, pos) {
  const samples = (curveSamples(state.active) || []).map((sample) => ({ ...sample }));
  const sample = samples[index];
  if (!sample) return;
  const r = getRect(els.curveCanvas);
  const t = (pos.x - r.x) / r.w;
  const v = graphValueFromCanvasY(pos.y);
  const rawV = graphDisplayValueFromCanvasY(pos.y);
  const sampleRawValue = displayValueForSample(state.active, sample);
  const mirroredRawV = Number((sampleRawValue * 2 - rawV).toFixed(5));
  if (state.dragging) state.dragging.graphDisplayValue = graphDisplayValueFromCanvasY(pos.y);
  const dt = t - sample.t;
  if (Math.abs(dt) < 0.0001) return;
  const slope = Number(((v - sample.v) / dt).toFixed(5));
  const hasExplicitIn = Number.isFinite(Number(sample.hInT)) || Number.isFinite(Number(sample.hInV));
  const hasExplicitOut = Number.isFinite(Number(sample.hOutT)) || Number.isFinite(Number(sample.hOutV));
  if (state.dragging?.handle === 'left') {
    sample.hInT = Number(t.toFixed(5));
    sample.hInV = Number(v.toFixed(5));
    if (state.activeEdit) sample.hInRawValue = Number(rawV.toFixed(5));
    sample.mIn = slope;
    if (!state.dragging.ctrlKey && !hasExplicitOut) {
      const span = Math.abs(t - sample.t);
      sample.hOutT = Number((sample.t + span).toFixed(5));
      sample.hOutV = Number((sample.v + slope * span).toFixed(5));
      if (state.activeEdit) sample.hOutRawValue = mirroredRawV;
      sample.mOut = slope;
    }
  } else {
    sample.hOutT = Number(t.toFixed(5));
    sample.hOutV = Number(v.toFixed(5));
    if (state.activeEdit) sample.hOutRawValue = Number(rawV.toFixed(5));
    sample.mOut = slope;
    if (!state.dragging.ctrlKey && !hasExplicitIn) {
      const span = Math.abs(t - sample.t);
      sample.hInT = Number((sample.t - span).toFixed(5));
      sample.hInV = Number((sample.v - slope * span).toFixed(5));
      if (state.activeEdit) sample.hInRawValue = mirroredRawV;
      sample.mIn = slope;
    }
  }
  sample.m = undefined;
  sample.generatedFromBezier = false;
  state.active.generatedFromBezier = false;
  commitActiveSamples(samples, { preserveRaw: state.activeEdit });
  markLocalGraphEdit();
  drawCurve(els.curveCanvas, state.active);
  scheduleInstantApply();
}

function setAdvancedSample(index, nextSample) {
  if (!canEditSampleIndex(index)) return;
  const samples = (curveSamples(state.active) || []).map((sample) => ({ ...sample }));
  if (index >= 0 && samples[index]) {
    const bounds = timeBoundaryForSample(samples, index);
    const clamped = { ...nextSample };
    if (Number.isFinite(Number(clamped.t))) {
      const bounded = clamp(Number(clamped.t), bounds.min, bounds.max);
      clamped.t = state.activeEdit ? snapNormalizedToFrame(state.active, bounded) : Number(bounded.toFixed(5));
    }
    if (state.activeEdit && Number.isFinite(Number(clamped.v)) && !Number.isFinite(Number(clamped.rawValue))) {
      const dragValue = Number(state.dragging?.graphDisplayValue);
      clamped.rawValue = Number((Number.isFinite(dragValue) ? dragValue : valueFromNormalized(state.active, clamped.v)).toFixed(5));
    }
    samples[index] = { ...samples[index], ...clamped, generatedFromBezier: false };
  }
  state.active.generatedFromBezier = false;
  commitActiveSamples(samples, { preserveRaw: state.activeEdit });
  markLocalGraphEdit();
  drawCurve(els.curveCanvas, state.active);
  updateAdvancedPanel();
  scheduleInstantApply();
}

function valueFromNormalized(preset, v) {
  const start = Number.isFinite(Number(preset.valueStart)) ? Number(preset.valueStart) : 0;
  const end = Number.isFinite(Number(preset.valueEnd)) ? Number(preset.valueEnd) : 1;
  return start + (end - start) * v;
}

function normalizedFromValue(preset, value) {
  const start = Number.isFinite(Number(preset.valueStart)) ? Number(preset.valueStart) : 0;
  const end = Number.isFinite(Number(preset.valueEnd)) ? Number(preset.valueEnd) : 1;
  const span = Math.abs(end - start) < 0.0001 ? 1 : end - start;
  return (value - start) / span;
}

function graphValueFromCanvasY(y) {
  const r = getRect(els.curveCanvas);
  const range = advancedValueRange(state.active);
  const displayValue = range.max - ((y - r.y) / r.h) * (range.max - range.min);
  return hasRawValueScale(state.active) ? normalizedFromValue(state.active, displayValue) : displayValue;
}

function graphDisplayValueFromCanvasY(y) {
  const r = getRect(els.curveCanvas);
  const range = advancedValueRange(state.active);
  return range.max - ((y - r.y) / r.h) * (range.max - range.min);
}

function timeFromNormalized(preset, t) {
  const start = Number.isFinite(Number(preset.timeStart)) ? Number(preset.timeStart) : 0;
  const end = Number.isFinite(Number(preset.timeEnd)) ? Number(preset.timeEnd) : 1;
  return start + (end - start) * t;
}

function normalizedFromTime(preset, time) {
  const start = Number.isFinite(Number(preset.timeStart)) ? Number(preset.timeStart) : 0;
  const end = Number.isFinite(Number(preset.timeEnd)) ? Number(preset.timeEnd) : 1;
  const span = Math.abs(end - start) < 0.0001 ? 1 : end - start;
  return (time - start) / span;
}

function hasResolveTimeRange(preset) {
  const start = Number(preset?.timeStart);
  const end = Number(preset?.timeEnd);
  return Number.isFinite(start) && Number.isFinite(end) && Math.abs(end - start) >= 1;
}

function snapNormalizedToFrame(preset, t) {
  if (!hasResolveTimeRange(preset)) return Number(t.toFixed(5));
  const frame = Math.round(timeFromNormalized(preset, t));
  return Number(clamp(normalizedFromTime(preset, frame), 0, 1).toFixed(5));
}

function updateRawValuesFromSamples(samples = curveSamples(state.active) || [], options = {}) {
  const preserveRaw = Boolean(options.preserveRaw);
  for (const sample of samples) {
    sample.rawTime = Number(timeFromNormalized(state.active, sample.t).toFixed(3));
    if (!preserveRaw || !Number.isFinite(Number(sample.rawValue))) {
      sample.rawValue = Number(valueFromNormalized(state.active, sample.v).toFixed(5));
    }
    if (Number.isFinite(Number(sample.hInT))) sample.hInRawTime = Number(timeFromNormalized(state.active, sample.hInT).toFixed(3));
    if (Number.isFinite(Number(sample.hInV)) && (!preserveRaw || !Number.isFinite(Number(sample.hInRawValue)))) {
      sample.hInRawValue = Number(valueFromNormalized(state.active, sample.hInV).toFixed(5));
    }
    if (Number.isFinite(Number(sample.hOutT))) sample.hOutRawTime = Number(timeFromNormalized(state.active, sample.hOutT).toFixed(3));
    if (Number.isFinite(Number(sample.hOutV)) && (!preserveRaw || !Number.isFinite(Number(sample.hOutRawValue)))) {
      sample.hOutRawValue = Number(valueFromNormalized(state.active, sample.hOutV).toFixed(5));
    }
  }
}

function commitActiveSamples(samples, options = {}) {
  updateRawValuesFromSamples(samples, options);
  state.active.samples = samples;
  state.active.applySamples = samples.map((sample) => ({ ...sample }));
  state.active.sampleCount = samples.length;
}

function setLinearSegmentHandles(samples, leftIndex, rightIndex) {
  const left = samples?.[leftIndex];
  const right = samples?.[rightIndex];
  if (!left || !right) return false;
  const leftT = Number(left.t);
  const rightT = Number(right.t);
  const leftV = Number(left.v);
  const rightV = Number(right.v);
  const span = rightT - leftT;
  if (!Number.isFinite(leftT) || !Number.isFinite(rightT) || !Number.isFinite(leftV) || !Number.isFinite(rightV) || span <= 0.00001) return false;
  const slope = (rightV - leftV) / span;
  left.hOutT = Number((leftT + span / 3).toFixed(5));
  left.hOutV = Number((leftV + slope * span / 3).toFixed(5));
  left.mOut = Number(slope.toFixed(5));
  right.hInT = Number((rightT - span / 3).toFixed(5));
  right.hInV = Number((rightV - slope * span / 3).toFixed(5));
  right.mIn = Number(slope.toFixed(5));
  return true;
}

function addAdvancedSample(pos) {
  pushUndo();
  ensureAdvancedSamples();
  const r = getRect(els.curveCanvas);
  const t = clamp((pos.x - r.x) / r.w, 0, 1);
  const v = graphValueFromCanvasY(pos.y);
  const rawValue = graphDisplayValueFromCanvasY(pos.y);
  const samples = (curveSamples(state.active) || []).map((sample) => ({ ...sample }));
  samples.push({
    t: Number(t.toFixed(5)),
    v: Number(v.toFixed(5)),
    ...(state.activeEdit ? { rawValue: Number(rawValue.toFixed(5)) } : {})
  });
  samples.sort((a, b) => a.t - b.t);
  state.active.generatedFromBezier = false;
  commitActiveSamples(samples, { preserveRaw: state.activeEdit });
  markLocalGraphEdit();
  drawCurve(els.curveCanvas, state.active);
  setStatus(`Added keyframe at ${t.toFixed(3)}, ${v.toFixed(3)}.`);
  scheduleInstantApply();
}

function deleteAdvancedSample(index) {
  if (!canEditSampleIndex(index)) return;
  const samples = (curveSamples(state.active) || []).map((sample) => ({ ...sample }));
  if (index <= 0 || index >= samples.length - 1 || samples.length <= 2) {
    showToast('Endpoint keys are locked');
    return;
  }
  pushUndo();
  const point = sampledPoint(els.curveCanvas, samples[index]);
  state.deletedKeyBursts.push({ x: point.x, y: point.y, time: Date.now() });
  samples.splice(index, 1);
  setLinearSegmentHandles(samples, index - 1, index);
  state.active.generatedFromBezier = false;
  commitActiveSamples(samples, { preserveRaw: state.activeEdit });
  markLocalGraphEdit();
  drawCurve(els.curveCanvas, state.active);
  setStatus('Keyframe deleted.');
  scheduleInstantApply();
}

function selectedSampleIndexes() {
  return [...new Set(state.selectedKeyframes.filter((index) => Number.isInteger(index)))].sort((a, b) => a - b);
}

function selectedSampleTimes() {
  const samples = curveSamples(state.active) || [];
  return selectedSampleIndexes()
    .map((index) => samples[index])
    .filter(Boolean)
    .map((sample) => Number.isFinite(Number(sample.rawTime)) ? Number(sample.rawTime) : timeFromNormalized(state.active, Number(sample.t) || 0))
    .sort((a, b) => a - b);
}

function lockedSampleIndexes() {
  return [];
}

function editLockActive() {
  return false;
}

function canEditSampleIndex(index) {
  return !state.activeEditSuspended;
}

function editLockRange(preset = state.active) {
  return null;
}

function updateEditLockBanner() {
  if (!els.editLockBanner || !els.editLockText) return;
  els.editLockBanner.classList.add('hidden');
}

function clearEditLock() {
  state.editLockKeyframes = [];
  state.editLockRangeHint = null;
  state.selectedKeyframes = [];
  state.selectedKeyIndex = null;
  updateEditLockBanner();
  updateAdvancedPanel();
  drawCurve(els.curveCanvas, state.active);
}

function lockSelectedKeyframes() {
  showToast('Edit range lock was removed');
  return false;
}

function selectAllAdvancedKeyframes() {
  ensureAdvancedSamples();
  const samples = curveSamples(state.active) || [];
  state.selectedKeyframes = samples.map((_, index) => index);
  state.selectedKeyIndex = samples.length ? samples.length - 1 : null;
  updateAdvancedPanel();
  drawCurve(els.curveCanvas, state.active);
}

function selectedAdvancedSample() {
  const samples = curveSamples(state.active) || [];
  return Number.isInteger(state.selectedKeyIndex) ? samples[state.selectedKeyIndex] : null;
}

function updateAdvancedPanel() {
  if (!els.advancedFrameInput || !els.advancedValueInput || !els.advancedTarget) return;
  const sample = selectedAdvancedSample();
  const enabled = Boolean(sample && advancedMode() && freeformEditingEnabled());
  els.advancedFrameInput.disabled = !enabled;
  els.advancedValueInput.disabled = !enabled;
  const targetLines = [];
  if (state.activeEditTargetKey) targetLines.push(`Chosen: ${state.activeEditTarget || state.active.name || 'Spline'}`);
  if (Number.isFinite(Number(state.active.activeEditKeyCount))) targetLines.push(`Keys: ${Number(state.active.activeEditKeyCount)}`);
  if (Number.isFinite(Number(state.active.activeEditNearestDistance))) targetLines.push(`Nearest key distance: ${Number(state.active.activeEditNearestDistance).toFixed(3)}`);
  if (Array.isArray(state.activeEditTargets) && state.activeEditTargets.length) {
    const labels = state.activeEditTargets.slice(0, 4).map((target) => target.label).join(' | ');
    targetLines.push(`Found: ${labels}${state.activeEditTargets.length > 4 ? ' ...' : ''}`);
  }
  if (els.advancedTargetDebug) {
    els.advancedTargetDebug.textContent = targetLines.length
      ? targetLines.join('\n')
      : 'Active Freeform target info will appear here.';
  }
  if (!enabled) {
    els.advancedTarget.textContent = advancedMode()
      ? (state.activeEditSuspended ? 'Freeform disabled for path modifiers.' : (state.activeEdit ? 'Select a keyframe.' : 'X/Y values are off outside Freeform.'))
      : 'Select a keyframe.';
    return;
  }
  const frame = Number.isFinite(Number(sample.rawTime)) ? Number(sample.rawTime) : timeFromNormalized(state.active, sample.t);
      const value = Number.isFinite(Number(sample.rawValue)) ? Number(sample.rawValue) : valueFromNormalized(state.active, sample.v);
  els.advancedTarget.textContent = `${state.active.name || 'Spline'} key ${state.selectedKeyIndex + 1}`;
  if (document.activeElement !== els.advancedFrameInput) els.advancedFrameInput.value = Number(frame.toFixed(3));
  if (document.activeElement !== els.advancedValueInput) els.advancedValueInput.value = Number(value.toFixed(3));
}

function editSelectedAdvancedSample(changes) {
  if (!freeformEditingEnabled()) return;
  const sample = selectedAdvancedSample();
  if (!sample) return;
  const next = {};
  if (Number.isFinite(Number(changes.frame))) {
    next.t = Number(normalizedFromTime(state.active, Number(changes.frame)).toFixed(5));
    next.rawTime = Number(changes.frame);
  }
  if (Number.isFinite(Number(changes.value))) {
    next.v = Number(normalizedFromValue(state.active, Number(changes.value)).toFixed(5));
    next.rawValue = Number(changes.value);
  }
  pushUndo();
  setAdvancedSample(state.selectedKeyIndex, next);
}

function commitAdvancedInput(input, prop) {
  if (!input || !selectedAdvancedSample()) return false;
  const text = String(input.value ?? '').trim();
  if (!text || text === '-' || text === '.' || text === '-.') {
    updateAdvancedPanel();
    return false;
  }
  const value = Number(text);
  if (!Number.isFinite(value)) {
    updateAdvancedPanel();
    return false;
  }
  editSelectedAdvancedSample({ [prop]: value });
  return true;
}

function moveSelectedSamples(dx, dy, options = {}) {
  const indexes = selectedSampleIndexes().filter(canEditSampleIndex);
  if (!indexes.length) return;
  if (options.pushUndo !== false) pushUndo();
  const samples = (curveSamples(state.active) || []).map((sample) => ({ ...sample }));
  const selected = new Set(indexes);
  let minDx = -1;
  let maxDx = 1;
  for (const index of indexes) {
    const sample = samples[index];
    if (!sample) continue;
    let leftIndex = index - 1;
    while (leftIndex >= 0 && selected.has(leftIndex)) leftIndex -= 1;
    let rightIndex = index + 1;
    while (rightIndex < samples.length && selected.has(rightIndex)) rightIndex += 1;
    const leftLimit = leftIndex >= 0 ? Number(samples[leftIndex].t) + 0.0008 : 0;
    const rightLimit = rightIndex < samples.length ? Number(samples[rightIndex].t) - 0.0008 : 1;
    minDx = Math.max(minDx, leftLimit - Number(sample.t));
    maxDx = Math.min(maxDx, rightLimit - Number(sample.t));
  }
  const safeDx = clamp(dx, minDx, maxDx);
  const valueSpan = Math.abs(Number(state.active.valueEnd) - Number(state.active.valueStart)) > 0.0001
    ? Number(state.active.valueEnd) - Number(state.active.valueStart)
    : 1;
  for (const index of indexes) {
    if (!samples[index]) continue;
    samples[index].t = Number(clamp(samples[index].t + safeDx, 0, 1).toFixed(5));
    samples[index].v = Number((samples[index].v + dy).toFixed(5));
    if (Number.isFinite(Number(samples[index].hInT))) samples[index].hInT = Number((Number(samples[index].hInT) + safeDx).toFixed(5));
    if (Number.isFinite(Number(samples[index].hOutT))) samples[index].hOutT = Number((Number(samples[index].hOutT) + safeDx).toFixed(5));
    if (Number.isFinite(Number(samples[index].hInV))) samples[index].hInV = Number((Number(samples[index].hInV) + dy).toFixed(5));
    if (Number.isFinite(Number(samples[index].hOutV))) samples[index].hOutV = Number((Number(samples[index].hOutV) + dy).toFixed(5));
    if (state.activeEdit && Number.isFinite(Number(samples[index].rawValue))) {
      samples[index].rawValue = Number((Number(samples[index].rawValue) + dy * valueSpan).toFixed(5));
      if (Number.isFinite(Number(samples[index].hInRawValue))) samples[index].hInRawValue = Number((Number(samples[index].hInRawValue) + dy * valueSpan).toFixed(5));
      if (Number.isFinite(Number(samples[index].hOutRawValue))) samples[index].hOutRawValue = Number((Number(samples[index].hOutRawValue) + dy * valueSpan).toFixed(5));
    }
  }
  commitActiveSamples(samples, { preserveRaw: state.activeEdit });
  markLocalGraphEdit();
  drawCurve(els.curveCanvas, state.active);
  updateAdvancedPanel();
  scheduleInstantApply();
}

function hideGraphContextMenu() {
  els.graphContextMenu?.classList.add('hidden');
  els.graphContextMarker?.classList.add('hidden');
  if (state.graphContext || state.graphContextActions.size) window.flowAPI?.closeGraphContextMenu?.();
  state.graphContext = null;
  state.graphContextMarker = null;
  state.graphContextActions.clear();
}

function updateGraphCursor(pos, kind = '') {
  if (!els.graphCursor || !els.editorView) return;
  const host = els.editorView.getBoundingClientRect();
  els.graphCursor.style.left = `${pos.x / (window.devicePixelRatio || 1) + els.curveCanvas.offsetLeft}px`;
  els.graphCursor.style.top = `${pos.y / (window.devicePixelRatio || 1) + els.curveCanvas.offsetTop}px`;
  els.graphCursor.classList.remove('hidden', 'key', 'handle');
  if (kind) els.graphCursor.classList.add(kind);
}

function openEditValueDialog(index) {
  const sample = (curveSamples(state.active) || [])[index];
  if (!sample || !els.editValueDialog) return;
  state.editValueIndex = index;
  const frame = Number.isFinite(Number(sample.rawTime)) ? Number(sample.rawTime) : timeFromNormalized(state.active, Number(sample.t) || 0);
  const value = Number.isFinite(Number(sample.rawValue)) ? Number(sample.rawValue) : valueFromNormalized(state.active, Number(sample.v) || 0);
  els.editValueFrame.value = Number(frame.toFixed(3));
  els.editValueY.value = Number(value.toFixed(3));
  els.editValueDialog.classList.remove('hidden');
  els.editValueY.focus();
  els.editValueY.select();
}

function closeEditValueDialog() {
  state.editValueIndex = null;
  els.editValueDialog?.classList.add('hidden');
}

function applyEditValueDialog() {
  const index = state.editValueIndex;
  if (!Number.isInteger(index)) return;
  const frame = Number(els.editValueFrame.value);
  const value = Number(els.editValueY.value);
  if (!Number.isFinite(frame) || !Number.isFinite(value)) return;
  const next = {
    t: Number(normalizedFromTime(state.active, frame).toFixed(5)),
    rawTime: frame,
    v: Number(normalizedFromValue(state.active, value).toFixed(5)),
    rawValue: value
  };
  pushUndo();
  setAdvancedSample(index, next);
  closeEditValueDialog();
}

function addKeyframeAtCanvasPosition(pos) {
  if (!freeformEditingEnabled()) return;
  addAdvancedSample(pos);
}

function contextIconForLabel(label = '') {
  const text = String(label).toLowerCase();
  if (text.includes('modifier')) return 'modifier';
  if (text.includes('add')) return 'add';
  if (text.includes('linear')) return 'linear';
  if (text.includes('smooth')) return 'smooth';
  if (text.includes('delete')) return 'trash';
  if (text.includes('edit')) return 'edit';
  return 'graph';
}

const CONTEXT_ICONS = {
  graph: '<path d="M4 17c4-10 6-10 8-3s4 7 8-5"/>',
  modifier: '<path d="M13 2 5 13h6l-1 9 9-13h-6z"/>',
  add: '<path d="M12 5v14M5 12h14"/>',
  linear: '<path d="m4 18 16-12"/>',
  smooth: '<path d="M4 16c4-8 8 4 16-8"/>',
  edit: '<path d="M4 20h4l11-11-4-4L4 16z"/><path d="m13 7 4 4"/>',
  trash: '<path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13"/>'
};

function contextIconSvg(name) {
  const paths = CONTEXT_ICONS[name] || CONTEXT_ICONS.graph;
  return `<svg class="context-icon context-icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

function buildContextButton(label, action, icon = contextIconForLabel(label), danger = false) {
  const button = document.createElement('button');
  button.type = 'button';
  if (danger) button.classList.add('danger');
  button.innerHTML = `${contextIconSvg(icon)}<span>${label}</span>`;
  button.addEventListener('click', () => {
    hideGraphContextMenu();
    action();
  });
  return button;
}

function showGraphContextMenu(event, items, context) {
  if (!els.graphContextMenu) return;
  state.graphContext = context;
  state.graphContextActions.clear();
  if (context?.pos && els.graphContextMarker) {
    els.graphContextMarker.style.left = `${context.pos.x / (window.devicePixelRatio || 1) + els.curveCanvas.offsetLeft}px`;
    els.graphContextMarker.style.top = `${context.pos.y / (window.devicePixelRatio || 1) + els.curveCanvas.offsetTop}px`;
    els.graphContextMarker.classList.remove('hidden');
  }
  const overlayItems = items.map((item, index) => {
    const actionId = `ctx-${Date.now()}-${index}`;
    state.graphContextActions.set(actionId, item.action);
    return {
      actionId,
      label: item.label,
      icon: item.icon || contextIconForLabel(item.label),
      danger: item.danger || /delete/i.test(item.label)
    };
  });
  els.graphContextMenu.innerHTML = '';
  for (const item of items) els.graphContextMenu.appendChild(buildContextButton(item.label, item.action, item.icon, item.danger));
  els.graphContextMenu.classList.remove('hidden');
  const menuRect = els.graphContextMenu.getBoundingClientRect();
  const left = clamp(event.clientX + 8, 8, Math.max(8, window.innerWidth - menuRect.width - 8));
  const top = clamp(event.clientY + 8, 8, Math.max(8, window.innerHeight - menuRect.height - 8));
  els.graphContextMenu.style.left = `${left}px`;
  els.graphContextMenu.style.top = `${top}px`;
  els.graphContextMenu.classList.remove('hidden');
}

function startSelectionAction(type) {
  const times = selectedSampleTimes();
  const indexes = selectedSampleIndexes().sort((a, b) => a - b);
  if (times.length < 2) {
    showToast('Select at least 2 keyframes');
    return;
  }
  state.selectionAction = {
    type,
    rangeStart: times[0],
    rangeEnd: times[times.length - 1],
    rangeStartIndex: indexes[0] + 1,
    rangeEndIndex: indexes[indexes.length - 1] + 1,
    selectedTimes: times
  };
  state.selectionActionSnapshot = clonePreset(state.active);
  state.selectionActionInstantApply = state.instantApply;
  state.instantApply = false;
  if (els.instantApplyToggle) els.instantApplyToggle.checked = false;
  if (els.cancelActionButton) {
    els.cancelActionButton.textContent = type === 'graph' ? 'Cancel and sync' : 'Cancel modifier';
  }
  if (els.selectionActionNotice) {
    els.selectionActionNotice.textContent = type === 'graph'
      ? 'Select from spline gallery or make a graph'
      : 'Choose a modifier, then apply';
  }
  if (type === 'graph') {
    const linear = {
      ...DEFAULT_PRESETS[0],
      id: `selection-action-${Date.now()}`,
      name: 'Apply graph',
      locked: false
    };
    setActivePreset(linear);
    state.selectedKeyframes = [];
    state.selectedModifier = null;
    state.modifierBase = null;
  } else {
    state.modifiersOpen = true;
    applyUiState();
    document.body.classList.add('modifier-tab-flash');
    setTimeout(() => document.body.classList.remove('modifier-tab-flash'), 650);
  }
  document.body.classList.add('selection-action');
  document.body.classList.toggle('selection-action-graph', type === 'graph');
  document.body.classList.toggle('selection-action-modifier', type === 'modifier');
  setStatus(type === 'graph' ? 'Apply graph: select or make a graph, then apply.' : 'Apply modifier: choose a modifier, then apply.');
}

async function finishSelectionAction(options = {}) {
  const action = state.selectionAction;
  state.selectionAction = null;
  state.selectionActionSnapshot = null;
  if (state.selectionActionInstantApply !== null) {
    state.instantApply = Boolean(state.selectionActionInstantApply);
    state.selectionActionInstantApply = null;
    if (els.instantApplyToggle) els.instantApplyToggle.checked = state.instantApply;
  }
  document.body.classList.remove('selection-action', 'selection-action-graph', 'selection-action-modifier');
  applyUiState();
  if (options.sync && state.activeEdit) {
    await syncActiveFreeformGraph(options.statusText || (action?.type === 'graph' ? 'Apply graph synced from Resolve.' : 'Synced from Resolve.'));
  }
}

async function cancelSelectionAction() {
  if (state.selectionAction?.type === 'graph' && state.activeEdit) {
    await finishSelectionAction({ sync: true, statusText: 'Apply graph canceled. Synced from Resolve.' });
    return;
  }
  if (state.selectionActionSnapshot) setActivePreset(state.selectionActionSnapshot);
  state.selectionAction = null;
  state.selectionActionSnapshot = null;
  if (state.selectionActionInstantApply !== null) {
    state.instantApply = Boolean(state.selectionActionInstantApply);
    state.selectionActionInstantApply = null;
    if (els.instantApplyToggle) els.instantApplyToggle.checked = state.instantApply;
  }
  document.body.classList.remove('selection-action', 'selection-action-graph', 'selection-action-modifier');
  applyUiState();
  setStatus('Selection action canceled.');
}

function applySelectedSlope(mode) {
  const indexes = selectedSampleIndexes().filter(canEditSampleIndex);
  const samples = (curveSamples(state.active) || []).map((sample) => ({ ...sample }));
  if (!indexes.length || !samples.length) return;
  pushUndo();
  if (mode === 'smooth' && samples.length === 2 && indexes.includes(0) && indexes.includes(1)) {
    samples[0].hOutT = Number((samples[0].t + (samples[1].t - samples[0].t) * 0.36).toFixed(5));
    samples[0].hOutV = Number(samples[0].v.toFixed(5));
    samples[0].mOut = 0;
    samples[0].m = undefined;
    samples[0].generatedFromBezier = false;
    samples[1].hInT = Number((samples[0].t + (samples[1].t - samples[0].t) * 0.64).toFixed(5));
    samples[1].hInV = Number(samples[1].v.toFixed(5));
    samples[1].mIn = 0;
    samples[1].m = undefined;
    samples[1].generatedFromBezier = false;
    state.active.generatedFromBezier = false;
    updateAdvancedPanel();
    commitActiveSamples(samples, { preserveRaw: state.activeEdit });
    markLocalGraphEdit();
    drawCurve(els.curveCanvas, state.active);
    setStatus('Selected keyframes smoothed.');
    scheduleInstantApply();
    return;
  }
  const segmentSlope = (left, right) => {
    if (!left || !right) return 0;
    return (right.v - left.v) / Math.max(0.0001, right.t - left.t);
  };
  for (const index of indexes) {
    const prev = samples[index - 1];
    const cur = samples[index];
    const next = samples[index + 1];
    if (!cur) continue;
    if (mode === 'linear') {
      cur.mIn = prev ? Number(segmentSlope(prev, cur).toFixed(5)) : undefined;
      cur.mOut = next ? Number(segmentSlope(cur, next).toFixed(5)) : undefined;
    } else {
      const left = prev ? (cur.v - prev.v) / Math.max(0.0001, cur.t - prev.t) : null;
      const right = next ? (next.v - cur.v) / Math.max(0.0001, next.t - cur.t) : null;
      const slope = left !== null && right !== null ? (left + right) / 2 : (left ?? right ?? 0);
      cur.mIn = Number(slope.toFixed(5));
      cur.mOut = Number(slope.toFixed(5));
    }
    cur.m = undefined;
    cur.generatedFromBezier = false;
    cur.hInT = undefined;
    cur.hInV = undefined;
    cur.hOutT = undefined;
    cur.hOutV = undefined;
  }
  state.active.generatedFromBezier = false;
  commitActiveSamples(samples, { preserveRaw: state.activeEdit });
  markLocalGraphEdit();
  updateAdvancedPanel();
  drawCurve(els.curveCanvas, state.active);
  setStatus(mode === 'linear' ? 'Selected keyframes set to linear.' : 'Selected keyframes smoothed.');
  scheduleInstantApply();
}

function applySimpleCurveKey(mode) {
  if (curveSamples(state.active)) return false;
  pushUndo();
  if (mode === 'linear') {
    Object.assign(state.active, { x1: 1 / 3, y1: 1 / 3, x2: 2 / 3, y2: 2 / 3, linear: true });
  } else {
    Object.assign(state.active, { x1: 0.22, y1: 0.1, x2: 0.78, y2: 0.9, linear: false });
  }
  state.active.locked = false;
  markLocalGraphEdit();
  drawCurve(els.curveCanvas, state.active);
  scheduleInstantApply();
  return true;
}

function graphFromReadMessage(message) {
  const text = String(message || '');
  if (!text.startsWith('GRAPH##')) return null;
  const body = text.slice('GRAPH##'.length);
  const nameEnd = body.indexOf('##');
  if (nameEnd < 0) return null;
  const name = body.slice(0, nameEnd);
  let rest = body.slice(nameEnd + 2);
  const metaEnd = rest.indexOf('##');
  if (metaEnd < 0) return null;
  const metaText = rest.slice(0, metaEnd);
  rest = rest.slice(metaEnd + 2);
  let targetMeta = '';
  let targetsMeta = '';
  if (rest.startsWith('TARGET##')) {
    rest = rest.slice('TARGET##'.length);
    const targetEnd = rest.indexOf('##');
    if (targetEnd >= 0) {
      targetMeta = rest.slice(0, targetEnd);
      rest = rest.slice(targetEnd + 2);
      if (rest.startsWith('TARGETS##')) {
        rest = rest.slice('TARGETS##'.length);
        const targetsEnd = rest.indexOf('##');
        if (targetsEnd >= 0) {
          targetsMeta = rest.slice(0, targetsEnd);
          rest = rest.slice(targetsEnd + 2);
        }
      }
    }
  }
  const rowsText = rest;
  const meta = metaText.split(',').map(Number);
  const rows = rowsText.split(';')
    .map((row) => row.split(',').map(Number))
    .filter((values) => values.length >= 2 && Number.isFinite(values[0]) && Number.isFinite(values[1]));
  if (rows.length < 2) return null;
  const firstTime = rows[0][0];
  const lastTime = rows[rows.length - 1][0];
  const firstValue = rows[0][1];
  const lastValue = rows[rows.length - 1][1];
  const valueDelta = Math.abs(lastValue - firstValue) < 0.0001 ? 1 : lastValue - firstValue;
  const compStart = Number.isFinite(meta[0]) ? meta[0] : firstTime;
  const compEnd = Number.isFinite(meta[1]) ? meta[1] : lastTime;
  const compNow = Number.isFinite(meta[2]) ? meta[2] : compStart;
  const compDuration = Math.max(0.0001, compEnd - compStart);
  const targetBits = targetMeta ? targetMeta.split(',') : [];
  const samples = rows.map((row) => {
    const t = clamp((row[0] - compStart) / compDuration, 0, 1);
    const v = (row[1] - firstValue) / valueDelta;
    const sample = {
      t: Number(t.toFixed(5)),
      v: Number(v.toFixed(5)),
      rawTime: row[0],
      rawValue: row[1]
    };
    const lhx = Number(row[2]);
    const lhy = Number(row[3]);
    const rhx = Number(row[4]);
    const rhy = Number(row[5]);
    if (Number.isFinite(lhx) && Number.isFinite(lhy) && Math.abs(lhx) > 0.0001) {
      sample.hInT = Number(clamp((row[0] + lhx - compStart) / compDuration, -10, 10).toFixed(5));
      sample.hInV = Number(((row[1] + lhy - firstValue) / valueDelta).toFixed(5));
      sample.hInRawTime = Number((row[0] + lhx).toFixed(5));
      sample.hInRawValue = Number((row[1] + lhy).toFixed(5));
      sample.mIn = Number(((lhy * compDuration) / (lhx * valueDelta)).toFixed(5));
    }
    if (Number.isFinite(rhx) && Number.isFinite(rhy) && Math.abs(rhx) > 0.0001) {
      sample.hOutT = Number(clamp((row[0] + rhx - compStart) / compDuration, -10, 10).toFixed(5));
      sample.hOutV = Number(((row[1] + rhy - firstValue) / valueDelta).toFixed(5));
      sample.hOutRawTime = Number((row[0] + rhx).toFixed(5));
      sample.hOutRawValue = Number((row[1] + rhy).toFixed(5));
      sample.mOut = Number(((rhy * compDuration) / (rhx * valueDelta)).toFixed(5));
    }
    return sample;
  });
  return {
    id: `resolve-${Date.now()}`,
    name: name || 'Resolve spline',
    locked: false,
    sampled: true,
    overrideGraph: true,
    timeStart: compStart,
    timeEnd: compEnd,
    keyStart: firstTime,
    keyEnd: lastTime,
    valueStart: firstValue,
    valueEnd: lastValue,
    activeEditTargetKey: targetBits[0] || '',
    activeEditOwnerName: targetBits[1] || '',
    activeEditInputName: targetBits[2] || '',
    activeEditKeyCount: Number(targetBits[3]) || samples.length,
    activeEditNearestDistance: Number(targetBits[4]),
    activeEditIsPathDisplacement: targetBits[5] === '1',
    activeEditTargets: parseActiveEditTargets(targetsMeta),
    samples,
    applySamples: samples.map((sample) => ({ ...sample })),
    sampleCount: samples.length,
    x1: 1 / 3,
    y1: 1 / 3,
    x2: 2 / 3,
    y2: 2 / 3
  };
}

async function readResolveGraphNoAccept() {
  if (!window.flowAPI?.readSpline) return null;
  const payload = state.activeEditTargetKey ? { targetKey: state.activeEditTargetKey } : undefined;
  let result = await window.flowAPI.readSpline(payload);
  let graph = result.ok ? graphFromReadMessage(result.message) : null;
  if (graph && state.activeEditTargetKey && Array.isArray(graph.activeEditTargets)) {
    const stillExists = graph.activeEditTargets.some((target) => target.key === state.activeEditTargetKey);
    if (!stillExists) {
      result = await window.flowAPI.readSpline();
      graph = result.ok ? graphFromReadMessage(result.message) : null;
    }
  }
  return graph;
}

function graphSamplesMatch(expectedGraph, actualGraph, tolerance = 0.002) {
  const expected = curveSamples(expectedGraph) || [];
  const actual = curveSamples(actualGraph) || [];
  if (expected.length < 2 || expected.length !== actual.length) return false;
  const rawFields = ['rawTime', 'rawValue', 'hInRawTime', 'hInRawValue', 'hOutRawTime', 'hOutRawValue'];
  const expectedHasRaw = expected.some((sample) => Number.isFinite(Number(sample.rawTime)) || Number.isFinite(Number(sample.rawValue)));
  const fields = expectedHasRaw ? rawFields : ['t', 'v', 'hInT', 'hInV', 'hOutT', 'hOutV'];
  for (let index = 0; index < expected.length; index += 1) {
    for (const field of fields) {
      const a = Number(expected[index]?.[field]);
      const b = Number(actual[index]?.[field]);
      const aFinite = Number.isFinite(a);
      const bFinite = Number.isFinite(b);
      if (!aFinite) continue;
      if (!bFinite) return false;
      const fieldTolerance = field.toLowerCase().includes('time') ? 0.08 : tolerance;
      if (Math.abs(a - b) > fieldTolerance) return false;
    }
  }
  return true;
}

function graphTargetKey(graph) {
  return graph?.activeEditTargetKey || graph?.targetKey || graph?.name || '';
}

function sameGraphTarget(a, b) {
  if (!a || !b) return false;
  return graphTargetKey(a) === graphTargetKey(b);
}

function graphKeySummary(graph) {
  const samples = curveSamples(graph) || [];
  return samples.map((sample) => {
    const time = Number.isFinite(Number(sample.rawTime)) ? Math.round(Number(sample.rawTime) * 10) / 10 : Math.round(Number(sample.t || 0) * 10000) / 10000;
    const value = Number.isFinite(Number(sample.rawValue)) ? Math.round(Number(sample.rawValue) * 10000) / 10000 : Math.round(Number(sample.v || 0) * 10000) / 10000;
    return `${time}:${value}`;
  }).join('|');
}

function graphEffectiveDelta(a, b, steps = 96) {
  if (!a || !b) return Infinity;
  const aSamples = curveSamples(a) || [];
  const bSamples = curveSamples(b) || [];
  if (Math.abs(aSamples.length - bSamples.length) > 0) {
    const aKeys = graphKeySummary(a);
    const bKeys = graphKeySummary(b);
    if (aKeys !== bKeys) return Infinity;
  }
  const aRange = advancedValueRange(a);
  const bRange = advancedValueRange(b);
  const valueSpan = Math.max(0.0001, Math.abs(aRange.max - aRange.min), Math.abs(bRange.max - bRange.min));
  let maxDelta = 0;
  for (let index = 0; index <= steps; index += 1) {
    const t = index / steps;
    const av = displayValueForSample(a, curveSampleAtTime(a, t));
    const bv = displayValueForSample(b, curveSampleAtTime(b, t));
    if (!Number.isFinite(av) || !Number.isFinite(bv)) return Infinity;
    maxDelta = Math.max(maxDelta, Math.abs(av - bv));
  }
  return maxDelta / valueSpan;
}

function graphEffectivelySame(a, b) {
  if (!a || !b) return false;
  if (!sameGraphTarget(a, b)) return false;
  if (graphKeySummary(a) === graphKeySummary(b) && graphEffectiveDelta(a, b, 64) <= 0.006) return true;
  return graphEffectiveDelta(a, b, 128) <= 0.0035;
}

function clearResolveChangePrompt() {
  state.activeEditPendingResolveGraph = null;
  state.activeEditPendingResolveSignature = null;
  els.resolveChangePrompt?.classList.add('hidden');
}

function showResolveChangePrompt(graph, signature) {
  if (!graph) return;
  state.activeEditResolveGraph = clonePreset(graph);
  state.activeEditPendingResolveGraph = clonePreset(graph);
  state.activeEditPendingResolveSignature = signature || graphSignature(graph);
  els.resolveChangePrompt?.classList.remove('hidden');
  drawCurve(els.curveCanvas, state.active);
}

function acceptPendingResolveGraph() {
  const graph = state.activeEditPendingResolveGraph;
  if (!graph) return;
  const signature = state.activeEditPendingResolveSignature || graphSignature(graph);
  clearResolveChangePrompt();
  acceptResolveGraph(graph, signature);
  setStatus('Updated from Resolve.');
}

async function readActiveResolveSpline(options = {}) {
  if (!window.flowAPI?.readSpline) return false;
  if (!state.activeEdit && !options.force) return false;
  const token = state.activeEditModeToken;
  const now = Date.now();
  const hasPendingApply = Boolean(state.activeEditPendingApplySignature);
  const readBlocked = state.applying || state.selectedModifier;
  const localProtected = !hasPendingApply && (state.localGraphDirty || state.activeEditLocalOwner || now < (state.localEditUntil || 0));
  if (!options.force && readBlocked) return true;
  if (!options.force && options.quiet && now - Number(readActiveResolveSpline.lastReadAt || 0) < 250) return true;
  readActiveResolveSpline.lastReadAt = now;
  const payload = state.activeEditTargetKey ? { targetKey: state.activeEditTargetKey } : undefined;
  let result = await window.flowAPI.readSpline(payload);
  if ((!state.activeEdit && !options.force) || token !== state.activeEditModeToken) return false;
  let graph = result.ok ? graphFromReadMessage(result.message) : null;
  if (graph && state.activeEditTargetKey && Array.isArray(graph.activeEditTargets)) {
    const stillExists = graph.activeEditTargets.some((target) => target.key === state.activeEditTargetKey);
    if (!stillExists) {
      state.activeEditTargetKey = '';
      result = await window.flowAPI.readSpline();
      if ((!state.activeEdit && !options.force) || token !== state.activeEditModeToken) return false;
      graph = result.ok ? graphFromReadMessage(result.message) : null;
    }
  }
  if (!graph) {
    if (!options.quiet) {
      setStatus(state.activeEdit ? 'Active Freeform waiting for a selected animated spline.' : (result.message || 'Could not read selected Resolve spline.'));
      if (!state.activeEdit) showToast('Read failed');
    }
    if (state.activeEdit) {
      state.activeEditTarget = null;
      state.activeEditTargetKey = '';
      state.activeEditTargets = [];
      state.activeEditSignature = null;
      state.lastResolveSignature = null;
    }
    return false;
  }
  const previousTarget = state.activeEditTarget;
  const previousTargetKey = state.activeEditTargetKey;
  const signature = graphSignature(graph);
  const shapeSignature = graphShapeSignature(graph);
  const sameTarget = previousTargetKey
    ? previousTargetKey === (graph.activeEditTargetKey || '')
    : previousTarget === graph.name;
  if (sameTarget) {
    state.activeEditResolveGraph = clonePreset(graph);
    setFreeformSuspended(Boolean(graph.activeEditIsPathDisplacement), graph.activeEditIsPathDisplacement ? 'path' : '');
  }
  if (sameTarget && state.activeEditPendingApplySignature) {
    if (signature === state.activeEditPendingApplySignature || shapeSignature === state.activeEditPendingApplySignature || graphSamplesMatch(state.active, graph)) {
      state.activeEditSignature = signature;
      state.lastResolveSignature = signature;
      state.activeEditPendingApplySignature = null;
      state.activeEditPendingApplyAt = 0;
      state.activeEditLocalOwner = false;
      state.activeEditDirtySource = 'none';
      state.localGraphDirty = false;
      state.localEditUntil = 0;
    } else if (Date.now() - Number(state.activeEditPendingApplyAt || 0) > 1600) {
      state.activeEditRejectedSignature = signature;
      setStatus('Fusion has not accepted the Freeform edit yet.');
    }
    return true;
  }
  if (sameTarget) {
    if (state.activeEditAcceptedGraph && graphEffectivelySame(graph, state.activeEditAcceptedGraph)) {
      if (state.activeEditPendingResolveGraph && graphEffectivelySame(graph, state.activeEditAcceptedGraph)) clearResolveChangePrompt();
      drawCurve(els.curveCanvas, state.active);
      return true;
    }
    if (graphEffectivelySame(graph, state.active)) {
      clearResolveChangePrompt();
      if (!localProtected) {
        state.activeEditSignature = signature;
        state.lastResolveSignature = signature;
        state.activeEditAcceptedGraph = clonePreset(graph);
      }
      drawCurve(els.curveCanvas, state.active);
      return true;
    }
    showResolveChangePrompt(graph, signature);
    return true;
  }
  if (options.quiet && sameTarget && state.activeEditSignature === signature) return true;
  acceptResolveGraph(graph, signature);
  const targetLabel = graph.activeEditOwnerName
    ? `${graph.activeEditOwnerName}${graph.activeEditInputName ? `.${graph.activeEditInputName}` : ''}`
    : graph.name;
  const message = `Active Freeform: ${targetLabel}`;
  setStatus(message);
  if (!options.quiet || previousTarget !== graph.name) showToast(message);
  return true;
}

function deletePreset(id) {
  const preset = state.presets.find((item) => item.id === id);
  if (!preset || preset.locked) return;
  state.presets = state.presets.filter((item) => item.id !== id);
  state.assignedIds = state.assignedIds.filter((assignedId) => assignedId !== id);
  state.galleries[state.galleryIndex].presets = state.presets;
  if (state.active.id === id) setActivePreset(DEFAULT_PRESETS[0]);
  saveCustomPresets();
  saveAssignedPresets();
  renderGallery();
  showToast('Graph deleted');
}

function toggleAssignedPreset(preset, sourceEl) {
  const existing = state.assignedIds.indexOf(preset.id);
  if (existing >= 0) {
    state.assignedIds.splice(existing, 1);
    showToast(`${preset.name} unassigned`);
  } else {
    if (state.assignedIds.length >= 8) {
      showToast('Eight wheel slots max');
      return;
    }
    state.assignedIds.push(preset.id);
    showToast(`${preset.name} assigned`);
    if (state.desktopNotify) window.flowAPI.notify('ekFlow', `${preset.name} assigned to quick wheel.`, 'success');
    showAssignBurst(sourceEl);
  }
  saveAssignedPresets();
  renderGallery();
  renderWheel();
  updateCollapsedDetail();
}

function showAssignBurst(sourceEl) {
  if (!sourceEl) return;
  const tileStar = document.createElement('span');
  tileStar.className = 'tile-star-pop';
  tileStar.textContent = '\u2605';
  sourceEl.appendChild(tileStar);
  setTimeout(() => tileStar.remove(), 820);
  if (!els.assignBurst) return;
  const rect = sourceEl.getBoundingClientRect();
  els.assignBurst.style.left = `${rect.left + rect.width / 2}px`;
  els.assignBurst.style.top = `${rect.top + rect.height / 2}px`;
  els.assignBurst.classList.remove('hidden', 'pop');
  void els.assignBurst.offsetWidth;
  els.assignBurst.classList.add('pop');
  setTimeout(() => els.assignBurst.classList.add('hidden'), 620);
}

function savePreset() {
  const forceNew = state.active.modifierDraft || state.active.modifierType || state.active.locked;
  const preset = stripResolveValuesFromGraph({
    ...state.active,
    id: forceNew ? `custom-${Date.now()}-${Math.random().toString(16).slice(2)}` : state.active.id,
    locked: false,
    modifierDraft: false,
    name: els.presetName.value || 'Custom'
  });
  const index = state.presets.findIndex((item) => item.id === preset.id);
  if (index >= 0 && !state.presets[index].locked) state.presets[index] = preset;
  else state.presets.push(preset);
  state.galleries[state.galleryIndex].presets = state.presets;
  saveCustomPresets();
  setActivePreset(preset);
  showToast('Graph saved');
}

function zoomEditor(delta) {
  state.editorZoom = clamp(state.editorZoom * delta, 0.2, 12);
  applyUiState();
}

function switchGallery(delta) {
  const next = state.galleryIndex + delta;
  if (next < 0) return;
  if (next >= state.galleries.length) {
    state.galleries.push({ id: `gallery-${Date.now()}`, name: `Gallery ${state.galleries.length + 1}`, presets: [] });
  }
  state.galleryIndex = next;
  syncActiveGallery();
  state.active = state.presets[0] ? { ...state.presets[0] } : { ...DEFAULT_PRESETS[0], locked: false, id: `custom-${Date.now()}`, name: 'New Linear' };
  saveCustomPresets();
  applyUiState();
  renderGallery();
  setActivePreset(state.active);
}

function resetLayout() {
  state.editorOpen = true;
  state.historyOpen = false;
  state.compactMode = false;
  state.compactReturnState = null;
  state.compactPage = 0;
  state.editorZoom = 1;
  state.editorScaleX = 1;
  state.editorScaleY = 1;
  state.galleryWidth = 258;
  state.historyWidth = 240;
  state.flowFloat = { x: 12, y: 92 };
  state.layoutOrder = ['gallery', 'editor', 'history'];
  window.windowAPI.resetBounds();
  applyUiState();
  scheduleLayoutResize();
  showToast('Layout reset');
}

async function exportGallery() {
  const graph = stripResolveValuesFromGraph({ ...state.active, locked: false });
  const payload = JSON.stringify({
    app: 'ekFlow',
    version: 1,
    graph
  }, null, 2);
  const safeName = `${(graph.name || 'graph').replace(/[^a-z0-9_-]+/gi, '_')}.ekflow.json`;
  const result = await window.flowAPI.exportGraph(payload, safeName);
  setStatus(result.message || (result.ok ? 'Graph exported.' : 'Export canceled.'));
  if (result.ok) showToast('Graph exported');
}

async function batchExportGallery() {
  syncActiveGallery();
  const graphs = state.presets
    .filter((preset) => preset && ((Array.isArray(preset.samples) && preset.samples.length > 1) || (Number.isFinite(Number(preset.x1)) && Number.isFinite(Number(preset.y1)) && Number.isFinite(Number(preset.x2)) && Number.isFinite(Number(preset.y2)))))
    .map((preset) => stripResolveValuesFromGraph({ ...preset, locked: false }));
  const result = await window.flowAPI.exportGraphsBatch(JSON.stringify(graphs));
  setStatus(result.message || (result.ok ? 'Presets exported.' : 'Batch export canceled.'));
  if (result.ok) showToast(result.message || 'Presets exported');
}

async function importGallery() {
  const result = await window.flowAPI.importGraph();
  if (!result.ok) {
    setStatus(result.message || 'Import canceled.');
    return;
  }
  try {
    const graphs = [];
    for (const file of result.files || []) {
      const parsed = JSON.parse(file.data);
      if (parsed.graph) graphs.push(parsed.graph);
      else if (parsed.x1 !== undefined || Array.isArray(parsed.samples)) graphs.push(parsed);
    }
    const imported = graphs
      .filter((preset) => (Array.isArray(preset.samples) && preset.samples.length > 1) || (Number.isFinite(Number(preset.x1)) && Number.isFinite(Number(preset.y1)) && Number.isFinite(Number(preset.x2)) && Number.isFinite(Number(preset.y2))))
      .map((preset) => ({
        ...preset,
        id: `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        locked: false,
        name: preset.name || 'Imported'
      }));
    state.presets.push(...imported);
    state.galleries[state.galleryIndex].presets = state.presets;
    saveCustomPresets();
    renderGallery();
    setStatus(`Imported ${imported.length} graph${imported.length === 1 ? '' : 's'}.`);
    showToast('Gallery imported');
  } catch (error) {
    setStatus(`Import failed: ${error.message}`);
    document.body.classList.add('apply-failed');
    setTimeout(() => document.body.classList.remove('apply-failed'), 520);
  }
}

async function applyPresetWithMode(preset, mode = state.mode, options = {}) {
  if (state.applying) {
    if (options.silentSuccess) state.instantApplyQueued = true;
    return;
  }
  state.applying = true;
  document.body.classList.add('applying');
  let ok = false;
  let target = { ...clonePreset(preset), name: preset.name || 'Graph' };
  const selectionApply = Boolean(state.selectionAction);
  const selectionGraphApply = state.selectionAction?.type === 'graph';
  const freeformApply = freeformEditingEnabled() && !selectionApply;
  if (!freeformApply) target = stripResolveValuesFromGraph(target);
  if (freeformApply) {
    target.activeEditApply = true;
    target.overrideGraph = true;
    if (state.activeEditTargetKey) target.targetKey = state.activeEditTargetKey;
  }
  target.autoResizeFusion = state.autoResizeFusion;
  target.modifierActive = Boolean(state.selectedModifier && target.modifierType);
  if (!freeformApply && target.generatedFromBezier && Array.isArray(target.samples) && target.samples.length === 2) {
    delete target.samples;
    delete target.applySamples;
    delete target.sampled;
    delete target.overrideGraph;
    delete target.generatedFromBezier;
  }
  if (Array.isArray(target.samples) && target.samples.length > 1 && (!Array.isArray(target.applySamples) || target.applySamples.length < 2)) {
    const count = Number(target.sampleCount || els.modifierKeyframes?.value || 12);
    target.applySamples = resampleSamples(target.samples, count);
    target.sampleCount = target.applySamples.length;
  }
  if (state.selectionAction) {
    target.lockedRangeActive = true;
    target.rangeStart = state.selectionAction.rangeStart;
    target.rangeEnd = state.selectionAction.rangeEnd;
    target.rangeStartIndex = state.selectionAction.rangeStartIndex;
    target.rangeEndIndex = state.selectionAction.rangeEndIndex;
    target.selectionActionType = state.selectionAction.type;
    if (state.selectionAction.type === 'modifier') {
      if (state.activeEditTargetKey) target.targetKey = state.activeEditTargetKey;
      target.activeEditApply = false;
      target.overrideGraph = true;
      target.modifierActive = Boolean(target.modifierType || state.selectedModifier);
    } else {
      target = stripResolveValuesFromGraph(target);
      target.activeEditApply = false;
      target.modifierActive = false;
      target.overrideGraph = false;
      if (state.activeEditTargetKey) target.targetKey = state.activeEditTargetKey;
    }
  }
  target.overrideGraph = Boolean(target.overrideGraph && target.modifierActive);
  setStatus(`Applying ${target.name}...`);
  try {
    const applyMode = state.selectionAction ? 'all' : mode;
    const result = await window.flowAPI.applyPreset(target, applyMode);
    ok = Boolean(result.ok);
    setStatus(result.message || (result.ok ? 'Applied.' : 'Apply failed.'));
    if (result.ok) {
      if (freeformApply) {
        const expectedGraph = clonePreset(target);
        const signature = graphShapeSignature(expectedGraph);
        const previousResolveSignature = state.activeEditSignature || state.lastResolveSignature || '';
        state.activeEditPendingApplySignature = signature;
        state.activeEditPendingApplyAt = Date.now();
        state.activeEditLastLocalSignature = signature;
        state.activeEditLocalOwner = true;
        state.activeEditDirtySource = 'app';
        markLocalGraphEdit(10000);
        let readback = null;
        let readbackSignature = '';
        let readbackShape = '';
        let verified = false;
        for (const delay of [90, 180, 360]) {
          await wait(delay);
          readback = await readResolveGraphNoAccept();
          readbackSignature = readback ? graphSignature(readback) : '';
          readbackShape = readback ? graphShapeSignature(readback) : '';
          verified = Boolean(readback && (
            readbackShape === signature
            || readbackSignature === signature
            || graphSamplesMatch(expectedGraph, readback)
            || graphEffectivelySame(expectedGraph, readback)
            || (previousResolveSignature && readbackSignature && readbackSignature !== previousResolveSignature)
          ));
          if (verified) break;
        }
        if (verified) {
          state.activeEditSignature = readbackSignature || readbackShape || signature;
          state.lastResolveSignature = state.activeEditSignature;
          state.activeEditPendingApplySignature = null;
          state.activeEditPendingApplyAt = 0;
          state.activeEditLocalOwner = false;
          state.activeEditDirtySource = 'none';
          state.localGraphDirty = false;
          state.localEditUntil = 0;
          state.activeEditAcceptedGraph = readback ? clonePreset(readback) : clonePreset(expectedGraph);
          state.activeEditResolveGraph = readback ? clonePreset(readback) : clonePreset(expectedGraph);
          if (readback && !graphEffectivelySame(expectedGraph, readback)) {
            showResolveChangePrompt(readback, readbackSignature || readbackShape);
          } else {
            clearResolveChangePrompt();
            drawCurve(els.curveCanvas, state.active);
          }
          setStatus(result.message || 'Applied.');
        } else {
          ok = false;
          state.activeEditPendingApplySignature = signature;
          state.activeEditPendingApplyAt = Date.now();
          state.activeEditLocalOwner = true;
          state.activeEditDirtySource = 'app';
          state.localGraphDirty = true;
          state.localEditUntil = Date.now() + 10000;
          setStatus(readback ? 'Apply failed: Fusion rejected the Freeform write.' : 'Apply failed: could not verify the Freeform write.');
        }
      }
      if (ok && !options.silentSuccess) {
        playSound('success');
        els.applyButton.classList.remove('success-pop');
        void els.applyButton.offsetWidth;
        els.applyButton.classList.add('success-pop');
        document.body.classList.add('applied-flash');
        setTimeout(() => document.body.classList.remove('applied-flash'), 520);
        flashCollapsedPanel('success');
        showToast('Graph applied');
        if (state.desktopNotify) window.flowAPI.notify('ekFlow', 'Graph applied.', 'success');
      }
      if (ok && result.historyId) {
        state.history.unshift({
          id: `history-${Date.now()}`,
          historyId: result.historyId,
          name: target.name,
          mode,
          modeLabel: mode === 'all' ? 'All keys' : 'Playhead',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        state.history = state.history.slice(0, 20);
        saveHistory();
        renderHistory();
      }
      if (ok && state.selectionAction) {
        const shouldSync = state.selectionAction.type === 'graph' && state.activeEdit;
        await finishSelectionAction({ sync: shouldSync, statusText: 'Apply graph synced from Resolve.' });
      }
      if (!ok) {
        playSound('error');
        document.body.classList.add('apply-failed');
        setTimeout(() => document.body.classList.remove('apply-failed'), 520);
        flashCollapsedPanel('error');
        if (state.desktopNotify) {
          window.flowAPI.notify('Apply failed', 'Fusion rejected the Freeform write.', 'error');
        }
        showToast('Apply failed');
      }
    } else {
      playSound('error');
      document.body.classList.add('apply-failed');
      setTimeout(() => document.body.classList.remove('apply-failed'), 520);
      flashCollapsedPanel('error');
      if (state.desktopNotify) {
        window.flowAPI.notify('Apply failed', applyFailureMessage(result.message), 'error');
      }
      showToast(applyFailureMessage(result.message));
    }
  } finally {
    state.applying = false;
    document.body.classList.remove('applying');
    if (state.instantApplyQueued) {
      state.instantApplyQueued = false;
      setTimeout(() => applyActive({ silentSuccess: true }), 30);
    }
  }
  return ok;
}

async function applyActive(options = {}) {
  const applyingModifier = Boolean(state.selectedModifier);
  if (state.selectedModifier) {
    applyCurveModifier(state.selectedModifier);
  }
  state.active.name = els.presetName.value || state.active.name;
  const ok = await applyPresetWithMode(state.active, state.mode, options);
  if (ok && applyingModifier) {
    state.selectedModifier = null;
    state.modifierBase = null;
    state.active.modifierDraft = false;
    for (const button of document.querySelectorAll('[data-modifier]')) button.classList.remove('active');
    applyUiState();
  }
  return ok;
}

function scheduleInstantApply(delay = 180) {
  if (!state.instantApply) return;
  clearTimeout(scheduleInstantApply.timer);
  scheduleInstantApply.timer = setTimeout(() => {
    applyActive({ silentSuccess: true });
  }, delay);
}

async function applyFromShortcut() {
  const now = Date.now();
  if (now - state.lastShortcutAt < 250) return;
  state.lastShortcutAt = now;
  await applyActive();
}

function openWheel() {
  if (state.wheelOpen) return;
  state.wheelOpen = true;
  state.keyHoldTriggered = true;
  state.wheelMode = state.mode;
  window.flowAPI.showWheel(wheelPayload());
  document.body.classList.add('wheel-open');
}

function closeWheel() {
  state.wheelOpen = false;
  window.flowAPI.closeWheel();
  document.body.classList.remove('wheel-open');
}

function requestApplyKeyDown() {
  if (state.wheelOpen || state.wheelSelectionInFlight) return;
  window.flowAPI.keyDown?.(150);
}

function renderWheel() {
  if (!els.wheelSlots) return;
  const presets = assignedPresets();
  els.wheelSlots.innerHTML = '';
  for (let index = 0; index < 8; index += 1) {
    const preset = presets[index];
    const button = document.createElement('button');
    button.className = `wheel-slot ${preset ? '' : 'empty'}`;
    button.style.setProperty('--slot', String(index));
    button.title = preset ? preset.name : 'Empty wheel slot';
    if (preset) {
      const canvas = document.createElement('canvas');
      canvas.width = 92;
      canvas.height = 64;
      button.appendChild(canvas);
      button.addEventListener('click', () => {
        setActivePreset(preset);
      });
      requestAnimationFrame(() => drawCurve(canvas, preset, true));
    } else {
      const empty = document.createElement('span');
      empty.className = 'wheel-empty-label';
      empty.textContent = '+';
      button.appendChild(empty);
    }
    els.wheelSlots.appendChild(button);
  }
  els.wheelPlayhead.classList.toggle('active', state.wheelMode === 'playhead');
  els.wheelAll.classList.toggle('active', state.wheelMode === 'all');
}

async function refreshResolveStatus(silent = false) {
  if (state.resolveRefreshInFlight || state.applying) return;
  state.resolveRefreshInFlight = true;
  try {
    if (state.activeEdit) {
      await readActiveResolveSpline({ quiet: true });
      if (!state.activeEditTarget && !silent) setStatus('Active Freeform waiting for a selected animated spline.');
      return;
    }
    if (!window.flowAPI?.getStatus) return;
    const status = await window.flowAPI.getStatus();
    if (!silent && status && status.message) setStatus(status.message);
    else if (status?.message && !String(els.status.textContent || '').startsWith('Applying')) setStatus(status.message);
  } finally {
    state.resolveRefreshInFlight = false;
  }
}

function clampFlowFloat() {
  state.flowFloat = {
    x: clamp(state.flowFloat.x, 4, Math.max(4, window.innerWidth - 112)),
    y: clamp(state.flowFloat.y, 46, Math.max(46, window.innerHeight - 64))
  };
}

async function expandFlow() {
  clearTimeout(expandFlow.timer);
  if (!state.flowCollapsed) return;
  await setCollapsedDrawerOpen(false);
  await window.windowAPI.restoreFromPanel();
  applyUiState();
  scheduleLayoutResize();
  requestAnimationFrame(() => {
    drawCurve(els.curveCanvas, state.active);
    renderGallery();
  });
}

async function collapseFlow() {
  if (state.flowCollapsed) return;
  state.collapsedDrawerOpen = false;
  state.collapsedPickerOpen = false;
  applyUiState();
  updateCollapsedDetail();
  await window.windowAPI.collapseToPanel();
}

function deleteCurrentGallery() {
  if (state.galleryIndex === 0) {
    showToast('Default gallery is locked');
    return;
  }
  state.galleries.splice(state.galleryIndex, 1);
  state.galleryIndex = clamp(state.galleryIndex - 1, 0, state.galleries.length - 1);
  syncActiveGallery();
  state.active = state.presets[0] ? { ...state.presets[0] } : { ...DEFAULT_PRESETS[0] };
  saveCustomPresets();
  applyUiState();
  renderGallery();
  setActivePreset(state.active);
  showToast('Gallery deleted');
}

function bindFlowCollapsedHandle() {
  let drag = null;
  let moved = false;
  let raf = 0;
  let moveInFlight = false;

  const step = () => {
    if (!drag) {
      raf = 0;
      return;
    }

    drag.currentX += (drag.targetX - drag.currentX) * 0.24;
    drag.currentY += (drag.targetY - drag.currentY) * 0.24;
    const dx = Math.round(drag.currentX - drag.sentX);
    const dy = Math.round(drag.currentY - drag.sentY);

    if ((dx || dy) && !moveInFlight) {
      drag.sentX += dx;
      drag.sentY += dy;
      moveInFlight = true;
      window.windowAPI.moveBy(dx, dy).finally(() => {
        moveInFlight = false;
      });
    }

    const settling = Math.abs(drag.targetX - drag.currentX) + Math.abs(drag.targetY - drag.currentY);
    if (drag.active || settling > 0.8) {
      raf = requestAnimationFrame(step);
    } else {
      raf = 0;
      drag = null;
    }
  };

  els.flowCollapsedHandle.addEventListener('pointerdown', (event) => {
    if (event.target.closest('#collapsedCloseButton, #collapsedDrawerToggle, #collapsedDrawer')) return;
    drag = {
      x: event.screenX,
      y: event.screenY,
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      sentX: 0,
      sentY: 0,
      active: true
    };
    moved = false;
    els.flowCollapsedHandle.classList.add('dragging');
    els.flowCollapsedHandle.setPointerCapture(event.pointerId);
    if (!raf) raf = requestAnimationFrame(step);
  });

  els.flowCollapsedHandle.addEventListener('pointermove', (event) => {
    if (!drag) return;
    drag.targetX = event.screenX - drag.x;
    drag.targetY = event.screenY - drag.y;
    const total = Math.abs(drag.targetX) + Math.abs(drag.targetY);
    if (total > 4) moved = true;
  });

  const finishDrag = async () => {
    const shouldOpen = !moved;
    if (drag) drag.active = false;
    els.flowCollapsedHandle.classList.remove('dragging');
    if (shouldOpen) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      drag = null;
      await expandFlow();
    }
  };

  els.flowCollapsedHandle.addEventListener('pointerup', finishDrag);
  els.flowCollapsedHandle.addEventListener('pointercancel', () => {
    if (drag) drag.active = false;
    els.flowCollapsedHandle.classList.remove('dragging');
  });
}

function canvasPosition(event) {
  const rect = els.curveCanvas.getBoundingClientRect();
  const scaleX = els.curveCanvas.width / rect.width;
  const scaleY = els.curveCanvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
}

function gridResizeHit(pos) {
  if (!advancedMode()) return null;
  const r = getRect(els.curveCanvas);
  const edge = 9 * (window.devicePixelRatio || 1);
  const withinY = pos.y >= r.y - edge && pos.y <= r.y + r.h + edge;
  const withinX = pos.x >= r.x - edge && pos.x <= r.x + r.w + edge;
  if (withinY && Math.abs(pos.x - r.x) <= edge) return 'left';
  if (withinY && Math.abs(pos.x - (r.x + r.w)) <= edge) return 'right';
  if (withinX && Math.abs(pos.y - r.y) <= edge) return 'top';
  if (withinX && Math.abs(pos.y - (r.y + r.h)) <= edge) return 'bottom';
  return null;
}

function resizeGraphGrid(edge, pos) {
  if (!state.dragging?.gridResize) return;
  const dx = pos.x - state.dragging.startX;
  const dy = pos.y - state.dragging.startY;
  const base = state.dragging.baseRect;
  if (edge === 'left' || edge === 'right') {
    const signed = edge === 'right' ? dx : -dx;
    const nextScale = clamp(state.dragging.startScaleX + signed / Math.max(80, base.w), 0.35, 8);
    const newWidth = base.w * (nextScale / Math.max(0.0001, state.dragging.startScaleX));
    const delta = (newWidth - base.w) / 2;
    state.editorScaleX = nextScale;
    state.editorPan.x = state.dragging.startPanX + (edge === 'right' ? delta : -delta);
  } else {
    const signed = edge === 'bottom' ? dy : -dy;
    const nextScale = clamp(state.dragging.startScaleY + signed / Math.max(80, base.h), 0.35, 8);
    const newHeight = base.h * (nextScale / Math.max(0.0001, state.dragging.startScaleY));
    const delta = (newHeight - base.h) / 2;
    state.editorScaleY = nextScale;
    state.editorPan.y = state.dragging.startPanY + (edge === 'bottom' ? delta : -delta);
  }
  drawCurve(els.curveCanvas, state.active);
}

function nearestHandle(pos) {
  const p1 = pointFor(els.curveCanvas, state.active.x1, state.active.y1);
  const p2 = pointFor(els.curveCanvas, state.active.x2, state.active.y2);
  const d1 = (pos.x - p1.x) ** 2 + (pos.y - p1.y) ** 2;
  const d2 = (pos.x - p2.x) ** 2 + (pos.y - p2.y) ** 2;
  return d1 <= d2 ? 1 : 2;
}

function isNearHandle(pos) {
  const p1 = pointFor(els.curveCanvas, state.active.x1, state.active.y1);
  const p2 = pointFor(els.curveCanvas, state.active.x2, state.active.y2);
  const radius = 22 * (window.devicePixelRatio || 1);
  const limit = radius ** 2;
  const d1 = (pos.x - p1.x) ** 2 + (pos.y - p1.y) ** 2;
  const d2 = (pos.x - p2.x) ** 2 + (pos.y - p2.y) ** 2;
  return d1 <= limit || d2 <= limit;
}

function updateHandle(pos) {
  if (!state.activeEdit && isModifierGraph(state.active)) return;
  const r = getRect(els.curveCanvas);
  const x = (pos.x - r.x) / r.w;
  const y = 1 - (pos.y - r.y) / r.h;
  if (Array.isArray(state.active.samples)) {
    delete state.active.samples;
    state.active.sampled = false;
  }
  if (state.dragging === 1) {
    state.active.x1 = x;
    state.active.y1 = y;
    if (!state.simpleHandleCtrlKey) {
      state.active.x2 = 1 - x;
      state.active.y2 = 1 - y;
    }
  } else if (state.dragging === 2) {
    state.active.x2 = x;
    state.active.y2 = y;
    if (!state.simpleHandleCtrlKey) {
      state.active.x1 = 1 - x;
      state.active.y1 = 1 - y;
    }
  }
  state.active.linear = false;
  state.active.locked = false;
  markLocalGraphEdit();
  drawCurve(els.curveCanvas, state.active);
  scheduleInstantApply();
}

function bind() {
  for (const id of [
    'app',
    'presetGrid', 'curveCanvas', 'graphCursor', 'graphContextMarker', 'graphContextMenu', 'editValueDialog', 'editValueClose', 'editValueFrame', 'editValueY', 'editValueApply', 'status', 'activeName', 'presetName', 'modePlayhead', 'modeAll',
    'applyButton', 'saveButton', 'settingsButton', 'compactToggle', 'editorView', 'settingsView', 'backButton',
    'activeEditToggle', 'instantApplyToggle', 'advancedEditButton', 'freeformBadge', 'syncStatus', 'editorHoverReadout',
    'advancedPanel', 'advancedTarget', 'advancedTargetDebug', 'advancedFrameInput', 'advancedValueInput',
    'modifiersButton', 'modifiersPanel', 'modifiersCloseButton', 'modifierStrength', 'modifierStrengthLabel',
    'modifierStrengthHint', 'modifierCycles', 'modifierCyclesLabel', 'modifierCyclesHint',
    'modifierBias', 'modifierBiasLabel', 'modifierBiasHint', 'modifierDecay', 'modifierDecayLabel',
    'modifierDecayHint', 'modifierKeyframes', 'modifierKeyframesLabel', 'modifierKeyframesHint', 'modifierOverride', 'modifierClamp', 'modifierApplyButton', 'modifierPendingBar', 'modifierPendingName', 'modifierPendingApply', 'modifierPendingClear', 'modifierGraphNotice', 'settingsHostPanel',
    'resolveChangePrompt', 'resolveChangeUpdate', 'freeformSuspendNotice', 'selectionActionNotice', 'advancedSuspendOverlay',
    'applyBehavior', 'applyKey', 'hotkeyApplyInput', 'lockKeyInput', 'smoothKeyInput', 'linearKeyInput', 'deleteKeyInput', 'toast', 'editorPanel', 'historyPanel', 'historyList', 'cancelActionButton',
    'historyToggle', 'editorToggle', 'addPresetButton', 'clearHistoryButton', 'historyCloseButton',
    'minimizeButton', 'maximizeButton', 'closeButton', 'hoverInfo', 'galleryPanel', 'flashHomePanel', 'flashHomeButton', 'flashModuleList', 'homeModulesList', 'homeModuleCount',
    'moduleHostPanel', 'moduleHostTitle', 'moduleHostFrame', 'moduleHostFallback', 'moduleHostBackButton',
    'homeStoreButton', 'storeModal', 'storeClose', 'storeModulesList', 'storeCatalogStatus',
    'homeFlashSettingsButton', 'flashSettingsModal', 'flashSettingsClose', 'flashDiagnosticsList', 'flashRepairButton', 'flashCopyDiagnosticsButton', 'flashOpenLogsButton', 'flashResetShellButton', 'flashSettingsStatus',
    'flashUpdateStatus', 'flashCheckUpdateButton', 'flashDownloadUpdateButton', 'flashOpenUpdateButton',
    'moduleConfigModal', 'moduleConfigClose', 'moduleConfigTitle', 'moduleConfigSubtitle', 'moduleInstallToggle', 'moduleInstallTitle', 'moduleInstallSubtitle', 'moduleRepairButton', 'moduleRemoveButton',
    'resetEditorButton', 'centerGraphButton', 'exportGalleryButton', 'importGalleryButton', 'batchExportButton', 'settingsDescription',
    'editorResizeHandle', 'historyResizeHandle', 'galleryNameInput', 'prevGalleryButton',
    'nextGalleryButton', 'desktopNotify', 'globalApplyHotkey', 'resetLayoutButton', 'importGraphButton', 'exportGraphButton',
    'autoLaunch', 'debugLogging', 'openLogsButton', 'appShellStatus', 'readSplinePageButton',
    'themeSelect', 'customThemeAccent', 'customThemeAccentButton', 'customThemeFont', 'customThemeRadius',
    'customThemeBackground', 'customThemeBackgroundName', 'customThemeBackgroundOpacity', 'customThemeBackgroundColors', 'customThemeBlur', 'customThemeClearBackground',
    'customThemeHeader', 'customThemeHeaderName', 'customThemeHeaderOpacity', 'customThemeHeaderBlur', 'customThemeClearHeader',
    'imageEditorModal', 'imageEditorTitle', 'imageEditorClose', 'imageEditorStage', 'imageEditorImage', 'imageFitCover', 'imageFitContain', 'imageFitStretch',
    'imageEditorZoom', 'imageEditorOpacity', 'imageEditorBlur', 'imageEditorCancel', 'imageEditorApply',
    'flowCollapsedHandle', 'deleteGalleryButton', 'collapsedDetail', 'collapsedCloseButton', 'galleryIndexLabel', 'editLockBanner', 'editLockText', 'editLockClear',
    'collapsedDrawerToggle', 'collapsedDrawer', 'collapsedSelectedNodes', 'collapsedCopySpline', 'collapsedPasteSpline',
    'collapsedGraphPreview', 'collapsedGraphCanvas', 'collapsedGraphName', 'collapsedPicker',
    'collapsedModePlayhead', 'collapsedModeAll',
    'compactEditorModePlayhead', 'compactEditorModeAll',
    'soundEnabled', 'autoResizeFusion', 'closeBehavior', 'quickWheel', 'wheelSlots', 'wheelPlayhead', 'wheelAll', 'undoButton', 'redoButton',
    'assignBurst', 'compactDots', 'wheelCenter', 'wheelOpenMain'
  ]) {
    els[id] = document.getElementById(id);
  }
  if (els.graphContextMenu && els.graphContextMenu.parentElement !== document.body) {
    document.body.appendChild(els.graphContextMenu);
  }

  els.modePlayhead.addEventListener('click', () => {
    setApplyMode('playhead');
  });
  els.flashHomeButton?.addEventListener('click', () => setFlashPage('home'));
  els.moduleHostBackButton?.addEventListener('click', () => setFlashPage('home'));
  els.flashModuleList?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-module-open]');
    if (button) openFlashModule(button.dataset.moduleOpen);
  });
  els.homeModulesList?.addEventListener('click', (event) => {
    const configure = event.target.closest('[data-module-configure]');
    const toggle = event.target.closest('[data-module-toggle]');
    const store = event.target.closest('[data-module-store]');
    if (configure) openModuleConfig(configure.dataset.moduleConfigure);
    else if (toggle) toggleFlashModule(toggle.dataset.moduleToggle);
    else if (store) showToast(`${getFlashModule(store.dataset.moduleStore)?.name || 'Module'} store page coming soon`);
  });
  els.homeStoreButton?.addEventListener('click', openStore);
  els.storeClose?.addEventListener('click', closeStore);
  els.storeModal?.addEventListener('pointerdown', (event) => {
    if (event.target === els.storeModal) closeStore();
  });
  els.storeModulesList?.addEventListener('click', (event) => {
    const add = event.target.closest('[data-store-add]');
    const install = event.target.closest('[data-store-install]');
    const open = event.target.closest('[data-store-open]');
    if (add) addModuleToAccount(add.dataset.storeAdd);
    else if (install) installFlashModule(install.dataset.storeInstall);
    else if (open) {
      closeStore();
      openFlashModule(open.dataset.storeOpen);
    }
  });
  els.moduleConfigClose?.addEventListener('click', () => els.moduleConfigModal?.classList.add('hidden'));
  els.moduleConfigModal?.addEventListener('pointerdown', (event) => {
    if (event.target === els.moduleConfigModal) els.moduleConfigModal.classList.add('hidden');
  });
  els.homeFlashSettingsButton?.addEventListener('click', openFlashSettings);
  els.flashSettingsClose?.addEventListener('click', closeFlashSettings);
  els.flashSettingsModal?.addEventListener('pointerdown', (event) => {
    if (event.target === els.flashSettingsModal) closeFlashSettings();
  });
  els.flashRepairButton?.addEventListener('click', async () => {
    if (els.flashSettingsStatus) els.flashSettingsStatus.textContent = 'Repairing Resolve integration...';
    const result = await window.flowAPI?.repairIntegration?.();
    await refreshFlashDiagnostics();
    await refreshAppShellStatus();
    showToast(result?.message || (result?.ok ? 'Repair complete' : 'Repair failed'));
    if (els.flashSettingsStatus) els.flashSettingsStatus.textContent = result?.message || 'Repair finished.';
  });
  els.flashCopyDiagnosticsButton?.addEventListener('click', async () => {
    const result = await window.flowAPI?.copyDiagnostics?.();
    showToast(result?.message || 'Diagnostics copied');
    if (els.flashSettingsStatus) els.flashSettingsStatus.textContent = result?.message || 'Diagnostics copied.';
  });
  els.flashOpenLogsButton?.addEventListener('click', () => window.flowAPI.openLogs?.());
  els.flashCheckUpdateButton?.addEventListener('click', () => checkFlashUpdate());
  els.flashDownloadUpdateButton?.addEventListener('click', downloadFlashUpdate);
  els.flashOpenUpdateButton?.addEventListener('click', openDownloadedFlashUpdate);
  els.flashResetShellButton?.addEventListener('click', () => {
    state.moduleStates = {};
    state.flashPage = 'home';
    state.activeModuleId = 'ekflow';
    state.configModuleId = 'ekflow';
    renderFlashModules();
    saveSettings();
    applyUiState();
    showToast('Flash shell state reset');
    if (els.flashSettingsStatus) els.flashSettingsStatus.textContent = 'Flash shell state reset.';
  });
  els.moduleInstallToggle?.addEventListener('click', async () => {
    const module = flashModules().find((entry) => entry.id === state.configModuleId) || flashModules()[0];
    if (!module) return;
    if (!module.installed) {
      if (!module.owned) addModuleToAccount(module.id);
      await installFlashModule(module.id);
      return;
    }
    setModuleState(module.id, {
      owned: module.owned,
      installed: false,
      enabled: false,
      installedVersion: '',
      installedPath: ''
    });
    saveSettings();
    renderFlashModules();
    applyUiState();
    showToast(`${module.name} uninstalled`);
  });
  els.moduleRepairButton?.addEventListener('click', async () => {
    const result = await window.flowAPI?.repairIntegration?.();
    showToast(result?.message || `${getFlashModule(state.configModuleId)?.name || 'Module'} repair finished`);
    await refreshAppShellStatus();
  });
  els.moduleRemoveButton?.addEventListener('click', () => showToast(`${getFlashModule(state.configModuleId)?.name || 'Module'} removal coming soon`));
  els.modeAll.addEventListener('click', () => {
    setApplyMode('all');
  });
  els.collapsedModePlayhead.addEventListener('click', (event) => {
    event.stopPropagation();
    setApplyMode('playhead');
  });
  els.collapsedModeAll.addEventListener('click', (event) => {
    event.stopPropagation();
    setApplyMode('all');
  });
  els.compactEditorModePlayhead?.addEventListener('click', () => setApplyMode('playhead'));
  els.compactEditorModeAll?.addEventListener('click', () => setApplyMode('all'));
  els.editLockClear?.addEventListener('click', clearEditLock);
  els.resolveChangeUpdate?.addEventListener('click', acceptPendingResolveGraph);
  els.editValueClose?.addEventListener('click', closeEditValueDialog);
  els.editValueApply?.addEventListener('click', applyEditValueDialog);
  els.cancelActionButton?.addEventListener('click', cancelSelectionAction);
  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest?.('#graphContextMenu')) hideGraphContextMenu();
    if (!event.target.closest?.('.custom-select-trigger') && !event.target.closest?.('.custom-select-menu')) {
      closeCustomSelectMenus();
    }
    if (!event.target.closest?.('#customThemeAccentButton') && !event.target.closest?.('.custom-color-popover')) {
      closeColorPicker();
    }
  });
  window.flowAPI?.onGraphContextSelect?.((actionId) => {
    const action = state.graphContextActions.get(actionId);
    hideGraphContextMenu();
    if (typeof action === 'function') action();
  });
  els.applyButton.addEventListener('click', applyActive);
  els.modifiersButton.addEventListener('click', () => {
    state.modifiersOpen = !state.modifiersOpen;
    applyUiState();
    scheduleLayoutResize();
  });
  els.modifiersCloseButton.addEventListener('click', () => {
    state.modifiersOpen = false;
    applyUiState();
    scheduleLayoutResize();
  });
  setModifierControls(state.selectedModifier || 'bounce');
  updateModifierLabels(state.selectedModifier || 'bounce');
  const updateSelectedModifier = async (type, resetDefaults = false, forceApply = false) => {
    if (state.selectedModifier === type && !resetDefaults && !forceApply) {
      clearPendingModifier();
      return;
    }
    if (!state.selectedModifier) state.modifierBase = clonePreset(state.active);
    state.selectedModifier = type || state.selectedModifier || 'bounce';
    if (resetDefaults) setModifierControls(state.selectedModifier);
    for (const button of document.querySelectorAll('[data-modifier]')) {
      button.classList.toggle('active', button.dataset.modifier === state.selectedModifier);
    }
    if (state.modifierBase) state.active = clonePreset(state.modifierBase);
    pushUndo();
    applyCurveModifier(state.selectedModifier);
    applyUiState();
  };
  for (const button of document.querySelectorAll('[data-modifier]')) {
    button.addEventListener('click', () => updateSelectedModifier(button.dataset.modifier, state.selectedModifier !== button.dataset.modifier));
  }
  function bindScrubNumber(input, onChange) {
    if (!input) return;
    let scrub = null;
    const deferredInput = input === els.advancedFrameInput || input === els.advancedValueInput;
    const normalize = () => {
      const text = String(input.value || '').trim();
      if (!text || text === '-' || text === '.' || text === '-.' || !Number.isFinite(Number(text))) {
        updateAdvancedPanel();
        return false;
      }
      const step = Number(input.step || input.dataset.scrub || 1) || 1;
      const min = Number.isFinite(Number(input.min)) ? Number(input.min) : -Infinity;
      const max = Number.isFinite(Number(input.max)) ? Number(input.max) : Infinity;
      const digits = step < 1 ? Math.min(4, Math.max(0, Math.ceil(Math.abs(Math.log10(step))))) : 0;
      const value = clamp(Number(text), min, max);
      input.value = Number(value.toFixed(digits));
      return true;
    };
    if (deferredInput) {
      const commitIfUsableNumber = () => {
        const text = String(input.value || '').trim();
        if (!text || text === '-' || text === '.' || text === '-.') return;
        if (Number.isFinite(Number(text))) onChange();
      };
      input.addEventListener('pointerdown', (event) => event.stopPropagation());
    input.addEventListener('keydown', (event) => {
      event.stopPropagation();
      if (event.key === 'Enter') {
        event.preventDefault();
        commitIfUsableNumber();
        input.blur();
      }
    });
    input.addEventListener('change', () => {
      commitIfUsableNumber();
    });
      return;
    }
    input.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      scrub = {
        startX: event.clientX,
        value: Number(input.value || 0),
        moved: false
      };
      input.setPointerCapture(event.pointerId);
      input.classList.add('scrubbing');
    });
    input.addEventListener('pointermove', (event) => {
      if (!scrub) return;
      const step = Number(input.dataset.scrub || input.step || 1) || 1;
      const min = Number.isFinite(Number(input.min)) ? Number(input.min) : -Infinity;
      const max = Number.isFinite(Number(input.max)) ? Number(input.max) : Infinity;
      const digits = step < 1 ? Math.min(4, Math.max(0, Math.ceil(Math.abs(Math.log10(step))))) : 0;
      const delta = event.clientX - scrub.startX;
      if (Math.abs(delta) > 2) scrub.moved = true;
      const next = clamp(scrub.value + delta * step, min, max);
      input.value = Number(next.toFixed(digits));
      onChange();
    });
    const end = () => {
      if (!scrub) return;
      input.classList.remove('scrubbing');
      normalize();
      scrub = null;
      onChange();
    };
    input.addEventListener('pointerup', end);
    input.addEventListener('pointercancel', end);
    input.addEventListener('input', () => {
      normalize();
      onChange();
    });
    input.addEventListener('change', () => {
      normalize();
      onChange();
    });
  }
  for (const control of [els.modifierStrength, els.modifierCycles, els.modifierBias, els.modifierDecay, els.modifierKeyframes]) {
    bindScrubNumber(control, () => {
      if (state.selectedModifier) updateSelectedModifier(state.selectedModifier, false, true);
    });
  }
  const modifierResetTargets = [
    ['modifierStrengthLabel', 'modifierStrength'],
    ['modifierStrengthHint', 'modifierStrength'],
    ['modifierCyclesLabel', 'modifierCycles'],
    ['modifierCyclesHint', 'modifierCycles'],
    ['modifierBiasLabel', 'modifierBias'],
    ['modifierBiasHint', 'modifierBias'],
    ['modifierDecayLabel', 'modifierDecay'],
    ['modifierDecayHint', 'modifierDecay'],
    ['modifierKeyframesLabel', 'modifierKeyframes'],
    ['modifierKeyframesHint', 'modifierKeyframes']
  ];
  for (const [labelId, controlId] of modifierResetTargets) {
    els[labelId]?.addEventListener('dblclick', () => resetModifierControl(controlId));
  }
  bindScrubNumber(els.advancedFrameInput, () => {
    commitAdvancedInput(els.advancedFrameInput, 'frame');
  });
  bindScrubNumber(els.advancedValueInput, () => {
    commitAdvancedInput(els.advancedValueInput, 'value');
  });
  for (const control of [els.modifierClamp, els.modifierOverride]) {
    control.addEventListener('input', () => {
      if (state.selectedModifier) updateSelectedModifier(state.selectedModifier, false, true);
    });
    control.addEventListener('change', () => {
      if (state.selectedModifier) updateSelectedModifier(state.selectedModifier, false, true);
    });
  }
  els.modifierApplyButton.addEventListener('click', applyActive);
  els.modifierPendingApply?.addEventListener('click', applyActive);
  els.modifierPendingClear?.addEventListener('click', clearPendingModifier);
  els.saveButton.addEventListener('click', savePreset);
  els.resetEditorButton.addEventListener('click', resetEditor);
  els.centerGraphButton.addEventListener('click', () => centerGraphView(true));
  els.undoButton.addEventListener('click', undoGraph);
  els.redoButton.addEventListener('click', redoGraph);
  els.addPresetButton.addEventListener('click', newLinearGraph);
  els.deleteGalleryButton.addEventListener('click', deleteCurrentGallery);
  els.prevGalleryButton.addEventListener('click', () => switchGallery(-1));
  els.nextGalleryButton.addEventListener('click', () => switchGallery(1));
  els.exportGalleryButton.addEventListener('click', exportGallery);
  els.batchExportButton.addEventListener('click', batchExportGallery);
  els.importGalleryButton.addEventListener('click', importGallery);
  els.importGraphButton.addEventListener('click', importGallery);
  els.exportGraphButton.addEventListener('click', exportGallery);
  els.resetLayoutButton.addEventListener('click', resetLayout);
  els.desktopNotify.addEventListener('change', () => {
    state.desktopNotify = els.desktopNotify.checked;
    saveSettings();
  });
  els.soundEnabled.addEventListener('change', () => {
    state.soundEnabled = els.soundEnabled.checked;
    saveSettings();
  });
  els.autoResizeFusion?.addEventListener('change', () => {
    state.autoResizeFusion = els.autoResizeFusion.checked;
    saveSettings();
  });
  els.autoLaunch?.addEventListener('change', async () => {
    state.autoLaunch = els.autoLaunch.checked;
    saveSettings();
    const result = await window.flowAPI.setAutoLaunch?.(state.autoLaunch);
    if (result?.ok === false && result.message) setStatus(`Auto-start failed: ${result.message}`);
    await refreshAppShellStatus();
  });
  els.debugLogging?.addEventListener('change', async () => {
    state.debugLogging = els.debugLogging.checked;
    saveSettings();
    const result = await window.flowAPI.setDebugLogging?.(state.debugLogging);
    if (result?.path) setStatus(`Debug logs ${state.debugLogging ? 'enabled' : 'disabled'}: ${result.path}`);
    await refreshAppShellStatus();
  });
  els.openLogsButton?.addEventListener('click', () => window.flowAPI.openLogs?.());
  els.readSplinePageButton?.addEventListener('click', async () => {
    if (!window.flowAPI?.readSelectedSplinePage) return;
    const result = await window.flowAPI.readSelectedSplinePage();
    const graph = result.ok ? graphFromReadMessage(result.message) : null;
    if (!graph) {
      setStatus(result.message || 'No spline page graph detected.');
      showToast('Spline read failed');
      return;
    }
    setActivePreset(graph);
    state.advancedEdit = true;
    setStatus(`Read spline page graph: ${graph.name}`);
    showToast('Spline graph loaded');
    applyUiState();
    scheduleLayoutResize();
  });
  els.closeBehavior.addEventListener('change', async () => {
    state.closeBehavior = els.closeBehavior.value;
    saveSettings();
    await window.flowAPI.setCloseBehavior(state.closeBehavior);
  });
  els.globalApplyHotkey.addEventListener('change', async () => {
    state.globalApplyHotkey = els.globalApplyHotkey.checked;
    saveSettings();
    const result = await window.flowAPI.setGlobalApplyHotkey(state.globalApplyHotkey, state.applyKey);
    if (result?.message) setStatus(result.message);
  });
  els.themeSelect?.addEventListener('change', () => {
    state.theme = normalizeThemeName(els.themeSelect.value);
    applyTheme();
    saveSettings();
    showToast(`Theme: ${els.themeSelect.selectedOptions?.[0]?.textContent || state.theme}`);
  });
  els.customThemeAccentButton?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (colorPicker && !colorPicker.classList.contains('hidden')) {
      closeColorPicker();
    } else {
      openColorPicker(els.customThemeAccentButton);
    }
  });
  els.customThemeAccent?.addEventListener('input', () => {
    const value = String(els.customThemeAccent.value || '').trim();
    if (isHexColor(value)) setCustomAccent(value);
  });
  els.customThemeAccent?.addEventListener('change', () => {
    if (!setCustomAccent(els.customThemeAccent.value)) syncAccentControl();
  });
  els.customThemeFont?.addEventListener('change', () => {
    state.customTheme.font = CUSTOM_THEME_FONTS[els.customThemeFont.value] ? els.customThemeFont.value : 'aptos';
    setCustomThemeMode();
    applyTheme();
    saveSettings();
  });
  els.customThemeRadius?.addEventListener('change', () => {
    state.customTheme.radius = ['5', '9', '16', '999'].includes(els.customThemeRadius.value) ? els.customThemeRadius.value : '9';
    setCustomThemeMode();
    applyTheme();
    saveSettings();
  });
  els.customThemeBlur?.addEventListener('input', () => {
    state.customTheme.blur = clamp(Number(els.customThemeBlur.value) || 0, 0, 28);
    setCustomThemeMode();
    applyTheme();
    saveSettings();
  });
  els.customThemeBackgroundOpacity?.addEventListener('input', () => {
    state.customTheme.backgroundOpacity = clamp(Number(els.customThemeBackgroundOpacity.value) || 0, 0, 1);
    setCustomThemeMode();
    applyTheme();
    saveSettings();
  });
  els.customThemeBackgroundColors?.addEventListener('input', async () => {
    state.customTheme.backgroundColorInfluence = clamp(Number(els.customThemeBackgroundColors.value) || 0, 0, 1);
    if (state.customTheme.backgroundColorInfluence > 0 && state.customTheme.background && !state.customTheme.backgroundPalette) {
      state.customTheme.backgroundPalette = await paletteFromImage(state.customTheme.background);
    }
    setCustomThemeMode();
    applyTheme();
    saveSettings();
  });
  els.customThemeHeaderBlur?.addEventListener('input', () => {
    state.customTheme.headerBlur = clamp(Number(els.customThemeHeaderBlur.value) || 0, 0, 28);
    setCustomThemeMode();
    applyTheme();
    saveSettings();
  });
  els.customThemeHeaderOpacity?.addEventListener('input', () => {
    state.customTheme.headerOpacity = clamp(Number(els.customThemeHeaderOpacity.value) || 0, 0, 1);
    setCustomThemeMode();
    applyTheme();
    saveSettings();
  });
  els.customThemeBackground?.addEventListener('change', () => {
    const file = els.customThemeBackground.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') openThemeImageEditor('background', reader.result, file.name || 'Custom image loaded');
      els.customThemeBackground.value = '';
    };
    reader.onerror = () => showToast('Background import failed');
    reader.readAsDataURL(file);
  });
  els.customThemeClearBackground?.addEventListener('click', () => {
    state.customTheme.background = '';
    state.customTheme.backgroundName = '';
    state.customTheme.backgroundPalette = null;
    setCustomThemeMode();
    syncThemeControls();
    applyTheme();
    saveSettings();
    showToast('Custom background cleared');
  });
  els.customThemeHeader?.addEventListener('change', () => {
    const file = els.customThemeHeader.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') openThemeImageEditor('header', reader.result, file.name || 'Custom image loaded');
      els.customThemeHeader.value = '';
    };
    reader.onerror = () => showToast('Header import failed');
    reader.readAsDataURL(file);
  });
  els.customThemeClearHeader?.addEventListener('click', () => {
    state.customTheme.header = '';
    state.customTheme.headerName = '';
    setCustomThemeMode();
    syncThemeControls();
    applyTheme();
    saveSettings();
    showToast('Custom header cleared');
  });
  for (const button of [els.imageFitCover, els.imageFitContain, els.imageFitStretch]) {
    button?.addEventListener('click', () => {
      if (!imageEditor) return;
      imageEditor.fit = normalizeThemeImageFit(button.dataset.fit);
      renderImageEditorPreview();
    });
  }
  els.imageEditorZoom?.addEventListener('input', () => {
    if (!imageEditor) return;
    imageEditor.zoom = clamp(Number(els.imageEditorZoom.value) || 1, 0.35, 4);
    renderImageEditorPreview();
  });
  els.imageEditorOpacity?.addEventListener('input', () => {
    if (!imageEditor) return;
    imageEditor.opacity = clamp(Number(els.imageEditorOpacity.value) || 0, 0, 1);
  });
  els.imageEditorBlur?.addEventListener('input', () => {
    if (!imageEditor) return;
    imageEditor.blur = clamp(Number(els.imageEditorBlur.value) || 0, 0, 28);
  });
  els.imageEditorApply?.addEventListener('click', applyImageEditor);
  els.imageEditorCancel?.addEventListener('click', closeImageEditor);
  els.imageEditorClose?.addEventListener('click', closeImageEditor);
  els.imageEditorModal?.addEventListener('pointerdown', (event) => {
    if (event.target === els.imageEditorModal) closeImageEditor();
  });
  if (els.imageEditorStage) {
    let imageDrag = null;
    els.imageEditorStage.addEventListener('pointerdown', (event) => {
      if (!imageEditor || event.button !== 0) return;
      imageDrag = { x: event.clientX, y: event.clientY, ox: imageEditor.offsetX, oy: imageEditor.offsetY };
      els.imageEditorStage.setPointerCapture(event.pointerId);
    });
    els.imageEditorStage.addEventListener('pointermove', (event) => {
      if (!imageEditor || !imageDrag) return;
      imageEditor.offsetX = imageDrag.ox + event.clientX - imageDrag.x;
      imageEditor.offsetY = imageDrag.oy + event.clientY - imageDrag.y;
      renderImageEditorPreview();
    });
    const endImageDrag = () => { imageDrag = null; };
    els.imageEditorStage.addEventListener('pointerup', endImageDrag);
    els.imageEditorStage.addEventListener('pointercancel', endImageDrag);
  }
  els.galleryNameInput.addEventListener('input', () => {
    state.galleries[state.galleryIndex].name = els.galleryNameInput.value || 'Untitled';
    saveCustomPresets();
    saveSettings();
  });
  els.clearHistoryButton.addEventListener('click', () => {
    state.history = [];
    saveHistory();
    renderHistory();
  });
  els.compactToggle.addEventListener('click', () => {
    setCompactMode(!state.compactMode, state.compactPage || 0);
  });
  els.editorToggle.addEventListener('click', () => {
    state.editorOpen = true;
    els.editorView.classList.remove('hidden');
    const overlayWasOpen = state.historyOpen || !els.settingsView.classList.contains('hidden');
    if (overlayWasOpen) {
      state.historyOpen = false;
      els.settingsView.classList.add('hidden');
      applyUiState();
      scheduleLayoutResize();
      return;
    }
    setCompactMode(true, 0);
  });
  els.historyToggle.addEventListener('click', () => {
    state.historyOpen = !state.historyOpen;
    if (state.historyOpen) {
      els.settingsView.classList.add('hidden');
    }
    applyUiState();
    scheduleLayoutResize();
  });
  els.settingsButton.addEventListener('click', () => {
    if (!els.settingsView.classList.contains('hidden')) {
      els.settingsView.classList.add('hidden');
      els.editorView.classList.remove('hidden');
    } else {
      state.editorOpen = true;
      state.historyOpen = false;
      els.settingsView.classList.remove('hidden');
    }
    applyUiState();
    scheduleLayoutResize();
  });
  els.backButton.addEventListener('click', () => {
    els.settingsView.classList.add('hidden');
    applyUiState();
    scheduleLayoutResize();
  });
  els.historyCloseButton?.addEventListener('click', () => {
    state.historyOpen = false;
    applyUiState();
    scheduleLayoutResize();
  });
  els.applyBehavior.addEventListener('change', () => {
    state.behavior = els.applyBehavior.value;
    saveSettings();
  });
  const normalizeCapturedKey = (event) => {
    return normalizeHotkeyValue(event.key);
  };
  const bindSingleKeyInput = (input, prop, onChange) => {
    if (!input) return;
    input.readOnly = true;
    input.placeholder = 'None';
    input.value = keyLabel(state[prop]);
    input.addEventListener('focus', () => {
      input.classList.add('listening');
      input.value = 'Press key';
    });
    input.addEventListener('blur', () => {
      input.classList.remove('listening');
      input.value = keyLabel(state[prop]);
    });
    input.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      input.focus();
    });
    input.addEventListener('click', () => {
      input.focus();
    });
    input.addEventListener('keydown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      state[prop] = normalizeCapturedKey(event);
      input.value = keyLabel(state[prop]);
      input.classList.remove('listening');
      input.blur();
      onChange?.();
      saveSettings();
    });
  };
  bindSingleKeyInput(els.applyKey, 'applyKey', () => {
    if (els.hotkeyApplyInput && !els.hotkeyApplyInput.classList.contains('listening')) els.hotkeyApplyInput.value = keyLabel(state.applyKey);
    window.flowAPI.setApplyKey(state.applyKey);
    window.flowAPI.setGlobalApplyHotkey(state.globalApplyHotkey, state.applyKey);
  });
  bindSingleKeyInput(els.hotkeyApplyInput, 'applyKey', () => {
    if (!els.applyKey.classList.contains('listening')) els.applyKey.value = keyLabel(state.applyKey);
    window.flowAPI.setApplyKey(state.applyKey);
    window.flowAPI.setGlobalApplyHotkey(state.globalApplyHotkey, state.applyKey);
  });
  bindSingleKeyInput(els.smoothKeyInput, 'smoothKey');
  bindSingleKeyInput(els.linearKeyInput, 'linearKey');
  bindSingleKeyInput(els.deleteKeyInput, 'deleteKey');
  els.activeEditToggle.addEventListener('change', async () => {
    const enablingFreeform = els.activeEditToggle.checked;
    state.activeEditModeToken += 1;
    const token = state.activeEditModeToken;
    if (enablingFreeform) {
      if (!state.activeEdit) rememberNormalCurve();
      state.activeEdit = true;
      clearActiveFreeformRuntime();
      const loaded = await readActiveResolveSpline();
      if (token !== state.activeEditModeToken || !state.activeEdit) return;
      if (!loaded) setStatus('Active Freeform waiting for a selected animated spline.');
    } else {
      deactivateActiveFreeform(true);
      setStatus('Returned to curve shape mode.');
    }
    applyUiState();
    scheduleLayoutResize();
    saveSettings();
  });
  els.instantApplyToggle.addEventListener('change', () => {
    state.instantApply = els.instantApplyToggle.checked;
    applyUiState();
    saveSettings();
  });
  els.advancedEditButton.addEventListener('click', () => {
    state.preventLayoutShrinkUntil = Date.now() + 450;
    if (state.activeEdit) {
      deactivateActiveFreeform(true);
      state.advancedEdit = false;
    } else {
      state.advancedEdit = !state.advancedEdit;
    }
    state.selectedKeyframes = [];
    state.selectedKeyIndex = null;
    applyUiState();
    drawCurve(els.curveCanvas, state.active);
    scheduleLayoutResize();
    saveSettings();
  });
  els.minimizeButton.addEventListener('click', collapseFlow);
  els.maximizeButton.addEventListener('click', () => window.windowAPI.toggleMaximize());
  els.closeButton.addEventListener('click', () => window.windowAPI.close());
  els.collapsedCloseButton.addEventListener('click', (event) => {
    event.stopPropagation();
    window.windowAPI.close();
  });
  els.collapsedDrawerToggle.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await setCollapsedDrawerOpen(!state.collapsedDrawerOpen);
  });
  els.collapsedGraphPreview.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.collapsedPickerOpen = !state.collapsedPickerOpen;
    document.body.classList.toggle('collapsed-picker-open', state.collapsedPickerOpen);
    els.collapsedPicker.classList.toggle('hidden', !state.collapsedPickerOpen);
    if (state.collapsedPickerOpen) renderCollapsedPicker();
    window.windowAPI.setCollapsedDrawer(state.collapsedDrawerOpen, state.collapsedPickerOpen);
  });
  els.collapsedCopySpline.addEventListener('click', async (event) => {
    event.stopPropagation();
    const result = await window.flowAPI.copySplines();
    setStatus(result.message || (result.ok ? 'Spline copied.' : 'Copy failed.'));
    showToast(result.ok ? 'Spline copied' : 'Copy failed');
    flashCollapsedPanel(result.ok ? 'success' : 'error');
    if (!result.ok && state.desktopNotify) window.flowAPI.notify('Copy failed', result.message || 'Select a node.', 'error');
    await refreshCollapsedDrawer();
  });
  els.collapsedPasteSpline.addEventListener('click', async (event) => {
    event.stopPropagation();
    const result = await window.flowAPI.pasteSplines();
    setStatus(result.message || (result.ok ? 'Spline pasted.' : 'Paste failed.'));
    showToast(result.ok ? 'Spline pasted' : 'Paste failed');
    flashCollapsedPanel(result.ok ? 'success' : 'error');
    if (result.ok) playSound('success');
    else {
      playSound('error');
      if (state.desktopNotify) window.flowAPI.notify('Paste failed', result.message || 'Select a node.', 'error');
    }
    await refreshCollapsedDrawer();
  });
  els.wheelPlayhead.addEventListener('click', () => {
    setApplyMode('playhead');
    state.wheelMode = state.mode;
    renderWheel();
  });
  els.wheelAll.addEventListener('click', () => {
    setApplyMode('all');
    state.wheelMode = state.mode;
    renderWheel();
  });
  const openCompactFromWheel = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await window.flowAPI.openCompactEditor();
  };
  els.wheelOpenMain?.addEventListener('click', openCompactFromWheel);
  els.app?.addEventListener('wheel', (event) => {
    if (!state.compactMode) return;
    if (event.target.closest('.panel')) return;
    event.preventDefault();
    const direction = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    scrollCompactToPage(state.compactPage + (direction > 0 ? 1 : -1));
  }, { passive: false });
  els.app?.addEventListener('scroll', () => {
    if (!state.compactMode) return;
    clearTimeout(updateCompactPageFromScroll.timer);
    updateCompactPageFromScroll.timer = setTimeout(updateCompactPageFromScroll, 80);
  });

  bindFlowCollapsedHandle();
  enhanceSettingsSelects();

  for (const row of document.querySelectorAll('.setting-row')) {
    row.addEventListener('mouseenter', () => {
      els.settingsDescription.textContent = row.dataset.desc || '';
      els.settingsDescription.classList.add('active');
    });
  }
  refreshAppShellStatus();

  for (const [name, panel] of [['history', els.historyPanel]]) {
    panel.addEventListener('pointerdown', (event) => {
      if (!event.target.closest('.panel-head')) return;
      const startX = event.clientX;
      const move = (moveEvent) => {
        const delta = moveEvent.clientX - startX;
        if (Math.abs(delta) < 90) return;
        rotateLayout(name, delta > 0 ? 1 : -1);
        cleanup();
      };
      const cleanup = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', cleanup);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', cleanup);
    });
  }

  for (const select of document.querySelectorAll('select')) {
    if (customSelectWidgets.has(select)) continue;
    select.addEventListener('pointerdown', () => {
      window.windowAPI?.moveBy?.(0, 0);
    });
    select.addEventListener('focus', () => {
      window.windowAPI?.moveBy?.(0, 0);
    });
  }

  function beginResize(which, event) {
    event.preventDefault();
    const startX = event.clientX;
    const startGallery = state.galleryWidth;
    const startHistory = state.historyWidth;
    document.body.classList.add('resizing');

    const move = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      if (which === 'editor') {
        state.galleryWidth = clamp(startGallery + delta, 176, Math.min(520, window.innerWidth - 260));
      } else {
        state.historyWidth = clamp(startHistory - delta, 176, Math.min(420, window.innerWidth - 260));
      }
      applyUiState();
    };

    const up = () => {
      document.body.classList.remove('resizing');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      saveSettings();
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  els.editorResizeHandle.addEventListener('pointerdown', (event) => beginResize('editor', event));
  els.historyResizeHandle.addEventListener('pointerdown', (event) => beginResize('history', event));

  els.curveCanvas.addEventListener('pointerdown', (event) => {
    if (document.activeElement === els.advancedFrameInput || document.activeElement === els.advancedValueInput) {
      document.activeElement.blur();
    }
    els.curveCanvas.setPointerCapture(event.pointerId);
    const pos = canvasPosition(event);
    const detailed = advancedMode();
    const modifierReadOnly = !detailed && isModifierGraph(state.active);
    const sampledSimple = !detailed && Boolean(curveSamples(state.active));
    if (event.button === 2) {
      state.dragging = { panning: true, startX: pos.x, startY: pos.y, panX: state.editorPan.x, panY: state.editorPan.y, moved: false };
      return;
    }
    if (modifierReadOnly) return;
    if (detailed || sampledSimple) {
      if (event.button === 0 && detailed) ensureAdvancedSamples();
      const gridEdge = event.button === 0 && detailed && !nearestAdvancedSample(pos) && !nearestAdvancedHandle(pos) ? gridResizeHit(pos) : null;
      if (gridEdge) {
        state.dragging = {
          gridResize: gridEdge,
          startX: pos.x,
          startY: pos.y,
          startScaleX: state.editorScaleX || 1,
          startScaleY: state.editorScaleY || 1,
          startPanX: state.editorPan.x,
          startPanY: state.editorPan.y,
          baseRect: getRect(els.curveCanvas)
        };
        return;
      }
      const hit = nearestAdvancedSample(pos, sampledSimple);
      if (event.button === 0 && hit) {
        state.selectedKeyIndex = hit.index;
        if (event.shiftKey) {
          const selected = new Set(state.selectedKeyframes);
          if (selected.has(hit.index) && selected.size > 1) selected.delete(hit.index);
          else selected.add(hit.index);
          state.selectedKeyframes = [...selected].sort((a, b) => a - b);
          if (!state.selectedKeyframes.includes(state.selectedKeyIndex)) {
            state.selectedKeyIndex = state.selectedKeyframes[state.selectedKeyframes.length - 1] ?? hit.index;
          }
        } else if (!state.selectedKeyframes.includes(hit.index)) {
          state.selectedKeyframes = [hit.index];
        }
        state.dragging = detailed
          ? { sampleIndex: hit.index, pending: true, startAt: Date.now(), startX: pos.x, startY: pos.y, undo: false }
          : { sampleIndex: hit.index, simpleEndpoint: true, pending: true, startAt: Date.now(), startX: pos.x, startY: pos.y, undo: false };
        updateAdvancedPanel();
        drawCurve(els.curveCanvas, state.active);
        return;
      }
      const handle = detailed ? nearestAdvancedHandle(pos) : null;
      if (event.button === 0 && handle) {
        state.selectedKeyIndex = handle.index;
        if (!state.selectedKeyframes.includes(handle.index)) state.selectedKeyframes = [handle.index];
        state.dragging = { handle: handle.side, sampleIndex: handle.index, pending: true, startAt: Date.now(), startX: pos.x, startY: pos.y, ctrlKey: event.ctrlKey, undo: false };
        return;
      }
      if (event.button === 0) {
        if (!detailed) {
          state.selectedKeyframes = [];
          state.selectedKeyIndex = null;
          drawCurve(els.curveCanvas, state.active);
          return;
        }
        state.selectionBox = { x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y };
        state.dragging = { selecting: true };
        drawCurve(els.curveCanvas, state.active);
        return;
      }
    }
    pushUndo();
    state.dragging = nearestHandle(pos);
    updateHandle(pos);
  });
  els.curveCanvas.addEventListener('pointermove', (event) => {
    const pos = canvasPosition(event);
    const detailed = advancedMode();
    const sampledSimple = !detailed && Boolean(curveSamples(state.active));
    const sampleEditable = detailed || sampledSimple;
    if (sampleEditable) {
      const r = getRect(els.curveCanvas);
      const t = clamp((pos.x - r.x) / r.w, 0, 1);
      const v = graphValueFromCanvasY(pos.y);
      const displayValue = graphDisplayValueFromCanvasY(pos.y);
      const hit = nearestAdvancedSample(pos, sampledSimple);
      if (hit?.index !== state.hoverKeyIndex) {
        state.hoverKeyIndex = Number.isInteger(hit?.index) ? hit.index : null;
        state.hoverKeySince = Date.now();
      }
      const raw = hit?.sample;
      state.cursorPos = pos;
      const handleHit = detailed ? nearestAdvancedHandle(pos) : null;
      updateGraphCursor(pos, handleHit ? 'handle' : hit ? 'key' : '');
      els.editorHoverReadout.textContent = raw?.rawTime !== undefined
        ? `time ${raw.rawTime} | value ${Number(raw.rawValue).toFixed(3)} | normalized ${t.toFixed(3)}, ${v.toFixed(3)}`
        : `time ${t.toFixed(3)} | value ${displayValue.toFixed(3)}`;
    } else {
      const r = getRect(els.curveCanvas);
      const t = clamp((pos.x - r.x) / r.w, 0, 1);
      const v = clamp(1 - ((pos.y - r.y) / r.h), -2, 3);
      state.cursorPos = pos;
      updateGraphCursor(pos, isNearHandle(pos) ? 'handle' : '');
      els.editorHoverReadout.textContent = `simple mode | normalized ${t.toFixed(3)}, ${v.toFixed(3)}`;
    }
    els.curveCanvas.classList.toggle('can-drag', state.dragging || (sampleEditable ? ((detailed ? gridResizeHit(pos) : null) || nearestAdvancedSample(pos, sampledSimple) || (detailed ? nearestAdvancedHandle(pos) : null)) : isNearHandle(pos)));
    if (!state.dragging) return;
    if (typeof state.dragging === 'object') {
      if (state.dragging.gridResize) {
        resizeGraphGrid(state.dragging.gridResize, pos);
        return;
      }
      if (state.dragging.selectingSampleOnly) return;
      if (state.dragging.panning) {
        const dx = pos.x - state.dragging.startX;
        const dy = pos.y - state.dragging.startY;
        if (Math.abs(dx) + Math.abs(dy) > 3) state.dragging.moved = true;
        state.editorPan = { x: state.dragging.panX + dx, y: state.dragging.panY + dy };
        drawCurve(els.curveCanvas, state.active);
        return;
      }
      if (state.dragging.pending) {
        const held = Date.now() - state.dragging.startAt;
        const moved = Math.abs(pos.x - state.dragging.startX) + Math.abs(pos.y - state.dragging.startY);
        const holdDelay = state.dragging.handle ? 120 : 80;
        if (held < holdDelay || moved < 2) return;
        state.dragging.pending = false;
        if (!state.dragging.undo) {
          pushUndo();
          state.dragging.undo = true;
        }
      }
      if (state.dragging.handle) {
        state.dragging.ctrlKey = event.ctrlKey;
        setAdvancedSlopeFromHandle(state.dragging.sampleIndex, pos);
        return;
      }
      if (state.dragging.selecting) {
        state.selectionBox.x2 = pos.x;
        state.selectionBox.y2 = pos.y;
        const box = state.selectionBox;
        const minX = Math.min(box.x1, box.x2);
        const maxX = Math.max(box.x1, box.x2);
        const minY = Math.min(box.y1, box.y2);
        const maxY = Math.max(box.y1, box.y2);
        const samples = curveSamples(state.active) || [];
        state.selectedKeyframes = samples
          .map((sample, index) => ({ index, point: sampledPoint(els.curveCanvas, sample) }))
          .filter(({ point }) => point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY)
          .map(({ index }) => index);
        state.selectedKeyIndex = state.selectedKeyframes.length ? state.selectedKeyframes[state.selectedKeyframes.length - 1] : null;
        drawCurve(els.curveCanvas, state.active);
        return;
      }
      const r = getRect(els.curveCanvas);
      state.dragging.graphValue = graphValueFromCanvasY(pos.y);
      state.dragging.graphDisplayValue = graphDisplayValueFromCanvasY(pos.y);
      if (detailed) {
        const samples = curveSamples(state.active) || [];
        const current = samples[state.dragging.sampleIndex];
        const selected = selectedSampleIndexes();
        if (current && selected.length > 1 && selected.includes(state.dragging.sampleIndex)) {
          const nextT = state.activeEdit
            ? snapNormalizedToFrame(state.active, clamp((pos.x - r.x) / r.w, 0, 1))
            : Number(clamp((pos.x - r.x) / r.w, 0, 1).toFixed(5));
          const dx = nextT - Number(current.t);
          const dy = Number(state.dragging.graphValue) - Number(current.v);
          moveSelectedSamples(dx, dy, { pushUndo: false });
          return;
        }
      }
      if (state.dragging.simpleEndpoint) {
        const samples = curveSamples(state.active) || [];
        const current = samples[state.dragging.sampleIndex];
        if (!current) return;
        setAdvancedSample(state.dragging.sampleIndex, {
          t: Number(current.t),
          v: Number(state.dragging.graphValue.toFixed(5)),
          ...(state.activeEdit ? { rawValue: Number(state.dragging.graphDisplayValue.toFixed(5)) } : {})
        });
        return;
      }
      setAdvancedSample(state.dragging.sampleIndex, {
        t: Number(clamp((pos.x - r.x) / r.w, 0, 1).toFixed(5)),
        v: Number(state.dragging.graphValue.toFixed(5)),
        ...(state.activeEdit ? { rawValue: Number(state.dragging.graphDisplayValue.toFixed(5)) } : {})
      });
    } else {
      state.simpleHandleCtrlKey = event.ctrlKey;
      updateHandle(pos);
    }
  });
  els.curveCanvas.addEventListener('pointerup', () => {
    if (state.dragging?.panning && state.dragging.moved) {
      els.curveCanvas.dataset.suppressContext = String(Date.now());
    }
    if (state.dragging?.gridResize) saveSettings();
    if (state.dragging?.selecting) state.selectionBox = null;
    if (Number.isInteger(state.dragging?.sampleIndex)) {
      state.selectedKeyIndex = state.dragging.sampleIndex;
      if (!state.selectedKeyframes.includes(state.dragging.sampleIndex)) state.selectedKeyframes = [state.dragging.sampleIndex];
    }
    state.dragging = null;
    els.curveCanvas.classList.remove('can-drag');
    updateAdvancedPanel();
    drawCurve(els.curveCanvas, state.active);
  });
  els.curveCanvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    zoomEditor(event.deltaY < 0 ? 1.12 : 0.89);
  }, { passive: false });
  els.curveCanvas.addEventListener('contextmenu', (event) => {
    if (Date.now() - Number(els.curveCanvas.dataset.suppressContext || 0) < 250) {
      event.preventDefault();
      return;
    }
    if (editLockActive()) { event.preventDefault(); return; }
    if (!advancedMode()) return;
    event.preventDefault();
    const pos = canvasPosition(event);
    ensureAdvancedSamples();
    const hit = nearestAdvancedSample(pos);
    const selectedCount = selectedSampleIndexes().length;
    if (hit) {
      state.lastGraphRightClick = null;
      if (!state.selectedKeyframes.includes(hit.index)) {
        state.selectedKeyframes = [hit.index];
        state.selectedKeyIndex = hit.index;
      }
      const items = [
        { label: 'Linear', icon: 'linear', action: () => applySelectedSlope('linear') },
        { label: 'Smooth', icon: 'smooth', action: () => applySelectedSlope('smooth') },
        { label: 'Delete keyframe', icon: 'trash', danger: true, action: () => deleteAdvancedSample(hit.index) },
        { label: 'Edit value', icon: 'edit', action: () => openEditValueDialog(hit.index) }
      ];
      if (selectedCount >= 2) {
        items.unshift(
          { label: 'Apply graph to selection', icon: 'graph', action: () => startSelectionAction('graph') },
          { label: 'Apply modifier to selection', icon: 'modifier', action: () => startSelectionAction('modifier') }
        );
      }
      showGraphContextMenu(event, items, { type: 'key', index: hit.index, pos });
    } else {
      const last = state.lastGraphRightClick;
      const now = Date.now();
      const distance = last ? Math.hypot(event.clientX - last.x, event.clientY - last.y) : Infinity;
      state.lastGraphRightClick = { time: now, x: event.clientX, y: event.clientY };
      if (last && now - last.time < 460 && distance < 20) {
        state.lastGraphRightClick = null;
        hideGraphContextMenu();
        addKeyframeAtCanvasPosition(pos);
        return;
      }
      showGraphContextMenu(event, [
        { label: 'Add keyframe', icon: 'add', action: () => addKeyframeAtCanvasPosition(pos) },
        { label: 'Modifiers', icon: 'modifier', action: () => {
          state.modifiersOpen = true;
          applyUiState();
          document.body.classList.add('modifier-tab-flash');
          setTimeout(() => document.body.classList.remove('modifier-tab-flash'), 650);
        } }
      ], { type: 'empty', pos });
    }
  });
  els.curveCanvas.addEventListener('dblclick', (event) => {
    if (!advancedMode()) return;
    event.preventDefault();
    const pos = canvasPosition(event);
    const hit = nearestAdvancedSample(pos);
    if (hit) openEditValueDialog(hit.index);
    else addKeyframeAtCanvasPosition(pos);
  });
  els.curveCanvas.addEventListener('mouseleave', () => {
    state.cursorPos = null;
    state.hoverKeyIndex = null;
    els.graphCursor?.classList.add('hidden');
    els.editorHoverReadout.textContent = 'Hover the graph for time/value.';
  });
  window.addEventListener('keydown', async (event) => {
    const target = event.target;
    const typing = target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
    if (!typing && event.ctrlKey && event.key.toLowerCase() === 'a') {
      event.preventDefault();
      window.getSelection?.().removeAllRanges?.();
      if (advancedMode()) selectAllAdvancedKeyframes();
      return;
    }
    if (!typing && event.ctrlKey && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      if (event.shiftKey) redoGraph();
      else undoGraph();
      return;
    }
    const sampleKeysSelected = Boolean(curveSamples(state.active) && state.selectedKeyframes.length);
    const pressed = event.key === ' ' ? 'SPACE' : event.key.toUpperCase();
    if (!typing && (event.key === 'Delete' || event.key === 'Backspace' || (state.deleteKey && pressed === state.deleteKey)) && curveSamples(state.active) && state.selectedKeyframes.length) {
      event.preventDefault();
      for (const index of [...state.selectedKeyframes].sort((a, b) => b - a)) deleteAdvancedSample(index);
      state.selectedKeyframes = [];
      state.selectedKeyIndex = null;
      return;
    }
    if (!typing && sampleKeysSelected) {
      const step = event.shiftKey ? 0.025 : 0.005;
      if (advancedMode() && event.key === 'ArrowLeft') { event.preventDefault(); moveSelectedSamples(-step, 0); return; }
      if (advancedMode() && event.key === 'ArrowRight') { event.preventDefault(); moveSelectedSamples(step, 0); return; }
      if (advancedMode() && event.key === 'ArrowUp') { event.preventDefault(); moveSelectedSamples(0, step); return; }
      if (advancedMode() && event.key === 'ArrowDown') { event.preventDefault(); moveSelectedSamples(0, -step); return; }
      if (state.smoothKey && pressed === state.smoothKey) { event.preventDefault(); applySelectedSlope('smooth'); return; }
      if (state.linearKey && pressed === state.linearKey) { event.preventDefault(); applySelectedSlope('linear'); return; }
    }
    if (!typing && !curveSamples(state.active)) {
      if (state.smoothKey && pressed === state.smoothKey) { event.preventDefault(); if (applySimpleCurveKey('smooth')) return; }
      if (state.linearKey && pressed === state.linearKey) { event.preventDefault(); if (applySimpleCurveKey('linear')) return; }
    }
    if (!typing && state.applyKey && pressed === state.applyKey) {
      if (event.repeat) return;
      requestApplyKeyDown();
    }
  });
  window.addEventListener('keyup', async (event) => {
    const released = event.key === ' ' ? 'SPACE' : event.key.toUpperCase();
    if (!state.applyKey || released !== state.applyKey) return;
    event.preventDefault();
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && state.wheelOpen) closeWheel();
  });
  window.addEventListener('resize', () => {
    updateTitleLayout();
    const reserved = (state.historyOpen ? state.historyWidth : 0) + 300;
    state.galleryWidth = clamp(state.galleryWidth, 176, Math.max(176, Math.min(520, window.innerWidth - reserved)));
    state.historyWidth = clamp(state.historyWidth, 176, Math.max(176, Math.min(420, window.innerWidth - 260)));
    clampFlowFloat();
    updateLayoutVars();
    drawCurve(els.curveCanvas, state.active);
    renderGallery();
  });
  window.addEventListener('focus', () => refreshResolveStatus());
  window.flowAPI.onWheelSelect(async (index, mode) => {
    if (state.wheelSelectionInFlight) return;
    state.wheelSelectionInFlight = true;
    state.suppressTapUntil = Date.now() + 900;
    const preset = assignedPresets()[index];
    state.wheelOpen = false;
    document.body.classList.remove('wheel-open');
    if (!preset) {
      state.wheelSelectionInFlight = false;
      return;
    }
    state.wheelMode = mode === 'all' ? 'all' : 'playhead';
    setActivePreset(preset);
    try {
      await applyPresetWithMode(preset, state.wheelMode);
    } finally {
      setTimeout(() => {
        state.wheelSelectionInFlight = false;
      }, 350);
    }
  });
  window.flowAPI.onWheelEditorApply?.(async (graph, mode) => {
    if (!graph || state.wheelSelectionInFlight) return;
    state.wheelSelectionInFlight = true;
    state.suppressTapUntil = Date.now() + 900;
    state.wheelOpen = false;
    document.body.classList.remove('wheel-open');
    const next = { ...graph, locked: false, name: graph.name || state.active?.name || 'Wheel edit' };
    setActivePreset(next);
    try {
      await applyPresetWithMode(next, mode === 'all' ? 'all' : 'playhead');
    } finally {
      setTimeout(() => {
        state.wheelSelectionInFlight = false;
      }, 350);
    }
  });
  window.flowAPI.onWheelModeChanged?.((mode) => {
    setApplyMode(mode === 'all' ? 'all' : 'playhead');
  });
  window.flowAPI.onWheelClosed(() => {
    state.wheelOpen = false;
    document.body.classList.remove('wheel-open');
  });
  window.flowAPI.onWheelReleased(() => {
    state.wheelOpen = false;
    state.keyHoldTriggered = false;
    document.body.classList.remove('wheel-open');
  });
  window.flowAPI.onApplyKeyEvent?.((payload) => {
    state.lastApplyKeyEvent = payload?.event || 'idle';
    if (payload?.event === 'hold') state.keyHoldTriggered = true;
    if (payload?.event === 'tap' || payload?.event === 'up' || payload?.event === 'timeout' || payload?.event === 'reset') {
      state.keyHoldTriggered = false;
    }
    refreshAppShellStatus();
  });
  window.windowAPI.onNativeState?.((payload) => {
    state.nativeState = payload || null;
    const collapsed = Boolean(payload?.collapsed);
    if (state.flowCollapsed !== collapsed) {
      state.flowCollapsed = collapsed;
      if (!collapsed) {
        state.collapsedDrawerOpen = false;
        state.collapsedPickerOpen = false;
      }
      applyUiState();
    }
    refreshAppShellStatus();
  });
  window.flowAPI.onWheelHold(() => {
    openWheel();
  });
  window.flowAPI.onWheelTap(async () => {
    if (Date.now() < state.suppressTapUntil || state.wheelSelectionInFlight || state.wheelOpen) return;
    state.keyHoldTriggered = false;
    await applyFromShortcut();
  });
  window.flowAPI.onWheelOpenCompactEditor?.(() => {
    if (state.compactMode) setCompactMode(false);
    else {
      applyUiState();
      scheduleLayoutResize();
    }
  });
  window.windowAPI.onTaskbarRestore?.(() => {
    scheduleLayoutResize();
    refreshAppShellStatus();
  });
  setInterval(() => refreshResolveStatus(true), 220);
  window.addEventListener('beforeunload', () => window.flowAPI.cleanup());
}

window.addEventListener('DOMContentLoaded', async () => {
  bind();
  loadSettings();
  state.flashPage = 'ekflow';
  state.editorOpen = true;
  state.historyOpen = false;
  state.modifiersOpen = false;
  document.body.classList.add('ekflow-module-snapshot');
  renderFlashModules();
  state.layoutOrder = ['gallery', 'editor', 'history'];
  state.flowCollapsed = false;
  clampFlowFloat();
  loadCustomPresets();
  loadAssignedPresets();
  loadHistory();
  renderGallery();
  renderHistory();
  renderWheel();
  setActivePreset(state.active);
  applyUiState();
  startCurvePreviewAnimation();
  await window.flowAPI.setApplyKey(state.applyKey);
  await window.flowAPI.setGlobalApplyHotkey(state.globalApplyHotkey, state.applyKey);
  await window.flowAPI.setCloseBehavior(state.closeBehavior);
  await refreshResolveStatus();
  if (state.activeEdit) {
    const loaded = await readActiveResolveSpline();
    if (!loaded) {
      setStatus('Active Freeform waiting for a selected animated spline.');
      applyUiState();
    }
  }
});
