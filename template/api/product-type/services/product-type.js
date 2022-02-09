'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = (
  {
    strapi
  }
) => {
  return {
    async handleManyToOneRelation(product_type) {
      try {
        if (!product_type.medusa_id) {
          product_type.medusa_id = product_type.id;
          delete product_type.id;
        }

        const found = await strapi.services['product-type'].findOne({
          medusa_id: product_type.medusa_id
        })
        if (found) {
          return found.id;
        }

        const create = await strapi.services['product-type'].create(product_type);
        return create.id;

      } catch (e) {
        console.log(e);
        throw new Error('Delegated creation failed');
      }
    }
  };
};
