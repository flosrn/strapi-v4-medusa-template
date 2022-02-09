module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/product-variants',
      handler: 'product-variant.find',
      config: { policies: [] },
    },
    {
      method: 'GET',
      path: '/product-variants/:medusaId',
      handler: 'product-variant.findOne',
      config: { policies: [] },
    },
    {
      method: 'POST',
      path: '/product-variants',
      handler: 'product-variant.create',
      config: { policies: [] },
    },
    {
      method: 'PUT',
      path: '/product-variants/:medusaId',
      handler: 'product-variant.update',
      config: { policies: [] },
    },
    {
      method: 'DELETE',
      path: '/product-variants/:medusaId',
      handler: 'product-variant.delete',
      config: { policies: [] },
    },
  ],
};
