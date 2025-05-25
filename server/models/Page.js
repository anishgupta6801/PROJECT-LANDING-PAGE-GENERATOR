import mongoose from 'mongoose';

const { Schema } = mongoose;

// Section Schema
const SectionSchema = new Schema({
  id: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['hero', 'about', 'features', 'testimonials', 'cta', 'pricing', 'custom'] 
  },
  title: { type: String, required: true },
  content: { type: Schema.Types.Mixed, required: true },
  order: { type: Number, required: true }
});

// Form Data Schema
const FormDataSchema = new Schema({
  businessName: { type: String, required: true },
  industry: { type: String, required: true },
  tone: { type: String, required: true },
  brandColors: {
    primary: { type: String, required: true },
    secondary: { type: String }
  },
  keyFeatures: [{ type: String }],
  targetAudience: { type: String },
  vision: { type: String }
});

// Theme Schema
const ThemeSchema = new Schema({
  colorScheme: { 
    type: String, 
    required: true, 
    enum: ['light', 'dark'],
    default: 'light'
  },
  colors: {
    primary: { type: String, required: true },
    secondary: { type: String },
    background: { type: String, required: true },
    text: { type: String, required: true },
    accent: { type: String }
  },
  fonts: {
    heading: { type: String, required: true },
    body: { type: String, required: true }
  }
});

// Page Schema
const PageSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  formData: { type: FormDataSchema, required: true },
  sections: [SectionSchema],
  theme: { type: ThemeSchema, required: true },
  isPublished: { type: Boolean, default: false },
  publishedUrl: { type: String }
});

// Update timestamps before saving
PageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the model
const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);

export default Page;