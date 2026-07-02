import { useCallback, useEffect, useState } from 'react';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from './api/productApi';
import ProductForm from './components/productForm';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeView, setActiveView] = useState('home');
  const [previewImage, setPreviewImage] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');
      const response = await getAllProducts();
      setProducts(Array.isArray(response?.data) ? response.data : []);
    } catch (err) {
      setError(err.message || 'Unable to load products.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        setSuccessMessage('Product updated successfully.');
        window.alert('Product updated successfully!');
      } else {
        await createProduct(productData);
        setSuccessMessage('Product added successfully.');
        window.alert('Product added successfully!');
      }

      await fetchProducts();
      setEditingProduct(null);
      setActiveView(editingProduct ? 'update' : 'display');
    } catch (err) {
      setError(err.message || 'Unable to save product.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setError('');
    setSuccessMessage('');
    setActiveView('update');
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      await fetchProducts();
      setSuccessMessage('Product deleted successfully.');
      window.alert('Product deleted successfully!');
      if (editingProduct?._id === id) {
        setEditingProduct(null);
      }
      setActiveView('display');
    } catch (err) {
      setError(err.message || 'Unable to delete product.');
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setActiveView('update');
  };

  const renderNavLink = (view, label) => (
    <button
      key={view}
      type="button"
      className={`nav-link ${activeView === view ? 'active' : ''}`}
      onClick={() => setActiveView(view)}
    >
      {label}
    </button>
  );

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Inventory Manager</p>
          <h1>Product CRUD App</h1>
          <p className="subtitle">Create, update, and remove products from your catalog.</p>
        </div>
        <nav className="top-nav" aria-label="Primary navigation">
          {renderNavLink('home', 'Home')}
          {renderNavLink('add', 'Add Products')}
          {renderNavLink('display', 'Display Products')}
          {renderNavLink('update', 'Update Products')}
        </nav>
      </header>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {activeView === 'home' && (
        <section className="home-panel">
          <h2>Welcome to your product dashboard</h2>
          <p>Browse the latest products below. Use the navigation above to manage inventory when you are ready.</p>
          {loading ? (
            <p className="empty-state">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="empty-state">No products available yet.</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <article className="product-card" key={product._id}>
                  {product.imageUrl ? (
                    <button type="button" className="image-trigger" onClick={() => setPreviewImage(product.imageUrl)}>
                      <img className="product-image" src={product.imageUrl} alt={product.name} />
                    </button>
                  ) : (
                    <div className="product-image placeholder">No image</div>
                  )}
                  <div className="product-card-body">
                    <h3>{product.name}</h3>
                    <p className="product-meta">
                      <span>₹{Number(product.price).toFixed(2)}</span>
                      <span>{product.category}</span>
                    </p>
                    <p className="product-description">{product.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {activeView === 'add' && (
        <section className="content-grid single-column">
          <ProductForm
            key="add"
            initialData={null}
            isEditing={false}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </section>
      )}

      {activeView === 'display' && (
        <section className="product-panel">
          <div className="panel-heading">
            <div>
              <h2>Display Products</h2>
              <p className="panel-subtitle">Products are shown as attractive cards with images when available.</p>
            </div>
            <span>{products.length} items</span>
          </div>

          {loading ? (
            <p className="empty-state">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="empty-state">No products found. Add your first one.</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <article className="product-card" key={product._id}>
                  {product.imageUrl ? (
                    <button type="button" className="image-trigger" onClick={() => setPreviewImage(product.imageUrl)}>
                      <img className="product-image" src={product.imageUrl} alt={product.name} />
                    </button>
                  ) : (
                    <div className="product-image placeholder">No image</div>
                  )}
                  <div className="product-card-body">
                    <h3>{product.name}</h3>
                    <p className="product-meta">
                      <span>₹{Number(product.price).toFixed(2)}</span>
                      <span>{product.category}</span>
                    </p>
                    <p className="product-description">{product.description}</p>
                  </div>
                  <div className="card-actions">
                    <button type="button" onClick={() => handleEdit(product)}>
                      Edit
                    </button>
                    <button type="button" className="danger" onClick={() => handleDelete(product._id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {activeView === 'update' && (
        <section className="content-grid single-column">
          {editingProduct ? (
            <ProductForm
              key={editingProduct._id}
              initialData={editingProduct}
              isEditing={true}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <section className="product-panel">
              <div className="panel-heading">
                <div>
                  <h2>Update Products</h2>
                  <p className="panel-subtitle">Choose a product to edit its details.</p>
                </div>
                <span>{products.length} items</span>
              </div>
              {products.length === 0 ? (
                <p className="empty-state">No products available to update.</p>
              ) : (
                <div className="product-grid">
                  {products.map((product) => (
                    <article className="product-card" key={product._id}>
                      {product.imageUrl ? (
                        <button type="button" className="image-trigger" onClick={() => setPreviewImage(product.imageUrl)}>
                          <img className="product-image" src={product.imageUrl} alt={product.name} />
                        </button>
                      ) : (
                        <div className="product-image placeholder">No image</div>
                      )}
                      <div className="product-card-body">
                        <h3>{product.name}</h3>
                        <p className="product-meta">
                          <span>₹{Number(product.price).toFixed(2)}</span>
                          <span>{product.category}</span>
                        </p>
                        <p className="product-description">{product.description}</p>
                      </div>
                      <div className="card-actions">
                        <button type="button" onClick={() => handleEdit(product)}>
                          Edit
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </section>
      )}

      {previewImage && (
        <div className="image-modal" role="dialog" aria-modal="true" onClick={() => setPreviewImage(null)}>
          <div className="image-modal-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="image-modal-close" onClick={() => setPreviewImage(null)}>
              ×
            </button>
            <img src={previewImage} alt="Product preview" />
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>© 2026 Inventory Manager. Built with React and Express.</p>
      </footer>
    </div>
  );
}

export default App;