import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | star-rating', function(hooks) {
  setupRenderingTest(hooks);

  test('renders the full and empty stars correctly', async function(assert) {
    this.set('rating', 4);
    this.set('updateRating', () => {});

    await render(hbs`
      <StarRating
        @rating={{this.rating}}
        @onUpdate={{this.updateRating}}
      />
    `);

    assert.dom('[data-test-rr="full-star"]').exists({ count: 4 });
    assert.dom('[data-test-rr="empty-star"]').exists({ count: 1 });

    this.set('rating', 2)
    assert.dom('[data-test-rr="full-star"]').exists({ count: 2 });
    assert.dom('[data-test-rr="empty-star"]').exists({ count: 3 });
  });
});
