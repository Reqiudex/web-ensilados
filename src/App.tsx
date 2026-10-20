import { Header } from './components/Header'
import { Section } from './components/Section'
import { ProductCard } from './components/ProductCard'
import { ContactForm } from './components/ContactForm'
import { Footer } from './components/Footer'
import { ConfettiClickEffect } from './components/ConfettiClickEffect'
import { ImageGallery } from './components/ImageGallery'
import { TestimoniosSection } from './components/TestimoniosSection'

import './styles/global.css'

function App() {

  const testimonios = [
    { id: 1, nombre: "Juan Pérez", imagen: "./assets/client3.jpg", texto: "Excelente calidad y servicio. Siempre cumplen con lo prometido." },
    { id: 2, nombre: "Carlos Méndez", imagen: "./assets/client1.jpg", texto: "Llevo más de un año comprando ensilados aquí y la verdad es que la calidad es excelente. Mis animales han mejorado notablemente en su producción y salud. Además, el servicio es muy rápido y siempre están atentos a resolver cualquier duda que tenga. ¡Recomendados al 100%!" },
    { id: 3, nombre: "María Fernández", imagen: "./assets/client2.jpg", texto: "La atención al cliente es de primera. Siempre me entregan a tiempo y con productos de muy buena calidad. Desde que uso sus ensilados, mis vacas están más saludables y su producción de leche ha mejorado considerablemente. ¡Muy recomendable!" },
    { id: 4, nombre: "Luis Gómez", imagen: "./assets/client4.jpg", texto: "Un producto confiable y de calidad. Ha ayudado mucho en la alimentación de mi ganado." },
    { id: 5, nombre: "Carlos Méndez", imagen: "./assets/client1.jpg", texto: "Llevo más de un año comprando ensilados aquí y la verdad es que la calidad es excelente. Mis animales han mejorado notablemente en su producción y salud. Además, el servicio es muy rápido y siempre están atentos a resolver cualquier duda que tenga. ¡Recomendados al 100%!" },
    { id: 6, nombre: "María Fernández", imagen: "./assets/client2.jpg", texto: "La atención al cliente es de primera. Siempre me entregan a tiempo y con productos de muy buena calidad. Desde que uso sus ensilados, mis vacas están más saludables y su producción de leche ha mejorado considerablemente. ¡Muy recomendable!" },
    { id: 7, nombre: "Luis Gómez", imagen: "./assets/client4.jpg", texto: "Un producto confiable y de calidad. Ha ayudado mucho en la alimentación de mi ganado." },
    { id: 8, nombre: "Carlos Méndez", imagen: "./assets/client1.jpg", texto: "Llevo más de un año comprando ensilados aquí y la verdad es que la calidad es excelente. Mis animales han mejorado notablemente en su producción y salud. Además, el servicio es muy rápido y siempre están atentos a resolver cualquier duda que tenga. ¡Recomendados al 100%!" },
    { id: 9, nombre: "María Fernández", imagen: "./assets/client2.jpg", texto: "La atención al cliente es de primera. Siempre me entregan a tiempo y con productos de muy buena calidad. Desde que uso sus ensilados, mis vacas están más saludables y su producción de leche ha mejorado considerablemente. ¡Muy recomendable!" },
    { id: 10, nombre: "Luis Gómez", imagen: "./assets/client4.jpg", texto: "Un producto confiable y de calidad. Ha ayudado mucho en la alimentación de mi ganado." },
    { id: 11, nombre: "Carlos Méndez", imagen: "./assets/client1.jpg", texto: "Llevo más de un año comprando ensilados aquí y la verdad es que la calidad es excelente. Mis animales han mejorado notablemente en su producción y salud. Además, el servicio es muy rápido y siempre están atentos a resolver cualquier duda que tenga. ¡Recomendados al 100%!" },
    { id: 12, nombre: "María Fernández", imagen: "./assets/client2.jpg", texto: "La atención al cliente es de primera. Siempre me entregan a tiempo y con productos de muy buena calidad. Desde que uso sus ensilados, mis vacas están más saludables y su producción de leche ha mejorado considerablemente. ¡Muy recomendable!" },
    { id: 13, nombre: "Luis Gómez", imagen: "./assets/client4.jpg", texto: "Un producto confiable y de calidad. Ha ayudado mucho en la alimentación de mi ganado." },
    { id: 14, nombre: "Ana Rodríguez", imagen: "./assets/client5.jpg", texto: "Servicio rápido y atención personalizada. Mis animales están mucho más saludables gracias a sus productos." },
  ]

  return (
    <>
      <ConfettiClickEffect />
      <Header />
      <main className="container">
        <Section
          title="Nuestros Productos"
          description="Ofrecemos ensilados de alta calidad para el ganado en Santa Cruz."
        >
          <ProductCard title="Ensilado de Maíz" />
          <ProductCard title="Ensilado de Sorgo" />
        </Section>

        <Section
          title="Galería"
          description="Mira algunas fotos de nuestros productos y clientes satisfechos."
        >
          <ImageGallery />
        </Section>

        <Section
          title="Testimonios"
          description="Lo que dicen nuestros clientes"
        >
          <TestimoniosSection testimonios={testimonios} />
        </Section>

        <Section
          title="Contáctanos"
          description="Estamos aquí para ayudarte"
        >
          <ContactForm />
        </Section>
      </main>
      <Footer />
    </>
  )
}

export default App
