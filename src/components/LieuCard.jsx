import {
  Eye,
  Trash2,
  Star,
  Navigation,
  Share2,
} from "lucide-react";

export default function LieuCard({
  lieu,
  onView,
  onDelete,
  onNavigate,
  onToggleFavorite,
  onShare,
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
      <div className="flex justify-between items-start">

        <div>
          <h2 className="font-bold text-lg">
            {lieu.nom}
          </h2>

          <p className="text-gray-500 text-sm">
            {lieu.adresse}
          </p>
        </div>

        {lieu.is_favorite && (
          <span className="text-yellow-500 text-xl">
            ⭐
          </span>
        )}

      </div>

      <p className="mt-3 text-gray-700">
        {lieu.description}
      </p>

      <div className="flex gap-2 mt-4 flex-wrap">

        <button
          onClick={() => onView(lieu)}
          className="
            bg-[rgb(0,162,232)]
            text-white
            p-2
            rounded-xl
          "
        >
          <Eye size={18} />
        </button>

        <button
          onClick={() => onNavigate(lieu)}
          className="
            bg-[rgb(0,162,232)]
            text-white
            px-3
            py-2
            rounded-xl
            flex
            items-center
            gap-2
          "
        >
          <Navigation size={18} />
          M'y conduire
        </button>

        <button
          onClick={() =>
            onToggleFavorite(lieu.id)
          }
          className="
            bg-[rgb(0,162,232)]
            text-white
            p-2
            rounded-xl
          "
          title='favoris'
        >
          <Star
            size={18}
            fill={
              lieu.is_favorite
                ? "currentColor"
                : "none"
            }

          />
        </button>

        <button
          onClick={() => onDelete(lieu.id)}
          className="
            bg-red-500
            text-white
            p-2
            rounded-xl
          "
          
        >
          <Trash2 size={18} />
        </button>
        <button
           onClick={() => onShare(lieu)}
           className="
             bg-[rgb(0,162,232)]
             text-white
             p-2
             rounded-xl
           "
           title='partager sur whatsapp'
         >
           <Share2 size={18} />
         </button>

      </div>
    </div>
  );
}