import React from 'react';
import { Paper, Grid, TextField, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const InventoryManagement = () => {
  const items = [
    { name: 'Paracetamol', quantity: 50, expiration: '12/2024' },
    { name: 'Aspirina', quantity: 100, expiration: '05/2025' },
  ];

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Gestão de Estoque
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: 16 }}>
        <Grid item xs={12} sm={4}>
          <TextField label="Nome do Medicamento" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Quantidade" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Validade" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Adicionar ao Estoque
          </Button>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Validade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.expiration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default InventoryManagement;
