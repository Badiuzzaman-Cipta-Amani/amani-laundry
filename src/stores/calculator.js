import { reactive } from 'vue';
import calculatorItems from '@/data/calculatorItems.json';
import branches from '@/data/branches.json';

function findItemById(id) {
  for (const cat of calculatorItems) {
    for (const item of cat.items) {
      if (item.id === id) return item;
    }
  }
  return null;
}

function _getItemPrice(item, category) {
  if (category === 'regular' || item.price <= 1000 || item.id === 'add_noda') return item.price;
  if (item.unit === 'kg') {
    if (category === 'express') {
      if (item.id === 'ck') return 8000;
      if (item.id === 'sk') return 6000;
      if (item.id === 'dry') return 6000;
    }
    if (category === 'kilat') {
      if (item.id === 'ck') return 9000;
      if (item.id === 'sk') return 8000;
      if (item.id === 'dry') return 7000;
    }
  }
  if (category === 'express') {
    const surcharge = item.price < 10000 ? 1000 : 4000;
    return item.price + surcharge;
  }
  if (category === 'kilat') {
    const surcharge = item.price < 10000 ? 2000 : 7000;
    return item.price + surcharge;
  }
  return item.price;
}

export const calculatorStore = reactive({
  selectedCategory: 'regular',
  quantities: {},
  mobileCartOpen: false,
  showBranchModal: false,
  selectedBranch: null,
  branches,

  get categoryLabel() {
    if (this.selectedCategory === 'regular') return 'Reguler';
    if (this.selectedCategory === 'express') return 'Express';
    if (this.selectedCategory === 'kilat') return 'Kilat';
    return '';
  },

  get cartItems() {
    const items = [];
    for (const cat of calculatorItems) {
      for (const item of cat.items) {
        const qty = this.quantities[item.id];
        if (qty !== undefined && qty > 0) {
          items.push({ ...item, qty });
        }
      }
    }
    return items;
  },

  get totalPrice() {
    return this.cartItems.reduce((sum, item) => {
      const price = _getItemPrice(item, this.selectedCategory);
      return sum + (price * item.qty);
    }, 0);
  },

  getItemPrice(item) {
    return _getItemPrice(item, this.selectedCategory);
  },

  getItemPriceById(itemId) {
    const item = findItemById(itemId);
    if (!item) return 0;
    return _getItemPrice(item, this.selectedCategory);
  },

  getSurcharge(item) {
    if (this.selectedCategory === 'regular') return 0;
    if (item.unit === 'kg') return 0;
    return _getItemPrice(item, this.selectedCategory) - item.price;
  },

  updateQty(id, delta) {
    const item = findItemById(id);
    const current = this.quantities[id] || 0;
    let newQty;
    if (item && item.unit === 'kg') {
      newQty = Math.max(0, current + delta);
      newQty = Math.round(newQty * 10) / 10;
    } else {
      newQty = Math.max(0, current + delta);
    }
    console.log(id, delta, newQty)
    this.quantities[id] = newQty;
  },

  setQty(id, val) {
    const item = findItemById(id);
    let newQty;
    if (item && item.unit === 'kg') {
      newQty = parseFloat(val) || 0;
      newQty = Math.max(0, Math.round(newQty * 10) / 10);
    } else {
      newQty = parseInt(val) || 0;
      newQty = Math.max(0, newQty);
    }
    this.quantities[id] = newQty;
  },

  removeItem(id) {
    delete this.quantities[id];
  },

  clearCart() {
    this.quantities = {};
    this.mobileCartOpen = false;
  },

  formatQty(qty) {
    return Number(qty).toFixed(1).replace(/\.0$/, '');
  },

  formatPrice(price) {
    return 'Rp ' + price.toLocaleString('id-ID');
  },

  orderViaWhatsApp() {
    if (this.cartItems.length === 0) {
      alert('Silakan pilih layanan terlebih dahulu!');
      return;
    }
    this.selectedBranch = null;
    this.showBranchModal = true;
  },

  confirmOrder() {
    if (!this.selectedBranch) {
      alert('Silakan pilih cabang terlebih dahulu!');
      return;
    }
    let message = 'Halo Amani Laundry! Saya ingin memesan layanan laundry berikut:%0A%0A';
    message += `Cabang: ${this.selectedBranch.name}%0A`;
    message += `Kategori: ${this.categoryLabel}%0A%0A`;
    this.cartItems.forEach(item => {
      const price = this.getItemPriceById(item.id);
      message += `- ${item.name} (${this.formatQty(item.qty)} ${item.unit}) = ${this.formatPrice(price * item.qty)}%0A`;
    });
    message += `%0ATotal Estimasi: ${this.formatPrice(this.totalPrice)}%0A%0ATerima kasih!`;
    const phone = this.selectedBranch.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    this.showBranchModal = false;
    this.mobileCartOpen = false;
  }
});