export function updateObject<T>(oldObject: T, updatedProperties: Partial<T>) {
  return {
    ...oldObject,
    ...updatedProperties,
  }
}
