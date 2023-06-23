export const variables: any = {
  chl: [
    'Chlorophyll',
    'mg/m3',
    [0.0442142405, 0.26105115749999996],
    ['#dedede', '#ff0000'],
  ],
  phyc: [
    'Phytoplankton',
    'mmol/m3',
    [0.210064535, 1.102216925],
    ['#dedede', '#ff0000'],
  ],
  no3: [
    'Nitrogen',
    'mmol/m3',
    [0.3782260075, 1.798195],
    ['#dedede', '#ff0000'],
  ],
  po4: [
    'Phosporus',
    'mmol/m3',
    [0.0069639635, 0.0917562975],
    ['#dedede', '#ff0000'],
  ],
  o2: [
    'Dissolved Oxigen',
    'mmol/m3',
    [214.82448499999998, 252.42014],
    ['#dedede', '#ff0000'],
  ],
  ph: ['PH', '', [7.985332625, 8.14701275], ['#dedede', '#ff0000']],
  so: ['Salinity', '', [37.762795499999996, 38.275695], ['#dedede', '#ff0000']],
  zos: [
    'Water Level ',
    'm',
    [-0.5596080000000001, -0.333068435],
    ['#dedede', '#ff0000'],
  ],
  avg_temp_C: [
    'Mean Temperature',
    '°C',
    [13.441810909090918, 25.962853333333328],
    ['#dedede', '#ff0000'],
  ],
  gebco: ['Bathymetry GEBCO', 'm', [-5111, 0], ['#000000', '#ffffff']],
}

// for the range of colours on the map I would suggest :
// Wider cooler range for Ph and O2 : extremely red/white
// Salinity : gets very red
// Mean temperature : very red/white
// For the map legend, is it normal the the ‘warmer colour’ is in the middle, and both extremes appear the same?
