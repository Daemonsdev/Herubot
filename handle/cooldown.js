// handle/cooldown.js

// Initialize the cooldown map
if (!global.handle) global.handle = {};
if (!global.handle.cooldown) global.handle.cooldown = new Map();

/**
 * Checks if the command is on cooldown for a particular user.
 * 
 * @param {string} commandName - The name of the command
 * @param {string} senderID - The ID of the user sending the command
 * @param {number} expiration - The cooldown time in milliseconds
 * @returns {boolean|number} - False if not on cooldown, or remaining cooldown time in seconds
 */
function isOnCooldown(commandName, senderID, expiration = 3000) {
  const dateNow = Date.now();

  // If the command cooldown map doesn't exist, initialize it
  if (!global.handle.cooldown.has(commandName)) {
    global.handle.cooldown.set(commandName, new Map());
  }

  const timeStamps = global.handle.cooldown.get(commandName);

  if (timeStamps.has(senderID)) {
    const lastUsed = timeStamps.get(senderID);
    const remainingCooldown = (lastUsed + expiration - dateNow) / 1000;
    if (remainingCooldown > 0) {
      return remainingCooldown;
    }
  }

  // Set the current timestamp for the user
  timeStamps.set(senderID, dateNow);
  return false;
}

module.exports = {
  isOnCooldown
};
