import {
  Eye,
  Trash2,
  Star,
} from "lucide-react";

export default function LieuCard({
  lieu,
  onView,
  onDelete,
}) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        hover:shadow-lg
        transition
        p-5
      "
    >
      <h2 className="font-bold text-lg">
        {lieu.nom}
      </h2>

      <p className="text-gray-500 text-sm">
        {lieu.adresse}
      </p>

      <p className="mt-3 text-gray-700">
        {lieu.description}
      </p>

      <div className="flex gap-2 mt-4">

        <button
          onClick={() => onView(lieu)}
          className="
            bg-blue-500
            text-white
            px-3
            py-2
            rounded-xl
          "
        >
          <Eye size={18} />
        </button>

        <button
          className="
            bg-yellow-500
            text-white
            px-3
            py-2
            rounded-xl
          "
        >
          <Star size={18} />
        </button>

        <button
          onClick={() => onDelete(lieu.id)}
          className="
            bg-red-500
            text-white
            px-3
            py-2
            rounded-xl
          "
        >
          <Trash2 size={18} />
        </button>

      </div>
    </div>
  );
}