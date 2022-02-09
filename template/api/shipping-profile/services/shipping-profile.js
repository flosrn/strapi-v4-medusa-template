'use strict';

module.exports = (
  {
    strapi
  }
) => {
  /**
   * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
   * to customize this service
   */
  async function createShippingProfileAfterDelegation(shippingProfile) {
    const { products, shipping_options, ...createPayload } = shippingProfile;

    if (products) {

    }

    if (shipping_options) {
      createPayload.shipping_options = await strapi.services['shipping-option'].handleOneToManyRelation(shipping_options, 'shipping-profile')
    }

    const create = await strapi.services['shipping-profile'].create(createPayload);
    return create.id;
  }

  return {
    async bootstrap(data) {
      strapi.log.debug('Syncing Shipping Profile....');
      try {
        if (data && data.length) {
          for (let shipping_profile of data) {
            if (!shipping_profile.medusa_id) {
              shipping_profile.medusa_id = shipping_profile.id.toString();
              delete shipping_profile.id
            }

            const found = await strapi.query('shipping-profile', '').findOne({ medusa_id: shipping_profile.medusa_id });
            if (found) {
              continue;
            }

            const shippingOptionStrapiId = await createShippingProfileAfterDelegation(shipping_profile);
          }
        }
        strapi.log.info('Shipping Profile Synced');
        return true;
      } catch (e) {
        console.log(e);
        return false
      }
    },

    async handleManyToOneRelation(shippingProfile, caller) {
      if (shippingProfile.id) {
        shippingProfile.medusa_id = shippingProfile.id;
        delete shippingProfile.id;
      }

      // This prevents an infinite loop. Since a cycle exists:  shipping_option -> shipping_profile -> shipping_option
      if (caller === 'shipping-option') {
        delete shippingProfile.shipping_options;
      }

      const found = await strapi.query('shipping-profile', '').findOne({ medusa_id: shippingProfile.medusa_id });
      if (found) {
        return found.id;
      }

      const shippingProfileStrapiId = await createShippingProfileAfterDelegation(shippingProfile);
      return shippingProfileStrapiId;
    }
  };
};
