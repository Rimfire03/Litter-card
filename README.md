# 🐱 Litter-Card

Une carte Lovelace sur-mesure, moderne et épurée pour les bacs à litière automatiques sous **Home Assistant**, prête pour **HACS** (Home Assistant Community Store).

![Litter-card](dist/litiere.png)

---

## ✨ Fonctionnalités

- **Rendu Visuel Interactif** :
  - Intègre nativement la silhouette de la litière.
  - **Aura & témoin d'entrée** : s'illumine en **Vert** lorsque le chat est présent (`occupation = on`) et en **Rouge** en veille/libre.
  - **Poids du chat** affiché directement sur le cadran circulaire inférieur (`poids du chat`).
  - **Alerte Sac Plein** dynamique sur l'image en haut à droite.
- **Statistiques en un coup d'œil** : Nombre de nettoyages, nombre total de visites et durée de la dernière visite.
- **Boutons de Contrôle Manuel** : Nettoyer, Niveler, Remplacement du sac, Sac changé, Redémarrer.
- **Menu Déroulant de Configuration & Paramètres** :
  - Nettoyage automatique (Switch)
  - Nettoyage intensif (Switch)
  - Désodorisation après nettoyage (Switch)
  - Sécurité enfants (Lock / Switch)
  - Délai avant nettoyage (Curseur / Slider)
  - Intervalle de nettoyage (Curseur / Slider)
  - Calibration du sac plein (Curseur / Slider)
  - Type de litière (Sélecteur Minérale / Mixte)
  - Unité de mesure (Sélecteur kg / lb)
- **100% Modulaire** : Toute entité non configurée ou omise sera automatiquement masquée de la carte.
- **Éditeur Graphique Intégré** : Configurez facilement la carte depuis l'interface utilisateur de Lovelace (UI Editor).

---

## 📦 Installation

### Méthode 1 : Via HACS (Recommandé)

1. Ouvrez **Home Assistant** et rendez-vous dans le menu **HACS** > **Interface de l'utilisateur (Frontend)**.
2. Cliquez sur les **3 petits points verticaux** en haut à droite, puis sélectionnez **Dépôts personnalisés** (*Custom repositories*).
3. Renseignez l'URL de votre dépôt GitHub (ex: `https://github.com/votre-compte/Litter-card`) et choisissez la catégorie **Lovelace** (ou Dashboard).
4. Cliquez sur **Ajouter**.
5. Cherchez ensuite **Litter Card** dans la liste HACS et cliquez sur **Télécharger**.
6. Rechargez votre navigateur lorsque Home Assistant vous le demande.

---

### Méthode 2 : Installation Manuelle

1. Téléchargez le fichier `dist/litter-card.js`.
2. Copiez le fichier `litter-card.js` dans le dossier `config/www/` de votre instance Home Assistant.
3. Dans Home Assistant, allez dans **Paramètres** > **Tableaux de bord** > **Ressources** (dans les 3 points en haut à droite).
4. Cliquez sur **Ajouter une ressource** :
   - **URL** : `/local/litter-card.js`
   - **Type de ressource** : `Module JavaScript`
5. Sauvegardez et rafraîchissez votre tableau de bord.

---

## 🛠️ Utilisation et Configuration

### Exemple de configuration YAML pour votre Litière :

```yaml
type: custom:litter-card
title: "Litière Chat"

# Boutons d'action
btn_clean: button.cat_litter_box_clean
btn_level: button.cat_litter_box_level_litter
btn_restart: button.cat_litter_box_device_restart
btn_bag_replace: button.cat_litter_box_bag_replace
btn_bag_changed: button.cat_litter_box_empty

# Capteurs
sensor_occupancy: binary_sensor.cat_litter_box_occupation
sensor_cat_weight: sensor.cat_litter_box_cat_weight
sensor_bin_full: binary_sensor.cat_litter_box_bin_full
sensor_status: sensor.cat_litter_box_etat
sensor_cleanings_count: sensor.cat_litter_box_number_of_cleanings
sensor_total_visits: sensor.cat_litter_box_total_visits
sensor_visit_duration: sensor.cat_litter_box_visit_duration
sensor_problem: binary_sensor.cat_litter_box_probleme

# Configuration & Réglages
cfg_auto_clean: switch.cat_litter_box_nettoyage_automatique
cfg_deep_clean: switch.cat_litter_box_deep_clean
cfg_odor_removal: switch.cat_litter_box_odor_removal_after_cleaning
cfg_child_lock: lock.cat_litter_box_securite_enfant
cfg_clean_wait_time: number.cat_litter_box_clean_wait_time
cfg_clean_interval: number.cat_litter_box_clean_interval
cfg_bin_calibration: number.cat_litter_box_bin_full_calibration
cfg_litter_type: select.cat_litter_box_litter_type
cfg_unit: select.cat_litter_box_unit
```

---

## ⚙️ Options de Configuration

| Paramètre | Type | Description |
| :--- | :--- | :--- |
| `title` | Texte | Titre affiché en haut de la carte (défaut : "Litière") |
| `image` | URL | *(Optionnel)* URL d'une image personnalisée si vous ne souhaitez pas utiliser l'image intégrée par défaut |
| `btn_clean` | Bouton | Déclenche le cycle de nettoyage |
| `btn_level` | Bouton | Aplanit et nivelle la litière |
| `btn_restart` | Bouton | Redémarre l'appareil |
| `btn_bag_replace` | Bouton | Positionne la litière pour le remplacement du sac |
| `btn_bag_changed` | Bouton | Réinitialise l'état après avoir changé le sac |
| `sensor_occupancy` | Capteur binaire | Détecte si le chat est dans le bac (**Vert** = présent, **Rouge** = veille) |
| `sensor_cat_weight` | Capteur | Poids mesuré lors de la visite, affiché sur le cadran central inférieur |
| `sensor_bin_full` | Capteur binaire | Badge d'alerte sac plein affiché en haut à droite de l'image |
| `sensor_status` | Capteur | Statut courant (Nettoyage, Veille, Sécurité enfants...) |
| `sensor_cleanings_count` | Capteur | Nombre de nettoyages effectués |
| `sensor_total_visits` | Capteur | Nombre total de passages du chat |
| `sensor_visit_duration` | Capteur | Durée de la dernière visite |
| `cfg_auto_clean` | Interrupteur | Active/Désactive le nettoyage automatique |
| `cfg_deep_clean` | Interrupteur | Active le mode de nettoyage intensif |
| `cfg_odor_removal` | Interrupteur | Active la désodorisation post-cycle |
| `cfg_child_lock` | Verrou / Switch | Active la sécurité enfants |
| `cfg_clean_wait_time` | Nombre / Slider | Délai avant déclenchement du nettoyage après visite |
| `cfg_clean_interval` | Nombre / Slider | Intervalle périodique de nettoyage |
| `cfg_bin_calibration` | Nombre / Slider | Nombre de cycles avant alerte de sac plein |
| `cfg_litter_type` | Sélecteur | Type de litière (Minérale, Végétale, etc.) |
| `cfg_unit` | Sélecteur | Unité d'affichage du poids (`kg` ou `lb`) |

---

## 📄 Licence

Projet sous licence MIT - Développé pour la communauté Home Assistant.
