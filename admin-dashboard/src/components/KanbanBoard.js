import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  IconButton, 
  Menu, 
  MenuItem, 
  Avatar, 
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon, 
  AccessTime as AccessTimeIcon, 
  Comment as CommentIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';

const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: 'task-1',
        title: 'Implement User Authentication',
        description: 'Set up JWT authentication and user roles',
        priority: 'high',
        assignee: { name: 'John Doe', avatar: 'JD' },
        dueDate: '2024-01-20',
        comments: 3
      },
      {
        id: 'task-2',
        title: 'Design Dashboard Layout',
        description: 'Create responsive layout with Material-UI',
        priority: 'medium',
        assignee: { name: 'Jane Smith', avatar: 'JS' },
        dueDate: '2024-01-22',
        comments: 2
      }
    ]
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    tasks: [
      {
        id: 'task-3',
        title: 'Implement Reports Module',
        description: 'Create reports generation and management',
        priority: 'medium',
        assignee: { name: 'Alice Johnson', avatar: 'AJ' },
        dueDate: '2024-01-23',
        comments: 1
      }
    ]
  },
  done: {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: 'task-4',
        title: 'Project Setup',
        description: 'Initialize project and set up development environment',
        priority: 'high',
        assignee: { name: 'Bob Wilson', avatar: 'BW' },
        dueDate: '2024-01-15',
        comments: 0
      }
    ]
  }
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const handleMenuClick = (event, task, columnId) => {
    setMenuAnchor(event.currentTarget);
    setSelectedTask({ ...task, columnId });
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEditClick = () => {
    setEditedTask(selectedTask);
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleViewClick = () => {
    setViewDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleEditSave = () => {
    const updatedColumns = { ...columns };
    const columnTasks = updatedColumns[selectedTask.columnId].tasks;
    const taskIndex = columnTasks.findIndex(t => t.id === selectedTask.id);
    
    if (taskIndex !== -1) {
      columnTasks[taskIndex] = { ...editedTask };
    }
    
    setColumns(updatedColumns);
    setEditDialogOpen(false);
    setSelectedTask(null);
    setEditedTask(null);
  };

  const handleDelete = () => {
    const updatedColumns = { ...columns };
    const columnTasks = updatedColumns[selectedTask.columnId].tasks;
    updatedColumns[selectedTask.columnId].tasks = columnTasks.filter(t => t.id !== selectedTask.id);
    
    setColumns(updatedColumns);
    setDeleteDialogOpen(false);
    setSelectedTask(null);
  };

  const handleDragStart = (e, task, sourceColumn) => {
    e.dataTransfer.setData('task', JSON.stringify({ task, sourceColumnId: sourceColumn.id }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('task'));
    const { task, sourceColumnId } = data;

    if (sourceColumnId === targetColumn.id) return;

    const sourceColumn = columns[sourceColumnId];
    const newSourceTasks = sourceColumn.tasks.filter(t => t.id !== task.id);
    const newTargetTasks = [...targetColumn.tasks, task];

    setColumns({
      ...columns,
      [sourceColumnId]: { ...sourceColumn, tasks: newSourceTasks },
      [targetColumn.id]: { ...targetColumn, tasks: newTargetTasks }
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, p: 2, overflowX: 'auto', minHeight: 'calc(100vh - 300px)' }}>
        {Object.entries(columns).map(([columnId, column]) => (
          <Paper
            key={columnId}
            sx={{
              width: 300,
              bgcolor: 'background.paper',
              p: 2,
              borderRadius: 2,
              boxShadow: 2
            }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column)}
          >
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 600 }}>
              {column.title} ({column.tasks.length})
            </Typography>

            <Stack spacing={2}>
              {column.tasks.map(task => (
                <Card
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, column)}
                  sx={{
                    cursor: 'move',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {task.title}
                      </Typography>
                      <IconButton size="small" onClick={(e) => handleMenuClick(e, task, columnId)}>
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {task.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Chip
                        label={task.priority}
                        color={getPriorityColor(task.priority)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                      <Box sx={{ flexGrow: 1 }} />
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          fontSize: '0.875rem',
                          bgcolor: 'primary.main'
                        }}
                      >
                        {task.assignee.avatar}
                      </Avatar>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {task.dueDate}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CommentIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {task.comments}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Paper>
        ))}
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleViewClick}>
          <ViewIcon fontSize="small" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={editedTask?.title || ''}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={editedTask?.description || ''}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={editedTask?.priority || ''}
                label="Priority"
                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              value={editedTask?.dueDate || ''}
              onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedTask?.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Description</Typography>
            <Typography variant="body2" paragraph>{selectedTask?.description}</Typography>

            <Typography variant="subtitle1" gutterBottom>Priority</Typography>
            <Chip
              label={selectedTask?.priority}
              color={getPriorityColor(selectedTask?.priority)}
              size="small"
              sx={{ textTransform: 'capitalize' }}
            />

            <Typography variant="subtitle1" sx={{ mt: 2 }}>Assignee</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 24, height: 24 }}>{selectedTask?.assignee?.avatar}</Avatar>
              <Typography variant="body2">{selectedTask?.assignee?.name}</Typography>
            </Box>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>Due Date</Typography>
            <Typography variant="body2">{selectedTask?.dueDate}</Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>Comments</Typography>
            <Typography variant="body2">{selectedTask?.comments} comments</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default KanbanBoard;