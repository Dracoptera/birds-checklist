# Solución para Aves Marinas en la Lista de Aves

## Problema Identificado

Las aves del orden Procellariiformes (albatroses y petreles) son especies **pelágicas** que viven en mar abierto y raramente son visibles desde la costa uruguaya, aunque técnicamente ocurren en aguas territoriales del país.

## Solución Implementada

### 1. Información Educativa sobre Aves Pelágicas
- **Nota informativa**: Aparece automáticamente cuando se selecciona el orden Procellariiformes
- **Contenido**: Explica que las aves pelágicas solo son visibles desde embarcaciones
- **Recomendación**: Sugiere realizar salidas en barco o tours especializados

### 2. Filtro para Excluir Aves Pelágicas
- **Nueva opción**: Checkbox "Excluir aves pelágicas (mar abierto)"
- **Propósito**: Permite a observadores terrestres filtrar especies que no pueden ver desde la costa
- **Aplicación**: Filtra automáticamente todas las aves con hábitat `['mar 🌊']`

### 3. Información Educativa
- **Nota informativa**: Aparece automáticamente cuando se selecciona el orden Procellariiformes o se filtra por hábitat marino
- **Contenido**: Explica que las aves pelágicas solo son visibles desde embarcaciones
- **Recomendación**: Sugiere realizar salidas en barco o tours especializados



## Beneficios de la Solución

1. **Transparencia**: Los usuarios entienden qué especies pueden observar desde tierra
2. **Flexibilidad**: Pueden elegir incluir o excluir aves pelágicas según su método de observación
3. **Educación**: Información sobre la naturaleza de las aves marinas
4. **Realismo**: Refleja la realidad de la observación de aves en Uruguay

## Uso Recomendado

### Para Observadores Terrestres:
- Usar el filtro "Excluir aves pelágicas (mar abierto)"
- Enfocarse en aves terrestres y costeras

### Para Observadores Marítimos:
- Incluir todas las aves
- Usar filtros específicos por orden (Procellariiformes)

### Para Todos:
- Leer la información educativa sobre aves pelágicas
- Entender las limitaciones de observación terrestre vs. marítima

## Archivos Modificados

- `src/types/index.ts` - Agregado filtro de exclusión de aves pelágicas
- `src/components/Checklist.tsx` - Implementada información educativa y filtro de exclusión
- `src/components/BirdListPDF.tsx` - Actualizado para incluir nuevo filtro en PDF

## Consideraciones Técnicas

- Los filtros se mantienen en la URL para compartir y guardar
- La información se incluye en la exportación PDF
- Los filtros son compatibles con el sistema existente
- No se afecta la funcionalidad existente
