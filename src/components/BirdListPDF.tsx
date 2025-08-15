import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import { Bird } from '../data/birds/types';
import { FilterOptions } from '../types';
import { getCommonnessForDepartment } from '../data/birds';
import eyeIcon from '../assets/eye-icon.png';
import cameraIcon from '../assets/camera-icon.png';
import greatKiskadeeIcon from '../assets/index/great-kiskadee.png';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: '#2E7D32',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 5,
  },
  filterInfo: {
    fontSize: 10,
    color: '#888888',
    fontStyle: 'italic',
  },
  birdGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  birdCard: {
    width: '48%',
    marginBottom: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E0E0E0',
    borderRadius: 4,
    padding: 10,
  },
  birdName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 3,
  },
  scientificName: {
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  birdInfo: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 2,
  },
  orderText: {
    fontSize: 8,
    color: '#1976D2',
    fontWeight: 'bold',
    backgroundColor: '#E3F2FD',
    padding: 2,
    borderRadius: 2,
    marginRight: 5,
  },
  familyText: {
    fontSize: 8,
    color: '#7B1FA2',
    fontWeight: 'bold',
    backgroundColor: '#F3E5F5',
    padding: 2,
    borderRadius: 2,
  },
  birdTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    fontSize: 8,
    backgroundColor: '#F5F5F5',
    color: '#666666',
    padding: 2,
    marginRight: 5,
    marginBottom: 2,
    borderRadius: 2,
  },
  statusTag: {
    fontSize: 8,
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
    padding: 2,
    marginRight: 5,
    marginBottom: 2,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: 10,
    height: 10,
    marginRight: 3,
  },
  conservationTag: {
    fontSize: 8,
    fontWeight: 'bold',
    padding: 3,
    borderRadius: 3,
    marginLeft: 5,
  },
  conservationLC: {
    backgroundColor: '#4CAF50',
    color: '#FFFFFF',
  },
  conservationNT: {
    backgroundColor: '#8BC34A',
    color: '#FFFFFF',
  },
  conservationVU: {
    backgroundColor: '#FFC107',
    color: '#000000',
  },
  conservationEN: {
    backgroundColor: '#FF9800',
    color: '#FFFFFF',
  },
  conservationCR: {
    backgroundColor: '#F44336',
    color: '#FFFFFF',
  },
  conservationDefault: {
    backgroundColor: '#9E9E9E',
    color: '#FFFFFF',
  },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#666666',
    marginRight: 8,
    marginTop: 2,
  },
  checkboxChecked: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
    marginRight: 8,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 6,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stats: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 4,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 10,
    color: '#666666',
  },
  statsValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333333',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#888888',
    fontSize: 8,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
});

interface BirdListPDFProps {
  birds: Bird[];
  filters: FilterOptions;
  totalCount: number;
  observations: { [key: string]: any };
}

const BirdListPDF: React.FC<BirdListPDFProps> = ({ birds, filters, totalCount, observations }) => {
  const getConservationStyle = (status: string) => {
    const baseStyle = styles.conservationTag;
    
    switch (status) {
      case 'Preocupación menor':
        return [baseStyle, styles.conservationLC];
      case 'Casi amenazada':
        return [baseStyle, styles.conservationNT];
      case 'Vulnerable':
        return [baseStyle, styles.conservationVU];
      case 'En peligro':
        return [baseStyle, styles.conservationEN];
      case 'Peligro crítico':
        return [baseStyle, styles.conservationCR];
      default:
        return [baseStyle, styles.conservationDefault];
    }
  };

  const getActiveFilters = () => {
    const activeFilters: string[] = [];
    
    if (filters.seen !== 'all') {
      activeFilters.push(`Estado: ${filters.seen === 'seen' ? 'Vistos' : 'No vistos'}`);
    }
    if (filters.hasPhoto !== 'all') {
      activeFilters.push(`Fotos: ${filters.hasPhoto === 'with-photo' ? 'Con fotos' : 'Sin fotos'}`);
    }
    if (filters.order) {
      activeFilters.push(`Orden: ${filters.order}`);
    }
    if (filters.family) {
      activeFilters.push(`Familia: ${filters.family}`);
    }
    if (filters.departamento) {
      activeFilters.push(`Departamento: ${filters.departamento}`);
    }
    if (filters.commonness) {
      activeFilters.push(`Abundancia: ${filters.commonness}`);
    }
    if (filters.status) {
      activeFilters.push(`Estado: ${filters.status}`);
    }
    if (filters.conservationStatus) {
      activeFilters.push(`Conservación: ${filters.conservationStatus}`);
    }
    if (filters.searchTerm) {
      activeFilters.push(`Búsqueda: "${filters.searchTerm}"`);
    }
    if (filters.excludeOccasionalVisitors) {
      activeFilters.push(`Excluir visitantes ocasionales`);
    }
    if (filters.excludePelagicSeabirds) {
      activeFilters.push(`Excluir aves pelágicas`);
    }
    
    return activeFilters;
  };

  const getStats = () => {
    const seen = birds.filter(bird => observations[bird.id]?.seen).length;
    const withPhotos = birds.filter(bird => observations[bird.id]?.hasPhoto).length;
    
    return {
      total: birds.length,
      seen,
      withPhotos,
      seenPercentage: birds.length > 0 ? Math.round((seen / birds.length) * 100) : 0,
      photoPercentage: seen > 0 ? Math.round((withPhotos / seen) * 100) : 0,
    };
  };

  const activeFilters = getActiveFilters();
  const stats = getStats();
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Split birds into chunks for pagination
  const birdsPerPage = 10; // Reduced to avoid layout issues
  const chunks: Bird[][] = [];
  for (let i = 0; i < birds.length; i += birdsPerPage) {
    const chunk = birds.slice(i, i + birdsPerPage);
    if (chunk.length > 0) { // Only add non-empty chunks
      chunks.push(chunk);
    }
  }

  // Debug info
  console.log('PDF Debug Info:', {
    totalBirds: birds.length,
    birdsPerPage,
    totalChunks: chunks.length,
    chunkSizes: chunks.map(chunk => chunk.length)
  });

  return (
    <Document>
      {chunks.map((chunk, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          {/* Header - only on first page */}
          {pageIndex === 0 && (
            <View style={styles.header}>
              <View style={styles.title}>
                <Image style={styles.titleIcon} src={greatKiskadeeIcon} />
                <Text>Lista de Aves de Uruguay</Text>
              </View>
              <Text style={styles.subtitle}>
                Generado el {currentDate} • {birds.length} de {totalCount} especies
              </Text>
              {activeFilters.length > 0 && (
                <Text style={styles.filterInfo}>
                  Filtros aplicados: {activeFilters.join(' • ')}
                </Text>
              )}
            </View>
          )}

          {/* Simple header for non-first pages */}
          {pageIndex > 0 && (
            <View style={{ marginBottom: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#E0E0E0' }}>
              <Text style={{ fontSize: 16, color: '#2E7D32', fontWeight: 'bold', textAlign: 'center' }}>
                Lista de Aves de Uruguay - Página {pageIndex + 1}
              </Text>
              <Text style={{ fontSize: 8, color: '#999', textAlign: 'center', marginTop: 5 }}>
                {chunk.length} especies en esta página
              </Text>
            </View>
          )}

          {/* Birds Grid */}
          <View style={[styles.birdGrid, pageIndex > 0 ? { marginTop: 30 } : {}]}>
            {chunk.map((bird) => {
              const observation = observations[bird.id];
              const commonness = getCommonnessForDepartment(bird, filters.departamento);
              
              return (
                <View key={bird.id} style={styles.birdCard}>
                  <View style={styles.checkboxRow}>
                    {observation?.seen ? (
                      <View style={styles.checkboxChecked}>
                        <Text style={styles.checkmark}>✓</Text>
                      </View>
                    ) : (
                      <View style={styles.checkbox} />
                    )}
                    <View style={{ flex: 1 }}>
                      <Text style={styles.birdName}>{bird.commonName}</Text>
                      <Text style={styles.scientificName}>{bird.scientificName}</Text>
                      
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, flexWrap: 'wrap' }}>
                        <Text style={styles.orderText}>
                          {bird.order.split(' (')[0]}
                        </Text>
                        <Text style={styles.familyText}>
                          {bird.family}
                        </Text>
                        {bird.conservationStatus && (
                          <Text style={getConservationStyle(bird.conservationStatus)}>
                            {bird.conservationStatus}
                          </Text>
                        )}
                      </View>
                      
                      <View style={styles.birdTags}>
                        <Text style={styles.tag}>{bird.status.replace(/[🏠🔄❄️🌸]/g, '').trim()}</Text>
                        {observation?.seen && (
                          <View style={styles.statusTag}>
                            <Image style={styles.statusIcon} src={eyeIcon} />
                            <Text>Visto</Text>
                          </View>
                        )}
                        {observation?.hasPhoto && (
                          <View style={styles.statusTag}>
                            <Image style={styles.statusIcon} src={cameraIcon} />
                            <Text>Foto</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Image style={styles.footerIcon} src={greatKiskadeeIcon} />
            <Text>
              Mi Lista de Aves - Uruguay • Página {pageIndex + 1} de {chunks.length + 1} • 
              Generado el {currentDate}
            </Text>
          </View>
        </Page>
      ))}
      
      {/* Statistics Page - Always last */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Image style={styles.titleIcon} src={greatKiskadeeIcon} />
            <Text>Estadísticas - Lista de Aves de Uruguay</Text>
          </View>
          <Text style={styles.subtitle}>
            Generado el {currentDate} • {birds.length} de {totalCount} especies
          </Text>
        </View>

        <View style={styles.stats}>
          <Text style={styles.statsTitle}>Resumen de Observaciones</Text>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Total de especies mostradas:</Text>
            <Text style={styles.statsValue}>{stats.total}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Especies vistas:</Text>
            <Text style={styles.statsValue}>{stats.seen} ({stats.seenPercentage}%)</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Con fotografías:</Text>
            <Text style={styles.statsValue}>{stats.withPhotos} ({stats.photoPercentage}%)</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Pendientes por observar:</Text>
            <Text style={styles.statsValue}>{stats.total - stats.seen}</Text>
          </View>
        </View>

        {/* Footer for stats page */}
        <View style={styles.footer}>
          <Image style={styles.footerIcon} src={greatKiskadeeIcon} />
          <Text>
            Mi Lista de Aves - Uruguay • Página {chunks.length + 1} de {chunks.length + 1} • 
            Generado el {currentDate}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default BirdListPDF;
