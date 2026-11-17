import { Search, Store } from 'lucide-react';
import { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import { EmptyState, PageLoader } from '../ui/Feedback';
import { Button } from '../ui/Button';
import { SelectField, TextField } from '../ui/FormFields';
import { PRODUCT_CATEGORY_LABELS, PRODUCT_CATEGORY_OPTIONS } from '../../utils/labels';
import { formatCurrency, formatNumber } from '../../utils/format';
import { getErrorMessage } from '../../lib/errors';
import type { Product, ProductCategory } from '../../types';

export function CatalogView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [category, setCategory] = useState<ProductCategory | ''>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    productService
      .catalog({ search: appliedSearch, category })
      .then((page) => {
        if (active) setProducts(page.content);
      })
      .catch((caught) => {
        if (active) setError(getErrorMessage(caught));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [appliedSearch, category]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setAppliedSearch(search.trim());
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-6 grid gap-3 sm:grid-cols-[1fr_220px_auto]">
        <TextField
          label="Buscar producto"
          name="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Tomate, café, aguacate..."
        />
        <SelectField
          label="Categoría"
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value as ProductCategory | '')}
          options={PRODUCT_CATEGORY_OPTIONS}
          placeholder="Todas las categorías"
        />
        <div className="flex items-end">
          <Button type="submit" icon={<Search className="h-4 w-4" />} className="w-full sm:w-auto">
            Buscar
          </Button>
        </div>
      </form>

      {loading ? (
        <PageLoader />
      ) : error ? (
        <EmptyState icon={<Store className="h-8 w-8" />} title="No fue posible cargar el catálogo" description={error} />
      ) : products.length === 0 ? (
        <EmptyState
          icon={<Store className="h-8 w-8" />}
          title="No encontramos productos"
          description="Prueba con otra búsqueda o cambia la categoría."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="card flex flex-col p-5">
              <span className="badge w-fit bg-agro-100 text-agro-800">
                {PRODUCT_CATEGORY_LABELS[product.category]}
              </span>
              <h3 className="mt-3 text-base font-semibold text-slate-900">{product.name}</h3>
              <p className="mt-1 line-clamp-3 flex-1 text-sm text-slate-500">{product.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-agro-700">{formatCurrency(product.price)}</span>
                <span className="text-xs text-slate-400">
                  {formatNumber(product.availableQuantity)} disponibles
                </span>
              </div>
              <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                <p className="font-medium text-slate-700">{product.producerName ?? 'Productor de AgroConecta'}</p>
                {product.producerLocation ? <p>{product.producerLocation}</p> : null}
                <p className="mt-1">{product.contactPhone} · {product.contactEmail}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
