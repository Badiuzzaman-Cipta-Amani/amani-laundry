import { ref } from 'vue';

export function useShare() {
  const activeShareDropdown = ref(null);
  const detailShareOpen = ref(false);
  const showCopyTooltip = ref(false);
  const copyTooltip = ref('Tersalin!');

  function toggleShareDropdown(id) {
    activeShareDropdown.value = activeShareDropdown.value === id ? null : id;
  }

  function toggleDetailShare() {
    detailShareOpen.value = !detailShareOpen.value;
  }

  function shareTo(platform, post) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    let shareUrl = '';
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'instagram':
        alert('Silakan salin link dan bagikan ke Instagram Anda.');
        return;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
    }
    if (shareUrl) window.open(shareUrl, '_blank');
    activeShareDropdown.value = null;
    detailShareOpen.value = false;
  }

  function copyLink(post) {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      copyTooltip.value = 'Tersalin!';
      showCopyTooltip.value = true;
      setTimeout(() => showCopyTooltip.value = false, 2000);
    });
    activeShareDropdown.value = null;
  }

  function copyDetailLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      copyTooltip.value = 'Tersalin!';
      showCopyTooltip.value = true;
      setTimeout(() => showCopyTooltip.value = false, 2000);
    });
  }

  return {
    activeShareDropdown,
    detailShareOpen,
    showCopyTooltip,
    copyTooltip,
    toggleShareDropdown,
    toggleDetailShare,
    shareTo,
    copyLink,
    copyDetailLink
  };
}
