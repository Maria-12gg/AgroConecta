# Manual de usuario

## 1. Acceso

1. Abre la aplicación en `http://localhost:5173`.
2. Desde la página de inicio pulsa **Registrarse** o **Iniciar sesión**.
3. Para probar sin crear cuenta usa las credenciales de demostración:

   | Rol | Correo | Contraseña |
   | --- | --- | --- |
   | Administrador | admin@agroconecta.co | `Agroconecta123` |
   | Productor | maria@agroconecta.co | `Agroconecta123` |
   | Comprador | carlos@agroconecta.co | `Agroconecta123` |

## 2. Registro

En **Crear cuenta** completa nombre, correo, contraseña y selecciona el rol
(**Productor** o **Comprador**). La contraseña debe tener al menos 8 caracteres y
combinar letras y números. Teléfono y ubicación son opcionales.

## 3. Panel (Dashboard)

Tras iniciar sesión verás indicadores calculados con datos reales:

- **Productor:** número de parcelas, cultivos activos, total de gastos, registros de
  producción y productos publicados, además de las últimas actividades.
- **Comprador:** número de productos disponibles y publicaciones recientes.

## 4. Módulos del productor

El menú lateral muestra los módulos según el rol del usuario.

- **Parcelas:** registra tus terrenos (nombre, ubicación, área en hectáreas y
  descripción). Cada parcela agrupa cultivos.
- **Cultivos:** asocia un cultivo a una parcela, define fechas de siembra y cosecha
  estimada y gestiona su estado (planificado, en crecimiento, listo para cosecha,
  cosechado o perdido).
- **Actividades:** registra labores agrícolas (siembra, riego, fertilización, poda,
  cosecha u otras) con su fecha y descripción.
- **Gastos:** lleva el control de costos por parcela o cultivo.
- **Producción:** registra las cosechas obtenidas por cultivo (cantidad y unidad de
  medida).
- **Mis productos:** publica tus productos en el catálogo con categoría, precio,
  cantidad disponible y datos de contacto. Puedes activarlos, desactivarlos, editarlos
  o eliminarlos.

## 5. Catálogo (comprador y visitantes)

- El catálogo es **público**: puede verse sin iniciar sesión desde **Explorar catálogo**.
- Permite buscar por texto (nombre o descripción) y filtrar por categoría.
- Cada tarjeta muestra precio, cantidad disponible y los datos de contacto del productor.

## 6. Perfil

En **Mi perfil** puedes actualizar tu nombre, teléfono y ubicación, y cambiar tu
contraseña indicando la contraseña actual y la nueva.

## 7. Administración de usuarios

El rol **Administrador** accede a **Usuarios**, donde puede listar todas las cuentas,
cambiar roles y activar o desactivar usuarios.

## 8. Cierre de sesión

Pulsa **Cerrar sesión** al pie del menú lateral. Se elimina la sesión local y se
invalida el token.

## 9. Mensajes del sistema

Las operaciones exitosas y los errores se muestran mediante notificaciones emergentes
(toasts). Los formularios indican los campos con errores de validación.
