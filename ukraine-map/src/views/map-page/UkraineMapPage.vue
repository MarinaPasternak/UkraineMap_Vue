<template>
  <div class="map-page-container">
    <h1>MAP</h1>
    <div>
      <div id="map"></div>
      <b-modal
        id="formAddMarker"
        title="Add marker to map"
        modal-class="my-modal-class"
        hide-footer
      >
        <form>
          <label>Point name</label>
          <input type="text" :value="pointName" />
          <label>Point latitude</label>
          <input type="text" :value="pointLNG" />
          <label>Point longitude</label>
          <input type="text" :value="pointLAT" />
          <button type="button" @click="closeModal">Cancel</button>
          <button type="submit" @click.prevent="addMarkerToArray">Save</button>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import L from "leaflet";

export default {
  data() {
    return {
      markersArray: [],
      pointLNG: "",
      pointLAT: "",
      pointName: "",
      coordinates: null,
    };
  },
  mounted() {
    const map = L.map("map").setView([48.3794, 31.1656], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    this.getMarkersArray();

    this.markersArray.forEach((point) => {
      L.marker([point.lat, point.lng]).addTo(map);
    });

    this.addClickListener(map);
  },
  methods: {
    addClickListener(map) {
      map.on("click", (e) => {
        this.addMarkerToArray(e.latlng);

        this.coordinates = e.latlng;

        this.$bvModal.show("formAddMarker");
      });
    },
    getMarkersArray() {
      if (localStorage.getItem("markers")) {
        this.markersArray = JSON.parse(localStorage.getItem("markers"));
      } else {
        localStorage.setItem("markers", JSON.stringify([]));
      }
    },
    addMarkerToArray() {
      L.marker(this.coordinates).addTo(map);

      this.pointLAT = this.coordinates.lat.toFixed(3);
      this.pointLNG = this.coordinates.lng.toFixed(3);

      this.markersArray.push({ name: this.pointName, ...this.coordinates });
      localStorage.setItem("markers", JSON.stringify(this.markersArray));
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
