document.addEventListener('DOMContentLoaded', () => {
  const panel = document.querySelector('.contact-form-panel');
  const form = document.querySelector('.contact-form');
  const thankVideo = document.querySelector('.contact-thank-video');
  const anotherButton = document.querySelector('.contact-another-message');

  if (!panel || !form || !thankVideo || !anotherButton) return;

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

  const buildMailto = () => {
    const formData = new FormData(form);
    const name = String(formData.get('Name') || '').trim();
    const email = String(formData.get('Email') || '').trim();
    const message = String(formData.get('Message') || '').trim();
    const subject = name ? `Website message from ${name}` : 'Website message';
    const bodyLines = [];
    if (name) bodyLines.push(`Name: ${name}`);
    if (email) bodyLines.push(`Email: ${email}`);
    bodyLines.push('', message);

    return `mailto:bellaes.films@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  };

  form.addEventListener('submit', event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    playRandomWork();
    panel.classList.add('is-sent');
    anotherButton.focus();
    window.location.href = buildMailto();
  });

  anotherButton.addEventListener('click', () => {
    panel.classList.remove('is-sent');
    thankVideo.pause();
    thankVideo.removeAttribute('src');
    thankVideo.load();
    form.reset();
    form.querySelector('input, textarea, button')?.focus();
  });
});
