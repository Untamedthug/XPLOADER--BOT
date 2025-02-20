module.exports = {
  command: ['ytmp3'],
  operate: async ({ Cypher, m, reply, text, fetchMp3DownloadUrl }) => {
    if (!text) return reply('*Please provide a valid YouTube link!*');

    try {
      const urlMatch = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/|playlist\?list=)?)([a-zA-Z0-9_-]{11})/gi);
      if (!urlMatch) return reply('*Seems like your message does not contain a valid YouTube link*');

      const link = urlMatch[0];
      const downloadUrl = await fetchMp3DownloadUrl(link);

      await Cypher.sendMessage(m.chat, {
        audio: { url: downloadUrl },
        mimetype: 'audio/mpeg'
      }, { quoted: m });

    } catch (error) {
      console.error('ytmp3 command failed:', error);
      reply(`Error: ${error.message}`);
    }
  }
};