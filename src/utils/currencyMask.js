//Máscara simples
export function currencyMask(e) {
  var value = e.target.value;
  e.target.value = formatCurrency(value);
}

//Formatando moeda
function formatCurrency(value) {
  var valueToFormat = String(value)
    .replace(/[a-zA-Z$., ]/g, "")
    .replace(/^(0*)/g, "");
  valueToFormat = valueToFormat.split("").reverse();

  if (valueToFormat.length < 3) {
    var length = valueToFormat.length;
    while (length < 3) {
      valueToFormat.push("0");
      length = valueToFormat.length;
    }
  }

  valueToFormat[2] = valueToFormat[2] + ",";
  var arrayPoint = valueToFormat.reverse().join("").split(",");
  arrayPoint[0] = arrayPoint[0].split("").reverse();

  for (let index = 2; index < arrayPoint[0].length; index++) {
    if (index % 3 === 0) {
      arrayPoint[0][index] = arrayPoint[0][index] + ".";
    }
  }
  arrayPoint[0] = arrayPoint[0].reverse().join("");
  arrayPoint = arrayPoint.join(",");

  return "R$ " + arrayPoint;
}
