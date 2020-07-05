import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Band from 'rarwe/models/band';
import Song from 'rarwe/models/song';

module('Unit | Service | catalog', function(hooks) {
  setupTest(hooks);

  test('can store and retrieve bands', function(assert) {
    let catalog = this.owner.lookup('service:catalog');
    catalog.add('band', new Band({ id: 1, name: 'The Police'}));

    assert.equal(catalog.bands.length, 1);
    assert.equal(catalog.bands[0].name, 'The Police');
  });

  test('can store and retrieve songs', function(assert) {
    let catalog = this.owner.lookup('service:catalog');
    catalog.add('song', new Song({ id: 1, title: 'Tea in the Sahara', rating: 5 }));

    assert.equal(catalog.songs.length, 1);
    assert.equal(catalog.songs[0].title, 'Tea in the Sahara');
  });

  test('can load a record from JSON:API response', function(assert) {
    let catalog = this.owner.lookup('service:catalog');
    catalog.load({
      data: {
        type: 'bands',
        id: '1',
        attributes: {
          name: 'TOOL'
        },
        relationships: {
          songs: {
            links: {
              related: '/bands/1/songs'
            }
          }
        }
      }
    });
    let band = catalog.bands[0];

    assert.equal(band.name, 'TOOL');
    assert.equal(band.relationships.songs, '/bands/1/songs');
  });
});
