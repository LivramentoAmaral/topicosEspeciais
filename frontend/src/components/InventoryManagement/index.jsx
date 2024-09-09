import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Paper, Grid, TextField, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { createInventoryItem, updateInventoryItem, deleteInventoryItem, getAllInventoryItems } from '../../api/Inventory';

const InventoryManagement = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [newItem, setNewItem] = useState({ medicationName: '', quantity: '', expiryDate: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchItems = async () => {
    try {
      const data = await getAllInventoryItems();
      setItems(data);
      setFilteredItems(data);

      data.forEach(item => {
        if (isItemExpiringSoon(item.expiryDate)) {
          Swal.fire({
            icon: 'warning',
            title: 'Aviso de Validade',
            text: `${item.medicationName} está prestes a vencer!`,
            confirmButtonText: 'OK'
          });
        }
      });
    } catch (error) {
      console.error('Erro ao carregar itens de inventário:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (!newItem.medicationName || !newItem.quantity || !newItem.expiryDate) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      await createInventoryItem(newItem);
      setNewItem({ medicationName: '', quantity: '', expiryDate: '' });
      setError(null);
      fetchItems();
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      setError('Erro ao adicionar item ao inventário');
    }
  };

  const handleUpdateItem = async (id, updatedItem) => {
    if (!updatedItem.medicationName || !updatedItem.quantity || !updatedItem.expiryDate) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      await updateInventoryItem(id, updatedItem);
      setEditingItem(null);
      setError(null);
      fetchItems();
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
      setError('Erro ao atualizar item no inventário');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteInventoryItem(id);
      fetchItems();
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      setError('Erro ao deletar item do inventário');
    }
  };

  const isItemExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 7 && diffDays >= 0; 
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = items.filter(item =>
      item.medicationName.toLowerCase().includes(query) ||
      item.quantity.toString().includes(query) ||
      new Date(item.expiryDate).toLocaleDateString().includes(query)
    );

    setFilteredItems(filtered);
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Gestão de Estoque
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2} style={{ marginBottom: 16 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Nome do Medicamento"
            value={newItem.medicationName}
            onChange={(e) => setNewItem({ ...newItem, medicationName: e.target.value })}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Quantidade"
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Validade"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newItem.expiryDate}
            onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddItem}>
            Adicionar ao Estoque
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginBottom: 16 }}>
        <Grid item xs={12}>
          <TextField
            label="Pesquisar"
            value={searchQuery}
            onChange={handleSearch}
            fullWidth
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Validade</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item._id} style={{ backgroundColor: isItemExpiringSoon(item.expiryDate) ? '#f8d7da' : 'inherit' }}>
              <TableCell>
                {editingItem && editingItem._id === item._id ? (
                  <TextField
                    value={editingItem.medicationName}
                    onChange={(e) => setEditingItem({ ...editingItem, medicationName: e.target.value })}
                  />
                ) : (
                  item.medicationName
                )}
              </TableCell>
              <TableCell>
                {editingItem && editingItem._id === item._id ? (
                  <TextField
                    type="number"
                    value={editingItem.quantity}
                    onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                  />
                ) : (
                  item.quantity
                )}
              </TableCell>
              <TableCell>
                {editingItem && editingItem._id === item._id ? (
                  <TextField
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={editingItem.expiryDate}
                    onChange={(e) => setEditingItem({ ...editingItem, expiryDate: e.target.value })}
                  />
                ) : (
                  new Date(item.expiryDate).toLocaleDateString()
                )}
              </TableCell>
              <TableCell>
                {editingItem && editingItem._id === item._id ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateItem(item._id, editingItem)}
                    >
                      Salvar
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setEditingItem(null)}
                      style={{ marginLeft: 8 }}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setEditingItem(item)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteItem(item._id)}
                      style={{ marginLeft: 8 }}
                    >
                      Deletar
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default InventoryManagement;
