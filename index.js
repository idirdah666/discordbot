const { Client, GatewayIntentBits } = require('discord.js')
const ytdl = require('ytdl-core');
require('dotenv/config')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

client.on('ready', () => {
    console.log('Bot is ready!')
})
client.on('message', message => {
  // If the message starts with !play
  if (message.content.startsWith('!play')) {
    // Get the URL of the video to play
    const url = message.content.split(' ')[1];

    // Join the voice channel of the message sender
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Please join a voice channel first!');
    voiceChannel.join().then(connection => {
      // Play the audio of the YouTube video
      const stream = ytdl(url, { filter: 'audioonly' });
      const dispatcher = connection.play(stream);

      // Leave the voice channel when the stream ends
      dispatcher.on('finish', () => voiceChannel.leave());
    });
  }
});
client.on('messageCreate', message => {
    if (message.content === 'ping') {
        message.reply('Pong!')
    }
})

client.login(process.env.TOKEN)