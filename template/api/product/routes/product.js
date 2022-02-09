module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/products',
      handler: 'product.find',
      config: { policies: [] }
    },
    {
      method: 'GET',
      path: '/products/:medusaId',
      handler: 'product.findOne',
      config: { policies: [] }
    },
    {
      method: 'POST',
      path: '/products',
      handler: 'product.create',
      config: { policies: [] }
    },
    {
      method: 'PUT',
      path: '/products/:medusaId',
      handler: 'product.update',
      config: { policies: [] }
    },
    {
      method: 'DELETE',
      path: '/products/:medusaId',
      handler: 'product.delete',
      config: { policies: [] }
    }
  ]
}