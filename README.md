# 🦅 Checklist de Aves de Uruguay

Una aplicación web personal para llevar el registro de las aves observadas en Uruguay. Permite marcar aves como vistas, registrar si tienes fotos, y agregar observaciones detalladas con fecha, ubicación y notas.

## Características

- **Checklist completo**: Lista de aves de Uruguay con nombres comunes y científicos
- **Marcado de aves**: Marca aves como vistas/no vistas y con/sin fotos
- **Observaciones detalladas**: Registra fecha, ubicación, notas y URLs de fotos
- **Filtros avanzados**: Filtra por estado, fotos, orden, familia, hábitat y búsqueda
- **Estadísticas**: Visualiza tu progreso con gráficos y estadísticas detalladas
- **Persistencia local**: Los datos se guardan automáticamente en el navegador
- **Interfaz en español**: Completamente en español para usuarios uruguayos
- **Diseño responsive**: Funciona en desktop, tablet y móvil

## Tecnologías Utilizadas

- **React 18** con TypeScript
- **Material-UI (MUI)** para componentes y diseño
- **React Router** para navegación
- **LocalStorage** para persistencia de datos
- **CSS-in-JS** con Emotion

## Instalación y Uso

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Instalación

1. Clona o descarga este repositorio
2. Abre una terminal en la carpeta del proyecto
3. Instala las dependencias:

```bash
npm install
```

### Ejecutar en Desarrollo

```bash
npm start
```

La aplicación se abrirá automáticamente en tu navegador en `http://localhost:3000`

### Construir para Producción

```bash
npm run build
```

## Uso de la Aplicación

### Página Principal (Checklist)

- **Vista general**: Ve todas las aves de Uruguay organizadas en tarjetas
- **Marcado rápido**: Usa los iconos de ojo y cámara para marcar aves como vistas o con fotos
- **Filtros**: Usa los filtros en la parte superior para encontrar aves específicas
- **Búsqueda**: Busca por nombre común, científico o familia
- **Detalles**: Haz clic en el icono "+" para ver detalles y agregar observaciones

### Página de Estadísticas

- **Progreso general**: Ve cuántas aves has visto del total
- **Progreso por orden**: Estadísticas organizadas por orden taxonómico
- **Progreso por familia**: Estadísticas organizadas por familia
- **Observaciones recientes**: Lista de tus últimas observaciones

### Página de Detalle de Ave

- **Información completa**: Nombre, científico, familia, orden y hábitat
- **Estado actual**: Marca si la has visto y si tienes fotos
- **Observaciones**: Lista todas tus observaciones de esa ave
- **Agregar observación**: Formulario para agregar nueva observación con:
  - Fecha
  - Ubicación
  - Notas (opcional)
  - URL de foto (opcional)

## Estructura de Datos

### Aves Incluidas

La aplicación incluye una selección representativa de aves uruguayas organizadas por:

- **Passeriformes**: Hornero, Calandria, Benteveo, etc.
- **Anseriformes**: Cisnes, patos y gansos
- **Ciconiiformes**: Garzas y cigüeñas
- **Accipitriformes**: Aves rapaces
- **Charadriiformes**: Aves playeras y gaviotas
- **Columbiformes**: Palomas y tórtolas
- **Psittaciformes**: Loros y cotorras
- **Piciformes**: Carpinteros
- **Coraciiformes**: Martín pescador

### Datos Guardados

Los datos se guardan localmente en tu navegador e incluyen:

- Estado de cada ave (vista/no vista, con/sin foto)
- Observaciones detalladas con fecha, ubicación y notas
- Estadísticas de progreso
- Fecha de última actualización

## Características Técnicas

### Persistencia de Datos

- Los datos se guardan automáticamente en `localStorage`
- No se envían datos a servidores externos
- Los datos persisten entre sesiones del navegador

### Filtros Disponibles

- **Estado**: Todas, Vistas, No vistas
- **Fotos**: Todas, Con fotos, Sin fotos
- **Orden**: Filtro por orden taxonómico
- **Familia**: Filtro por familia
- **Hábitat**: Urbano, Rural, Forestal, Costero, Humedal, Pastizal
- **Búsqueda**: Texto libre en nombres y familias

### Responsive Design

- **Desktop**: Vista completa con tarjetas en grid
- **Tablet**: Grid adaptativo
- **Móvil**: Lista vertical optimizada para touch

## Futuras Mejoras

- [ ] Agregar más especies de aves uruguayas
- [ ] Sistema de usuarios y cuentas
- [ ] Sincronización en la nube
- [ ] Exportar/importar datos
- [ ] Galería de fotos integrada
- [ ] Mapas de distribución
- [ ] Sonidos de aves
- [ ] Modo offline completo

## Agregar Imágenes de eBird

La aplicación soporta imágenes embebidas de eBird/Macaulay Library. Para agregar imágenes:

### Cómo obtener URLs de eBird:

1. Ve a https://ebird.org
2. Busca una especie de ave
3. Haz clic en la pestaña "Media"
4. Encuentra una buena foto
5. Haz clic en la foto
6. Busca el botón "Embed" o copia el código embed
7. Extrae la URL del atributo src del iframe

### Formato de URL:
```
https://macaulaylibrary.org/asset/ASSET_ID/embed
```

### Ejemplo de uso:
```typescript
{
  id: 'bird-id',
  commonName: 'Nombre del Ave',
  // ... otros campos
  ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/79992301/embed'
}
```

### Prioridad de imágenes:
1. **eBird embed** (máxima prioridad)
2. **URL de imagen regular** (segunda prioridad)
3. **Placeholder** (cuando no hay imagen)

## Contribuir

Este es un proyecto personal, pero las sugerencias son bienvenidas. Si quieres contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia

Este proyecto es de uso personal y educativo.

## Contacto

Para preguntas o sugerencias sobre la aplicación, puedes contactar al desarrollador.

---

**¡Disfruta observando las aves de Uruguay! 🦅** 