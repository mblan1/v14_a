const { DisTube } = require("distube");

const { YtDlpPlugin } = require("@distube/yt-dlp");
const client = require("..");

const distube = new DisTube(client, {
  leaveOnStop: true,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: true,
  emitAddListWhenCreatingQueue: true,
  emptyCooldown: 2000,
  plugins: [
    new YtDlpPlugin({
      update: true
    })
  ]
});

module.exports = distube;
