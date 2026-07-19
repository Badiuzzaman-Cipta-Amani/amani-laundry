import { ref } from 'vue';

export const useShare = () => {
  const activeShareDropdown = ref(null);
  const showCopyTooltip = ref(false);


  const toggleShareDropdown = (id) => {
    activeShareDropdown.value = activeShareDropdown.value === id ? null : id;
  }




  const copyLink = (post) => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      copyTooltip.value = 'Tersalin!';
      showCopyTooltip.value = true;
      setTimeout(() => showCopyTooltip.value = false, 2000);
    });
    activeShareDropdown.value = null;
  }



  return {
    activeShareDropdown,
    showCopyTooltip,
    copyTooltip,
    toggleShareDropdown,
    shareTo,
    copyLink,
    copyDetailLink
  };
}
