import {
  MapPin,
  Navigation,
  Star,
  Share2,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}

      <nav
        className="
          flex
          items-center
          justify-between
          px-4
          py-4
          border-b
          border-gray-300
          bg-white
        "
      >
        <div className="flex items-center gap-2">

          <MapPin
            size={32}
            className="text-[rgb(0,162,232)]"
          />

          <span
            className="
              text-xl
              font-bold
              text-[rgb(0,162,232)]
            "
          >
            MemoLocal
          </span>

        </div>

        <a
          href={`${import.meta.env.VITE_API_URL}/auth/google/redirect`}
        className="w-64
        flex items-center 
        justify-center gap-3 border rounded-xl py-3 hover:bg-gray-50 mt-4"
        >
        <img
           src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
           alt="Google"
           className="w-5 h-5"
         />
          Continuer avec Google
        </a>
      </nav>

      {/* Hero */}

  <section
  className="
    max-w-7xl
    mx-auto
    px-8
    py-20
    grid
    lg:grid-cols-2
    gap-16
    items-center
  "
>

  <div>

    <span
      className="
        bg-blue-100
        text-blue-700
        px-4
        py-2
        rounded-full
        text-sm
        font-medium
      "
    >
      📍 Votre mémoire géographique intelligente
    </span>

    <h1
      className="
        
        md:text-3xl
        xl:text-6xl
        font-extrabold
        text-gray-900
        mt-6
        leading-tight
      "
    >
      Ne perdez plus
      jamais une adresse
      importante.
    </h1>

    <p
      className="
        text-xl
        text-gray-600
        mt-8
        leading-relaxed
      "
    >
      MemoLocal est votre carnet de lieux intelligent.
      Enregistrez vos adresses importantes,
      vos lieux favoris, vos futurs voyages et
      retrouvez-les instantanément sur une carte interactive.
    </p>

    <div className="flex gap-4 mt-10">

      <a
        href={`${import.meta.env.VITE_API_URL}/auth/google/redirect`}
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-8
          py-4
          rounded-2xl
          font-semibold
          flex
          items-center
          gap-2
          shadow-lg
        "
      >
        Commencer gratuitement

        <ArrowRight size={18} />
      </a>

    </div>

    <div
      className="
        grid
        grid-cols-2
        gap-4
        mt-12
      "
    >

      <div className="bg-gray-50 p-4 rounded-2xl">
        <h3 className="font-bold text-2xl">
          📍
        </h3>
        <p className="mt-2 text-gray-600">
          Sauvegardez vos lieux préférés
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-2xl">
        <h3 className="font-bold text-2xl">
          ⭐
        </h3>
        <p className="mt-2 text-gray-600">
          Organisez vos favoris
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-2xl">
        <h3 className="font-bold text-2xl">
          🗺️
        </h3>
        <p className="mt-2 text-gray-600">
          Retrouvez-les sur la carte
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-2xl">
        <h3 className="font-bold text-2xl">
          🚀
        </h3>
        <p className="mt-2 text-gray-600">
          Partage rapide avec vos proches
        </p>
      </div>

    </div>

  </div>

  {/* Illustration */}

  <div className="relative">

    <div
      className="
        absolute
        inset-0
        bg-blue-100
        blur-3xl
        rounded-full
        opacity-60
      "
    />

    <div
      className="
        relative
        bg-white
        rounded-3xl
        shadow-2xl
        p-6
        border
      "
    >

      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b"
        alt="PlaceBook"
        className="
          rounded-2xl
          w-full
          h-[500px]
          object-cover
        "
      />

      <div
        className="
          absolute
          bottom-10
          left-10
          bg-white
          shadow-xl
          rounded-2xl
          p-4
        "
      >

        <h4 className="font-bold">
          📍 Dakar Plateau
        </h4>

        <p className="text-sm text-gray-500">
          Enregistré dans vos favoris
        </p>

      </div>

    </div>

  </div>

</section>

    </div>
  );
}