function onMouseOver(node) {
  let i = 0;
  const id = setInterval(() => {
    node.style.backgroundPosition = `${(i = i - 120)}px 0px`;
  }, 60);

  setTimeout(() => {
    node.style.backgroundPosition = "0px 0px";
    clearInterval(id);
  }, 3000);
}

module.exports = {
  onMouseOver,
};
