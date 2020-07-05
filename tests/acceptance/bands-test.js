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

    let bandLinks = document.querySelectorAll('.mb-2 > a');
    assert.equal(bandLinks.length, 2, 'All band links are rendered');
    assert.ok(bandLinks[0].textContent.includes('Radiohead'));
    assert.ok(bandLinks[1].textContent.includes('Long Distance Calling'));
  });

  test('Create a band', async function(assert) {
    this.server.logging = true;
    this.server.create('band', { name: 'Royal Blood' });

    await visit('/');
    await click('[data-test-rr="new-band-button"]');
    await fillIn('[data-test-rr="new-band-name"]', 'Caspian');
    await click('[data-test-rr="save-band-button"]');
    await waitFor('[data-test-rr="no-songs-text"]');

    let bandLinks = document.querySelectorAll('.mb-2 > a');
    assert.equal(bandLinks.length, 2)
    assert.ok(bandLinks[0].textContent.includes('Royal Blood'));
    assert.ok(bandLinks[1].textContent.includes('Caspian'));
    assert.ok(document.querySelector('.border-b-4.border-purple-400').textContent.includes('Songs'), 'The Songs tab is active');
  });
});
