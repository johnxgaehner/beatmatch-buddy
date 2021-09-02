export default function sortCollection(items, currentSortValue) {
  items.sort(function (a, b) {
    switch (currentSortValue) {
      case "trackTitle_AtoZ":
        return a.trackTitle.toUpperCase() > b.trackTitle.toUpperCase() ? 1 : -1;
      case "trackTitle_ZtoA":
        return a.trackTitle.toUpperCase() < b.trackTitle.toUpperCase() ? 1 : -1;
      case "artistName_AtoZ":
        return a.artistName.toUpperCase() > b.artistName.toUpperCase() ? 1 : -1;
      case "artistName_ZtoA":
        return a.artistName.toUpperCase() < b.artistName.toUpperCase() ? 1 : -1;
      case "recordTitle_AtoZ":
        return a.recordTitle.toUpperCase() > b.recordTitle.toUpperCase()
          ? 1
          : -1;
      case "recordTitle_ZtoA":
        return a.recordTitle.toUpperCase() < b.recordTitle.toUpperCase()
          ? 1
          : -1;
      case "bpm_0to9":
        return a.bpm - b.bpm;
      case "bpm_9to0":
        return b.bpm - a.bpm;
      case "date_0to9":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "date_9to0":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
}
