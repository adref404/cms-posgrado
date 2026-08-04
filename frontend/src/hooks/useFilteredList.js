import { useEffect, useMemo, useState } from "react";

// Búsqueda por palabra clave + rango de fechas + paginación, reutilizable
// entre Noticias, Eventos y Comunicados.
export const useFilteredList = (
  items,
  { searchFields = [], dateField = "fecha" } = {}
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return items
      .filter((item) => {
        const matchesTerm =
          !term ||
          searchFields.some((field) => {
            const value = item[field];
            if (Array.isArray(value)) {
              return value.join(" ").toLowerCase().includes(term);
            }
            return value && String(value).toLowerCase().includes(term);
          });

        const fecha = item[dateField];
        const matchesDesde = !fechaDesde || fecha >= fechaDesde;
        const matchesHasta = !fechaHasta || fecha <= fechaHasta;

        return matchesTerm && matchesDesde && matchesHasta;
      })
      .sort((a, b) => new Date(b[dateField]) - new Date(a[dateField]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, searchTerm, fechaDesde, fechaHasta]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, fechaDesde, fechaHasta, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    searchTerm,
    setSearchTerm,
    fechaDesde,
    setFechaDesde,
    fechaHasta,
    setFechaHasta,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    totalPages,
    goToPage,
    paginated,
    totalCount: filtered.length,
  };
};
