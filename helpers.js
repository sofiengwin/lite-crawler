function captureEmail(str) {
  // Regular expression to match the email
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

  
  // Extracting the email using match and regex
  const match = str.match(emailRegex);

  // If match is found, return the captured email
  if (match && match.length >= 1) {
    console.log('fhjdsjsdjdsjkdsjdsjkdsj')
    return match[0];
  } else {
    return null; // Return null if no match is found
  }
}

function captureUsername(str) {
  // Regular expression to match the username
  const usernameRegex = /^([^\s]+)\s/;

  // Extracting the username using match and regex
  const match = str.match(usernameRegex);
  // If match is found, return the captured username
  if (match && match.length >= 1) {
    return match[0].trim();
  } else {
    return null; // Return null if no match is found
  }
}

module.exports = { captureEmail, captureUsername }