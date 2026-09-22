import generic from './generic.js';
import doel_ti_pro_25 from './doel_ti_pro_25.js';

export const LITTER_MODELS = {
  doel_ti_pro_25,
  generic,
};

export const DEFAULT_MODEL_ID = "doel_ti_pro_25";

export function getModelConfig(modelId) {
  return LITTER_MODELS[modelId] || LITTER_MODELS[DEFAULT_MODEL_ID] || LITTER_MODELS.generic;
}
