const units = {
  length: {
    meters: { name: 'Metros', factor: 1 },
    kilometers: { name: 'Kilómetros', factor: 1000 },
    miles: { name: 'Millas', factor: 1609.34 },
    feet: { name: 'Pies', factor: 0.3048 },
    inches: { name: 'Pulgadas', factor: 0.0254 }
  },
  weight: {
    kilograms: { name: 'Kilogramos', factor: 1 },
    grams: { name: 'Gramos', factor: 0.001 },
    pounds: { name: 'Libras', factor: 0.453592 },
    ounces: { name: 'Onzas', factor: 0.0283495 }
  },
  temperature: {
    celsius: { name: 'Celsius' },
    fahrenheit: { name: 'Fahrenheit' },
    kelvin: { name: 'Kelvin' }
  },
  volume: {
    liters: { name: 'Litros', factor: 1 },
    milliliters: { name: 'Mililitros', factor: 0.001 },
    gallons: { name: 'Galones (US)', factor: 3.78541 },
    cubicMeters: { name: 'Metros Cúbicos', factor: 1000 }
  },
  time: {
    seconds: { name: 'Segundos', factor: 1 },
    minutes: { name: 'Minutos', factor: 60 },
    hours: { name: 'Horas', factor: 3600 },
    days: { name: 'Días', factor: 86400 }
  },
  speed: {
    kmh: { name: 'Km/h', factor: 1 },
    mph: { name: 'Millas/h', factor: 1.60934 },
    knots: { name: 'Nudos', factor: 1.852 },
    ms: { name: 'm/s', factor: 3.6 }
  },
  data: {
    bytes: { name: 'Bytes', factor: 1 },
    kb: { name: 'KB', factor: 1024 },
    mb: { name: 'MB', factor: 1048576 },
    gb: { name: 'GB', factor: 1073741824 }
  }
};

const categorySelect = document.getElementById('category');
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const inputValue = document.getElementById('inputValue');
const resultInput = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');

function loadUnits(category) {
  const unitList = units[category];
  fromUnitSelect.innerHTML = '';
  toUnitSelect.innerHTML = '';

  for (const key in unitList) {
    const option1 = document.createElement('option');
    option1.value = key;
    option1.textContent = unitList[key].name;
    fromUnitSelect.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = key;
    option2.textContent = unitList[key].name;
    toUnitSelect.appendChild(option2);
  }
}

function convert() {
  const category = categorySelect.value;
  const fromUnit = fromUnitSelect.value;
  const toUnit = toUnitSelect.value;
  const value = parseFloat(inputValue.value);

  if (isNaN(value)) {
    resultInput.value = 'Ingresa un número válido';
    return;
  }

  let result;

  if (category === 'temperature') {
    result = convertTemperature(value, fromUnit, toUnit);
  } else {
    const fromFactor = units[category][fromUnit].factor;
    const toFactor = units[category][toUnit].factor;
    result = (value * fromFactor) / toFactor;
  }

  resultInput.value = isNaN(result) ? 'Error' : result.toFixed(4);
}

function convertTemperature(value, from, to) {
  let celsius;

  // Convertir a Celsius primero
  switch (from) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * (5/9);
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    default:
      return NaN;
  }

  // Convertir desde Celsius a destino
  switch (to) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return celsius * (9/5) + 32;
    case 'kelvin':
      return celsius + 273.15;
    default:
      return NaN;
  }
}

categorySelect.addEventListener('change', () => {
  loadUnits(categorySelect.value);
});

convertBtn.addEventListener('click', convert);

// Inicializar con la primera categoría
loadUnits(categorySelect.value);