import { useRef, useState } from "react";

export default function useServiceDetails() {
  const dialogRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);

  function explore(service) {
    setSelectedService(service);
    dialogRef.current.showModal();
  }

  return { dialogRef, selectedService, explore };
}
