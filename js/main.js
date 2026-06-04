/**
 * Bella Rahman Portfolio — Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initHeaderScroll();
  initShowreelAutoplay();
  initSelectedWorkPreview();
  initAboutVideoSound();
});


/* ===========================
   SCROLL REVEAL ANIMATION
   =========================== */
function initScrollReveal() {
  // Add reveal class to target elements
  const revealElements = document.querySelectorAll(
    '.tagline, .work-item, .about-image-wrapper, .about-content, .footer-info-col'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ===========================
   HEADER HIDE ON SCROLL
   =========================== */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 120) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ===========================
   SHOWREEL AUTOPLAY
   =========================== */
function initShowreelAutoplay() {
  const video = document.querySelector('.showreel-video');
  if (!video) return;

  video.muted = true;
  video.playsInline = true;
  video.controls = false;

  const showControls = () => {
    video.controls = true;
  };

  const showControlsAndPlay = () => {
    showControls();
    if (video.paused) {
      video.play().catch(() => {});
    }
    window.setTimeout(() => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    }, 120);
  };

  video.addEventListener('pointerenter', showControls, { once: true });
  video.addEventListener('focus', showControls, { once: true });
  video.addEventListener('touchstart', showControlsAndPlay, { once: true, passive: true });
  video.addEventListener('click', (event) => {
    event.preventDefault();
    showControlsAndPlay();
  }, { once: true });

  const playPromise = video.play();
  if (playPromise) {
    playPromise.catch(() => {});
  }
}

/* ===========================
   SELECTED WORK PREVIEW
   =========================== */
function initSelectedWorkPreview() {
  const lightbox = document.getElementById('work-lightbox');
  const lightboxArt = document.getElementById('work-lightbox-art');
  const lightboxCaption = document.getElementById('work-lightbox-caption');
  const seeMore = document.getElementById('work-lightbox-more');
  const closeButton = document.querySelector('.work-lightbox-close');
  const workLinks = document.querySelectorAll('[data-work-preview]');

  if (!lightbox || !lightboxArt || !lightboxCaption || !seeMore || !closeButton || !workLinks.length) return;

  document.querySelectorAll('.work-video').forEach(video => {
    video.muted = true;
    video.volume = 0;
  });

  function openPreview(link) {
    document.querySelectorAll('.work-video').forEach(video => {
      video.muted = true;
      video.volume = 0;
    });

    const thumbVideo = link.querySelector('video');
    const source = thumbVideo?.currentSrc || thumbVideo?.querySelector('source')?.src;
    const label = link.querySelector('.work-client')?.textContent || 'Selected work';

    if (!source) return;

    lightboxArt.innerHTML = '';

    const previewVideo = document.createElement('video');
    previewVideo.src = source;
    previewVideo.autoplay = true;
    previewVideo.muted = false;
    previewVideo.volume = 1;
    previewVideo.loop = true;
    previewVideo.playsInline = true;
    previewVideo.controls = true;
    lightboxArt.appendChild(previewVideo);

    lightboxCaption.textContent = label;
    seeMore.href = link.getAttribute('href') || 'archive.html';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('work-lightbox-open');
    closeButton.focus();

    previewVideo.play().catch(() => {
      previewVideo.muted = true;
      previewVideo.volume = 0;
      previewVideo.play().catch(() => {});
    });
  }

  function closePreview() {
    lightboxArt.querySelectorAll('video').forEach(video => {
      video.pause();
      video.muted = true;
      video.volume = 0;
    });

    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('work-lightbox-open');
    lightboxArt.innerHTML = '';
  }

  workLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      openPreview(link);
    });
  });

  closeButton.addEventListener('click', closePreview);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closePreview();
  });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
      closePreview();
    }
  });
}

/* ===========================
   ABOUT VIDEO SOUND TOGGLE
   =========================== */
function initAboutVideoSound() {
  const wrapper = document.querySelector('.about-image-wrapper');
  const video = document.querySelector('.about-video');
  if (!wrapper || !video) return;

  video.muted = true;
  video.volume = 0;

  const toggleSound = async () => {
    const shouldUnmute = video.muted;

    video.muted = !shouldUnmute;
    video.volume = shouldUnmute ? 1 : 0;
    wrapper.classList.toggle('is-sound-on', shouldUnmute);

    if (video.paused) {
      try {
        await video.play();
      } catch {
        video.muted = true;
        video.volume = 0;
        wrapper.classList.remove('is-sound-on');
      }
    }
  };

  wrapper.addEventListener('click', toggleSound);

  wrapper.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleSound();
  });
}
