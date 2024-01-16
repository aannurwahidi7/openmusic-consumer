/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistByIdWithSongs(playlistId) {
    const queryPlaylist = {
      text: `SELECT p.id, p.name, u.username FROM playlists p
      LEFT JOIN users u ON p.owner =  u.id
      WHERE p.id = $1 GROUP BY p.id, u.username`,
      values: [playlistId],
    };

    const querySongs = {
      text: `SELECT s.id, s.title, s.performer FROM playlist_songs ps
      LEFT JOIN songs s ON ps.song_id = s.id
      WHERE ps.playlist_id = $1 GROUP BY s.id`,
      values: [playlistId],
    };

    const playlist = (await this._pool.query(queryPlaylist)).rows[0];

    const songs = (await this._pool.query(querySongs)).rows;
    playlist.songs = songs;

    return playlist;
  }
}

module.exports = PlaylistsService;
