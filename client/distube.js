const { DisTube } = require('distube');

const { YtDlpPlugin } = require('@distube/yt-dlp');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const client = require('..');

const distube = new DisTube(client, {
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new YtDlpPlugin({
            update: false,
        }),
        new SoundCloudPlugin(),
    ],
});

module.exports = distube;
