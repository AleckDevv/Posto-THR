import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage.jsx';
import { useHydrated, useSaveData } from '../../hooks/useClientInfo.js';
import { cn } from '../../utils/cn.js';

/**
 * Vídeo ambiente (mudo, em loop) com carregamento sob demanda.
 *
 * - O poster (AVIF/WebP) aparece primeiro; o MP4 só é baixado perto da tela.
 * - Reproduz apenas enquanto visível (e `active`), pausa fora da tela.
 * - Respeita prefers-reduced-motion e Save-Data: sem autoplay, com botão de play.
 * - Botão de pausa sempre disponível (WCAG 2.2.2).
 * - Em caso de erro, mantém o poster como alternativa visual.
 */
export default function AmbientVideo({
  video,
  eager = false,
  active = true,
  fill = false,
  sizes = '50vw',
  position,
  className,
  controlClassName,
  showControl = true,
}) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const nearView = useInView(wrapRef, { margin: '400px 0px', once: true });
  const inView = useInView(wrapRef, { amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const saveData = useSaveData();
  const hydrated = useHydrated();

  const [userPaused, setUserPaused] = useState(null); // null = sem escolha do usuário
  const [isPlaying, setIsPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const autoplayAllowed = !reduceMotion && !saveData;
  const wantsPlay = userPaused === null ? autoplayAllowed : !userPaused;

  // Uma vez carregado, o vídeo permanece carregado (estado derivado do render anterior).
  if (!loaded && !failed && hydrated && (eager || nearView) && active && wantsPlay) {
    setLoaded(true);
  }

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !loaded || failed) return;
    if (inView && active && wantsPlay) {
      el.muted = true;
      const attempt = el.play();
      if (attempt?.catch) attempt.catch(() => setIsPlaying(false));
    } else {
      el.pause();
    }
  }, [loaded, failed, inView, active, wantsPlay]);

  const toggle = () => setUserPaused(isPlaying);

  return (
    <div ref={wrapRef} className={cn(fill ? 'absolute inset-0' : 'relative', 'overflow-hidden', className)} style={{ backgroundColor: video.poster.color }}>
      <div role="img" aria-label={video.label} className="absolute inset-0">
        <ResponsiveImage image={video.poster} alt="" fill priority={eager} sizes={sizes} position={position} />
        {!failed && (
          <video
            ref={videoRef}
            src={loaded ? video.src : undefined}
            muted
            loop
            playsInline
            disablePictureInPicture
            preload={loaded ? 'auto' : 'none'}
            aria-hidden="true"
            tabIndex={-1}
            width={video.width}
            height={video.height}
            style={{ objectPosition: position }}
            className={cn(
              'absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out',
              isPlaying ? 'opacity-100' : 'opacity-0',
            )}
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setFailed(true)}
          />
        )}
      </div>

      {showControl && !failed && (
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
          className={cn(
            'absolute bottom-3 right-3 z-10 grid size-10 place-items-center rounded-full',
            'bg-thr-ink/45 text-white ring-1 ring-inset ring-white/25 backdrop-blur-[2px]',
            'transition-colors duration-300 hover:bg-thr-ink/75 focus-visible:outline-white',
            controlClassName,
          )}
        >
          {isPlaying ? (
            <Pause aria-hidden="true" className="size-4" fill="currentColor" strokeWidth={0} />
          ) : (
            <Play aria-hidden="true" className="size-4 translate-x-px" fill="currentColor" strokeWidth={0} />
          )}
        </button>
      )}
    </div>
  );
}
