export function getCSSVariable(variable) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable) || 'black';
}
