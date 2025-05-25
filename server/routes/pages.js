import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Page from '../models/Page.js';

const router = express.Router();

// Mock data for development without MongoDB
let mockPages = [];

// Get all pages
router.get('/', async (req, res) => {
  try {
    if (process.env.MONGODB_URI) {
      const pages = await Page.find().sort({ updatedAt: -1 });
      res.status(200).json(pages);
    } else {
      // Return mock pages if no MongoDB connection
      res.status(200).json(mockPages);
    }
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ message: 'Error fetching pages', error: error.message });
  }
});

// Get a specific page
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (process.env.MONGODB_URI) {
      const page = await Page.findById(id);
      
      if (!page) {
        return res.status(404).json({ message: 'Page not found' });
      }
      
      res.status(200).json(page);
    } else {
      // Find in mock pages
      const page = mockPages.find(p => p.id === id);
      
      if (!page) {
        return res.status(404).json({ message: 'Page not found' });
      }
      
      res.status(200).json(page);
    }
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ message: 'Error fetching page', error: error.message });
  }
});

// Create a new page
router.post('/', async (req, res) => {
  try {
    const pageData = req.body;
    
    // Ensure there's an ID for the page
    if (!pageData.id) {
      pageData.id = uuidv4();
    }
    
    // Set timestamps
    pageData.createdAt = new Date();
    pageData.updatedAt = new Date();
    
    if (process.env.MONGODB_URI) {
      const newPage = new Page(pageData);
      const savedPage = await newPage.save();
      res.status(201).json(savedPage);
    } else {
      // Add to mock pages
      mockPages.push(pageData);
      res.status(201).json(pageData);
    }
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ message: 'Error creating page', error: error.message });
  }
});

// Update a page
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Update timestamp
    updateData.updatedAt = new Date();
    
    if (process.env.MONGODB_URI) {
      const updatedPage = await Page.findByIdAndUpdate(id, updateData, { new: true });
      
      if (!updatedPage) {
        return res.status(404).json({ message: 'Page not found' });
      }
      
      res.status(200).json(updatedPage);
    } else {
      // Update in mock pages
      const pageIndex = mockPages.findIndex(p => p.id === id);
      
      if (pageIndex === -1) {
        return res.status(404).json({ message: 'Page not found' });
      }
      
      mockPages[pageIndex] = { ...mockPages[pageIndex], ...updateData };
      res.status(200).json(mockPages[pageIndex]);
    }
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ message: 'Error updating page', error: error.message });
  }
});

// Delete a page
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (process.env.MONGODB_URI) {
      const deletedPage = await Page.findByIdAndDelete(id);
      
      if (!deletedPage) {
        return res.status(404).json({ message: 'Page not found' });
      }
    } else {
      // Delete from mock pages
      const pageIndex = mockPages.findIndex(p => p.id === id);
      
      if (pageIndex === -1) {
        return res.status(404).json({ message: 'Page not found' });
      }
      
      mockPages.splice(pageIndex, 1);
    }
    
    res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ message: 'Error deleting page', error: error.message });
  }
});

export default router;