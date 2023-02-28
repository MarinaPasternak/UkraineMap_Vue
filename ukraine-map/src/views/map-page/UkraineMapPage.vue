<template>
  <div class="map-page-container">
    <h1>MAP</h1>
    <div>
      <div id="map"></div>
      <b-modal
        id="formAddMarker"
        title="Add marker to the map"
        modal-class="my-modal-class"
        hide-footer
      >
        <b-form>
          <b-form-group label="Point name:" class="input-groups">
            <input type="text" v-model="pointName" />
          </b-form-group>
          <b-form-group label="Point latitude:" class="input-groups">
            <input type="text" v-model="pointLNG" disabled />
          </b-form-group>
          <b-form-group label="Point longitude:" class="input-groups">
            <input type="text" v-model="pointLAT" disabled />
          </b-form-group>
          <div class="d-flex buttons-container">
            <button class="btn btn-secondary" type="button" @click="closeModal">
              Cancel
            </button>
            <button
              class="btn btn-primary"
              type="submit"
              :disabled="!allFieldsFilled"
              @click.prevent="addMarkerToArray"
            >
              Save
            </button>
          </div>
        </b-form>
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
      map: null,
    };
  },
  computed: {
    allFieldsFilled() {
      return !!this.pointLAT && !!this.pointLNG && !!this.pointName;
    },
  },
  mounted() {
    this.map = L.map("map").setView([48.3794, 31.1656], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);

    this.getMarkersArray();

    this.markersArray.forEach((point) => {
      L.marker([point.lat, point.lng]).bindPopup(point.name).addTo(this.map);
    });

    this.addClickListener();
  },
  methods: {
    addClickListener() {
      this.map.on("click", (e) => {
        this.coordinates = e.latlng;
        this.pointLAT = this.coordinates.lat.toFixed(3);
        this.pointLNG = this.coordinates.lng.toFixed(3);

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
      L.marker(this.coordinates).bindPopup(this.pointName).addTo(this.map);

      this.markersArray.push({ name: this.pointName, ...this.coordinates });
      localStorage.setItem("markers", JSON.stringify(this.markersArray));

      this.closeModal();
    },
    closeModal() {
      this.$bvModal.hide("formAddMarker");
      this.coordinates = "";
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

.buttons-container {
  float: right;
  margin-top: 30px;
}

.buttons-container .btn-secondary {
  margin-right: 15px;
}

.input-groups {
  margin-bottom: 15px;
}
</style>
