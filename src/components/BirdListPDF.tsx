import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import { Bird } from '../data/birds/types';
import { FilterOptions } from '../types';
import { getCommonnessForDepartment } from '../data/birds';
import eyeIcon from '../assets/eye-icon.png';
import cameraIcon from '../assets/camera-icon.png';

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
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#666666',
    marginRight: 8,
    marginTop: 2,
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
  },
});

interface BirdListPDFProps {
  birds: Bird[];
  filters: FilterOptions;
  totalCount: number;
  observations: { [key: string]: any };
}

const BirdListPDF: React.FC<BirdListPDFProps> = ({ birds, filters, totalCount, observations }) => {
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
  const birdsPerPage = 12;
  const chunks: Bird[][] = [];
  for (let i = 0; i < birds.length; i += birdsPerPage) {
    chunks.push(birds.slice(i, i + birdsPerPage));
  }

  return (
    <Document>
      {chunks.map((chunk, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          {/* Header - only on first page */}
          {pageIndex === 0 && (
            <View style={styles.header}>
              <Text style={styles.title}>Lista de Aves de Uruguay</Text>
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

          {/* Birds Grid */}
          <View style={styles.birdGrid}>
            {chunk.map((bird) => {
              const observation = observations[bird.id];
              const commonness = getCommonnessForDepartment(bird, filters.departamento);
              
              return (
                <View key={bird.id} style={styles.birdCard}>
                  <View style={styles.checkboxRow}>
                    <View style={styles.checkbox} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.birdName}>{bird.commonName}</Text>
                      <Text style={styles.scientificName}>{bird.scientificName}</Text>
                      
                      <Text style={styles.birdInfo}>
                        {bird.order.split(' (')[0]} • {bird.family} • {bird.conservationStatus || 'Estado no especificado'}
                      </Text>
                      
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

          {/* Stats - only on first page */}
          {pageIndex === 0 && (
            <View style={styles.stats}>
              <Text style={styles.statsTitle}>Estadísticas</Text>
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
            </View>
          )}

          {/* Footer */}
          <Text style={styles.footer}>
            Lista de Aves de Uruguay • Página {pageIndex + 1} de {chunks.length} • 
            Generado el {currentDate}
          </Text>
        </Page>
      ))}
    </Document>
  );
};

export default BirdListPDF;
