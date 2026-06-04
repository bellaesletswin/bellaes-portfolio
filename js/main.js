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
  video.volume = 1;
  video.playsInline = true;
  video.controls = true;

  const playMuted = async () => {
    await primeVideoFrame(video);
    if (video.paused) {
      video.play().catch(() => {});
    }
  };

  playMuted();
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) playMuted();
  });
}

function primeVideoFrame(video) {
  const startOffset = 1;
  if (video.dataset.primed === 'true') return Promise.resolve();

  return new Promise(resolve => {
    let timeoutId = null;

    const finish = (isPrimed = true) => {
      window.clearTimeout(timeoutId);
      video.removeEventListener('loadedmetadata', prime);
      video.removeEventListener('seeked', finish);
      if (isPrimed) {
        video.dataset.primed = 'true';
      }
      resolve();
    };

    const prime = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0.2) {
        finish();
        return;
      }

      const targetTime = Math.min(startOffset, Math.max(0.1, video.duration - 0.1));

      try {
        if (video.currentTime < targetTime - 0.05) {
          video.addEventListener('seeked', finish, { once: true });
          video.currentTime = targetTime;
          timeoutId = window.setTimeout(finish, 900);
        } else {
          finish();
        }
      } catch {
        finish();
      }
    };

    if (video.readyState >= 1) {
      prime();
    } else {
      video.addEventListener('loadedmetadata', prime, { once: true });
      timeoutId = window.setTimeout(() => finish(false), 2000);
    }
  });
}

function loadDeferredVideo(video) {
  const sources = video.querySelectorAll('source[data-src]');
  if (!sources.length) return video.currentSrc || video.querySelector('source')?.src || '';

  sources.forEach(source => {
    source.src = source.dataset.src;
    source.removeAttribute('data-src');
  });
  video.load();

  return video.querySelector('source')?.src || '';
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

  const workVideos = document.querySelectorAll('.work-video');

  workVideos.forEach(video => {
    video.muted = true;
    video.volume = 0;
    video.preload = 'metadata';
    primeVideoFrame(video);
  });

  const playPreview = async link => {
    const video = link.querySelector('.work-video');
    if (!video) return;

    loadDeferredVideo(video);
    video.muted = true;
    video.volume = 0;
    await primeVideoFrame(video);
    video.play().catch(() => {});
  };

  const pausePreview = link => {
    const video = link.querySelector('.work-video');
    if (!video || video.paused) return;

    video.pause();
  };

  function openPreview(link) {
    workVideos.forEach(video => {
      video.muted = true;
      video.volume = 0;
    });

    const thumbVideo = link.querySelector('video');
    const source = thumbVideo ? loadDeferredVideo(thumbVideo) : '';
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

    primeVideoFrame(previewVideo).then(() => previewVideo.play()).catch(() => {
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
    link.addEventListener('pointerenter', () => playPreview(link));
    link.addEventListener('pointerleave', () => pausePreview(link));
    link.addEventListener('focusin', () => playPreview(link));
    link.addEventListener('focusout', () => pausePreview(link));
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
  video.preload = 'none';

  const playMuted = async () => {
    loadDeferredVideo(video);
    video.muted = true;
    video.volume = 0;

    try {
      await primeVideoFrame(video);
      await video.play();
    } catch {
      wrapper.classList.remove('is-sound-on');
    }
  };

  const pauseMuted = () => {
    if (!video.muted) return;
    video.pause();
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        playMuted();
      } else {
        pauseMuted();
      }
    });
  }, {
    threshold: 0.35
  });

  observer.observe(wrapper);

  const toggleSound = async () => {
    const shouldUnmute = video.muted;
    loadDeferredVideo(video);

    video.muted = !shouldUnmute;
    video.volume = shouldUnmute ? 1 : 0;
    wrapper.classList.toggle('is-sound-on', shouldUnmute);

    if (video.paused) {
      try {
        await primeVideoFrame(video);
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
