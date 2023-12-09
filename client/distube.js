const { DisTube } = require('distube');

const { YtDlpPlugin } = require('@distube/yt-dlp');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const client = require('..');

const { SPOTIFY_CLIENT_ID, SPOTIFY_SECRET_ID } = process.env;

const distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new YtDlpPlugin({
            update: false,
        }),
        new SoundCloudPlugin(),
        new SpotifyPlugin({
            emitEventsAfterFetching: false,
            api: {
                clientId: SPOTIFY_CLIENT_ID,
                clientSecret: SPOTIFY_SECRET_ID,
                topTracksCountry: 'VN',
            },
            parallel: true,
        }),
    ],
});

module.exports = distube;
