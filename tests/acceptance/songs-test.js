import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | Songs', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Sort songs in various ways', async function(assert) {
    let band = this.server.create('band', { name: 'Them Crooked Vultures' });
    this.server.create('song', { title: 'Mind Eraser, No Chaser', rating: 2, band});
    this.server.create('song', { title: 'Elephants', rating: 4, band});
    this.server.create('song', { title: 'Spinning in Daffodils', rating: 5, band});
    this.server.create('song', { title: 'New Fang', rating: 3, band});

    await visit('/');
    await click('[data-test-rr="band-link"]');

    assert.dom('[data-test-rr="song-list-item"]:first-child').hasText('Elephants');
    assert.dom('[data-test-rr="song-list-item"]:last-child').hasText('Spinning in Daffodils');

    await click('[data-test-rr="sort-by-title-desc"]');
    assert.dom('[data-test-rr="song-list-item"]:first-child').hasText('Spinning in Daffodils');
    assert.dom('[data-test-rr="song-list-item"]:last-child').hasText('Elephants');
  });
});
