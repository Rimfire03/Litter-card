import { DEFAULT_IMAGE, MODEL_IMAGES } from './image-data.js';
import { LITTER_MODELS, DEFAULT_MODEL_ID, getModelConfig } from './models/index.js';
import { getCardStyles, EDITOR_STYLES } from './styles.js';

const CARD_VERSION = "0.39";
console.info(
  `%c LITTER-CARD %c v${CARD_VERSION} `,
  "color: white; background: #4caf50; font-weight: 700; border-radius: 3px 0 0 3px;",
  "color: #333; background: #e0e0e0; font-weight: 700; border-radius: 0 3px 3px 0;"
);

// Multilingual Translations Dictionary
const TRANSLATIONS = {
  fr: {
    default_title: "Litière",
    status_standby: "En attente",
    status_cleaning: "Nettoyage en cours",
    status_emptying: "Vidage en cours",
    status_child_lock: "Sécurité enfants active",
    status_sleep: "Veille",
    status_smoothing: "Nivellement",
    status_self_check: "Auto-vérification",
    status_full: "Sac plein",
    status_on: "Actif",
    status_off: "Inactif",
    status_ready: "Prêt",
    status_occupied: "Occupé",
    status_problem: "Erreur détectée",
    cat_present: "Chat présent",
    litter_free: "Libre",
    litter_offline: "Litière hors ligne",
    status_unavailable: "Indisponible",
    bin_full_alert: "Sac plein !",
    bin_ok: "Sac OK",
    weight_tooltip: "Dernier poids mesuré",
    stat_cleanings: "Nettoyages",
    stat_visits: "Visites",
    stat_duration: "Durée visite",
    sec_controls: "Contrôles manuels",
    btn_clean: "Nettoyer",
    btn_level: "Niveler",
    btn_bag_replace: "Remplacer sac",
    btn_bag_changed: "Changer la litière",
    btn_restart: "Redémarrer",
    sec_settings: "Paramètres & Configuration",
    cfg_auto_clean: "Nettoyage automatique",
    cfg_auto_clean_desc: "Déclencher un cycle après chaque visite",
    cfg_deep_clean: "Nettoyage intensif",
    cfg_deep_clean_desc: "Cycle approfondi de rotation du tambour",
    cfg_odor_removal: "Désodorisation",
    cfg_odor_removal_desc: "Activer après chaque cycle de nettoyage",
    cfg_child_lock: "Sécurité enfants",
    cfg_child_lock_desc: "Verrouille les boutons physiques",
    cfg_clean_wait_time: "Délai avant nettoyage",
    cfg_clean_interval: "Intervalle de nettoyage",
    cfg_bin_calibration: "Alerte sac plein",
    cfg_litter_type: "Type de litière",
    cfg_unit: "Unité de masse",
    unit_min: "min",
    unit_cycles: "cycles",
    not_configured: "-- Aucun (Désactivé) --",
    card_title: "Titre de la carte",
    image_url: "URL de l'image (optionnel)",
    language_label: "Langue (optionnel)",
    model_preset_label: "Modèle de bac à litière",
    auto_lang: "Automatique (Langue Home Assistant)",
    sensors_header: "Capteurs d'état & Mesures",
    sec_positioning: "Ajustement & Personnalisation de l'image",
    opt_entrance_pos_x: "Position X de l'entrée (%)",
    opt_entrance_pos_y: "Position Y de l'entrée (%)",
    opt_entrance_width: "Largeur de l'entrée (%)",
    opt_entrance_height: "Hauteur de l'entrée (%)",
    opt_entrance_shape: "Forme de l'entrée",
    opt_weight_pos_x: "Position X du poids (%)",
    opt_weight_pos_y: "Position Y du poids (%)",
    opt_weight_size: "Taille du texte poids (rem)",
    opt_bin_pos_x: "Position X alerte sac (%)",
    opt_bin_pos_y: "Position Y alerte sac (%)",
    opt_bin_scale: "Échelle alerte sac",
    shape_circle: "Cercle",
    shape_ellipse: "Ellipse",
    shape_rounded: "Rectangle arrondi",
    shape_square: "Rectangle",
    search_placeholder: "Rechercher une entité...",
  },
  en: {
    default_title: "Cat Litter Box",
    status_standby: "Standby",
    status_cleaning: "Cleaning",
    status_emptying: "Emptying",
    status_child_lock: "Child lock active",
    status_sleep: "Sleep",
    status_smoothing: "Leveling",
    status_self_check: "Self-check",
    status_full: "Bag full",
    status_on: "Active",
    status_off: "Inactive",
    status_ready: "Ready",
    status_occupied: "Occupied",
    status_problem: "Problem detected",
    cat_present: "Cat inside",
    litter_free: "Clear",
    litter_offline: "Litter box offline",
    status_unavailable: "Unavailable",
    bin_full_alert: "Bag full!",
    bin_ok: "Bag OK",
    weight_tooltip: "Last measured weight",
    stat_cleanings: "Cleanings",
    stat_visits: "Visits",
    stat_duration: "Visit duration",
    sec_controls: "Manual controls",
    btn_clean: "Clean",
    btn_level: "Level",
    btn_bag_replace: "Replace bag",
    btn_bag_changed: "Bag changed",
    btn_restart: "Restart",
    sec_settings: "Settings & Configuration",
    cfg_auto_clean: "Auto clean",
    cfg_auto_clean_desc: "Trigger a cycle after each visit",
    cfg_deep_clean: "Deep clean",
    cfg_deep_clean_desc: "Thorough drum rotation cycle",
    cfg_odor_removal: "Odor removal",
    cfg_odor_removal_desc: "Activate after each cleaning cycle",
    cfg_child_lock: "Child lock",
    cfg_child_lock_desc: "Lock physical buttons",
    cfg_clean_wait_time: "Clean delay",
    cfg_clean_interval: "Cleaning interval",
    cfg_bin_calibration: "Bin full alert",
    cfg_litter_type: "Litter type",
    cfg_unit: "Mass unit",
    unit_min: "min",
    unit_cycles: "cycles",
    not_configured: "-- None (Disabled) --",
    card_title: "Card title",
    image_url: "Image URL (optional)",
    language_label: "Language (optional)",
    model_preset_label: "Litter Box Model",
    auto_lang: "Auto (Home Assistant Language)",
    sensors_header: "Sensors & Metrics",
    sec_positioning: "Image Overlay Customization & Positioning",
    opt_entrance_pos_x: "Entrance Position X (%)",
    opt_entrance_pos_y: "Entrance Position Y (%)",
    opt_entrance_width: "Entrance Width (%)",
    opt_entrance_height: "Entrance Height (%)",
    opt_entrance_shape: "Entrance Shape",
    opt_weight_pos_x: "Weight Position X (%)",
    opt_weight_pos_y: "Weight Position Y (%)",
    opt_weight_size: "Weight font size (rem)",
    opt_bin_pos_x: "Bin Alert Position X (%)",
    opt_bin_pos_y: "Bin Alert Position Y (%)",
    opt_bin_scale: "Bin Alert Scale",
    shape_circle: "Circle",
    shape_ellipse: "Ellipse",
    shape_rounded: "Rounded rectangle",
    shape_square: "Rectangle",
    search_placeholder: "Search an entity...",
  },
  de: {
    default_title: "Katzenklo",
    status_standby: "Bereit",
    status_cleaning: "Reinigung läuft",
    status_emptying: "Entleerung läuft",
    status_child_lock: "Kindersicherung aktiv",
    status_sleep: "Ruhemodus",
    status_smoothing: "Einebnen",
    status_self_check: "Selbsttest",
    status_full: "Beutel voll",
    status_on: "Aktiv",
    status_off: "Inaktiv",
    status_ready: "Bereit",
    status_occupied: "Besetzt",
    status_problem: "Fehler erkannt",
    cat_present: "Katze anwesend",
    litter_free: "Frei",
    litter_offline: "Katzenklo offline",
    status_unavailable: "Nicht verfügbar",
    bin_full_alert: "Beutel voll!",
    bin_ok: "Beutel OK",
    weight_tooltip: "Zuletzt gemessenes Gewicht",
    stat_cleanings: "Reinigungen",
    stat_visits: "Besuche",
    stat_duration: "Besuchsdauer",
    sec_controls: "Manuelle Steuerung",
    btn_clean: "Reinigen",
    btn_level: "Einebnen",
    btn_bag_replace: "Beutel wechseln",
    btn_bag_changed: "Beutel gewechselt",
    btn_restart: "Neustarten",
    sec_settings: "Einstellungen & Konfiguration",
    cfg_auto_clean: "Automatische Reinigung",
    cfg_auto_clean_desc: "Zyklus nach jedem Besuch starten",
    cfg_deep_clean: "Intensivreinigung",
    cfg_deep_clean_desc: "Gründlicher Trommeldrehzyklus",
    cfg_odor_removal: "Geruchsbeseitigung",
    cfg_odor_removal_desc: "Nach jedem Reinigungszyklus aktivieren",
    cfg_child_lock: "Kindersicherung",
    cfg_child_lock_desc: "Physische Tasten sperren",
    cfg_clean_wait_time: "Verzögerung vor Reinigung",
    cfg_clean_interval: "Reinigungsintervall",
    cfg_bin_calibration: "Beutel-Voll-Warnung",
    cfg_litter_type: "Katzenstreu-Typ",
    cfg_unit: "Gewichtseinheit",
    unit_min: "Min.",
    unit_cycles: "Zyklen",
    not_configured: "-- Keine (Deaktiviert) --",
    card_title: "Kartentitel",
    image_url: "Bild-URL (optional)",
    language_label: "Sprache (optional)",
    model_preset_label: "Katzenklo-Modell",
    auto_lang: "Automatisch (Home Assistant Sprache)",
    sensors_header: "Sensoren & Messwerte",
    sec_positioning: "Bildanpassung & Positionierung",
    opt_entrance_pos_x: "Eingang Position X (%)",
    opt_entrance_pos_y: "Eingang Position Y (%)",
    opt_entrance_width: "Eingang Breite (%)",
    opt_entrance_height: "Eingang Höhe (%)",
    opt_entrance_shape: "Eingangsform",
    opt_weight_pos_x: "Gewicht Position X (%)",
    opt_weight_pos_y: "Gewicht Position Y (%)",
    opt_weight_size: "Gewicht Schriftgröße (rem)",
    opt_bin_pos_x: "Beutel-Warnung Position X (%)",
    opt_bin_pos_y: "Beutel-Warnung Position Y (%)",
    opt_bin_scale: "Beutel-Warnung Skalierung",
    shape_circle: "Kreis",
    shape_ellipse: "Ellipse",
    shape_rounded: "Abgerundetes Rechteck",
    shape_square: "Rechteck",
    search_placeholder: "Entität suchen...",
  },
  es: {
    default_title: "Arenero Gatos",
    status_standby: "En espera",
    status_cleaning: "Limpiando",
    status_emptying: "Vaciando",
    status_child_lock: "Bloqueo infantil activo",
    status_sleep: "Modo reposo",
    status_smoothing: "Nivelando",
    status_self_check: "Autocomprobación",
    status_full: "Bolsa llena",
    status_on: "Activo",
    status_off: "Inactivo",
    status_ready: "Listo",
    status_occupied: "Ocupado",
    status_problem: "Error detectado",
    cat_present: "Gato dentro",
    litter_free: "Libre",
    litter_offline: "Arenero sin conexión",
    status_unavailable: "No disponible",
    bin_full_alert: "¡Bolsa llena!",
    bin_ok: "Bolsa OK",
    weight_tooltip: "Último peso medido",
    stat_cleanings: "Limpiezas",
    stat_visits: "Visitas",
    stat_duration: "Duración visita",
    sec_controls: "Controles manuales",
    btn_clean: "Limpiar",
    btn_level: "Nivelar",
    btn_bag_replace: "Reemplazar bolsa",
    btn_bag_changed: "Bolsa cambiada",
    btn_restart: "Reiniciar",
    sec_settings: "Ajustes y Configuración",
    cfg_auto_clean: "Limpieza automática",
    cfg_auto_clean_desc: "Iniciar un cycle después de cada visita",
    cfg_deep_clean: "Limpieza profunda",
    cfg_deep_clean_desc: "Ciclo exhaustivo de rotación del tambor",
    cfg_odor_removal: "Desodorización",
    cfg_odor_removal_desc: "Activar tras cada cycle de limpieza",
    cfg_child_lock: "Bloqueo infantil",
    cfg_child_lock_desc: "Bloquea los botones físicos",
    cfg_clean_wait_time: "Retraso antes de limpiar",
    cfg_clean_interval: "Intervalo de limpieza",
    cfg_bin_calibration: "Alerta bolsa llena",
    cfg_litter_type: "Tipo de arena",
    cfg_unit: "Unidad de masa",
    unit_min: "min",
    unit_cycles: "ciclos",
    not_configured: "-- Ninguno (Desactivado) --",
    card_title: "Título de la tarjeta",
    image_url: "URL de imagen (opcional)",
    language_label: "Idioma (opcional)",
    model_preset_label: "Modelo de arenero",
    auto_lang: "Automático (Idioma Home Assistant)",
    sensors_header: "Sensores y Métricas",
    sec_positioning: "Ajuste y Personalización de la imagen",
    opt_entrance_pos_x: "Posición X de la entrada (%)",
    opt_entrance_pos_y: "Posición Y de la entrada (%)",
    opt_entrance_width: "Ancho de la entrada (%)",
    opt_entrance_height: "Alto de la entrada (%)",
    opt_entrance_shape: "Forma de la entrada",
    opt_weight_pos_x: "Posición X del peso (%)",
    opt_weight_pos_y: "Posición Y del peso (%)",
    opt_weight_size: "Tamaño fuente peso (rem)",
    opt_bin_pos_x: "Posición X alerta bolsa (%)",
    opt_bin_pos_y: "Posición Y alerta bolsa (%)",
    opt_bin_scale: "Escala alerta bolsa",
    shape_circle: "Círculo",
    shape_ellipse: "Elipse",
    shape_rounded: "Rectángulo redondeado",
    shape_square: "Rectángulo",
    search_placeholder: "Buscar una entidad...",
  },
};

function getLanguage(config, hass) {
  if (config && config.language && TRANSLATIONS[config.language]) {
    return config.language;
  }
  const rawLang = (hass && (hass.locale?.language || hass.language)) || "en";
  const lang = String(rawLang).substring(0, 2).toLowerCase();
  return TRANSLATIONS[lang] ? lang : "en";
}

function t(key, lang = "en") {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return dict[key] || TRANSLATIONS.en[key] || key;
}

function tDomain(domain, hass) {
  const localized = hass?.localize?.(`component.${domain}.entity_component._.name`);
  if (localized) return localized;
  return domain.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const STATUS_ALIASES = {
  cleaning: ["cleaning", "nettoyage", "nettoyage en cours"],
  smoothing: ["smoothing", "leveling", "lissage", "nivellement"],
  emptying: ["emptying", "vidange", "vidage", "vidage en cours"],
  full: ["full", "plein", "sac plein"],
  unavailable: ["unavailable", "indisponible"],
};

function canonicalStatus(stateStr) {
  const s = String(stateStr ?? "").trim().toLowerCase();
  for (const [key, aliases] of Object.entries(STATUS_ALIASES)) {
    if (aliases.includes(s)) return key;
  }
  return s;
}

class LitterCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
    this._hass = null;
    this._configOpen = false;
  }

  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = { ...config };
    this._render();
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;
    if (this._hasChanged(oldHass, hass)) {
      this._render();
    }
  }

  _hasChanged(oldHass, newHass) {
    if (!oldHass || !newHass) return true;
    const entities = [
      this._config.btn_clean,
      this._config.btn_level,
      this._config.btn_restart,
      this._config.btn_bag_replace,
      this._config.btn_bag_changed,
      this._config.sensor_visit_duration,
      this._config.sensor_cleanings_count,
      this._config.sensor_total_visits,
      this._config.sensor_occupancy,
      this._config.sensor_cat_weight,
      this._config.sensor_bin_full,
      this._config.sensor_status,
      this._config.sensor_problem,
      this._config.cfg_bin_calibration,
      this._config.cfg_clean_wait_time,
      this._config.cfg_odor_removal,
      this._config.cfg_clean_interval,
      this._config.cfg_auto_clean,
      this._config.cfg_deep_clean,
      this._config.cfg_child_lock,
      this._config.cfg_litter_type,
      this._config.cfg_unit,
    ].filter(Boolean);

    for (const entityId of entities) {
      if (oldHass.states[entityId] !== newHass.states[entityId]) {
        return true;
      }
    }
    return false;
  }

  _getState(entityId) {
    if (!entityId || !this._hass || !this._hass.states || !this._hass.states[entityId]) {
      return null;
    }
    return this._hass.states[entityId];
  }

  _callService(domain, service, data) {
    if (this._hass) {
      this._hass.callService(domain, service, data);
    }
  }

  _pressButton(entityId) {
    if (!entityId) return;
    const domain = entityId.split(".")[0];
    if (domain === "button") {
      this._callService("button", "press", { entity_id: entityId });
    } else {
      this._callService("homeassistant", "turn_on", { entity_id: entityId });
    }
  }

  _toggleEntity(entityId) {
    if (!entityId) return;
    const domain = entityId.split(".")[0];
    if (domain === "lock") {
      const stateObj = this._getState(entityId);
      if (stateObj && stateObj.state === "locked") {
        this._callService("lock", "unlock", { entity_id: entityId });
      } else {
        this._callService("lock", "lock", { entity_id: entityId });
      }
    } else {
      this._callService("homeassistant", "toggle", { entity_id: entityId });
    }
  }

  _setNumber(entityId, value) {
    if (!entityId) return;
    this._callService("number", "set_value", {
      entity_id: entityId,
      value: parseFloat(value),
    });
  }

  _setSelect(entityId, option) {
    if (!entityId) return;
    this._callService("select", "select_option", {
      entity_id: entityId,
      option: option,
    });
  }

  _formatDuration(seconds) {
    if (isNaN(seconds) || seconds === null || seconds === "unknown") return "--";
    const sec = parseInt(seconds, 10);
    if (sec < 60) return `${sec}s`;
    const min = Math.floor(sec / 60);
    const remainSec = sec % 60;
    return `${min}m ${remainSec}s`;
  }

  _formatStatus(stateStr, lang) {
    if (!stateStr) return t("status_standby", lang);
    const map = {
      standby: t("status_standby", lang),
      cleaning: t("status_cleaning", lang),
      emptying: t("status_emptying", lang),
      "child lock": t("status_child_lock", lang),
      sleep: t("status_sleep", lang),
      smoothing: t("status_smoothing", lang),
      "self check": t("status_self_check", lang),
      full: t("status_full", lang),
      on: t("status_on", lang),
      off: t("status_off", lang),
      unavailable: t("status_unavailable", lang),
    };
    return map[canonicalStatus(stateStr)] || stateStr;
  }

  _render() {
    if (!this.shadowRoot) return;

    const lang = getLanguage(this._config, this._hass);

    // Selected Model Preset configuration
    const modelPreset = getModelConfig(this._config.model || DEFAULT_MODEL_ID);
    const overlayDefaults = modelPreset?.overlay || {};

    // Sensors states
    const occState = this._getState(this._config.sensor_occupancy);
    const isOccupied = occState && (occState.state === "on" || occState.state === "true" || occState.state === "occupied");

    const binFullState = this._getState(this._config.sensor_bin_full);
    const isBinFull = binFullState && (binFullState.state === "on" || binFullState.state === "true" || binFullState.state === "full");

    const weightState = this._getState(this._config.sensor_cat_weight);
    let weightVal = "--";
    let weightUnit = "kg";
    if (weightState && weightState.state !== "unknown" && weightState.state !== "unavailable") {
      weightVal = parseFloat(weightState.state).toFixed(2);
      weightUnit = weightState.attributes?.unit_of_measurement || "kg";
    }

    const problemState = this._getState(this._config.sensor_problem);
    const hasProblem = problemState && (problemState.state === "on" || problemState.state === "problem");

    const statusState = this._getState(this._config.sensor_status);
    const statusText = statusState ? this._formatStatus(statusState.state, lang) : (isOccupied ? t("status_occupied", lang) : t("status_ready", lang));
    const rawStatus = statusState ? canonicalStatus(statusState.state) : "";
    const isStatusFull = rawStatus === "full";
    const isOffline = rawStatus === "unavailable";
    const blinkClean = rawStatus === "cleaning" ? "blink" : "";
    const blinkLevel = rawStatus === "smoothing" ? "blink" : "";
    const blinkBagChanged = rawStatus === "emptying" ? "blink" : "";

    const cleaningsState = this._getState(this._config.sensor_cleanings_count);
    const visitsState = this._getState(this._config.sensor_total_visits);
    const durationState = this._getState(this._config.sensor_visit_duration);

    // Image source (custom URL > model embedded image > default image)
    let modelImgData = DEFAULT_IMAGE;
    if (modelPreset && modelPreset.image && MODEL_IMAGES && MODEL_IMAGES[modelPreset.image]) {
      modelImgData = MODEL_IMAGES[modelPreset.image];
    }
    const imgSrc = this._config.image || modelImgData;

    // Overlay Geometry (Card config override > Model preset > hardcoded fallback)
    const entranceX = this._config.entrance_pos_x ?? overlayDefaults.entrance_pos_x ?? 50;
    const entranceY = this._config.entrance_pos_y ?? overlayDefaults.entrance_pos_y ?? 46.5;
    const entranceW = this._config.entrance_width ?? overlayDefaults.entrance_width ?? 43;
    const entranceH = this._config.entrance_height ?? overlayDefaults.entrance_height ?? 41;
    const entranceShape = this._config.entrance_shape || overlayDefaults.entrance_shape || "circle";
    let entranceBorderRadius = "50%";
    if (entranceShape === "rounded") entranceBorderRadius = "24px";
    if (entranceShape === "square") entranceBorderRadius = "8px";

    const weightX = this._config.weight_pos_x ?? overlayDefaults.weight_pos_x ?? 81.5;
    const weightY = this._config.weight_pos_y ?? overlayDefaults.weight_pos_y ?? 78.5;
    const weightFontSize = this._config.weight_size ?? overlayDefaults.weight_size ?? 1.15;

    const binX = this._config.bin_pos_x ?? overlayDefaults.bin_pos_x ?? 85;
    const binY = this._config.bin_pos_y ?? overlayDefaults.bin_pos_y ?? 14;
    const binScale = this._config.bin_scale ?? overlayDefaults.bin_scale ?? 1;

    // Buttons presence
    const hasBtnClean = Boolean(this._config.btn_clean);
    const hasBtnLevel = Boolean(this._config.btn_level);
    const hasBtnRestart = Boolean(this._config.btn_restart);
    const hasBtnBagReplace = Boolean(this._config.btn_bag_replace);
    const hasBtnBagChanged = Boolean(this._config.btn_bag_changed);
    const hasAnyButtons = hasBtnClean || hasBtnLevel || hasBtnRestart || hasBtnBagReplace || hasBtnBagChanged;

    // Config presence
    const hasCfgCalib = Boolean(this._config.cfg_bin_calibration);
    const hasCfgWait = Boolean(this._config.cfg_clean_wait_time);
    const hasCfgOdor = Boolean(this._config.cfg_odor_removal);
    const hasCfgInterval = Boolean(this._config.cfg_clean_interval);
    const hasCfgAuto = Boolean(this._config.cfg_auto_clean);
    const hasCfgDeep = Boolean(this._config.cfg_deep_clean);
    const hasCfgChildLock = Boolean(this._config.cfg_child_lock);
    const hasCfgLitterType = Boolean(this._config.cfg_litter_type);
    const hasCfgUnit = Boolean(this._config.cfg_unit);
    const hasAnyConfig = hasCfgCalib || hasCfgWait || hasCfgOdor || hasCfgInterval || hasCfgAuto || hasCfgDeep || hasCfgChildLock || hasCfgLitterType || hasCfgUnit;

    const cardTitle = this._config.title || (modelPreset ? `${modelPreset.name}` : t("default_title", lang));

    this.shadowRoot.innerHTML = `
      <style>${getCardStyles({
        isOccupied, isBinFull,
        entranceX, entranceY, entranceW, entranceH, entranceBorderRadius,
        weightX, weightY, weightFontSize,
        binX, binY, binScale,
        configOpen: this._configOpen,
      })}</style>

      <ha-card>
        <!-- Header -->
        <div class="header">
          <div class="title-group">
            <ha-icon icon="mdi:cat" style="color: var(--primary-color, #0284c7);"></ha-icon>
            <div class="title">${cardTitle}</div>
          </div>
          <div class="status-badge ${isOffline ? 'offline' : (isStatusFull ? 'full' : '')}">
            <div class="status-dot"></div>
            <span>${statusText}</span>
          </div>
        </div>

        <!-- Main Image Visual with Dynamic Overlays -->
        <div class="image-container">
          <img class="litter-img" src="${imgSrc}" alt="${cardTitle}" />

          <!-- Entrance Light / Occupancy Indicator -->
          <div class="entrance-glow ${isOffline ? 'offline' : ''}">
            <div class="entrance-badge ${isOffline ? 'offline' : ''}">
              <ha-icon icon="${isOffline ? 'mdi:wifi-off' : (isOccupied ? 'mdi:cat' : 'mdi:check-circle')}" style="--mdc-icon-size: 14px;"></ha-icon>
              <span>${isOffline ? t("litter_offline", lang) : (isOccupied ? t("cat_present", lang) : t("litter_free", lang))}</span>
            </div>
          </div>

          <!-- Bin status overlay -->
          ${this._config.sensor_bin_full && !isOffline ? `
            <div class="bin-status-overlay">
              <ha-icon icon="${isBinFull ? 'mdi:delete-alert' : 'mdi:delete-outline'}" style="--mdc-icon-size: 16px;"></ha-icon>
              <span>${isBinFull ? t("bin_full_alert", lang) : t("bin_ok", lang)}</span>
            </div>
          ` : ''}

          <!-- Cat Weight in bottom right black circular area -->
          ${this._config.sensor_cat_weight ? `
            <div class="weight-overlay" title="${t("weight_tooltip", lang)}">
              <div class="weight-value">${weightVal}</div>
              <div class="weight-unit">${weightUnit}</div>
            </div>
          ` : ''}
        </div>

        <!-- Quick Stats Sensors Grid -->
        ${(this._config.sensor_cleanings_count || this._config.sensor_total_visits || this._config.sensor_visit_duration) ? `
          <div class="stats-grid">
            ${cleaningsState ? `
              <div class="stat-item">
                <ha-icon icon="mdi:broom" class="stat-icon" style="--mdc-icon-size: 18px;"></ha-icon>
                <div class="stat-val">${cleaningsState.state}</div>
                <div class="stat-lbl">${t("stat_cleanings", lang)}</div>
              </div>
            ` : ''}

            ${visitsState ? `
              <div class="stat-item">
                <ha-icon icon="mdi:counter" class="stat-icon" style="--mdc-icon-size: 18px;"></ha-icon>
                <div class="stat-val">${visitsState.state}</div>
                <div class="stat-lbl">${t("stat_visits", lang)}</div>
              </div>
            ` : ''}

            ${durationState ? `
              <div class="stat-item">
                <ha-icon icon="mdi:timer-sand" class="stat-icon" style="--mdc-icon-size: 18px;"></ha-icon>
                <div class="stat-val">${this._formatDuration(durationState.state)}</div>
                <div class="stat-lbl">${t("stat_duration", lang)}</div>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- Manual Action Buttons -->
        ${hasAnyButtons ? `
          <div class="actions-section">
            <div class="section-title">${t("sec_controls", lang)}</div>
            <div class="buttons-grid">
              ${hasBtnClean ? `
                <button class="action-btn ${blinkClean}" id="btn_clean">
                  <ha-icon icon="mdi:shimmer" style="--mdc-icon-size: 18px;"></ha-icon>
                  <span>${t("btn_clean", lang)}</span>
                </button>
              ` : ''}

              ${hasBtnLevel ? `
                <button class="action-btn secondary ${blinkLevel}" id="btn_level">
                  <ha-icon icon="mdi:arrow-collapse-down" style="--mdc-icon-size: 18px;"></ha-icon>
                  <span>${t("btn_level", lang)}</span>
                </button>
              ` : ''}

              ${hasBtnBagReplace ? `
                <button class="action-btn secondary ${isStatusFull ? 'blink' : ''}" id="btn_bag_replace">
                  <ha-icon icon="mdi:sack" style="--mdc-icon-size: 18px;"></ha-icon>
                  <span>${t("btn_bag_replace", lang)}</span>
                </button>
              ` : ''}

              ${hasBtnBagChanged ? `
                <button class="action-btn secondary ${blinkBagChanged}" id="btn_bag_changed">
                  <ha-icon icon="mdi:delete-empty" style="--mdc-icon-size: 18px;"></ha-icon>
                  <span>${t("btn_bag_changed", lang)}</span>
                </button>
              ` : ''}

              ${hasBtnRestart ? `
                <button class="action-btn warning" id="btn_restart">
                  <ha-icon icon="mdi:restart" style="--mdc-icon-size: 18px;"></ha-icon>
                  <span>${t("btn_restart", lang)}</span>
                </button>
              ` : ''}
            </div>
          </div>
        ` : ''}

        <!-- Collapsible Configuration Accordion -->
        ${hasAnyConfig ? `
          <div class="config-accordion">
            <div class="config-header" id="config-toggle">
              <div class="config-header-title">
                <ha-icon icon="mdi:cog-outline" style="--mdc-icon-size: 18px; color: var(--secondary-text-color, #64748b);"></ha-icon>
                <span>${t("sec_settings", lang)}</span>
              </div>
              <ha-icon icon="mdi:chevron-down" class="chevron ${this._configOpen ? 'open' : ''}" style="--mdc-icon-size: 20px;"></ha-icon>
            </div>

            <div class="config-body">
              <!-- Nettoyage automatique -->
              ${hasCfgAuto ? this._renderToggleRow("cfg_auto_clean", t("cfg_auto_clean", lang), t("cfg_auto_clean_desc", lang), ["on", "true"]) : ''}

              <!-- Nettoyage intensif -->
              ${hasCfgDeep ? this._renderToggleRow("cfg_deep_clean", t("cfg_deep_clean", lang), t("cfg_deep_clean_desc", lang), ["on", "true"]) : ''}

              <!-- Désodorisation après nettoyage -->
              ${hasCfgOdor ? this._renderToggleRow("cfg_odor_removal", t("cfg_odor_removal", lang), t("cfg_odor_removal_desc", lang), ["on", "true"]) : ''}

              <!-- Sécurité enfants -->
              ${hasCfgChildLock ? this._renderToggleRow("cfg_child_lock", t("cfg_child_lock", lang), t("cfg_child_lock_desc", lang), ["locked"]) : ''}

              <!-- Délai de nettoyage -->
              ${hasCfgWait ? this._renderSliderRow("cfg_clean_wait_time", t("cfg_clean_wait_time", lang), t("unit_min", lang), 0, 60, 1) : ''}

              <!-- Intervalle de nettoyage -->
              ${hasCfgInterval ? this._renderSliderRow("cfg_clean_interval", t("cfg_clean_interval", lang), t("unit_min", lang), 0, 120, 5) : ''}

              <!-- Calibration sac plein -->
              ${hasCfgCalib ? this._renderSliderRow("cfg_bin_calibration", t("cfg_bin_calibration", lang), t("unit_cycles", lang), 15, 35, 1) : ''}

              <!-- Type de litière -->
              ${hasCfgLitterType ? this._renderSelectRow("cfg_litter_type", t("cfg_litter_type", lang)) : ''}

              <!-- Unité -->
              ${hasCfgUnit ? this._renderSelectRow("cfg_unit", t("cfg_unit", lang)) : ''}
            </div>
          </div>
        ` : ''}
      </ha-card>
    `;

    this._bindEvents();
  }

  _isSwitchInverted(configKey) {
    // Check if inverted in user card config
    const invertKey = `invert_${configKey}`;
    if (this._config[invertKey] !== undefined) {
      return Boolean(this._config[invertKey]);
    }
    // Check model preset definition
    const modelPreset = getModelConfig(this._config.model || DEFAULT_MODEL_ID);
    if (modelPreset && modelPreset.invert_switches && modelPreset.invert_switches[configKey] !== undefined) {
      return Boolean(modelPreset.invert_switches[configKey]);
    }
    return false;
  }

  _renderToggleRow(configKey, title, desc, activeStates) {
    const stateObj = this._getState(this._config[configKey]);
    let isOn = Boolean(stateObj && activeStates.includes(stateObj.state));

    // Apply inversion if configured in model or card
    if (this._isSwitchInverted(configKey)) {
      isOn = !isOn;
    }

    return `
      <div class="config-row">
        <div class="config-label-group">
          <span class="config-label">${title}</span>
          ${desc ? `<span class="config-desc">${desc}</span>` : ''}
        </div>
        <label class="switch">
          <input type="checkbox" id="${configKey}" ${isOn ? 'checked' : ''}>
          <span class="slider-switch"></span>
        </label>
      </div>
    `;
  }

  _renderSliderRow(configKey, title, unit, min, max, step) {
    const entityId = this._config[configKey];
    const stateObj = this._getState(entityId);
    const val = stateObj ? parseFloat(stateObj.state) : (min || 0);
    const minVal = stateObj?.attributes?.min ?? min;
    const maxVal = stateObj?.attributes?.max ?? max;
    const stepVal = stateObj?.attributes?.step ?? step;

    return `
      <div class="config-row">
        <div class="config-label-group">
          <span class="config-label">${title}</span>
          <span class="config-desc">${val} ${unit}</span>
        </div>
        <div class="slider-group">
          <input type="range" id="${configKey}" min="${minVal}" max="${maxVal}" step="${stepVal}" value="${val}">
          <span class="slider-val">${val}</span>
        </div>
      </div>
    `;
  }

  _renderSelectRow(configKey, title) {
    const entityId = this._config[configKey];
    const stateObj = this._getState(entityId);
    const currentVal = stateObj ? stateObj.state : "";
    const options = stateObj?.attributes?.options || [];

    return `
      <div class="config-row">
        <div class="config-label-group">
          <span class="config-label">${title}</span>
        </div>
        <select class="control-select" id="${configKey}">
          ${options.map(opt => `<option value="${opt}" ${opt === currentVal ? 'selected' : ''}>${opt}</option>`).join('')}
        </select>
      </div>
    `;
  }

  _bindEvents() {
    const root = this.shadowRoot;

    // Accordion toggle
    const toggleBtn = root.getElementById("config-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        this._configOpen = !this._configOpen;
        this._render();
      });
    }

    // Button actions
    const buttons = ["btn_clean", "btn_level", "btn_bag_replace", "btn_bag_changed", "btn_restart"];
    buttons.forEach(key => {
      const el = root.getElementById(key);
      if (el) {
        el.addEventListener("click", () => this._pressButton(this._config[key]));
      }
    });

    // Switch toggles
    const switches = ["cfg_auto_clean", "cfg_deep_clean", "cfg_odor_removal", "cfg_child_lock"];
    switches.forEach(key => {
      const el = root.getElementById(key);
      if (el) {
        el.addEventListener("change", () => this._toggleEntity(this._config[key]));
      }
    });

    // Slider inputs
    const sliders = ["cfg_clean_wait_time", "cfg_clean_interval", "cfg_bin_full_calibration", "cfg_bin_calibration"];
    sliders.forEach(key => {
      const el = root.getElementById(key);
      if (el) {
        el.addEventListener("change", (e) => this._setNumber(this._config[key], e.target.value));
      }
    });

    // Select options
    const selects = ["cfg_litter_type", "cfg_unit"];
    selects.forEach(key => {
      const el = root.getElementById(key);
      if (el) {
        el.addEventListener("change", (e) => this._setSelect(this._config[key], e.target.value));
      }
    });
  }

  // Visual card editor support
  static getConfigElement() {
    return document.createElement("litter-card-editor");
  }

  static getStubConfig(hass) {
    return {
      type: "custom:litter-card",
      title: "Litière",
      model: DEFAULT_MODEL_ID,
    };
  }
}

// GUI Card Editor Component using searchable custom select popup and model presets
class LitterCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
    this._hass = null;
    this._openDropdownKey = null;
    this._filterQuery = "";
  }

  setConfig(config) {
    this._config = config || {};
    this._render();
  }

  set hass(hass) {
    const isFirstHass = !this._hass && hass;
    this._hass = hass;
    if (isFirstHass) {
      this._render();
    }
  }

  _valueChanged(key, value) {
    if (!this._config) return;
    
    let newConfig = { ...this._config };
    if (value === "" || value === null || value === undefined) {
      delete newConfig[key];
    } else {
      if (
        [
          "entrance_pos_x",
          "entrance_pos_y",
          "entrance_width",
          "entrance_height",
          "weight_pos_x",
          "weight_pos_y",
          "weight_size",
          "bin_pos_x",
          "bin_pos_y",
          "bin_scale",
        ].includes(key)
      ) {
        newConfig[key] = isNaN(value) ? value : parseFloat(value);
      } else {
        newConfig[key] = value;
      }
    }

    this._config = newConfig;

    const event = new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _render() {
    if (!this.shadowRoot) return;

    const lang = getLanguage(this._config, this._hass);
    const currentModelId = this._config.model || DEFAULT_MODEL_ID;
    const selectedModel = getModelConfig(currentModelId);
    const modelFeatures = selectedModel?.features || {};

    const modelOptions = Object.keys(LITTER_MODELS).map(key => ({
      value: key,
      label: LITTER_MODELS[key].name || key,
    }));

    // Build fields dynamically based on model supported features
    const allButtonFields = [
      { key: "btn_clean", label: `${t("btn_clean", lang)} (Button)`, domains: ["button", "input_button", "switch"] },
      { key: "btn_level", label: `${t("btn_level", lang)} (Button)`, domains: ["button", "input_button", "switch"] },
      { key: "btn_bag_replace", label: `${t("btn_bag_replace", lang)} (Button)`, domains: ["button", "input_button", "switch"] },
      { key: "btn_bag_changed", label: `${t("btn_bag_changed", lang)} (Button)`, domains: ["button", "input_button", "switch"] },
      { key: "btn_restart", label: `${t("btn_restart", lang)} (Button)`, domains: ["button", "input_button", "switch"] },
    ];

    const allSensorFields = [
      { key: "sensor_occupancy", label: `${t("cat_present", lang)} / ${t("litter_free", lang)} (Binary Sensor)`, domains: ["binary_sensor", "sensor", "input_boolean"] },
      { key: "sensor_cat_weight", label: `${t("weight_tooltip", lang)} (Sensor)`, domains: ["sensor", "input_number"] },
      { key: "sensor_bin_full", label: `${t("bin_full_alert", lang)} (Binary Sensor)`, domains: ["binary_sensor", "sensor", "input_boolean"] },
      { key: "sensor_status", label: `${t("status_standby", lang)} / Status (Sensor)`, domains: ["sensor"] },
      { key: "sensor_problem", label: `${t("status_problem", lang)} (Binary Sensor)`, domains: ["binary_sensor", "sensor"] },
      { key: "sensor_cleanings_count", label: `${t("stat_cleanings", lang)} (Sensor)`, domains: ["sensor", "input_number", "counter"] },
      { key: "sensor_total_visits", label: `${t("stat_visits", lang)} (Sensor)`, domains: ["sensor", "input_number", "counter"] },
      { key: "sensor_visit_duration", label: `${t("stat_duration", lang)} (Sensor)`, domains: ["sensor", "input_number"] },
    ];

    const allSettingFields = [
      { key: "cfg_auto_clean", label: `${t("cfg_auto_clean", lang)} (Switch)`, domains: ["switch", "input_boolean"] },
      { key: "cfg_deep_clean", label: `${t("cfg_deep_clean", lang)} (Switch)`, domains: ["switch", "input_boolean"] },
      { key: "cfg_odor_removal", label: `${t("cfg_odor_removal", lang)} (Switch)`, domains: ["switch", "input_boolean"] },
      { key: "cfg_child_lock", label: `${t("cfg_child_lock", lang)} (Lock / Switch)`, domains: ["lock", "switch", "input_boolean"] },
      { key: "cfg_clean_wait_time", label: `${t("cfg_clean_wait_time", lang)} (Number)`, domains: ["number", "input_number", "sensor"] },
      { key: "cfg_clean_interval", label: `${t("cfg_clean_interval", lang)} (Number)`, domains: ["number", "input_number", "sensor"] },
      { key: "cfg_bin_calibration", label: `${t("cfg_bin_calibration", lang)} (Number)`, domains: ["number", "input_number", "sensor"] },
      { key: "cfg_litter_type", label: `${t("cfg_litter_type", lang)} (Select)`, domains: ["select", "input_select"] },
      { key: "cfg_unit", label: `${t("cfg_unit", lang)} (Select)`, domains: ["select", "input_select"] },
    ];

    // Filter by model features if specified, otherwise include all
    const activeButtons = modelFeatures.buttons ? allButtonFields.filter(f => modelFeatures.buttons.includes(f.key)) : allButtonFields;
    const activeSensors = modelFeatures.sensors ? allSensorFields.filter(f => modelFeatures.sensors.includes(f.key)) : allSensorFields;
    const activeSettings = modelFeatures.settings ? allSettingFields.filter(f => modelFeatures.settings.includes(f.key)) : allSettingFields;

    const fields = [
      { key: "title", label: t("card_title", lang), type: "text" },
      {
        key: "language",
        label: t("language_label", lang),
        type: "select_options",
        options: [
          { value: "", label: t("auto_lang", lang) },
          { value: "fr", label: "Français (FR)" },
          { value: "en", label: "English (EN)" },
          { value: "de", label: "Deutsch (DE)" },
          { value: "es", label: "Español (ES)" },
        ]
      },
      {
        key: "model",
        label: t("model_preset_label", lang),
        type: "select_options",
        options: modelOptions,
      },
      // Display custom Image URL field ONLY if generic/custom model is chosen
      ...(currentModelId === "generic" ? [{ key: "image", label: t("image_url", lang), type: "text" }] : []),
      // Buttons
      ...(activeButtons.length > 0 ? [{ header: t("sec_controls", lang) }, ...activeButtons] : []),
      // Sensors
      ...(activeSensors.length > 0 ? [{ header: t("sensors_header", lang) }, ...activeSensors] : []),
      // Settings
      ...(activeSettings.length > 0 ? [{ header: t("sec_settings", lang) }, ...activeSettings] : []),
      // Custom Positioning & Sizing
      { header: t("sec_positioning", lang) },
      { key: "entrance_pos_x", label: t("opt_entrance_pos_x", lang), type: "number", min: 0, max: 100, step: 0.5, default: selectedModel?.overlay?.entrance_pos_x ?? 50 },
      { key: "entrance_pos_y", label: t("opt_entrance_pos_y", lang), type: "number", min: 0, max: 100, step: 0.5, default: selectedModel?.overlay?.entrance_pos_y ?? 46.5 },
      { key: "entrance_width", label: t("opt_entrance_width", lang), type: "number", min: 10, max: 100, step: 0.5, default: selectedModel?.overlay?.entrance_width ?? 43 },
      { key: "entrance_height", label: t("opt_entrance_height", lang), type: "number", min: 10, max: 100, step: 0.5, default: selectedModel?.overlay?.entrance_height ?? 41 },
      {
        key: "entrance_shape",
        label: t("opt_entrance_shape", lang),
        type: "select_options",
        options: [
          { value: "circle", label: t("shape_circle", lang) },
          { value: "ellipse", label: t("shape_ellipse", lang) },
          { value: "rounded", label: t("shape_rounded", lang) },
          { value: "square", label: t("shape_square", lang) },
        ]
      },
      { key: "weight_pos_x", label: t("opt_weight_pos_x", lang), type: "number", min: 0, max: 100, step: 0.5, default: selectedModel?.overlay?.weight_pos_x ?? 81.5 },
      { key: "weight_pos_y", label: t("opt_weight_pos_y", lang), type: "number", min: 0, max: 100, step: 0.5, default: selectedModel?.overlay?.weight_pos_y ?? 78.5 },
      { key: "weight_size", label: t("opt_weight_size", lang), type: "number", min: 0.5, max: 3, step: 0.05, default: selectedModel?.overlay?.weight_size ?? 1.15 },
      { key: "bin_pos_x", label: t("opt_bin_pos_x", lang), type: "number", min: 0, max: 100, step: 0.5, default: selectedModel?.overlay?.bin_pos_x ?? 85 },
      { key: "bin_pos_y", label: t("opt_bin_pos_y", lang), type: "number", min: 0, max: 100, step: 0.5, default: selectedModel?.overlay?.bin_pos_y ?? 14 },
      { key: "bin_scale", label: t("opt_bin_scale", lang), type: "number", min: 0.5, max: 2, step: 0.05, default: selectedModel?.overlay?.bin_scale ?? 1 },
    ];

    const allEntities = this._hass ? Object.keys(this._hass.states).sort() : [];

    this.shadowRoot.innerHTML = `
      <style>${EDITOR_STYLES}</style>
      <div class="editor-container">
        ${fields.map(field => {
          if (field.header) {
            return `<div class="header-title">${field.header}</div>`;
          }
          if (field.type === "text") {
            const currentVal = (this._config && this._config[field.key]) || '';
            return `
              <div class="row">
                <span class="label">${field.label}</span>
                <input type="text" class="text-input" data-key="${field.key}" value="${currentVal}">
              </div>
            `;
          }
          if (field.type === "number") {
            const currentVal = (this._config && this._config[field.key] !== undefined) ? this._config[field.key] : (field.default ?? '');
            return `
              <div class="row">
                <span class="label">${field.label}</span>
                <input type="number" class="text-input" min="${field.min}" max="${field.max}" step="${field.step}" data-key="${field.key}" value="${currentVal}">
              </div>
            `;
          }
          if (field.type === "select_options") {
            const currentVal = (this._config && this._config[field.key]) || (field.key === 'model' ? DEFAULT_MODEL_ID : '');
            return `
              <div class="row">
                <span class="label">${field.label}</span>
                <select class="native-select" data-key="${field.key}">
                  ${field.options.map(opt => `<option value="${opt.value}" ${opt.value === currentVal ? 'selected' : ''}>${opt.label}</option>`).join('')}
                </select>
              </div>
            `;
          }

          // Searchable Entity Picker Box
          const currentVal = (this._config && this._config[field.key]) || '';
          let matchedEntities = allEntities;
          if (field.domains && field.domains.length > 0) {
            const primary = allEntities.filter(e => field.domains.some(d => e.startsWith(d + ".")));
            const others = allEntities.filter(e => !field.domains.some(d => e.startsWith(d + ".")));
            matchedEntities = [...primary, ...others];
          }

          const currentFriendly = this._hass?.states[currentVal]?.attributes?.friendly_name || '';
          const isDropdownOpen = this._openDropdownKey === field.key;
          const query = isDropdownOpen ? this._filterQuery.toLowerCase() : '';

          const filteredEntities = query
            ? matchedEntities.filter(e => {
                const friendly = (this._hass?.states[e]?.attributes?.friendly_name || '').toLowerCase();
                return e.toLowerCase().includes(query) || friendly.includes(query);
              })
            : matchedEntities;

          return `
            <div class="row">
              <span class="label">${field.label}</span>
              <div class="picker-box" data-field="${field.key}">
                <div class="picker-trigger" data-trigger="${field.key}">
                  <span class="selected-text">
                    ${currentVal ? `${currentFriendly || currentVal}` : `<span style="opacity: 0.6;">${t("not_configured", lang)}</span>`}
                    ${currentVal && currentFriendly ? `<span class="selected-entity-id">(${currentVal})</span>` : ''}
                  </span>
                  <ha-icon icon="${isDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}" style="--mdc-icon-size: 18px; color: var(--secondary-text-color, #64748b);"></ha-icon>
                </div>

                ${isDropdownOpen ? `
                  <div class="picker-dropdown">
                    <div class="picker-search">
                      <input type="text" class="search-field" placeholder="🔍 ${t("search_placeholder", lang)}" value="${this._filterQuery}" autofocus>
                    </div>
                    <div class="picker-options">
                      <div class="picker-item ${!currentVal ? 'active' : ''}" data-val="">
                        <div class="item-main">
                          <span class="item-name" style="font-style: italic; opacity: 0.7;">${t("not_configured", lang)}</span>
                        </div>
                      </div>
                      ${filteredEntities.map(e => {
                        const friendly = this._hass?.states[e]?.attributes?.friendly_name || e;
                        const domain = e.split('.')[0];
                        const domainLabel = tDomain(domain, this._hass);
                        const isActive = e === currentVal;
                        return `
                          <div class="picker-item ${isActive ? 'active' : ''}" data-val="${e}">
                            <div class="item-main">
                              <span class="item-name">${friendly}</span>
                              <span class="item-id">${e}</span>
                            </div>
                            <span class="item-domain">${domainLabel}</span>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Bind triggers to open/close dropdown
    this.shadowRoot.querySelectorAll(".picker-trigger").forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const fieldKey = trigger.getAttribute("data-trigger");
        if (this._openDropdownKey === fieldKey) {
          this._openDropdownKey = null;
        } else {
          this._openDropdownKey = fieldKey;
          this._filterQuery = "";
        }
        this._render();

        // Focus search field
        setTimeout(() => {
          const input = this.shadowRoot.querySelector(".search-field");
          if (input) input.focus();
        }, 50);
      });
    });

    // Handle search input typing
    const searchField = this.shadowRoot.querySelector(".search-field");
    if (searchField) {
      searchField.addEventListener("input", (e) => {
        this._filterQuery = e.target.value;
        this._render();
        setTimeout(() => {
          const input = this.shadowRoot.querySelector(".search-field");
          if (input) {
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
          }
        }, 10);
      });
      searchField.addEventListener("click", (e) => e.stopPropagation());
    }

    // Handle selecting an item
    this.shadowRoot.querySelectorAll(".picker-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const val = item.getAttribute("data-val");
        const key = this._openDropdownKey;
        this._openDropdownKey = null;
        this._filterQuery = "";
        this._valueChanged(key, val);
        this._render();
      });
    });

    // Close dropdown when clicking outside
    this.shadowRoot.addEventListener("click", () => {
      if (this._openDropdownKey) {
        this._openDropdownKey = null;
        this._filterQuery = "";
        this._render();
      }
    });

    // Bind text and native select change events
    this.shadowRoot.querySelectorAll("select.native-select").forEach(selectEl => {
      selectEl.addEventListener("change", (e) => {
        const key = e.target.getAttribute("data-key");
        this._valueChanged(key, e.target.value);
        if (key === 'model') {
          this._render();
        }
      });
    });

    this.shadowRoot.querySelectorAll("input.text-input").forEach(inputEl => {
      inputEl.addEventListener("input", (e) => {
        const key = e.target.getAttribute("data-key");
        this._valueChanged(key, e.target.value);
      });
      inputEl.addEventListener("change", (e) => {
        const key = e.target.getAttribute("data-key");
        this._valueChanged(key, e.target.value);
      });
    });
  }
}

customElements.define("litter-card-editor", LitterCardEditor);
customElements.define("litter-card", LitterCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "litter-card",
  name: "Litter Card",
  preview: true,
  description: "Modern & customizable Lovelace card for generic automatic cat litter boxes with occupancy, weight display, and alerts.",
});
