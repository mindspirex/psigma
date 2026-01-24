import mongoose, { models } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = models.users || mongoose.model("users", UserSchema);

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

export const ProjectModel =
  models.projects || mongoose.model("projects", ProjectSchema);

const ObjectSchema = new mongoose.Schema({
  projectId: {
    type: String,
  },

  isTopLayerElement: {
    type: Boolean,
    default: true,
  },

  position: {
    type: String,
    default: "absolute",
    enum: ["static", "absolute"],
  },

  x: { type: Number, default: 50 },
  y: { type: Number, default: 50 },
  width: { type: Number, default: 100 },
  height: { type: Number, default: 100 },

  margin: { type: Number, default: 0 },
  padding: { type: Number, default: 0 },

  borderRadius: { type: Number, default: 0 },
  borderWidth: { type: Number, default: 0 },
  borderColor: { type: String, default: "#000000" },

  boxShadow: { type: Number, default: 0 },
  backgroundColor: { type: String, default: "#00ff00" },

  justifyContent: {
    type: String,
    enum: [
      "flex-start",
      "center",
      "flex-end",
      "space-between",
      "space-around",
      "space-evenly",
    ],
    default: "center",
  },

  alignItems: {
    type: String,
    enum: ["stretch", "flex-start", "center", "flex-end", "baseline"],
    default: "center",
  },

  rowGap: { type: Number, default: 0 },
  columnGap: { type: Number, default: 0 },

  text: { type: String, default: "" },

  children: {
    type: [String],
    default: [],
  },
});

export const ObjectModel =
  models.objects || mongoose.model("objects", ObjectSchema);
