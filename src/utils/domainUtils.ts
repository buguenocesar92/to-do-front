// src/utils/domainUtils.ts

/**
 * Verifica si la ventana actual tiene un subdominio
 * diferente al dominio base. Ajusta según tu lógica.
 */
export function isSubdomain(): boolean {
  const host = window.location.host; // Por ej: "tenant1.api.localhost"
  const parts = host.split('.');

  // Si esperas un host final "api.localhost" => 2 parts,
  // un subdominio sería 3 parts (p.ej. 'tenant1', 'api', 'localhost').
  // Ajusta la lógica según tu caso.
  return parts.length > 1;
}
