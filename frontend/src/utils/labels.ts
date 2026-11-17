import type {
  ActivityType,
  CropStatus,
  MeasurementUnit,
  ProductCategory,
  Role,
} from '../types';

export const ROLE_LABELS: Record<Role, string> = {
  PRODUCTOR: 'Productor',
  COMPRADOR: 'Comprador',
  ADMINISTRADOR: 'Administrador',
};

export const CROP_STATUS_LABELS: Record<CropStatus, string> = {
  PLANIFICADO: 'Planificado',
  EN_CRECIMIENTO: 'En crecimiento',
  LISTO_PARA_COSECHA: 'Listo para cosecha',
  COSECHADO: 'Cosechado',
  PERDIDO: 'Perdido',
};

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  SIEMBRA: 'Siembra',
  RIEGO: 'Riego',
  FERTILIZACION: 'Fertilización',
  PODA: 'Poda',
  COSECHA: 'Cosecha',
  OTRO: 'Otro',
};

export const MEASUREMENT_UNIT_LABELS: Record<MeasurementUnit, string> = {
  KILOGRAMO: 'Kilogramo',
  TONELADA: 'Tonelada',
  LIBRA: 'Libra',
  BULTO: 'Bulto',
  UNIDAD: 'Unidad',
};

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  FRUTAS: 'Frutas',
  HORTALIZAS: 'Hortalizas',
  GRANOS: 'Granos',
  TUBERCULOS: 'Tubérculos',
  CAFE: 'Café',
  OTROS: 'Otros',
};

function toOptions<T extends string>(labels: Record<T, string>) {
  return (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }));
}

export const ROLE_OPTIONS = toOptions(ROLE_LABELS).filter((option) => option.value !== 'ADMINISTRADOR');
export const CROP_STATUS_OPTIONS = toOptions(CROP_STATUS_LABELS);
export const ACTIVITY_TYPE_OPTIONS = toOptions(ACTIVITY_TYPE_LABELS);
export const MEASUREMENT_UNIT_OPTIONS = toOptions(MEASUREMENT_UNIT_LABELS);
export const PRODUCT_CATEGORY_OPTIONS = toOptions(PRODUCT_CATEGORY_LABELS);

export const CROP_STATUS_TONES: Record<CropStatus, 'green' | 'blue' | 'amber' | 'red' | 'slate'> = {
  PLANIFICADO: 'slate',
  EN_CRECIMIENTO: 'green',
  LISTO_PARA_COSECHA: 'amber',
  COSECHADO: 'blue',
  PERDIDO: 'red',
};
