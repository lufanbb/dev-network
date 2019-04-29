import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";

export interface Profile extends Document {
  user: string;
  handle: string;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string[];
  bio: string;
  githubUsername: string;
  experience: Experience[];
  education: Education[];
}

export interface Experience extends Document {
  title: String;
  company: String;
  location: String;
  from: Date;
  to: Date;
  isCurrent: boolean;
  description: String;
}

export interface Education extends Document {
  school: String;
  degree: String;
  fieldOfStudy: String;
  from: Date;
  to: Date;
  isCurrent: boolean;
  description: string;
}

const ProfileSchema = new Schema<Profile>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubUsername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      isCurrent: {
        type: Boolean,
        default: true
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      isCurrent: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ]
});

export const ProfileModel = mongoose.model<Profile>("profile", ProfileSchema);
