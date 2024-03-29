/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { id, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this._playlistsService.getPlaylistByIdWithSongs(id);
      const objectPlaylist = { playlist };
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(objectPlaylist));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
