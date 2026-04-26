function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidPassword(password) {
  return password.length >= 8;
}

function isValidName(name) {
  return name.trim().length >= 3;
}

function isValidPrice(price) {
  return !isNaN(price) && Number(price) > 0;
}

function isValidStock(stock) {
  return !isNaN(stock) && Number.isInteger(Number(stock)) && Number(stock) >= 0;
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}