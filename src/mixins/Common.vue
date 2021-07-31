<script>
export default {
  name: 'CommonMixin',
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  methods: {
    typeIcon(item) {
      switch (item) {
        case 'gh':
          return 'github';
        case 'npm':
          return 'npm';
        default:
          return 'help';
      }
    },
  },
};
</script>
