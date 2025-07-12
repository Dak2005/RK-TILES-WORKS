let areaCount = 1;

function addArea() {
  areaCount++;
  const container = document.getElementById('areasContainer');
  const section = document.createElement('div');
  section.className = 'area-section';
  section.innerHTML = `
    <h2>Area ${areaCount}</h2>
    <label>Area Name: <input type="text" name="areaName[]" required></label>
    <label>Type:
      <select name="type[]">
        <option value="floor">Floor</option>
        <option value="wall">Wall</option>
      </select>
    </label>
    <label>Length (ft): <input type="number" name="length[]" step="0.1" required></label>
    <label>Width (ft): <input type="number" name="width[]" step="0.1" required></label>
    <label class="wall-input">Height (ft): <input type="number" name="height[]" step="0.1"></label>
  `;
  container.appendChild(section);
}

document.getElementById('tileForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const areaNames = document.getElementsByName('areaName[]');
  const types = document.getElementsByName('type[]');
  const lengths = document.getElementsByName('length[]');
  const widths = document.getElementsByName('width[]');
  const heights = document.getElementsByName('height[]');

  const tileLength = parseFloat(document.getElementById('tileLength').value);
  const tileWidth = parseFloat(document.getElementById('tileWidth').value);
  const wastagePercent = parseFloat(document.getElementById('wastage').value);

  let output = '<h2>Tile Calculation Result</h2><ul>';
  let grandTotalTiles = 0;

  for (let i = 0; i < areaNames.length; i++) {
    const name = areaNames[i].value;
    const type = types[i].value;
    const length = parseFloat(lengths[i].value);
    const width = parseFloat(widths[i].value);
    const height = parseFloat(heights[i].value || 0);

    let area = 0;
    if (type === 'floor') {
      area = length * width;
    } else {
      area = 2 * height * (length + width);
    }

    const tileArea = tileLength * tileWidth;
    let totalTiles = area / tileArea;
    totalTiles += totalTiles * (wastagePercent / 100);
    totalTiles = Math.ceil(totalTiles);

    grandTotalTiles += totalTiles;

    output += `<li><strong>${name} (${type})</strong>: ${totalTiles} tiles needed</li>`;
  }

  output += `</ul><h3>Grand Total: ${grandTotalTiles} tiles</h3>`;
  document.getElementById('result').innerHTML = output;

  localStorage.setItem('tileReport', document.getElementById('result').innerHTML);
});

function generatePDF() {
  const result = document.getElementById('result');
  const opt = {
    margin:       1,
    filename:     'tile-calculation-report.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(result).set(opt).save();
}
