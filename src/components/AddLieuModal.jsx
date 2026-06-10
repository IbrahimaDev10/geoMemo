import { X } from "lucide-react";
import { useState } from "react";
import { createLieu } from "../services/lieuService";

export default function AddLieuModal({
  open,
  onClose,
  onSuccess,
}) {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie]=useState("Autre");
  const [is_favorite, setIs_favorite] = useState(0);

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const enregistrer = async () => {
    try {
      setLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (position) => {

          await createLieu({
            nom,
            adresse,
            description,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            categorie,
            is_favorite
          });

          setNom("");
          setAdresse("");
          setDescription("");

          onSuccess();
          onClose();

        }
      );
    } catch (error) {
      console.log(error);
      alert("Erreur");
    }

    setLoading(false);
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-lg
          rounded-3xl
          p-6
          shadow-2xl
        "
      >
        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Ajouter un lieu
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Nom du lieu"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="
              w-full
              border
              rounded-xl
              p-3
            "
          />

          <input
            type="text"
            placeholder="Adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            className="
              w-full
              border
              rounded-xl
              p-3
            "
          />
          <label htmlFor="">Categorie</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option>Maison</option>
            <option>Travail</option>
            <option>Restaurant</option>
            <option>École</option>
            <option>Hôpital</option>
            <option>Autre</option>
          </select>

            <label htmlFor="">Favoris</label>
          <select
            value={is_favorite}
            onChange={(e) => setIs_favorite(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value='0'>non</option>
            <option value='1'>oui</option>

          </select>

          <textarea
            rows="4"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="
              w-full
              border
              rounded-xl
              p-3
            "
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="
              px-4
              py-2
              rounded-xl
              bg-slate-200
            "
          >
            Annuler
          </button>

          <button
            onClick={enregistrer}
            disabled={loading}
            className="
              px-5
              py-2
              rounded-xl
              bg-blue-600
              text-white
            "
          >
            {loading
              ? "Enregistrement..."
              : "Enregistrer"}
          </button>

        </div>
      </div>
    </div>
  );
}