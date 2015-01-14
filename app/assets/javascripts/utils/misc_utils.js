function encodeTitle(title) {
  return title.replace(/\W/g, "_").substr(0,30);
}
