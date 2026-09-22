/**
 * Configuration Preset pour : DOEL - Ti Pro 25
 */
export default {
  id: "doel_ti_pro_25",
  brand: "Doel",
  model: "Ti Pro 25",
  name: "Doel - Ti Pro 25",
  image: "doel_ti_pro_25.png",
  
  // Placement et calibration des éléments visuels
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

  // Liste des contrôles / options matérielles supportées par ce modèle
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
};
