require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

// Sadece bu kullanıcı ID'si komut kullanabilsin
const ALLOWED_USER_ID = "1051072781284016198";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} olarak giriş yaptı!`);
});

client.on('messageCreate', async message => {
  // Sadece izin verilen kullanıcı komutları çalıştırabilir
  if (message.author.id !== ALLOWED_USER_ID) return;

  if (message.content === '!ses') {
    // Kullanıcının bulunduğu ses kanalını alıyoruz
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('Lütfen önce bir ses kanalına katılınız!');
    }
    
    // Botu ses kanalına, afk kalacak şekilde (selfMute & selfDeaf) katma
    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
      selfMute: true,
      selfDeaf: true
    });
    
    message.channel.send('Bot ses kanalına katıldı ve afk konumda bekliyor.');
  } else if (message.content === '!bb') {
    // Ses kanalındaki bot bağlantısını kapatma
    const connection = getVoiceConnection(message.guild.id);
    if (connection) {
      connection.destroy();
      message.channel.send('Bot ses kanalından ayrıldı.');
    } else {
      message.channel.send("Bot şu anda herhangi bir ses kanalında değil.");
    }
  } else if (message.content === '!ip') {
    // Sadece gülücük gönderme
    message.channel.send(':)');
  }
});

client.login(process.env.BOT_T
             OKEN);
