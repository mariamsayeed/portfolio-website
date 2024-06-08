'use client'
import React, { useEffect } from 'react';
import anime from 'animejs';

export default function Animation() {
  useEffect(() => {
    function fitElementToParent(el: HTMLElement, padding = 0) {
      let timeout: ReturnType<typeof setTimeout> | null = null;
      function resize() {
        if (timeout) clearTimeout(timeout);
        anime.set(el, { scale: 1 });
        const parentEl = el.parentNode as HTMLElement;
        const elOffsetWidth = el.offsetWidth - padding;
        const parentOffsetWidth = parentEl.offsetWidth;
        const ratio = parentOffsetWidth / elOffsetWidth;
        timeout = setTimeout(() => anime.set(el, { scale: ratio }), 10);
      }
      resize();
      window.addEventListener('resize', resize);
    }

    const layeredAnimationEl = document.querySelector('.layered-animations') as HTMLElement;
    const shapeEls = layeredAnimationEl.querySelectorAll('.shape') as NodeListOf<HTMLElement>;
    const triangleEl = layeredAnimationEl.querySelector('polygon') as unknown as HTMLElement;
    const trianglePoints = triangleEl.getAttribute('points')!.split(' ').map(Number);
    const easings = ['easeInOutQuad', 'easeInOutCirc', 'easeInOutSine', 'spring'];

    fitElementToParent(layeredAnimationEl);

    function createKeyframes(value: (el: HTMLElement) => string) {
      return Array(30).fill({ value: (el: HTMLElement) => String(value(el)).toString() });
    }

    function animateShape(el: HTMLElement) {
      const circleEl = el.querySelector('circle');
      const rectEl = el.querySelector('rect');
      const polyEl = el.querySelector('polygon');

      const animation = anime.timeline({
        targets: el,
        duration: () => anime.random(600, 2200),
        easing: () => easings[anime.random(0, easings.length - 1)],
        complete: (anim) => animateShape(anim.animatables[0].target as HTMLElement),
      })
      .add({
        translateX: createKeyframes((el) => el.classList.contains('large') ? String(anime.random(-300, 300)) : String(anime.random(-520, 520))),
        translateY: createKeyframes((el) => el.classList.contains('large') ? String(anime.random(-110, 110)) : String(anime.random(-280, 280))),
        rotate: createKeyframes(() => String(anime.random(-180, 180))),
      }, 0);
      
      if (circleEl) {
        animation.add({
          targets: circleEl,
          r: createKeyframes(() => String(anime.random(32, 72))),
        }, 0);
      }

      if (rectEl) {
        animation.add({
          targets: rectEl,
          width: createKeyframes(() => String(anime.random(64, 120))),
          height: createKeyframes(() => String(anime.random(64, 120))),
        }, 0);
      }

      if (polyEl) {
        animation.add({
          targets: polyEl,
          points: createKeyframes(() => {
            const scale = anime.random(72, 180) / 100;
            return trianglePoints.map(p => p * scale).join(' ');
          }),
        }, 0);
      }
    }

    shapeEls.forEach(shapeEl => animateShape(shapeEl));
  }, []);

  return (
    <div className="flex justify-center items-center absolute w-full h-screen">
      <div className="w-4/5 pb-[40%] relative">
        <div className="layered-animations absolute top-1/2 left-1/2 flex items-center justify-center w-[1100px] h-[550px] transform -translate-x-1/2 -translate-y-1/2">
          <svg className="large shape absolute top-1/2 w-[280px] h-[280px] mt-[-140px]" viewBox="0 0 96 96">
            <defs>
              <linearGradient id="circleGradient" x1="0%" x2="100%" y1="20%" y2="80%">
                <stop stopColor="#373734" offset="0%" />
                <stop stopColor="#242423" offset="50%" />
                <stop stopColor="#0D0D0C" offset="100%" />
              </linearGradient>
            </defs>
            <circle cx="48" cy="48" r="28" fill="url(#circleGradient)" />
          </svg>
          <svg className="small shape color-red absolute top-1/2 w-[64px] h-[64px] mt-[-32px]" viewBox="0 0 96 96">
            <polygon points="48 17.28 86.4 80.11584 9.6 80.11584" />
          </svg>
          <svg className="large shape absolute top-1/2 w-[280px] h-[280px] mt-[-140px]" viewBox="0 0 96 96">
            <defs>
              <linearGradient id="triangleGradient" x1="0%" x2="100%" y1="20%" y2="80%">
                <stop stopColor="#373734" offset="0%" />
                <stop stopColor="#242423" offset="50%" />
                <stop stopColor="#0D0D0C" offset="100%" />
              </linearGradient>
            </defs>
            <polygon points="48 17.28 86.4 80.11584 9.6 80.11584" fill="url(#triangleGradient)" />
          </svg>
          <svg className="x-small shape absolute top-1/2 w-[32px] h-[32px] mt-[-16px]" viewBox="0 0 96 96">
            <polygon points="48 17.28 86.4 80.11584 9.6 80.11584" />
          </svg>
          <svg className="x-small shape absolute top-1/2 w-[32px] h-[32px] mt-[-16px]" viewBox="0 0 96 96">
            <rect width="48" height="48" x="24" y="24" />
          </svg>
          <svg className="small shape color-red absolute top-1/2 w-[64px] h-[64px] mt-[-32px]" viewBox="0 0 96 96">
            <rect width="48" height="48" x="24" y="24" />
          </svg>
          <svg className="large shape absolute top-1/2 w-[280px] h-[280px] mt-[-140px]" viewBox="0 0 96 96">
            <defs>
              <linearGradient id="rectGradient" x1="0%" x2="100%" y1="20%" y2="80%">
                <stop stopColor="#373734" offset="0%" />
                <stop stopColor="#242423" offset="50%" />
                <stop stopColor="#0D0D0C" offset="100%" />
              </linearGradient>
            </defs>
            <rect width="48" height="48" x="24" y="24" fill="url(#rectGradient)" />
          </svg>
          <svg className="small shape color-red absolute top-1/2 w-[64px] h-[64px] mt-[-32px]" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="32" />
          </svg>
          <svg className="x-small shape absolute top-1/2 w-[32px] h-[32px] mt-[-16px]" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="32" />
          </svg>
        </div>
      </div>
    </div>
  );
};

