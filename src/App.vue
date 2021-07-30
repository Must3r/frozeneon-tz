<template>
  <v-app>
    <v-app-bar
      app
    >
      <h2>
        <a class="black--text text-decoration-none" href="/">Frozeneon</a>
      </h2>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchTerm"
        prepend-inner-icon="mdi-magnify"
        placeholder="Enter search term"
        outlined
        dense
        hide-details
      />
    </v-app-bar>

    <v-main class="secondary">
      <v-container class="py-12">
        <v-data-table
          class="packages-list elevation-3"
          :headers="headers"
          :items="packages"
          :search="searchTerm"
          sort-by="hits"
          sort-desc
        >
          <template v-slot:item="{ item }">
            <tr class="pointer" @click="showDetails(item)">
              <td class="text-center" width="40">
                <b>{{ packages.indexOf(item) + 1 }}</b>
              </td>
              <td>
                {{ item.name }}
              </td>
              <td width="80">
                <v-icon>
                  {{ `mdi-${typeIcon(item.type)}` }}
                </v-icon>
              </td>
              <td width=80>
                {{ item.hits }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </v-main>
    <v-dialog v-model="detailsModal" max-width="720">
      <package-details-modal
        :name="currentItem.name"
        :icon="typeIcon(currentItem.type)"
        @close="hideDetails()"
      />
    </v-dialog>
    <v-snackbar v-model="isError" color="error" dark>
      <div class="text-center">
        {{ errorMessage }}
      </div>
    </v-snackbar>
    <v-footer
      dark
      padless
    >
      <v-card
        color="grey darken-4"
        flat
        tile
        width="100%"
      >
        <v-card-text class="white--text">
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-avatar rounded size="80">
                <v-img :src="require('@/assets/skushnir.jpg')"
                  :alt="`${dev.name} ${dev.surname}`" />
              </v-avatar>
              <p class="d-none d-sm-block text-h6 mb-0 ml-4">{{ dev.name }} {{ dev.surname }}</p>
            </div>
            <div>
              <v-btn
                v-for="s in dev.socials"
                :key="s.title"
                icon
                target="_blank"
              >
                <v-icon large>mdi-{{ s.icon }}</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import CommonMixin from '@/mixins/Common.vue';

export default {
  name: 'App',

  mixins: [CommonMixin],

  components: {
    'package-details-modal': () => import('@/components/PackageDetailsModal.vue'),
  },

  data: () => ({
    searchTerm: '',
    detailsModal: false,
    currentItem: {},
  }),

  computed: {
    ...mapState([
      'packages',
      'isError',
      'errorMessage',
      'dev',
    ]),
    headers() {
      return [
        { text: 'Rank', value: '', sortable: false },
        { text: 'Name', value: 'name' },
        { text: 'Type', value: 'type' },
        { text: 'Hits', value: 'hits' },
      ];
    },
  },

  methods: {
    ...mapMutations(['errorHandler', 'setErrorMessage']),
    ...mapActions(['getPackages', 'getPackage']),
    async showDetails(item) {
      this.currentItem = item;
      await this.getPackage(item);
      if (!this.isError) {
        this.detailsModal = true;
      }
    },
    hideDetails() {
      this.detailsModal = false;
      setTimeout(() => {
        this.currentItem = {};
      }, 300);
    },
    closeError() {
      this.errorHandler(false);
      this.setErrorMessage('');
    },
  },

  created() {
    this.getPackages();
  },
};
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}
</style>
