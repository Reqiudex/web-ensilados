import React, { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Testimonio {
  id: number;
  nombre: string;
  texto: string;
  imagen: string;
}

interface TestimonioCardProps extends Testimonio {
  onClick: () => void;
  isSelected: boolean;
  expanded: boolean;
  toggleExpand: () => void;
}

const TestimonioCard: React.FC<TestimonioCardProps> = ({
  nombre,
  texto,
  imagen,
  onClick,
  isSelected,
  expanded,
  toggleExpand,
}) => {
  return (
    <motion.div
      className={`testimonial-card ${isSelected ? 'selected' : ''} ${expanded ? 'expanded' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onClick={() => {
        onClick();
        toggleExpand();
      }}
      style={{
        cursor: 'pointer',
        transform: isSelected ? 'scale(1.05)' : 'none',
        boxShadow: isSelected ? '0 8px 20px rgba(0,0,0,0.2)' : undefined,
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
    >
      <div className="testimonial-header">
        <img src={imagen} alt={`Foto de ${nombre}`} className="profile-pic" />
        <h4 className="name">{nombre}</h4>
      </div>
      <p className={`testimonial-content ${expanded ? 'show' : ''}`}>
        {texto}
      </p>
      {!expanded && <div className="fade-text"></div>}
    </motion.div>
  );
};

interface TestimoniosSectionProps {
  testimonios: Testimonio[];
}

export const TestimoniosSection: React.FC<TestimoniosSectionProps> = ({ testimonios }) => {
  const [paused, setPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const testimoniosRow2 = useMemo(() => {
    return [...testimonios].sort(() => Math.random() - 0.5);
  }, [testimonios]);

  const duplicatedRow1 = [...testimonios, ...testimonios];
  const duplicatedRow2 = [...testimoniosRow2, ...testimoniosRow2];

  const handleClickTestimonio = (index: number, row: 'first' | 'second') => {
    const isSameSelected = selectedIndex === index;

    if (paused && isSameSelected) {
      setPaused(false);
      setSelectedIndex(null);
      setExpandedIndex(null);
    } else {
      setPaused(true);
      setSelectedIndex(index);
      centerTestimonio(index, row);
    }
  };

  const toggleExpand = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const centerTestimonio = (index: number, row: 'first' | 'second') => {
    const container = row === 'first' ? row1Ref.current : row2Ref.current;
    if (!container) return;

    const cardWidth = 280 + 20; // Ancho de la card + margin
    const scrollLeft = cardWidth * index - container.clientWidth / 2 + cardWidth / 2;

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  };

  return (
    <section>
      {/* Primera fila */}
      <div
        ref={row1Ref}
        className={`testimonial-row first ${paused ? 'paused' : ''}`}
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        <div className="inner">
          {duplicatedRow1.map((t, i) => {
            const baseIndex = i % testimonios.length;
            return (
              <TestimonioCard
                key={`first-${i}-${t.id}`}
                {...t}
                onClick={() => handleClickTestimonio(baseIndex, 'first')}
                isSelected={paused && selectedIndex === baseIndex}
                expanded={expandedIndex === baseIndex}
                toggleExpand={() => toggleExpand(baseIndex)}
              />
            );
          })}
        </div>
      </div>

      {/* Segunda fila */}
      <div
        ref={row2Ref}
        className={`testimonial-row second ${paused ? 'paused' : ''}`}
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        <div className="inner">
          {duplicatedRow2.map((t, i) => {
            const baseIndex = i % testimoniosRow2.length;
            return (
              <TestimonioCard
                key={`second-${i}-${t.id}`}
                {...t}
                onClick={() => handleClickTestimonio(baseIndex, 'second')}
                isSelected={paused && selectedIndex === baseIndex}
                expanded={expandedIndex === baseIndex}
                toggleExpand={() => toggleExpand(baseIndex)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
