/* ---------- Filter Functions ---------- */

// Descending sorting
const descending = (a, b) => {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
};

// Ascending sorting
const ascending = (a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

const filters = {

  // Descending date sorting
  sortDateDesc: (a, b) => {
    return descending(a.date, b.date);
  },

  // Ascending date sorting
  sortDateAsc: (a, b) => {
    return ascending(a.date, b.date);
  },

  // Descending rarity sorting
  sortRarityDesc: (a, b) => {
    const rarityChecker = (rarity) => {
      switch (rarity) {
      case 'extremely rare':
        return 2;
      case 'rare':
        return 1;
      default:
        return 0;
      }
    };

    let aRarity = rarityChecker(a.rarity);
    let bRarity = rarityChecker(b.rarity);

    return descending(aRarity, bRarity);
  },

  // Ascending rarity sorting
  sortRarityAsc: (a, b) => {
    const rarityChecker = (rarity) => {
      switch (rarity) {
      case 'extremely rare':
        return 2;
      case 'rare':
        return 1;
      default:
        return 0;
      }
    };

    let aRarity = rarityChecker(a.rarity);
    let bRarity = rarityChecker(b.rarity);

    return ascending(aRarity, bRarity);

  },

  // Alphabetical descending sorting
  sortAlphabetic: (a, b) => {
    return ascending(a.name, b.name);
  },

  // Alphabetical ascending sorting
  sortAlphabeticReversed: (a, b) => {
    return descending(a.name, b.name);
  },

  // Filter for getting a single bird by id
  filterBird: (birds, id) => {
    const bird = birds.filter(bird => bird.id === id);
  
    if(!bird[0]) return null;
  
    return bird[0];
  },
};

export default filters;