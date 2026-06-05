import { useEffect, useState } from "react";
import { getLieux } from "../services/lieuService";
import LieuCard from "../components/LieuCard";
import AddLieuModal from "../components/AddLieuModal";
import { Plus } from "lucide-react";

export default function Lieux() {
  const [lieux, setLieux] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    chargerLieux();
  }, []);

  const chargerLieux = async () => {
    try {
      const res = await getLieux();
      setLieux(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const voirLieu = (lieu) => {
    localStorage.setItem(
      "selectedLieu",
      JSON.stringify(lieu)
    );

    window.location.href = "/map";
  };

  const supprimerLieu = async (id) => {
    console.log(id);
  };

  return (
    <div className="p-6 h-screen overflow-auto">

<div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold">
    Mes lieux
  </h1>

  <button
    onClick={() => setShowModal(true)}
    className="
      bg-blue-600
      text-white
      px-4
      py-3
      rounded-xl
      flex
      items-center
      gap-2
    "
  >
    <Plus size={18} />
    Ajouter
  </button>

</div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
        "
      >
        {lieux.map((lieu) => (
          <LieuCard
            key={lieu.id}
            lieu={lieu}
            onView={voirLieu}
            onDelete={supprimerLieu}
          />
        ))}
      </div>
       <AddLieuModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={chargerLieux}
       />

    </div>
  );
}