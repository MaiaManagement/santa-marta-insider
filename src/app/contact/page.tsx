import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Escríbenos para colaboraciones, publicidad o preguntas sobre Santa Marta y Colombia.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
      <div className="w-16 h-1 bg-teal-500 mb-8 rounded-full" />

      <p className="text-gray-600 text-lg mb-10">
        ¿Tienes una pregunta, propuesta de colaboración o quieres anunciar con nosotros? Escríbenos.
      </p>

      <form
        name="contact"
        method="POST"
        data-netlify="true"
        className="space-y-6"
      >
        <input type="hidden" name="form-name" value="contact" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="name">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="subject">
            Asunto
          </label>
          <select
            id="subject"
            name="subject"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">Selecciona un asunto</option>
            <option value="publicidad">Publicidad / Patrocinio</option>
            <option value="colaboracion">Colaboración editorial</option>
            <option value="correccion">Corrección de contenido</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="message">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            placeholder="Cuéntanos cómo podemos ayudarte..."
          />
        </div>

        <button
          type="submit"
          className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors"
        >
          Enviar mensaje
        </button>
      </form>
    </div>
  );
}
