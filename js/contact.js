document.addEventListener('DOMContentLoaded', () => {
  const panel = document.querySelector('.contact-form-panel');
  const form = document.querySelector('.contact-form');
  const thankVideo = document.querySelector('.contact-thank-video');
  const anotherButton = document.querySelector('.contact-another-message');
  const submitButton = form?.querySelector('button[type="submit"]');
  const statusMessage = form?.querySelector('.contact-form-status');

  if (!panel || !form || !thankVideo || !anotherButton || !submitButton || !statusMessage) return;

  const workVideos = [
    'assets/video/archive/directing/gxb-is-for-everywhere-online.mp4',
    'assets/video/archive/directing/mtv-base-mega-hits.mp4',
    'assets/video/archive/commercial-editing/yoco-back-the-underdog.mp4',
    'assets/video/archive/promotional-content/young-black-and-excellent-bet-2021.mp4',
    'assets/video/archive/promotional-content/senzo-murder-of-a-soccer-star-netflix.mp4',
    'assets/video/archive/short-films/gxb-the-heist-4min-online-mtv-v2.mp4',
    'assets/video/archive/more-works/stitch-elevate-launch-online-final.mp4'
  ];

  const playRandomWork = () => {
    const randomVideo = workVideos[Math.floor(Math.random() * workVideos.length)];

    thankVideo.pause();
    thankVideo.src = randomVideo;
    thankVideo.muted = true;
    thankVideo.volume = 0;
    thankVideo.loop = true;
    thankVideo.playsInline = true;
    thankVideo.load();
    thankVideo.play().catch(() => {});
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    statusMessage.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) throw new Error('Message could not be sent');

      playRandomWork();
      panel.classList.add('is-sent');
      anotherButton.focus();
    } catch (error) {
      statusMessage.textContent = 'Message could not send. Please email bellaes.films@gmail.com directly.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });

  anotherButton.addEventListener('click', () => {
    panel.classList.remove('is-sent');
    thankVideo.pause();
    thankVideo.removeAttribute('src');
    thankVideo.load();
    form.reset();
    statusMessage.textContent = '';
    form.querySelector('input, textarea, button')?.focus();
  });
});
