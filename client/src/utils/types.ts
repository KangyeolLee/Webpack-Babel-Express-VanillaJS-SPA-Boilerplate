import { ClassElement } from 'typescript';

export function isClass(value: ClassElement) {
  return Boolean(value && value.toString().startsWith('class '));
}
