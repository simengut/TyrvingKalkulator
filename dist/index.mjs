// src/types.ts
var DEFAULT_CONFIG = {
  allowNegativePoints: true
};

// src/parsers.ts
function parseTimeToSeconds(input) {
  if (typeof input === "number") {
    return input;
  }
  let normalized = input.trim().replace(",", ".");
  if (normalized.includes(":")) {
    const parts = normalized.split(":");
    if (parts.length !== 2) {
      throw new Error(`Invalid time format: ${input}. Expected ss.hh or m:ss.hh`);
    }
    const minutes = parseFloat(parts[0]);
    const seconds2 = parseFloat(parts[1]);
    if (isNaN(minutes) || isNaN(seconds2)) {
      throw new Error(`Invalid time format: ${input}. Could not parse minutes or seconds`);
    }
    return minutes * 60 + seconds2;
  }
  const seconds = parseFloat(normalized);
  if (isNaN(seconds)) {
    throw new Error(`Invalid time format: ${input}. Expected a number`);
  }
  return seconds;
}
function truncateToTenth(seconds) {
  return Math.floor(seconds * 10) / 10;
}
function parseFieldToCm(input) {
  if (typeof input === "number") {
    return input * 100;
  }
  const normalized = input.trim().replace(",", ".");
  const meters = parseFloat(normalized);
  if (isNaN(meters)) {
    throw new Error(`Invalid field result: ${input}. Expected meters (e.g., 4.55 or 4,55)`);
  }
  return meters * 100;
}
function formatTime(seconds) {
  if (seconds < 60) {
    return seconds.toFixed(2);
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toFixed(2).padStart(5, "0")}`;
}
function formatCmToMeters(cm) {
  return (cm / 100).toFixed(2);
}

// src/events.ts
var EVENTS = {
  "gutter_10000_m": { "id": "gutter_10000_m", "displayName": "10000 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.06], "p1000ByAge": { 19: 1950, 18: 1980 }, "timeStep": 0.1 },
  "gutter_10000_m_kappgang": { "id": "gutter_10000_m_kappgang", "displayName": "10000 m Kappgang", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.05], "p1000ByAge": { 19: 2850, 18: 2890, 17: 2960, 16: 3060, 15: 3180 }, "timeStep": 0.1 },
  "gutter_1000_m": { "id": "gutter_1000_m", "displayName": "1000 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1.1], "p1000ByAge": { 19: 150, 18: 153, 17: 156, 16: 159, 15: 164, 14: 169 }, "timeStep": 0.1 },
  "gutter_1000_m_kappgang": { "id": "gutter_1000_m_kappgang", "displayName": "1000 m Kappgang", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.7], "p1000ByAge": { 19: 240, 18: 242, 17: 246, 16: 254, 15: 262, 14: 271, 13: 282, 12: 300, 11: 320 }, "timeStep": 0.1 },
  "gutter_100_m": { "id": "gutter_100_m", "displayName": "100 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1.7], "p1000ByAge": { 19: 11.25, 18: 11.35, 17: 11.5, 16: 11.7, 15: 11.95, 14: 12.35, 13: 12.8, 12: 13.5 }, "timeStep": 0.01, "manualAddSeconds": 0.24 },
  "gutter_100_m_hekk_840cm_85m": { "id": "gutter_100_m_hekk_840cm_85m", "displayName": "100 m hekk 84,0cm/8,5m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1.1], "p1000ByAge": { 15: 14 }, "timeStep": 0.01 },
  "gutter_100_m_hekk_914cm_85m": { "id": "gutter_100_m_hekk_914cm_85m", "displayName": "100 m hekk 91,4cm/8,5m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1.1], "p1000ByAge": { 16: 14.5 }, "timeStep": 0.01 },
  "gutter_110_m_hekk_1000cm_914m": { "id": "gutter_110_m_hekk_1000cm_914m", "displayName": "110 m hekk 100,0cm/9,14m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1], "p1000ByAge": { 19: 15, 18: 15.3, 17: 15.8 }, "timeStep": 0.01, "manualAddSeconds": 0.24 },
  "gutter_110_m_hekk_1067cm_914m": { "id": "gutter_110_m_hekk_1067cm_914m", "displayName": "110 m hekk 106,7cm/9,14m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1], "p1000ByAge": { 19: 15.4, 18: 15.7 }, "timeStep": 0.01, "manualAddSeconds": 0.24 },
  "gutter_110_m_hekk_914cm_914m": { "id": "gutter_110_m_hekk_914cm_914m", "displayName": "110 m hekk 91,4cm/9,14m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1], "p1000ByAge": { 17: 15.3 }, "timeStep": 0.01, "manualAddSeconds": 0.24 },
  "gutter_1500_m": { "id": "gutter_1500_m", "displayName": "1500 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.7], "p1000ByAge": { 19: 240, 18: 242, 17: 246, 16: 252, 15: 260, 14: 268, 13: 278, 12: 294 }, "timeStep": 0.1 },
  "gutter_1500_m_hinder_762cm": { "id": "gutter_1500_m_hinder_762cm", "displayName": "1500 m hinder 76,2cm", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [0.55], "p1000ByAge": { 16: 28e3, 15: 28800, 14: 3e4 } },
  "gutter_20000_m_kappgang": { "id": "gutter_20000_m_kappgang", "displayName": "20000 m Kappgang", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.02], "p1000ByAge": { 19: 5880, 18: 6e3 }, "timeStep": 0.1 },
  "gutter_2000_m": { "id": "gutter_2000_m", "displayName": "2000 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.5], "p1000ByAge": { 19: 338, 18: 341, 17: 346, 16: 355, 15: 365, 14: 380 }, "timeStep": 0.1, "multByAge": { 19: [0.5], 18: [0.45], 17: [0.45], 16: [0.45], 15: [0.45], 14: [0.45] } },
  "gutter_2000_m_hinder_914cm": { "id": "gutter_2000_m_hinder_914cm", "displayName": "2000 m hinder 91,4cm", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [0.41], "p1000ByAge": { 19: 37e3, 18: 37500, 17: 38500 } },
  "gutter_2000_m_kappgang": { "id": "gutter_2000_m_kappgang", "displayName": "2000 m Kappgang", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.3], "p1000ByAge": { 19: 505, 18: 510, 17: 518, 16: 531, 15: 548, 14: 570, 13: 594 }, "timeStep": 0.1 },
  "gutter_200_m": { "id": "gutter_200_m", "displayName": "200 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.85], "p1000ByAge": { 19: 22.5, 18: 22.65, 17: 23, 16: 23.5, 15: 24, 14: 24.8, 13: 26, 12: 27.6, 11: 29.2 }, "timeStep": 0.01, "manualAddSeconds": 0.24 },
  "gutter_200_m_hekk_680cm_1829m": { "id": "gutter_200_m_hekk_680cm_1829m", "displayName": "200 m hekk 68,0cm/18,29m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.6], "p1000ByAge": { 13: 31.2, 12: 32.8, 11: 34.8 }, "timeStep": 0.01 },
  "gutter_200_m_hekk_762cm_1829m": { "id": "gutter_200_m_hekk_762cm_1829m", "displayName": "200 m hekk 76,2cm/18,29m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.6], "p1000ByAge": { 19: 26, 18: 26.5, 17: 27, 16: 27.6, 15: 28.4, 14: 29.2 }, "timeStep": 0.01 },
  "gutter_3000_m": { "id": "gutter_3000_m", "displayName": "3000 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.27], "p1000ByAge": { 19: 523, 18: 530, 17: 540, 16: 552 }, "timeStep": 0.1 },
  "gutter_3000_m_hinder_914cm": { "id": "gutter_3000_m_hinder_914cm", "displayName": "3000 m hinder 91,4cm", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [0.27], "p1000ByAge": { 19: 58500, 18: 59500, 17: 61e3 } },
  "gutter_3000_m_kappgang": { "id": "gutter_3000_m_kappgang", "displayName": "3000 m Kappgang", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.18], "p1000ByAge": { 19: 788, 18: 796, 17: 810, 16: 830, 15: 854, 14: 892, 13: 924 }, "timeStep": 0.1 },
  "gutter_300_m": { "id": "gutter_300_m", "displayName": "300 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.6], "p1000ByAge": { 19: 36.15, 18: 36.45, 17: 36.85, 16: 37.6, 15: 38.6, 14: 40, 13: 42, 12: 45 }, "timeStep": 0.01, "manualAddSeconds": 0.2 },
  "gutter_300_m_hekk_762cm_35m": { "id": "gutter_300_m_hekk_762cm_35m", "displayName": "300 m hekk 76,2cm/35m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.46], "p1000ByAge": { 15: 43, 14: 44.7 }, "timeStep": 0.01 },
  "gutter_300_m_hekk_840cm_35m": { "id": "gutter_300_m_hekk_840cm_35m", "displayName": "300 m hekk 84,0cm/35m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.46], "p1000ByAge": { 17: 41, 16: 41.8 }, "timeStep": 0.01 },
  "gutter_300_m_hekk_914cm_35m": { "id": "gutter_300_m_hekk_914cm_35m", "displayName": "300 m hekk 91,4cm/35m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.46], "p1000ByAge": { 19: 40, 18: 40.5 }, "timeStep": 0.01 },
  "gutter_400_m": { "id": "gutter_400_m", "displayName": "400 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.4], "p1000ByAge": { 19: 50.4, 18: 51, 17: 51.5, 16: 52.5, 15: 54.3, 14: 56.5 }, "timeStep": 0.01, "manualAddSeconds": 0.14 },
  "gutter_400_m_hekk_840cm_35m": { "id": "gutter_400_m_hekk_840cm_35m", "displayName": "400 m hekk 84,0cm/35m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.34], "p1000ByAge": { 17: 57 }, "timeStep": 0.01 },
  "gutter_400_m_hekk_914cm_35m": { "id": "gutter_400_m_hekk_914cm_35m", "displayName": "400 m hekk 91,4cm/35m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.34], "p1000ByAge": { 19: 55.5, 18: 56 }, "timeStep": 0.01 },
  "gutter_40_m": { "id": "gutter_40_m", "displayName": "40 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [3.5], "p1000ByAge": { 11: 6.4, 10: 6.6 }, "timeStep": 0.01 },
  "gutter_5000_m": { "id": "gutter_5000_m", "displayName": "5000 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.15], "p1000ByAge": { 19: 910, 18: 930, 17: 950 }, "timeStep": 0.1 },
  "gutter_5000_m_kappgang": { "id": "gutter_5000_m_kappgang", "displayName": "5000 m Kappgang", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.11], "p1000ByAge": { 19: 1350, 18: 1365, 17: 1395, 16: 1440, 15: 1500, 14: 1600 }, "timeStep": 0.1 },
  "gutter_600_m": { "id": "gutter_600_m", "displayName": "600 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [2.6], "p1000ByAge": { 19: 82, 18: 83, 17: 84, 16: 86, 15: 88.5, 14: 91, 13: 94.5, 12: 99, 11: 105, 10: 112 }, "timeStep": 0.1 },
  "gutter_60_m": { "id": "gutter_60_m", "displayName": "60 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [2.7], "p1000ByAge": { 19: 7.2, 18: 7.25, 17: 7.3, 16: 7.4, 15: 7.55, 14: 7.75, 13: 8, 12: 8.4, 11: 8.8, 10: 9.2 }, "timeStep": 0.01, "manualAddSeconds": 0.2 },
  "gutter_60_m_hekk_680cm_65m": { "id": "gutter_60_m_hekk_680cm_65m", "displayName": "60 m hekk 68,0cm/6,5m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [2], "p1000ByAge": { 11: 10.5, 10: 11.3 }, "timeStep": 0.01 },
  "gutter_60_m_hekk_762cm_75m": { "id": "gutter_60_m_hekk_762cm_75m", "displayName": "60 m hekk 76,2cm/7,5m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [2], "p1000ByAge": { 13: 9.8 }, "timeStep": 0.01 },
  "gutter_60_m_hekk_762cm_7m": { "id": "gutter_60_m_hekk_762cm_7m", "displayName": "60 m hekk 76,2cm/7m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [2], "p1000ByAge": { 12: 10.2 }, "timeStep": 0.01 },
  "gutter_800_m": { "id": "gutter_800_m", "displayName": "800 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1.8], "p1000ByAge": { 19: 114, 18: 115.5, 17: 117.5, 16: 120, 15: 124, 14: 129 }, "timeStep": 0.1 },
  "gutter_80_m": { "id": "gutter_80_m", "displayName": "80 m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [2.2], "p1000ByAge": { 19: 9.3, 18: 9.35, 17: 9.45, 16: 9.6, 15: 9.8, 14: 10.05, 13: 10.4, 12: 10.9, 11: 11.55, 10: 12.15 }, "timeStep": 0.01, "manualAddSeconds": 0.2 },
  "gutter_80_m_hekk_840cm_8m": { "id": "gutter_80_m_hekk_840cm_8m", "displayName": "80 m hekk 84,0cm/8m", "gender": "gutter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1.4], "p1000ByAge": { 14: 12.05 }, "timeStep": 0.01 },
  "gutter_diskos_06kg": { "id": "gutter_diskos_06kg", "displayName": "Diskos 0,6kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.13, 0.25, 0.5], "p1000ByAge": { 11: 2800, 10: 2200 }, "p80ByAge": { 11: 2240, 10: 1760 }, "pointsAt80ByAge": { 11: 860, 10: 890 } },
  "gutter_diskos_075kg": { "id": "gutter_diskos_075kg", "displayName": "Diskos 0,75kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.13, 0.25, 0.5], "p1000ByAge": { 13: 4e3, 12: 3200 }, "p80ByAge": { 13: 3200, 12: 2560 }, "pointsAt80ByAge": { 13: 800, 12: 840 } },
  "gutter_diskos_15kg": { "id": "gutter_diskos_15kg", "displayName": "Diskos 1,5kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.13, 0.25, 0.5], "p1000ByAge": { 17: 4800, 16: 4500 }, "p80ByAge": { 17: 3840, 16: 3600 }, "pointsAt80ByAge": { 17: 760, 16: 775 } },
  "gutter_diskos_175kg": { "id": "gutter_diskos_175kg", "displayName": "Diskos 1,75kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.13, 0.25, 0.5], "p1000ByAge": { 19: 4800, 18: 4600 }, "p80ByAge": { 19: 3840, 18: 3680 }, "pointsAt80ByAge": { 19: 760, 18: 770 } },
  "gutter_diskos_1kg": { "id": "gutter_diskos_1kg", "displayName": "Diskos 1kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.13, 0.25, 0.5], "p1000ByAge": { 15: 5100, 14: 4400 }, "p80ByAge": { 15: 4080, 14: 3520 }, "pointsAt80ByAge": { 15: 745, 14: 780 } },
  "gutter_hoyde": { "id": "gutter_hoyde", "displayName": "H\xF8yde", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [7], "p1000ByAge": { 19: 199, 18: 196, 17: 193, 16: 188, 15: 180, 14: 172, 13: 161, 12: 150, 11: 138, 10: 125 } },
  "gutter_hoyde_uten_tillop": { "id": "gutter_hoyde_uten_tillop", "displayName": "H\xF8yde uten till\xF8p", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [8.5], "p1000ByAge": { 19: 161, 18: 159, 17: 155, 16: 150, 15: 144, 14: 137, 13: 129, 12: 120, 11: 110, 10: 100 } },
  "gutter_kule_2kg": { "id": "gutter_kule_2kg", "displayName": "Kule 2kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.3, 0.6, 1.2], "p1000ByAge": { 11: 1050, 10: 850 }, "p80ByAge": { 11: 840, 10: 680 }, "pointsAt80ByAge": { 11: 874, 10: 898 } },
  "gutter_kule_3kg": { "id": "gutter_kule_3kg", "displayName": "Kule 3kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.3, 0.6, 1.2], "p1000ByAge": { 13: 1350, 12: 1130 }, "p80ByAge": { 13: 1080, 12: 904 }, "pointsAt80ByAge": { 13: 838, 12: 864.4 } },
  "gutter_kule_4kg": { "id": "gutter_kule_4kg", "displayName": "Kule 4kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.3, 0.6, 1.2], "p1000ByAge": { 15: 1530, 14: 1330 }, "p80ByAge": { 15: 1224, 14: 1064 }, "pointsAt80ByAge": { 15: 816.4, 14: 840.4 } },
  "gutter_kule_5kg": { "id": "gutter_kule_5kg", "displayName": "Kule 5kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.3, 0.6, 1.2], "p1000ByAge": { 17: 1580, 16: 1460 }, "p80ByAge": { 17: 1264, 16: 1168 }, "pointsAt80ByAge": { 17: 810.4, 16: 824.8 } },
  "gutter_kule_6kg": { "id": "gutter_kule_6kg", "displayName": "Kule 6kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.3, 0.6, 1.2], "p1000ByAge": { 19: 1520, 18: 1460 }, "p80ByAge": { 19: 1216, 18: 1168 }, "pointsAt80ByAge": { 19: 817.6, 18: 824.8 } },
  "gutter_lengde": { "id": "gutter_lengde", "displayName": "Lengde", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [2], "p1000ByAge": { 19: 695, 18: 680, 17: 660, 16: 640, 15: 615, 14: 575, 13: 535, 12: 495, 11: 455, 10: 415 } },
  "gutter_lengde_uten_tillop": { "id": "gutter_lengde_uten_tillop", "displayName": "Lengde uten till\xF8p", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [5], "p1000ByAge": { 19: 315, 18: 310, 17: 305, 16: 298, 15: 288, 14: 275, 13: 260, 12: 245, 11: 228, 10: 210 } },
  "gutter_liten_ball_150g": { "id": "gutter_liten_ball_150g", "displayName": "Liten ball 150g", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.08, 0.15, 0.3], "p1000ByAge": { 14: 8e3, 13: 7e3, 12: 6300, 11: 5500, 10: 4800 }, "p80ByAge": { 14: 6400, 13: 5600, 12: 5040, 11: 4400, 10: 3840 }, "pointsAt80ByAge": { 14: 760, 13: 790, 12: 811, 11: 835, 10: 856 } },
  "gutter_slegge_2kg_110cm": { "id": "gutter_slegge_2kg_110cm", "displayName": "Slegge 2kg/110cm", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.1, 0.2, 0.4], "p1000ByAge": { 12: 3800, 11: 3e3, 10: 2200 }, "p80ByAge": { 12: 3040, 11: 2400, 10: 1760 }, "pointsAt80ByAge": { 12: 848, 11: 880, 10: 912 } },
  "gutter_slegge_3kg_1195cm": { "id": "gutter_slegge_3kg_1195cm", "displayName": "Slegge 3kg/119,5cm", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.1, 0.2, 0.4], "p1000ByAge": { 13: 3700 }, "p80ByAge": { 13: 2960 }, "pointsAt80ByAge": { 13: 852 } },
  "gutter_slegge_4kg_1195cm": { "id": "gutter_slegge_4kg_1195cm", "displayName": "Slegge 4kg/119,5cm", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.1, 0.2, 0.4], "p1000ByAge": { 15: 5e3, 14: 4100 }, "p80ByAge": { 15: 4e3, 14: 3280 }, "pointsAt80ByAge": { 15: 800, 14: 836 } },
  "gutter_slegge_5kg_120cm": { "id": "gutter_slegge_5kg_120cm", "displayName": "Slegge 5kg/120cm", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.1, 0.2, 0.4], "p1000ByAge": { 17: 5900, 16: 5200 }, "p80ByAge": { 17: 4720, 16: 4160 }, "pointsAt80ByAge": { 17: 764, 16: 792 } },
  "gutter_slegge_6kg_1215cm": { "id": "gutter_slegge_6kg_1215cm", "displayName": "Slegge 6kg/121,5cm", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.1, 0.2, 0.4], "p1000ByAge": { 19: 6200, 18: 5600 }, "p80ByAge": { 19: 4960, 18: 4480 }, "pointsAt80ByAge": { 19: 752, 18: 776 } },
  "gutter_slengball_1kg_kort_reim": { "id": "gutter_slengball_1kg_kort_reim", "displayName": "Slengball 1kg/Kort reim", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.08, 0.15, 0.3], "p1000ByAge": { 12: 3600, 11: 3e3, 10: 2400 }, "p80ByAge": { 12: 2880, 11: 2400, 10: 1920 }, "pointsAt80ByAge": { 12: 892, 11: 910, 10: 928 } },
  "gutter_spyd_04kg": { "id": "gutter_spyd_04kg", "displayName": "Spyd 0,4kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.1, 0.2, 0.4], "p1000ByAge": { 13: 4500, 12: 3800, 11: 3200, 10: 2500 }, "p80ByAge": { 13: 3600, 12: 3040, 11: 2560, 10: 2e3 }, "pointsAt80ByAge": { 13: 820, 12: 848, 11: 872, 10: 900 } },
  "gutter_spyd_06kg": { "id": "gutter_spyd_06kg", "displayName": "Spyd 0,6kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.1, 0.2, 0.4], "p1000ByAge": { 15: 5200, 14: 4600 }, "p80ByAge": { 15: 4160, 14: 3680 }, "pointsAt80ByAge": { 15: 792, 14: 816 } },
  "gutter_spyd_07kg": { "id": "gutter_spyd_07kg", "displayName": "Spyd 0,7kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.1, 0.2, 0.4], "p1000ByAge": { 17: 6e3, 16: 5500 }, "p80ByAge": { 17: 4800, 16: 4400 }, "pointsAt80ByAge": { 17: 760, 16: 780 } },
  "gutter_spyd_08kg": { "id": "gutter_spyd_08kg", "displayName": "Spyd 0,8kg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.1, 0.2, 0.4], "p1000ByAge": { 19: 6200, 18: 5900 }, "p80ByAge": { 19: 4960, 18: 4720 }, "pointsAt80ByAge": { 19: 752, 18: 764 } },
  "gutter_stav": { "id": "gutter_stav", "displayName": "Stav", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [1.7, 3.5, 7], "p1000ByAge": { 19: 450, 18: 430, 17: 405, 16: 380, 15: 350, 14: 320, 13: 290, 12: 260, 11: 230, 10: 200 }, "p80ByAge": { 19: 360, 18: 344, 17: 324, 16: 304, 15: 280, 14: 256, 13: 232, 12: 208, 11: 184, 10: 160 }, "pointsAt80ByAge": { 19: 685, 18: 699, 17: 716, 16: 734, 15: 755, 14: 776, 13: 797, 12: 818, 11: 839, 10: 860 } },
  "gutter_tresteg": { "id": "gutter_tresteg", "displayName": "Tresteg", "gender": "gutter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [1], "p1000ByAge": { 19: 1430, 18: 1400, 17: 1370, 16: 1330, 15: 1280, 14: 1200, 13: 1110, 12: 1010, 11: 920, 10: 820 } },
  "jenter_10000_m": { "id": "jenter_10000_m", "displayName": "10000 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.06], "p1000ByAge": { 19: 2280, 18: 2310 }, "timeStep": 0.1 },
  "jenter_10000_m_kappgang": { "id": "jenter_10000_m_kappgang", "displayName": "10000 m Kappgang", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.05], "p1000ByAge": { 19: 3300, 18: 3330, 17: 3390, 16: 3450, 15: 3540 }, "timeStep": 0.1 },
  "jenter_1000_m": { "id": "jenter_1000_m", "displayName": "1000 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1], "p1000ByAge": { 19: 179, 18: 180, 17: 181.5, 16: 184, 15: 186.5, 14: 189 }, "timeStep": 0.1 },
  "jenter_1000_m_kappgang": { "id": "jenter_1000_m_kappgang", "displayName": "1000 m Kappgang", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.7], "p1000ByAge": { 19: 266, 18: 268, 17: 270, 16: 272, 15: 275, 14: 280, 13: 288, 12: 303, 11: 320 }, "timeStep": 0.1 },
  "jenter_100_m": { "id": "jenter_100_m", "displayName": "100 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1.6], "p1000ByAge": { 19: 12.4, 18: 12.5, 17: 12.6, 16: 12.75, 15: 12.9, 14: 13.1, 13: 13.4, 12: 13.8 }, "timeStep": 0.01, "manualAddSeconds": 0.24 },
  "jenter_100_m_hekk_762cm_85m": { "id": "jenter_100_m_hekk_762cm_85m", "displayName": "100 m hekk 76,2cm/8,5m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1], "p1000ByAge": { 17: 15 }, "timeStep": 0.01 },
  "jenter_100_m_hekk_840cm_85m": { "id": "jenter_100_m_hekk_840cm_85m", "displayName": "100 m hekk 84,0cm/8,5m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1], "p1000ByAge": { 19: 14.7, 18: 14.9 }, "timeStep": 0.01 },
  "jenter_1500_m": { "id": "jenter_1500_m", "displayName": "1500 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.6], "p1000ByAge": { 19: 275, 18: 277, 17: 279, 16: 282, 15: 286, 14: 295, 13: 305, 12: 315 }, "timeStep": 0.1 },
  "jenter_1500_m_hinder_762cm": { "id": "jenter_1500_m_hinder_762cm", "displayName": "1500 m hinder 76,2cm", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [0.46], "p1000ByAge": { 16: 32500, 15: 33e3, 14: 34e3 } },
  "jenter_20000_m_kappgang": { "id": "jenter_20000_m_kappgang", "displayName": "20000 m Kappgang", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.02], "p1000ByAge": { 19: 6720, 18: 6810 }, "timeStep": 0.1 },
  "jenter_2000_m": { "id": "jenter_2000_m", "displayName": "2000 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.4], "p1000ByAge": { 19: 385, 18: 389, 17: 393, 16: 398, 15: 406, 14: 418 }, "timeStep": 0.1 },
  "jenter_2000_m_hinder_762cm": { "id": "jenter_2000_m_hinder_762cm", "displayName": "2000 m hinder 76,2cm", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [0.35], "p1000ByAge": { 19: 41e3, 18: 42e3, 17: 43e3 } },
  "jenter_2000_m_kappgang": { "id": "jenter_2000_m_kappgang", "displayName": "2000 m Kappgang", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.3], "p1000ByAge": { 19: 570, 18: 574, 17: 578, 16: 588, 15: 600, 14: 620, 13: 640 }, "timeStep": 0.1 },
  "jenter_200_m": { "id": "jenter_200_m", "displayName": "200 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.78], "p1000ByAge": { 19: 25.55, 18: 25.7, 17: 25.9, 16: 26.15, 15: 26.5, 14: 27.1, 13: 27.7, 12: 28.5, 11: 29.7 }, "timeStep": 0.01, "manualAddSeconds": 0.24 },
  "jenter_200_m_hekk_680cm_19m": { "id": "jenter_200_m_hekk_680cm_19m", "displayName": "200 m hekk 68,0cm/19m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.5], "p1000ByAge": { 13: 32.4, 12: 34, 11: 36 }, "timeStep": 0.01 },
  "jenter_200_m_hekk_762cm_19m": { "id": "jenter_200_m_hekk_762cm_19m", "displayName": "200 m hekk 76,2cm/19m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.5], "p1000ByAge": { 19: 29.5, 18: 29.7, 17: 30, 16: 30.4, 15: 31, 14: 31.6 }, "timeStep": 0.01 },
  "jenter_3000_m": { "id": "jenter_3000_m", "displayName": "3000 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.23], "p1000ByAge": { 19: 600, 18: 607, 17: 615, 16: 625 }, "timeStep": 0.1 },
  "jenter_3000_m_hinder_762cm": { "id": "jenter_3000_m_hinder_762cm", "displayName": "3000 m hinder 76,2cm", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [0.2], "p1000ByAge": { 19: 65e3, 18: 67e3, 17: 7e4 } },
  "jenter_3000_m_kappgang": { "id": "jenter_3000_m_kappgang", "displayName": "3000 m Kappgang", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.18], "p1000ByAge": { 19: 895, 18: 900, 17: 906, 16: 920, 15: 936, 14: 962, 13: 1002 }, "timeStep": 0.1 },
  "jenter_300_m": { "id": "jenter_300_m", "displayName": "300 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.5], "p1000ByAge": { 19: 40.5, 18: 40.8, 17: 41.2, 16: 41.7, 15: 42.5, 14: 43.4, 13: 44.5, 12: 45.8 }, "timeStep": 0.01, "manualAddSeconds": 0.2 },
  "jenter_300_m_hekk_762cm_35m": { "id": "jenter_300_m_hekk_762cm_35m", "displayName": "300 m hekk 76,2cm/35m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.4], "p1000ByAge": { 19: 45.2, 18: 45.5, 17: 45.9, 16: 46.4, 15: 47, 14: 48 }, "timeStep": 0.01 },
  "jenter_400_m": { "id": "jenter_400_m", "displayName": "400 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.38], "p1000ByAge": { 19: 57, 18: 57.5, 17: 58, 16: 58.8, 15: 60, 14: 61.6 }, "timeStep": 0.01, "manualAddSeconds": 0.14 },
  "jenter_400_m_hekk_762cm_35m": { "id": "jenter_400_m_hekk_762cm_35m", "displayName": "400 m hekk 76,2cm/35m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.3], "p1000ByAge": { 19: 62.5, 18: 63.1 }, "timeStep": 0.01 },
  "jenter_40_m": { "id": "jenter_40_m", "displayName": "40 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [3.5], "p1000ByAge": { 11: 6.4, 10: 6.6 }, "timeStep": 0.01 },
  "jenter_5000_m": { "id": "jenter_5000_m", "displayName": "5000 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.13], "p1000ByAge": { 19: 1055, 18: 1065, 17: 1080 }, "timeStep": 0.1 },
  "jenter_5000_m_kappgang": { "id": "jenter_5000_m_kappgang", "displayName": "5000 m Kappgang", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [0.1], "p1000ByAge": { 19: 1524, 18: 1538, 17: 1555, 16: 1585, 15: 1615, 14: 1660 }, "timeStep": 0.1 },
  "jenter_600_m": { "id": "jenter_600_m", "displayName": "600 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [2.4], "p1000ByAge": { 19: 94, 18: 95, 17: 96, 16: 97, 15: 98.5, 14: 100, 13: 102, 12: 105, 11: 110, 10: 115 }, "timeStep": 0.1 },
  "jenter_60_m": { "id": "jenter_60_m", "displayName": "60 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [2.7], "p1000ByAge": { 19: 7.9, 18: 7.95, 17: 8, 16: 8.05, 15: 8.15, 14: 8.25, 13: 8.4, 12: 8.55, 11: 8.85, 10: 9.25 }, "timeStep": 0.01, "manualAddSeconds": 0.2 },
  "jenter_60_m_hekk_680cm_65m": { "id": "jenter_60_m_hekk_680cm_65m", "displayName": "60 m hekk 68,0cm/6,5m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1.9], "p1000ByAge": { 11: 10.9, 10: 11.6 }, "timeStep": 0.01 },
  "jenter_60_m_hekk_762cm_75m": { "id": "jenter_60_m_hekk_762cm_75m", "displayName": "60 m hekk 76,2cm/7,5m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1.9], "p1000ByAge": { 14: 9.7, 13: 10.1 }, "timeStep": 0.01 },
  "jenter_60_m_hekk_762cm_7m": { "id": "jenter_60_m_hekk_762cm_7m", "displayName": "60 m hekk 76,2cm/7m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1.9], "p1000ByAge": { 12: 10.5 }, "timeStep": 0.01 },
  "jenter_800_m": { "id": "jenter_800_m", "displayName": "800 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1.5], "p1000ByAge": { 19: 132.5, 18: 133, 17: 134, 16: 136, 15: 138.5, 14: 141 }, "timeStep": 0.1 },
  "jenter_80_m": { "id": "jenter_80_m", "displayName": "80 m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [2.1], "p1000ByAge": { 19: 10.1, 18: 10.15, 17: 10.25, 16: 10.35, 15: 10.5, 14: 10.65, 13: 10.85, 12: 11.1, 11: 11.6, 10: 12.2 }, "timeStep": 0.01, "manualAddSeconds": 0.2 },
  "jenter_80_m_hekk_762cm_8m": { "id": "jenter_80_m_hekk_762cm_8m", "displayName": "80 m hekk 76,2cm/8m", "gender": "jenter", "kind": "time", "direction": "lowerIsBetter", "multType": "single", "mult": [1.4], "p1000ByAge": { 16: 12.2, 15: 12.5 }, "timeStep": 0.01 },
  "jenter_diskos_06_kg": { "id": "jenter_diskos_06_kg", "displayName": "Diskos 0,6 kg", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.15, 0.3, 0.6], "p1000ByAge": { 10: 1800 }, "p80ByAge": { 10: 1440 }, "pointsAt80ByAge": { 10: 892 } },
  "jenter_diskos_06kg": { "id": "jenter_diskos_06kg", "displayName": "Diskos 0,6kg", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.15, 0.3, 0.6], "p1000ByAge": { 13: 3800, 12: 3200, 11: 2600 }, "p80ByAge": { 13: 3040, 12: 2560, 11: 2080 }, "pointsAt80ByAge": { 13: 772, 12: 808, 11: 844 } },
  "jenter_diskos_075kg": { "id": "jenter_diskos_075kg", "displayName": "Diskos 0,75kg", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.15, 0.3, 0.6], "p1000ByAge": { 15: 4300, 14: 3800 }, "p80ByAge": { 15: 3440, 14: 3040 }, "pointsAt80ByAge": { 15: 742, 14: 772 } },
  "jenter_diskos_1kg": { "id": "jenter_diskos_1kg", "displayName": "Diskos 1kg", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.15, 0.3, 0.6], "p1000ByAge": { 19: 4300, 18: 4200, 17: 4e3, 16: 3700 }, "p80ByAge": { 19: 3440, 18: 3360, 17: 3200, 16: 2960 }, "pointsAt80ByAge": { 19: 742, 18: 748, 17: 760, 16: 778 } },
  "jenter_hoyde": { "id": "jenter_hoyde", "displayName": "H\xF8yde", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [7.5], "p1000ByAge": { 19: 170, 18: 168, 17: 166, 16: 164, 15: 161, 14: 158, 13: 152, 12: 144, 11: 134, 10: 122 } },
  "jenter_hoyde_uten_tillop": { "id": "jenter_hoyde_uten_tillop", "displayName": "H\xF8yde uten till\xF8p", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [9.5], "p1000ByAge": { 19: 138, 18: 137, 17: 136, 16: 135, 15: 133, 14: 130, 13: 126, 12: 120, 11: 110, 10: 100 } },
  "jenter_kule_2_kg": { "id": "jenter_kule_2_kg", "displayName": "Kule 2 kg", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.3, 0.6, 1.2], "p1000ByAge": { 10: 680 }, "p80ByAge": { 10: 544 }, "pointsAt80ByAge": { 10: 918.4 } },
  "jenter_kule_2kg": { "id": "jenter_kule_2kg", "displayName": "Kule 2kg", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.3, 0.6, 1.2], "p1000ByAge": { 13: 1120, 12: 1020, 11: 880 }, "p80ByAge": { 13: 896, 12: 816, 11: 704 }, "pointsAt80ByAge": { 13: 865.6, 12: 877.6, 11: 894.4 } },
  "jenter_kule_3kg": { "id": "jenter_kule_3kg", "displayName": "Kule 3kg", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.3, 0.6, 1.2], "p1000ByAge": { 17: 1260, 16: 1200, 15: 1140, 14: 1080 }, "p80ByAge": { 17: 1008, 16: 960, 15: 912, 14: 864 }, "pointsAt80ByAge": { 17: 848.8, 16: 856, 15: 863.2, 14: 870.4 } },
  "jenter_kule_4kg": { "id": "jenter_kule_4kg", "displayName": "Kule 4kg", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.3, 0.6, 1.2], "p1000ByAge": { 19: 1170, 18: 1140 }, "p80ByAge": { 19: 936, 18: 912 }, "pointsAt80ByAge": { 19: 859.6, 18: 863.2 } },
  "jenter_lengde": { "id": "jenter_lengde", "displayName": "Lengde", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [2.1], "p1000ByAge": { 19: 570, 18: 563, 17: 555, 16: 547, 15: 536, 14: 525, 13: 500, 12: 470, 11: 435, 10: 410 } },
  "jenter_lengde_uten_tillop": { "id": "jenter_lengde_uten_tillop", "displayName": "Lengde uten till\xF8p", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [6], "p1000ByAge": { 19: 266, 18: 264, 17: 262, 16: 259, 15: 254, 14: 248, 13: 240, 12: 230, 11: 218, 10: 205 } },
  "jenter_liten_ball_150g": { "id": "jenter_liten_ball_150g", "displayName": "Liten ball 150g", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.1, 0.2, 0.4], "p1000ByAge": { 14: 6200, 13: 5600, 12: 5e3, 11: 4300, 10: 3800 }, "p80ByAge": { 14: 4960, 13: 4480, 12: 4e3, 11: 3440, 10: 3040 }, "pointsAt80ByAge": { 14: 752, 13: 776, 12: 800, 11: 828, 10: 848 } },
  "jenter_slegge_2_kg_110cm": { "id": "jenter_slegge_2_kg_110cm", "displayName": "Slegge 2 kg/110cm", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.12, 0.25, 0.5], "p1000ByAge": { 10: 2e3 }, "p80ByAge": { 10: 1600 }, "pointsAt80ByAge": { 10: 900 } },
  "jenter_slegge_2kg_110cm": { "id": "jenter_slegge_2kg_110cm", "displayName": "Slegge 2kg/110cm", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.12, 0.25, 0.5], "p1000ByAge": { 13: 3800, 12: 3300, 11: 2700 }, "p80ByAge": { 13: 3040, 12: 2640, 11: 2160 }, "pointsAt80ByAge": { 13: 810, 12: 835, 11: 865 } },
  "jenter_slegge_3kg_1195cm": { "id": "jenter_slegge_3kg_1195cm", "displayName": "Slegge 3kg/119,5cm", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.12, 0.25, 0.5], "p1000ByAge": { 17: 4400, 16: 4100, 15: 3800, 14: 3400 }, "p80ByAge": { 17: 3520, 16: 3280, 15: 3040, 14: 2720 }, "pointsAt80ByAge": { 17: 780, 16: 795, 15: 810, 14: 830 } },
  "jenter_slegge_4kg_1195cm": { "id": "jenter_slegge_4kg_1195cm", "displayName": "Slegge 4kg/119,5cm", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.12, 0.25, 0.5], "p1000ByAge": { 19: 4800, 18: 4600 }, "p80ByAge": { 19: 3840, 18: 3680 }, "pointsAt80ByAge": { 19: 760, 18: 770 } },
  "jenter_slengball_1kg_kort_reim": { "id": "jenter_slengball_1kg_kort_reim", "displayName": "Slengball 1kg/Kort reim", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.13, 0.25, 0.5], "p1000ByAge": { 12: 3100, 11: 2600, 10: 2e3 }, "p80ByAge": { 12: 2480, 11: 2080, 10: 1600 }, "pointsAt80ByAge": { 12: 845, 11: 870, 10: 900 } },
  "jenter_spyd_04_kg": { "id": "jenter_spyd_04_kg", "displayName": "Spyd 0,4 kg", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.13, 0.25, 0.5], "p1000ByAge": { 10: 2e3 }, "p80ByAge": { 10: 1600 }, "pointsAt80ByAge": { 10: 900 } },
  "jenter_spyd_04kg": { "id": "jenter_spyd_04kg", "displayName": "Spyd 0,4kg", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.13, 0.25, 0.5], "p1000ByAge": { 14: 3900, 13: 3600, 12: 3200, 11: 2700 }, "p80ByAge": { 14: 3120, 13: 2880, 12: 2560, 11: 2160 }, "pointsAt80ByAge": { 14: 805, 13: 820, 12: 840, 11: 865 } },
  "jenter_spyd_05kg": { "id": "jenter_spyd_05kg", "displayName": "Spyd 0,5kg", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.13, 0.25, 0.5], "p1000ByAge": { 17: 4200, 16: 4e3, 15: 3800 }, "p80ByAge": { 17: 3360, 16: 3200, 15: 3040 }, "pointsAt80ByAge": { 17: 790, 16: 800, 15: 810 } },
  "jenter_spyd_06kg": { "id": "jenter_spyd_06kg", "displayName": "Spyd 0,6kg", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [0.13, 0.25, 0.5], "p1000ByAge": { 19: 4300, 18: 4200 }, "p80ByAge": { 19: 3440, 18: 3360 }, "pointsAt80ByAge": { 19: 785, 18: 790 } },
  "jenter_stav": { "id": "jenter_stav", "displayName": "Stav", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "threeInterval", "mult": [2, 4, 8], "p1000ByAge": { 19: 340, 18: 330, 17: 320, 16: 310, 15: 295, 14: 280, 13: 250, 12: 220, 11: 200, 10: 180 }, "p80ByAge": { 19: 272, 18: 264, 17: 256, 16: 248, 15: 236, 14: 224, 13: 200, 12: 176, 11: 160, 10: 144 }, "pointsAt80ByAge": { 19: 728, 18: 736, 17: 744, 16: 752, 15: 764, 14: 776, 13: 800, 12: 824, 11: 840, 10: 856 } },
  "jenter_tresteg": { "id": "jenter_tresteg", "displayName": "Tresteg", "gender": "jenter", "kind": "field_cm", "direction": "higherIsBetter", "multType": "single", "mult": [1], "p1000ByAge": { 19: 1260, 18: 1240, 17: 1220, 16: 1190, 15: 1140, 14: 1080, 13: 1020, 12: 950, 11: 880, 10: 800 } }
};
function getEventsByGender(gender) {
  return Object.values(EVENTS).filter((e) => e.gender === gender);
}
function getUniqueEventNames() {
  const names = /* @__PURE__ */ new Set();
  Object.values(EVENTS).forEach((e) => names.add(e.displayName));
  return Array.from(names).sort();
}

// src/calculator.ts
function getMultipliers(event, age) {
  if (event.multByAge && event.multByAge[age]) {
    return event.multByAge[age];
  }
  return event.mult;
}
function calculatePoints(input, config = { allowNegativePoints: true }) {
  const { eventId, age, result, timing = "automatic" } = input;
  const event = EVENTS[eventId];
  if (!event) {
    return {
      success: false,
      error: `Unknown event: ${eventId}`,
      code: "INVALID_EVENT"
    };
  }
  if (age < 10 || age > 19) {
    return {
      success: false,
      error: `Age must be between 10 and 19, got: ${age}`,
      code: "INVALID_AGE"
    };
  }
  const p1000 = event.p1000ByAge[age];
  if (p1000 === void 0 || p1000 === null) {
    return {
      success: false,
      error: `Event "${event.displayName}" is not supported for age ${age}`,
      code: "AGE_NOT_SUPPORTED"
    };
  }
  try {
    let points;
    let parsedResult;
    let unit;
    if (event.kind === "time") {
      parsedResult = parseTimeToSeconds(result);
      unit = "seconds";
      if (timing === "manual" && event.manualAddSeconds) {
        parsedResult += event.manualAddSeconds;
      }
      if (event.timeStep === 0.1) {
        parsedResult = truncateToTenth(parsedResult);
      }
      points = calculateTimePoints(event, age, parsedResult);
    } else {
      parsedResult = parseFieldToCm(result);
      unit = "cm";
      if (event.multType === "threeInterval") {
        points = calculateThreeIntervalPoints(event, age, parsedResult);
      } else {
        points = calculateFieldPoints(event, age, parsedResult);
      }
    }
    const rawPoints = points;
    points = Math.floor(points);
    if (!config.allowNegativePoints && points < 0) {
      points = 0;
    }
    return {
      success: true,
      points,
      rawPoints,
      eventName: event.displayName,
      gender: event.gender,
      age,
      parsedResult,
      unit
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
      code: "INVALID_RESULT"
    };
  }
}
function calculateTimePoints(event, age, seconds) {
  const ref = event.p1000ByAge[age];
  const timeStep = event.timeStep ?? 0.01;
  const mult = getMultipliers(event, age)[0];
  const deltaSteps = (seconds - ref) / timeStep;
  return 1e3 - deltaSteps * mult;
}
function calculateFieldPoints(event, age, cm) {
  const ref = event.p1000ByAge[age];
  const mult = getMultipliers(event, age)[0];
  const deltaCm = cm - ref;
  return 1e3 + deltaCm * mult;
}
function calculateThreeIntervalPoints(event, age, cm) {
  const P1000 = event.p1000ByAge[age];
  const mults = getMultipliers(event, age);
  const m1 = mults[0];
  const m2 = mults[1];
  const m3 = mults[2];
  const P80 = event.p80ByAge?.[age] ?? P1000 * 0.8;
  const pts80 = 1e3 - (P1000 - P80) * m2;
  if (cm >= P1000) {
    return 1e3 + (cm - P1000) * m1;
  } else if (cm >= P80) {
    return 1e3 - (P1000 - cm) * m2;
  } else {
    return pts80 - (P80 - cm) * m3;
  }
}
function getAvailableEvents() {
  return Object.values(EVENTS);
}
function getEvent(eventId) {
  return EVENTS[eventId];
}
function getSupportedAges(eventId) {
  const event = EVENTS[eventId];
  if (!event) return [];
  return Object.entries(event.p1000ByAge).filter(([_, value]) => value !== void 0 && value !== null).map(([age]) => parseInt(age, 10)).sort((a, b) => a - b);
}
function calculatePointsBatch(inputs, config) {
  return inputs.map((input) => calculatePoints(input, config));
}
function findEvents(displayName, gender) {
  const normalizedName = displayName.toLowerCase();
  return Object.values(EVENTS).filter((e) => {
    const nameMatch = e.displayName.toLowerCase().includes(normalizedName);
    const genderMatch = !gender || e.gender === gender;
    return nameMatch && genderMatch;
  });
}
function getEventsForAgeAndGender(age, gender) {
  return Object.values(EVENTS).filter((e) => {
    return e.gender === gender && e.p1000ByAge[age] !== void 0;
  });
}
export {
  DEFAULT_CONFIG,
  EVENTS,
  calculatePoints,
  calculatePointsBatch,
  findEvents,
  formatCmToMeters,
  formatTime,
  getAvailableEvents,
  getEvent,
  getEventsByGender,
  getEventsForAgeAndGender,
  getSupportedAges,
  getUniqueEventNames,
  parseFieldToCm,
  parseTimeToSeconds,
  truncateToTenth
};
