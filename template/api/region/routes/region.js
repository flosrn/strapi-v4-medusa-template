module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/regions',
      handler: 'region.find',
      config: { policies: [] },
    },
    {
      method: 'GET',
      path: '/regions/:medusaId',
      handler: 'region.findOne',
      config: { policies: [] },
    },
    {
      method: 'POST',
      path: '/regions',
      handler: 'region.create',
      config: { policies: [] },
    },
    {
      method: 'PUT',
      path: '/regions/:medusaId',
      handler: 'region.update',
      config: { policies: [] },
    },
    {
      method: 'DELETE',
      path: '/regions/:medusaId',
      handler: 'region.delete',
      config: { policies: [] },
    },
  ],
};
