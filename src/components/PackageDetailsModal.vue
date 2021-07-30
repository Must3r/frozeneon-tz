<template>
  <v-card v-if="currentPackage">
    <v-card-title class="flex-column">
      <v-sheet
        color="grey lighten-3"
        width="64"
        height="64"
        shaped
        v-text="currentPackage.rank + 1"
        class="d-flex justify-center align-center mt-4 mb-6"
      />
      <h2 class="mb-4">
        <span v-text="name" />
      </h2>
      <div>
        <v-icon class="mr-2" large>{{ `mdi-${icon}` }}</v-icon>
        <v-chip
          color="success"
          class="text-center"
          v-text="currentPackage.total"
        />
      </div>
    </v-card-title>
    <v-card-text>
      <p class="font-weight-bold">Monthly hits</p>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(v, index) in currentPackage.versions"
          :key="index"
        >
          <v-expansion-panel-header>
            <span>
              <b v-text="index" />
              <i class="text-caption secondary--text ml-2">
                ({{ v.total }} hits)
              </i>
            </span>
            <v-spacer></v-spacer>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="3"
                v-for="(d, index) in hitsDates(v.dates)"
                :key="index"
              >
                <v-list-item class="grey lighten-2 text-center">
                  <v-list-item-content>
                    <v-list-item-subtitle class="mb-2">
                      {{ new Date(d[0]).toLocaleDateString() }}
                    </v-list-item-subtitle>
                    <v-list-item-title>
                      <b>{{ d[1] }}</b>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="mx-auto mb-4"
        text
        @click="[$emit('close'), clear()]"
      >
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'PackageDetailsModal',

  props: ['name', 'icon'],

  computed: {
    ...mapState(['currentPackage']),
  },

  methods: {
    ...mapMutations({
      clear: 'clearCurrentPackage',
    }),
    hitsDates(range) {
      return Object.entries(range).filter((item) => item[1] > 0);
    },
  },
};
</script>
