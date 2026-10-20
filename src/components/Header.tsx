import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const Header = () => {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setShowCursor(false), 2500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <style>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 18ch }
        }

        @keyframes blink {
          0%, 100% { border-color: transparent }
          50% { border-color: white }
        }

        .typing-container {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          animation: typing 2.5s steps(19, end) forwards;
          font-weight: bold;
          font-size: 2rem;
          font-family: 'Signika Negative', sans-serif;
          transform: skewX(-10deg);
          position: relative;
        }

        .cursor {
          display: inline-block;
          border-right: 2px solid white;
          animation: blink 1s step-end infinite;
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto 0;
          height: 1em;
        }

        header {
          background-color: #28a745;
          padding: 10px 20px;
          color: white;
          display: flex;
          align-items: center;
          min-height: 80px;
          font-family: 'Signika Negative', sans-serif;
        }

        svg {
          width: 50px;
          height: auto;
          flex-shrink: 0;
        }

        .text-wrapper {
          flex: 1;
          text-align: center;
        }

        .text-break {
          display: none;
        }

        @media (max-width: 600px) {
          svg {
            width: 80px;
          }

          .typing-container {
            font-size: 1.5rem;
            width: 0;
            animation: typing 2.5s steps(19, end) forwards;
          }

          .text-break {
            display: inline;
          }

          .text-no-break {
            display: none;
          }
        }
      `}</style>

      <header>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {[
            'M2 22 16 8',
            'M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z',
            'M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z',
            'M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z',
            'M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z',
            'M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z',
            'M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z',
            'M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z',
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))}
        </motion.svg>

        <div className="text-wrapper">
          <h1 className="typing-container">
            <span className="text-no-break">Ensilados Santa Cruz</span>
            <span className="text-break">
              Ensilados<br />Santa Cruz
            </span>
            {showCursor && <span className="cursor" />}
          </h1>
        </div>
      </header>
    </>
  )
}
