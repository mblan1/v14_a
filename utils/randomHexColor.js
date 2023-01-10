const randomHexColor = () => {
  const colors = [0x899ef0, 0x66cd00, 0xe4b634, 0xffa8e5, 0xcad7b2, 0xd6bbcb, 0xfbf4d1];
  const randomColor = Math.floor(Math.random() * colors.length);
  return colors[randomColor];
};

module.exports = {
  randomHexColor
};
