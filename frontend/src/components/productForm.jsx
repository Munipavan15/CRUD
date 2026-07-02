import { useState } from 'react';

const emptyForm = {
  name: '',
  price: '',
  category: '',
  description: '',
  imageUrl: ''
};

function ProductForm({ initialData, isEditing, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData || emptyForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({
      ...formData,
      price: Number(formData.price)
    });
    setFormData({ ...emptyForm });
  };

  const resetForm = () => {
    setFormData({ ...emptyForm });
    onCancel();
  };

  return (
    <section className="form-panel">
      <h2>{isEditing ? 'Edit product' : 'Add product'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Product name
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Price
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} min="0" step="0.01" required />
        </label>
        <label>
          Category
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        </label>
        <label>
          Description
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="4" required />
        </label>
        <label>
          Image URL
          <input type="url" name="imageUrl" placeholder="https://example.com/image.jpg" value={formData.imageUrl} onChange={handleChange} />
        </label>
        <div className="form-actions">
          <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
          {isEditing && (
            <button type="button" className="secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ProductForm;