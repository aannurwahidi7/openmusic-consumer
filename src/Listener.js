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
      const { Id, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this._playlistsService.getPlaylistByIdWithSongs(Id);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
