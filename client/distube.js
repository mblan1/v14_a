const { DisTube } = require('distube');

const { YtDlpPlugin } = require('@distube/yt-dlp');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const client = require('..');

const distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new YtDlpPlugin({
            update: false,
        }),
        new SoundCloudPlugin({}),
        new SpotifyPlugin({
            emitEventsAfterFetching: true,
        }),
    ],
});

module.exports = distube;
