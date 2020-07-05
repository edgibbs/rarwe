import { module, test } from 'qunit';
import { visit, click, fillIn, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | Bands', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('List bands', async function(assert) {
    this.server.create('band', { name: 'Radiohead' });
    this.server.create('band', { name: 'Long Distance Calling' });
    await visit('/');

    assert.dom('[data-test-rr="band-link"]').exists({ count: 2 });
    assert.dom('[data-test-rr="band-list-item"]:first-child').hasText('Radiohead');
    assert.dom('[data-test-rr="band-list-item"]:last-child').hasText('Long Distance Calling');
  });

  test('Create a band', async function(assert) {
    this.server.logging = true;
    this.server.create('band', { name: 'Royal Blood' });

    await visit('/');
    await click('[data-test-rr="new-band-button"]');
    await fillIn('[data-test-rr="new-band-name"]', 'Caspian');
    await click('[data-test-rr="save-band-button"]');
    await waitFor('[data-test-rr="no-songs-text"]');

    assert.dom('[data-test-rr="band-list-item"]').exists({ count: 2 });
    assert.dom('[data-test-rr="band-list-item"]:first-child').hasText('Royal Blood');
    assert.dom('[data-test-rr="band-list-item"]:last-child').hasText('Caspian');
    assert.dom('[data-test-rr="songs-nav-item"] > .active').exists();
  });
});
