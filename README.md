# TyrvingKalkulator

Tyrving 2014-tabell poengkalkulator for norsk friidrett. Beregner poeng for 125 øvelsevarianter for alder 10-19, både gutter og jenter.

## Installasjon

1. Kopier hele `tyrving-calculator` mappen inn i ditt prosjekt
2. Kjør `npm install` inne i mappen (kun nødvendig hvis du vil bygge på nytt)

## Bruk

```javascript
import { calculatePoints, getEventsForAgeAndGender, EVENTS } from './tyrving-calculator/dist/index.mjs';

// Finn tilgjengelige øvelser for en alder og kjønn
const events = getEventsForAgeAndGender(15, 'gutter');
console.log(events); // Liste med øvelser

// Beregn poeng
const result = calculatePoints({
  eventId: 'gutter_100_m',
  age: 15,
  result: '12.35',      // sekunder, eller '1:28.54' for minutter:sekunder
  timing: 'automatic'   // eller 'manual'
});

if (result.success) {
  console.log(`Poeng: ${result.points}`);
} else {
  console.log(`Feil: ${result.error}`);
}
```

## API

### `calculatePoints(input)`

Beregner poeng for en øvelse.

**Input:**
- `eventId` - Øvelse-ID (f.eks. `'gutter_100_m'`, `'jenter_hoyde'`)
- `age` - Alder (10-19)
- `result` - Resultat som string (tid: `'12.35'` eller `'1:28.54'`, felt: `'4.55'`)
- `timing` - `'automatic'` eller `'manual'` (kun for løp)

**Output:**
```javascript
{
  success: true,
  points: 850,
  rawPoints: 850.5,
  eventName: '100 m',
  gender: 'gutter',
  age: 15,
  parsedResult: 12.35,
  unit: 'seconds'
}
```

### `getEventsForAgeAndGender(age, gender)`

Returnerer alle øvelser tilgjengelig for en gitt alder og kjønn.

### `EVENTS`

Objekt med alle øvelsesdefinisjoner.

## Demo

Åpne `demo/index.html` i en nettleser for å teste kalkulatoren.

## Støttede øvelser

- Løp: 40m, 60m, 80m, 100m, 200m, 300m, 400m, 600m, 800m, 1000m, 1500m, 2000m, 3000m, 5000m, 10000m
- Hekk: Diverse høyder og avstander
- Kappgang: 1000m, 2000m, 3000m, 5000m, 10000m, 20000m
- Hopp: Lengde, høyde, tresteg, stav (med og uten tilløp)
- Kast: Kule, diskos, slegge, spyd, liten ball, slengball
