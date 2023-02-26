<template>
  <div class="map-page-container">
    <h1>MAP</h1>
    <div>
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";

export default {
  mounted() {
    const map = L.map("map").setView([48.3794, 31.1656], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    this.addClickListener(map);
  },
  methods: {
    addClickListener(map) {
      map.on("click", (e) => {
        L.marker(e.latlng).addTo(map);
      });
    },
  },
};
</script>

<style scoped>
.map-page-container {
  margin: 3rem;
}

h1 {
  margin: 1.2rem;
}

#map {
  width: 100%;
  height: 600px;
}
</style>
