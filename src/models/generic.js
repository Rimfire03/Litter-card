/**
 * Modèle générique / Personnalisé (Permet d'afficher tous les champs et réglages)
 */
export default {
  id: "generic",
  brand: "Générique",
  model: "Personnalisé",
  name: "Générique / Personnalisé",
  image: "doel_ti_pro_25.png",
  
  overlay: {
    entrance_pos_x: 50,
    entrance_pos_y: 46.5,
    entrance_width: 43,
    entrance_height: 41,
    entrance_shape: "circle",
    
    weight_pos_x: 81.5,
    weight_pos_y: 78.5,
    weight_size: 1.15,
    
    bin_pos_x: 85,
    bin_pos_y: 14,
    bin_scale: 1,
  },

  features: {
    buttons: [
      "btn_clean",
      "btn_level",
      "btn_bag_replace",
      "btn_bag_changed",
      "btn_restart",
    ],
    sensors: [
      "sensor_occupancy",
      "sensor_cat_weight",
      "sensor_bin_full",
      "sensor_status",
      "sensor_problem",
      "sensor_cleanings_count",
      "sensor_total_visits",
      "sensor_visit_duration",
    ],
    settings: [
      "cfg_auto_clean",
      "cfg_deep_clean",
      "cfg_odor_removal",
      "cfg_child_lock",
      "cfg_clean_wait_time",
      "cfg_clean_interval",
      "cfg_bin_calibration",
      "cfg_litter_type",
      "cfg_unit",
    ],
  },

  // Inversion du sens de fonctionnement des interrupteurs bistables (false = normal, true = inversé)
  invert_switches: {
    cfg_auto_clean: false,
    cfg_deep_clean: false,
    cfg_odor_removal: false,
    cfg_child_lock: false,
  },
};
