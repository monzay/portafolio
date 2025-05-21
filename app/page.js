"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Cpu,
  Mail,
  Github,
  Linkedin,
  Menu,
} from "lucide-react";
import headerJson from "./JSON/headerJson";
import proyectos from "./JSON/proyectos";
import Image from "next/image";
import Link from "next/link";



import  perfil  from "./img/perfil.jpg"
const SeccionAnimada = ({ children, className = "", id = "", delay = 0 }) => {
  const ref = useRef(null);
  const [esVisible, setEsVisible] = useState(false);

  useEffect(() => {
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setTimeout(() => setEsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    const currentRef = ref.current
    if (currentRef) {
      observador.observe(ref.current);
    }

    return () => {
      if (currentRef) {
        observador.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-1000 ${
        esVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const FondoParallax = () => {
  const [desplazamiento, setDesplazamiento] = useState(0);

  useEffect(() => {
    const manejarDesplazamiento = () => {
      setDesplazamiento(window.pageYOffset);
    };
    window.addEventListener("scroll", manejarDesplazamiento);
    return () => {
      window.removeEventListener("scroll", manejarDesplazamiento);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[-1]"
      style={{
        backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
        backgroundSize: "cover",
        backgroundPosition: `center ${desplazamiento * 0.5}px`,
      }}
    />
  );
};

const desplazarASeccion = (id) => {
  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Page() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <FondoParallax />
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold">Portafolio</span>
            <nav className="hidden md:flex space-x-4">
              {headerJson.map((item, index) => (
                <button
                  key={index}
                  onClick={() => desplazarASeccion(item.id)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-300 flex items-center"
                >
                  <item.icono className="w-5 h-5 mr-2" />
                  {item.texto}
                </button>
              ))}
            </nav>
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setMenuAbierto(!menuAbierto)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      {menuAbierto && (
        <div className="fixed inset-0 z-40 bg-white bg-opacity-90 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {headerJson.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  desplazarASeccion(item.id);
                  setMenuAbierto(false);
                }}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-300 flex items-center"
              >
                <item.icono className="w-5 h-5 mr-2" />
                {item.texto}
              </button>
            ))}
          </div>
        </div>
      )}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <SeccionAnimada className="text-center mb-12" delay={0}>
          <div className="mb-6">
            <Image
              width={1000}
              height={1000}
              src={perfil}
              alt="Juan Pérez"
              className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-gray-300"
            />
          </div>
          <h1 className="text-5xl font-bold mb-2">Joel Martinez</h1>
          <p className="text-xl text-gray-600">Desarrollador</p>
        </SeccionAnimada>

        <SeccionAnimada className="mb-12" id="sobre-mi" delay={200}>
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <span>Sobre Mí</span>
          </h2>
          <p className="text-lg text-gray-700">
          ¡Hola! Soy un desarrollador con experiencia en proyectos web  .
           <br/>
            ¿Necesitas ayuda con algo?  
          </p>
        </SeccionAnimada>

        <SeccionAnimada className="mb-12" id="proyectos" delay={400}>
          <h2 className="text-3xl font-semibold mb-6 flex items-center">
            <span>Proyectos</span>
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {proyectos.map((proyecto, index) => (

              <Link href={proyecto.url} key={index}>
            <SeccionAnimada   delay={600 + index * 200}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden group">
                  <div className="relative">
                    <Image
                      width={1000}
                      height={1000}
                      src={proyecto.imagen}
                      alt={proyecto.titulo}
                      className="w-full h-48 object-cover  transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium">
                        Ver Proyecto
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-xl mb-2">
                      {proyecto.titulo}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {proyecto.descripcion}
                    </p>
                  </div>
                </div>
              </SeccionAnimada>
              </Link>
  
            ))}
          </div>
        </SeccionAnimada>

        <SeccionAnimada className="mb-12" id="habilidades" delay={1100}>
          <h2 className="text-3xl font-semibold mb-6 flex items-center">
            <Cpu className="w-8 h-8 mr-2" />
            <span>Habilidades</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "C++",
              "Python",
              "SQL",
              "Next",
              "React",
              "Node.js",
              "TypeScript",
            ].map((habilidad, index) => (
              <SeccionAnimada key={index} delay={1600 + index * 100}>
                <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 hover:bg-gray-300">
                  {habilidad}
                </span>
              </SeccionAnimada>
            ))}
          </div>
        </SeccionAnimada>

        <SeccionAnimada id="contacto" delay={2000}>
          <footer className="text-center">
            <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center">
              <Mail className="w-8 h-8 mr-2" />
              <span>Contáctame</span>
            </h2>
            <div className="flex justify-center space-x-6">
              {[
                { href: "https://github.com/monzay", icon: Github },
                { href: "https://www.linkedin.com/in/joel-martinez-5bb435286/", icon: Linkedin },
                { href: "jm8587700@gmail.com", icon: Mail },
              ].map((social, index) => (
                <SeccionAnimada key={index} delay={2600 + index * 200}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                </SeccionAnimada>
              ))}
            </div>
          </footer>
        </SeccionAnimada>
      </main>
    </div>
  );
}
