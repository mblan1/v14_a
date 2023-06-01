const distube = require('../client/distube');

distube
    .on('addSong', (queue, song) => {
        queue.textChannel?.send(`✅ | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`);
    })
    .on('playSong', (queue, song) => {
        queue.textChannel?.send(`▶️ | Playing \`${song.name}\` - ${song.url} \nRequested by: ${song.user}}`);
    })
    .on('empty', (queue) => {
        queue.textChannel?.send('❗ | All tracks have been played !');
    });
