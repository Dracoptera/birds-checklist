import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  PhotoCamera as PhotoCameraIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { useUserData } from "../contexts/UserDataContext";
import { uruguayBirds, getBirdsByOrder, getBirdsByFamily } from "../data/birds";
import { Statistics as StatisticsType } from "../types";

const Statistics: React.FC = () => {
  const { state } = useUserData();

  const stats = useMemo((): StatisticsType => {
    const totalBirds = uruguayBirds.length;
    const seenBirds = state.totalSeen;
    const birdsWithPhotos = state.totalWithPhotos;

    return {
      totalBirds,
      seenBirds,
      birdsWithPhotos,
      seenPercentage: Math.round((seenBirds / totalBirds) * 100),
      photoPercentage: Math.round((birdsWithPhotos / totalBirds) * 100),
    };
  }, [state]);

  const birdsByOrder = useMemo(() => getBirdsByOrder(), []);
  const birdsByFamily = useMemo(() => getBirdsByFamily(), []);

  const orderStats = useMemo(() => {
    return Object.entries(birdsByOrder)
      .map(([order, birds]) => {
        const seenInOrder = birds.filter(
          (bird) => state.observations[bird.id]?.seen
        ).length;
        const withPhotosInOrder = birds.filter(
          (bird) => state.observations[bird.id]?.hasPhoto
        ).length;

        return {
          order,
          total: birds.length,
          seen: seenInOrder,
          withPhotos: withPhotosInOrder,
          seenPercentage: Math.round((seenInOrder / birds.length) * 100),
          photoPercentage: Math.round((withPhotosInOrder / birds.length) * 100),
        };
      })
      .sort((a, b) => b.seen - a.seen);
  }, [state.observations, birdsByOrder]);

  const familyStats = useMemo(() => {
    return Object.entries(birdsByFamily)
      .map(([family, birds]) => {
        const seenInFamily = birds.filter(
          (bird) => state.observations[bird.id]?.seen
        ).length;
        const withPhotosInFamily = birds.filter(
          (bird) => state.observations[bird.id]?.hasPhoto
        ).length;

        return {
          family,
          total: birds.length,
          seen: seenInFamily,
          withPhotos: withPhotosInFamily,
          seenPercentage: Math.round((seenInFamily / birds.length) * 100),
          photoPercentage: Math.round(
            (withPhotosInFamily / birds.length) * 100
          ),
        };
      })
      .sort((a, b) => b.seen - a.seen);
  }, [state.observations, birdsByFamily]);

  const recentObservations = useMemo(() => {
    const allObservations = Object.values(state.observations)
      .flatMap((obs) =>
        obs.observations.map((detail) => ({
          ...detail,
          birdName: obs.bird.commonName,
          birdId: obs.birdId,
        }))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    return allObservations;
  }, [state.observations]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Estadísticas
      </Typography>

      {/* Overall Progress */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <VisibilityIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Vistas</Typography>
              </Box>
              <Typography variant="h3" color="success.main">
                {stats.seenBirds}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                de {stats.totalBirds} especies ({stats.seenPercentage}%)
              </Typography>
              <LinearProgress
                variant="determinate"
                value={stats.seenPercentage}
                sx={{ mt: 1 }}
                color="success"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PhotoCameraIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Con Fotos</Typography>
              </Box>
              <Typography variant="h3" color="primary.main">
                {stats.birdsWithPhotos}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                de {stats.totalBirds} especies ({stats.photoPercentage}%)
              </Typography>
              <LinearProgress
                variant="determinate"
                value={stats.photoPercentage}
                sx={{ mt: 1 }}
                color="primary"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUpIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6">Pendientes</Typography>
              </Box>
              <Typography variant="h3" color="secondary.main">
                {stats.totalBirds - stats.seenBirds}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                especies por ver
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CalendarIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Última Actualización</Typography>
              </Box>
              <Typography variant="body1">
                {new Date(state.lastUpdated).toLocaleDateString("es-ES")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(state.lastUpdated).toLocaleTimeString("es-ES")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Progress by Order */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Progreso por Orden
            </Typography>
            <List dense>
              {orderStats.map((orderStat) => (
                <ListItem key={orderStat.order} divider>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          {orderStat.order}
                        </Typography>
                        <Chip
                          label={`${orderStat.seen}/${orderStat.total}`}
                          color={
                            orderStat.seenPercentage > 50
                              ? "success"
                              : "default"
                          }
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <LinearProgress
                          variant="determinate"
                          value={orderStat.seenPercentage}
                          sx={{ height: 6, borderRadius: 3, mt: 1 }}
                          color={
                            orderStat.seenPercentage > 50
                              ? "success"
                              : "primary"
                          }
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="span"
                          sx={{ display: "block" }}
                        >
                          {orderStat.seenPercentage}% completado
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Progress by Family */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Progreso por Familia (Top 10)
            </Typography>
            <List dense>
              {familyStats.slice(0, 10).map((familyStat) => (
                <ListItem key={familyStat.family} divider>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          {familyStat.family}
                        </Typography>
                        <Chip
                          label={`${familyStat.seen}/${familyStat.total}`}
                          color={
                            familyStat.seenPercentage > 50
                              ? "success"
                              : "default"
                          }
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <LinearProgress
                          variant="determinate"
                          value={familyStat.seenPercentage}
                          sx={{ height: 6, borderRadius: 3, mt: 1 }}
                          color={
                            familyStat.seenPercentage > 50
                              ? "success"
                              : "primary"
                          }
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="span"
                          sx={{ display: "block" }}
                        >
                          {familyStat.seenPercentage}% completado
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Recent Observations */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Observaciones Detalladas Recientes
            </Typography>
            {recentObservations.length > 0 ? (
              <List dense>
                {recentObservations.map((observation) => (
                  <ListItem key={observation.id} divider>
                    <ListItemIcon>
                      <CalendarIcon color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary={observation.birdName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            variant="body2"
                            component="span"
                            sx={{ display: "block" }}
                          >
                            {new Date(observation.date).toLocaleDateString(
                              "es-ES"
                            )}{" "}
                            - {observation.location}
                          </Typography>
                          {observation.notes && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              component="span"
                              sx={{ display: "block" }}
                            >
                              {observation.notes}
                            </Typography>
                          )}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", py: 2 }}
              >
                No hay observaciones registradas aún
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
