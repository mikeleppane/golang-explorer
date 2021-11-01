import Joi from "joi";
import { TestingEntry } from "../types";

export function validateTestingRequest(format: TestingEntry) {
  const schema = Joi.object({
    code: Joi.string().required(),
    gogc: Joi.string().optional(),
    godebug: Joi.string().optional(),
    buildOptions: Joi.object().optional(),
    testingOptions: Joi.object().optional(),
    version: Joi.string().pattern(new RegExp("^\\d+(.\\d+)?$")).optional(),
  });

  return schema.validate(format);
}
