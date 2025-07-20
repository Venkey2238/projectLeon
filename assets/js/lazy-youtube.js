
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.youtube-lazy').forEach(function (el) {
    el.addEventListener('click', function () {
      const videoId = el.dataset.id;
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.className = 'absolute top-0 left-0 w-full h-full';
      el.innerHTML = '';
      el.appendChild(iframe);
    });
  });
});
