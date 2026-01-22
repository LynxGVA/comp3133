const fs = require('fs');
const csv = require('csv-parser');

const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

if (fs.existsSync(canadaFile)) fs.unlinkSync(canadaFile);
if (fs.existsSync(usaFile)) fs.unlinkSync(usaFile);

fs.appendFileSync(canadaFile, 'country,year,population\n');
fs.appendFileSync(usaFile, 'country,year,population\n');

fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row.country.toLowerCase() === 'canada') {
      fs.appendFileSync(
        canadaFile,
        `${row.country},${row.year},${row.population}\n`
      );
    }

    if (
      row.country.toLowerCase() === 'united states' ||
      row.country.toLowerCase() === 'usa'
    ) {
      fs.appendFileSync(
        usaFile,
        `${row.country},${row.year},${row.population}\n`
      );
    }
  })
  .on('end', () => {
    console.log('Files created successfully');
  });
