function createError(status, message) {
  return { status, data: { error: message } };
}
function createResult(data) {
  return { status: 200, data };
}

function createMessage(status, message) {
  return { status, data: { message } };
}

module.exports = {
  createError,
  createResult,
  createMessage
};
