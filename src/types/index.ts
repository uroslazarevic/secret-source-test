interface IModel {
  assign(source: Object): this;
}

export class Model implements IModel {
  // Safely assign
  assign(source) {
    for (const key in source) {
      const sourceValue = source[key];

      if (key in this) {
        if (!sourceValue) {
          // Don't overwrite with undefineds
          continue;
        }

        this[key] = sourceValue;
      }
    }

    return this;
  }

  get now() {
    return new Date();
  }
}
