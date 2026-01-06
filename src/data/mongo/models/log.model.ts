import { model, Schema } from "mongoose";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";

interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

const schema = new Schema<LogEntityOptions>({
  level: {
    type: String,
    enum: LogSeverityLevel,
    default: LogSeverityLevel.low,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  origin: {
    type: String,
    required: true,
  },
});

export const LogModel = model<LogEntityOptions>("log", schema);
