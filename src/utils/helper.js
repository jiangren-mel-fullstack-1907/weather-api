
function formatResponse(res, payload, code = 200) {
  console.log('format response payload ====>>>>', payload);
  const response = { code };
  if (code < 400) {
    if (payload.data) {
      response.data = payload.data;
    } else {
      response.data = payload;
    }
  } else {
    response.error = payload;
  }
  return res.status(code).send(response);
}

module.exports = {
  formatResponse
};
